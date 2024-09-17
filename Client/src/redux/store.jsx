import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./login_slice";
import signupReducer from "./signup_slice";
import publicIdReducer from "./public_id";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
    publicId: publicIdReducer,
  },
});