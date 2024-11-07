import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Project, Task } from "./types";

export const api = createApi({
    reducerPath: "api",
    tagTypes: ["Projects", "Tasks"],
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
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
    }),
});

export const {
    useGetProjectsQuery,
    useCreateProjectMutation,
    useGetTasksQuery,
    useCreateTaskMutation
} = api;