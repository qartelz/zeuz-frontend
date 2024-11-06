// src/store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import axios from "axios";
// export const login = createAsyncThunk(
//   "auth/login",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/account/login/", { email, password });
//       console.log(response)
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    console.log(email,password,"testing please coorperate")
    try {
      console.log(email,password,"testing please coorperateeeee >>>>>>>>>")
      const response = await axios.post("http://127.0.0.1:8000/account/login/", { email, password });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error:", error); // Log full error object for debugging
      return rejectWithValue(error.response?.data || "An unexpected error occurred");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    access: null,
    refresh: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
