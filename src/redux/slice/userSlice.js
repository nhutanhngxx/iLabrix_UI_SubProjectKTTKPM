import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      sessionStorage.setItem("accessToken", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      sessionStorage.removeItem("accessToken");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
