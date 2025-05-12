import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  password: null,
  fullName: null,
  email: null,
  role: null,
  accessToken: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    logout: (state) => {
      state.email = null;
      state.accessToken = null;
      sessionStorage.removeItem("accessToken");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
