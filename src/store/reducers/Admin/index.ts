import { SysAccessSlice } from "./sys_access";
import { workingTimeSlice } from "./WorkingTime/workingTime";

export const adminReducer = {
  workingTime: workingTimeSlice.reducer,
  sysAccess: SysAccessSlice.reducer,
};
