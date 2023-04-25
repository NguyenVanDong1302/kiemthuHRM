import { createSlice } from "@reduxjs/toolkit";
interface UserInterface {
  UserCode: string;
  NetworkID: any;
  UserName: string;
  UserPassword: string;
  UserPasswordNew: any;
  PhoneNo: string;
  EMail: string;
  MST: string;
  OrganCode: any;
  DepartmentCode: any;
  Position: string;
  VerificationCode: any;
  Avatar: any;
  UUID: any;
  FlagDLAdmin: string;
  FlagSysAdmin: string;
  FlagNNTAdmin: string;
  OrgID: any;
  CustomerCodeSys: any;
  CustomerCode: any;
  CustomerName: any;
  FlagActive: string;
  LogLUDTimeUTC: any;
  LogLUBy: any;
  ACId: string;
  ACAvatar: string;
  ACEmail: string;
  ACLanguage: string;
  ACName: string;
  ACPhone: string;
  ACTimeZone: string;
  mo_OrganCode: any;
  mo_OrganName: any;
  mdept_DepartmentCode: any;
  mdept_DepartmentName: any;
  mnnt_DealerType: any;
  ctitctg_CustomerGrpCode: any;
}

interface initialState {
  listCheckUser: UserInterface[];
}

const initialState = {
  listCheckUser: [],
};

export const SysAccessSlice = createSlice({
  name: "Sys_Access_Slice",
  initialState,
  reducers: {
    setListCheckUser: (state, actions) => {
      state.listCheckUser = actions.payload;
    },
  },
});

export default SysAccessSlice.reducer;
export const { setListCheckUser } = SysAccessSlice.actions;
