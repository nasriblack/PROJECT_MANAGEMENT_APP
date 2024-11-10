import React from "react";
import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/app/state/types";

const High = () => {
  return <ReusablePriorityPage priority={Priority.High} />;
};

export default High;
