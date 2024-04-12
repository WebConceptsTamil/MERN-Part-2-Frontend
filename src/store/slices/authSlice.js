import { createSlice } from "@reduxjs/toolkit";

const userData = JSON.parse(localStorage.getItem("userdata")) || null;

const initialState = {
  userData,
  isLoggedIn: !!userData,
};

const authSlice = createSlice({
  name: "auths",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("userdata", JSON.stringify(action.payload));
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      state.userData = null;
      state.isLoggedIn = false;
      localStorage.clear("userdata");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
