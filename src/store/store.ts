import { NavStaffSlice } from "./reducers/Staff/staff";
import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "store/reducers/auth";
import { generalDataSlice } from "store/reducers/generalData";
import { orgInfoSlice } from "store/reducers/orgInfo";
import { selectApiSlice } from "store/reducers/selectApi";
import { uiSlice } from "store/reducers/ui";
import { adminReducer } from "./reducers/Admin";
import { localizationSlice } from "./reducers/localization";
import { staffReducer } from "./reducers/Staff";
import { TrainReducer } from "./reducers/Training/training";
import { infoUserSlice } from "./reducers/infoUser";

const store: any = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    orgInfo: orgInfoSlice.reducer,
    infoUser: infoUserSlice.reducer,
    generalData: generalDataSlice.reducer,
    localizationData: localizationSlice.reducer,
    ...adminReducer,
    ...staffReducer,
    ...TrainReducer,
    selectApiSlice: selectApiSlice.reducer,
    NavStaffSlice: NavStaffSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
});

export default store;
