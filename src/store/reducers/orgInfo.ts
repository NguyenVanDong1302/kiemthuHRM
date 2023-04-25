import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OrgInfo = {
  NetworkId: string;
  OrgId: string;
  OrgData?: any;
};

const initialState: OrgInfo = { NetworkId: "0", OrgId: "0" };

export const orgInfoSlice = createSlice({
  name: "orgInfo",
  initialState,
  reducers: {
    setOrgInfo: (state, { payload }) => {
      state.NetworkId = payload.NetworkId;
      state.OrgId = payload.OrgId;
      state.OrgData = payload.OrgData;
    },
  },
});

export const { setOrgInfo } = orgInfoSlice.actions;

export default orgInfoSlice.reducer;
