// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  user_type: "",
  showPassword: false,
  showConfPassword: false,
  passwordsMatch: true,
  error: null,
};

const createFieldReducer = (fieldName) => (state, action) => {
  state[fieldName] = action.payload;
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setEmail: createFieldReducer("email"),
    setPassword: createFieldReducer("password"),
    setConfirmPassword: createFieldReducer("confirmPassword"),
    setUserType: createFieldReducer("user_type"),
    setPasswordsMatch: createFieldReducer("passwordsMatch"),
    setError: createFieldReducer("error"),
    togglePasswordVisibility(state) {
      state.showPassword = !state.showPassword;
    },
    toggleConfPasswordVisibility(state) {
      state.showConfPassword = !state.showConfPassword;
    },
    // Reset state but keep the error intact
    resetState(state) {
      const { error } = state; // Destructure error from the current state
      return { ...initialState, error }; // Reset everything except the error
    },
    // Optionally, if you need to reset the error separately
    resetError(state) {
      state.error = null; // Explicitly reset the error
    },
  },
});

export const {
  setEmail,
  setPassword,
  setConfirmPassword,
  setUserType,
  setPasswordsMatch,
  setError,
  togglePasswordVisibility,
  toggleConfPasswordVisibility,
  resetState,
  resetError,
} = signupSlice.actions;

export default signupSlice.reducer;
