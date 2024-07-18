import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: {},
  isAuthenticated: false,
  sessionId: "",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.sessionId = localStorage.getItem("session_id");

      localStorage.setItem("account_id", action.payload.id);
    },
    logoutUser: (state) => {
      state.user = {};
      state.isAuthenticated = false;
      state.sessionId = "";

      localStorage.removeItem("request_token");
      localStorage.removeItem("session_id");
      localStorage.removeItem("account_id");
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;

export const userSelector = (state) => state.user;
