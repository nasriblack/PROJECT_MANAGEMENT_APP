import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Project, SearchResults, Task, User } from "./types";

export const api = createApi({
    reducerPath: "api",
    tagTypes: ["Projects", "Tasks","Users"],
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (build) => ({
        getProjects: build.query<Project[], void>({
            query: () => ({
                url: "projects",
                providesTags: ["Projects"],
            }),
        }),
        createProject: build.mutation<Project, Partial<Project>>({
            query: (project) => ({
                url: "projects",
                method: "POST",
                body: project,
            }),
            invalidatesTags: ["Projects"],
        }),
        getTasks: build.query<Task[], { projectId: number }>({
            query: ({ projectId }) => `tasks?projectId=${projectId}`,
            providesTags: (result) =>
                result
                    ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
                    : [{ type: "Tasks" as const }],
        }),
        createTask: build.mutation<Task, Partial<Task>>({
            query: (task) => ({
                url: "tasks",
                method: "POST",
                body: task,
            }),
            invalidatesTags: ["Tasks"],
        }),
        updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
            query: ({ taskId, status }) => ({
              url: `tasks/${taskId}/status`,
              method: "PATCH",
              body: { status },
            }),
            invalidatesTags: (result, error, { taskId }) => [
              { type: "Tasks", id: taskId },
            ],
          }), 
          getUsers: build.query<User[], void>({
            query: () => "users",
            providesTags: ["Users"],
          }),
          search: build.query<SearchResults, string>({
            query: (query) => `search?query=${query}`,
          }),
    }),
});

export const {
    useGetProjectsQuery,
    useCreateProjectMutation,
    useGetTasksQuery,
    useSearchQuery,
    useCreateTaskMutation,
    useUpdateTaskStatusMutation,
    useGetUsersQuery,
} = api;