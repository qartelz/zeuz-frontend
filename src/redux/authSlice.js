import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch authentication data from the backend
export const fetchAuthData = createAsyncThunk('auth/fetchAuthData', async () => {
  const response = await axios.get('/api/auth'); // Replace with your actual API endpoint
  return response.data; // Expecting response structure: { access, refresh, user: { id, email, name } }
});

// Create a slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    access: null,
    refresh: null,
    user: null,
  },
  reducers: {
    logout: (state) => {
      state.access = null;
      state.refresh = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthData.fulfilled, (state, action) => {
        state.access = action.payload.access; // Save access token
        state.refresh = action.payload.refresh; // Save refresh token
        state.user = action.payload.user; // Save user information
      })
      .addCase(fetchAuthData.rejected, (state, action) => {
        console.error("Failed to fetch authentication data:", action.error.message);
      });
  },
});

// Export the logout action and the reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
