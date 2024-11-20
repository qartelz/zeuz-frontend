import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/account/login/",
        { email, password }
      );
      console.log("Login Successful:", response.data);
      return response.data; // Assuming response includes access, refresh, etc.
    } catch (error) {
      console.error("Login Failed:", error.response || error);
      // Provide detailed error messages
      return rejectWithValue(
        error.response?.data?.message || "Invalid username or password"
      );
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
    logout: (state) => {
      state.name = null;
      state.access = null;
      state.refresh = null;
      state.user_id = null;
      state.email = null;
      state.error = null;

      
      localStorage.removeItem("authData");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.name = action.payload.name;
        state.user_id = action.payload.user_id;
        state.email = action.payload.email;
        state.broadcast_token = action.payload.broadcast_token;
        state.broadcast_userid = action.broadcast_userid;



      
        localStorage.setItem(
          "authData",
          JSON.stringify({
            access: action.payload.access,
            refresh: action.payload.refresh,
            name: action.payload.name,
            user_id: action.payload.user_id,
            email: action.payload.email,
            broadcast_token : action.payload.broadcast_token,
            broadcast_userid : action.payload.broadcast_userid,

          })
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});


export const { logout } = authSlice.actions;

export default authSlice.reducer;
