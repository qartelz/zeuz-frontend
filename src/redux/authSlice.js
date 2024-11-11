import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    console.log(email,password,"testing please coorperate")
    try {
   
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/account/login/`, { email, password });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error:", error); 
      return rejectWithValue(error.response?.data || "An unexpected error occurred");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    name: null,
    access: null,
    refresh: null,
    user_id: null,
    email: null,
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
        state.name = action.payload.name;
        state.user_id = action.payload.user_id;
        state.email = action.payload.email;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
