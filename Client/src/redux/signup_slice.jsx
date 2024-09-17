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
    resetState() {
      return initialState;
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
} = signupSlice.actions;

export default signupSlice.reducer;
