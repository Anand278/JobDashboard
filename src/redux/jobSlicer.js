import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchJobData = createAsyncThunk("fetchJobData", async ({ limit, offset }) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const body = JSON.stringify({
      limit,
      offset,
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };
  
    const data = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
    return data.json();
  });
  
  const JobSlice = createSlice({
    name: "jdList",
    initialState: {
      isLoading: false,
      data: [],
      error: false,
    },
    extraReducers: (builder) => {
      builder.addCase(fetchJobData.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(fetchJobData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = [...state.data, ...action.payload.jdList];
      });
      builder.addCase(fetchJobData.rejected, (state) => {
        state.error = true;
      });
    },
  });
  
  export default JobSlice.reducer;
