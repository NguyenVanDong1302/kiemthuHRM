import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  currentUser: any;
  permissions: string[] | null;
}

const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  currentUser: {
    email: "",
    picture: null,
  },
  permissions: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      localStorage.setItem("token", payload.accessToken);
      state.isLoggedIn = true;
      state.token = payload.accessToken;
      state.currentUser = payload.user;
      state.permissions = payload.permissions;
      Cookies.set("item", payload);
    },

    logoutUser: (state) => {
      localStorage.removeItem("token");
      state.currentUser = {};
      state.isLoggedIn = false;
      state.token = null;
      state.permissions = null;
    },
    loadUser: (state, { payload }) => {
      state.currentUser = payload;
    },
    loadPermissions: (state, { payload }) => {
      state.permissions = payload;
    },
    
  },
});

export const { loginUser, logoutUser, loadUser, loadPermissions } =
  authSlice.actions;

export default authSlice.reducer;
