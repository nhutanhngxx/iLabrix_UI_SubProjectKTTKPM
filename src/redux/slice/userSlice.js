import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      sessionStorage.setItem("accessToken", action.payload.token);
    },
    logout: (state) => {
      state.username = null;
      state.token = null;
      sessionStorage.removeItem("accessToken");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
