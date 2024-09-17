import { createSlice } from "@reduxjs/toolkit";

export const publicIdSlice = createSlice({
  name: "public_id",
  initialState: {
    public_id: localStorage.getItem("public_id") || null, // Get public_id from localStorage
  },
  reducers: {
    setUser: (state, action) => {
      state.public_id = action.payload.public_id;
      localStorage.setItem("public_id", action.payload.public_id); // Store public_id in localStorage
    },
  },
});

export const { setUser } = publicIdSlice.actions;

export default publicIdSlice.reducer;
