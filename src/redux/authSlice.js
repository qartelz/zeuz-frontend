import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAuthData = createAsyncThunk(
  'auth/fetchAuthData',
  async (credentials) => {
    const response = await axios.post('/api/auth', credentials); // Adjust the URL as needed
    return response.data; // Assuming structure: { access, refresh, user: { id, email, name } }
  }
);

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
    builder.addCase(fetchAuthData.fulfilled, (state, action) => {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      state.user = action.payload.user;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
