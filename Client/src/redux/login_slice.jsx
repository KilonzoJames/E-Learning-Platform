import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: "",
  password: "",
  error: null,
  showPassword: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    togglePasswordVisibility(state) {
      state.showPassword = !state.showPassword;
    },
    resetState() {
      return initialState;
    },
  },
});

export const {
  setEmail,
  setPassword,
  setError,
  togglePasswordVisibility,
  resetState,
} = loginSlice.actions;

export default loginSlice.reducer;
