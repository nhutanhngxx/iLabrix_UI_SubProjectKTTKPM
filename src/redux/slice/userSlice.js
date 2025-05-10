import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  username: null,
  password: null,
  fullName: null,
  email: null,
  role: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.username = action.payload.username;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.email = null;
      state.fullName = null;
      state.password = null;
      state.role = null;
      state.userId = null;
      state.username = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
