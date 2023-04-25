import { createSlice } from "@reduxjs/toolkit";

interface State {
  userInfo: any;
}

const initialState: State = {
  userInfo: [],
};

export const infoUserSlice = createSlice({
  name: "infoUser",
  initialState,
  reducers: {
    setUserInfo: (state, actions) => {
      state.userInfo = actions.payload;
    },
  },
});

export const { setUserInfo } = infoUserSlice.actions;
export default infoUserSlice.reducer;