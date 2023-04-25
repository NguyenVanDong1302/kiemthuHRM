import { createSlice } from "@reduxjs/toolkit";

export interface RoutingReducerConfig {
  currentRoute: any;
}

const initialState: RoutingReducerConfig = {
  currentRoute: {},
};

export const routingSlice = createSlice({
  name: "routing",
  initialState,
  reducers: {
    setCurrentRoute: (state, { payload }) => {
      state.currentRoute = payload;
    },
    resetCurrentRoute: (state, { payload }) => {
      state.currentRoute = [];
    },
  },
});

export const { setCurrentRoute, resetCurrentRoute } = routingSlice.actions;

export default routingSlice.reducer;
