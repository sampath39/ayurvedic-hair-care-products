import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserStart(state) {
      state.loading = true;
    },
    setUserSuccess(state, action) {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    setUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser(state) {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    }
  }
});

export const { setUserStart, setUserSuccess, setUserFailure, logoutUser } = userSlice.actions;
export default userSlice.reducer;
