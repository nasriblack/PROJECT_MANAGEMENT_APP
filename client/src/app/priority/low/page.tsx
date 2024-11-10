import React from "react";
import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/app/state/types";

const Low = () => {
  return <ReusablePriorityPage priority={Priority.Backlog} />;
};

export default Low;
