import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the login async thunk
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    console.log(email, password, "testing please cooperate");
    try {
      const response = await axios.post('http://127.0.0.1:8000/account/login/', { email, password });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      alert("Error:", error);
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
  reducers: {
    // You can add actions like logout here if needed
    logout: (state) => {
      // Clear the data in the Redux store
      state.name = null;
      state.access = null;
      state.refresh = null;
      state.user_id = null;
      state.email = null;
      state.error = null;

      // Clear the data from localStorage
      localStorage.removeItem("authData");
    },
  },
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

        // Store the login details in localStorage
        localStorage.setItem("authData", JSON.stringify({
          access: action.payload.access,
          refresh: action.payload.refresh,
          name: action.payload.name,
          user_id: action.payload.user_id,
          email: action.payload.email,
        }));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Add action to clear data from localStorage and Redux store
export const { logout } = authSlice.actions;

export default authSlice.reducer;
