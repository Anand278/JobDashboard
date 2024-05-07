import { configureStore } from "@reduxjs/toolkit";
import JobReducer from "./redux/jobSlicer";

export const store = configureStore({
  reducer: {
    jdList: JobReducer
  },
});
