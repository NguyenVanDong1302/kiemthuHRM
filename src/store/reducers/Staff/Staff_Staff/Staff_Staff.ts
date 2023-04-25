import { createSlice } from "@reduxjs/toolkit";

export interface Staff {
  Staff_Staff: {
    StaffCode: any;
    StaffCodeUser: any;
    OrgID: any;
    NetworkID: any;
    StaffLastName: any;
    StaffName: any;
    StaffFullName: any;
    StaffType: any;
    DepartmentCode: any;
    PositionCode: any;
    UserID: any;
    UserPassword: any;
    DBO: any;
    StaffPhone: any;
    StaffEmail: any;
    StaffAddress: any;
    WorkingStartDate: any;
    WorkingEndDate: any;
    ManagerStaff: any;
    StaffDesc: any;
    Remark: any;
    AvatarFilePath: any;
    AvatarUrl: any;
    AvatarFileBase64: any;
    AvatarFileName: any;
    Gender: any;
    BirthPlace: any;
    PermanentAddress: any;
    IDCardNumber: any;
    GovIDType: any;
    DateOfIssue: any;
    PlaceOfIssue: any;
    StaffStatus: any;
    FlagActive: any;
    CreateDTime: any;
    CreateBy: any;
    LUDTime: any;
    LUBy: any;
    LogLUDTimeUTC: any;
    LogLUBy: any;
    MaritalStatus: any;
    MST: any;
    BankAccount: any;
    BankName: any;
    EthnicCode: any;
    ReligionCode: any;
    CountryCode: any;
    JsonDynamicField: any;
    DepartmentName: any;
    PositionName: any;
    StatusDesc: any;
    ReasonDesc: any;
    HistDate: any;
    BackDay: any;
    ReasonID: any;
    mg_GenderName: any;
    ms_StaffTypeName: any;
    mnnt_NNTFullName: any;
    mgit_GovIDTypeName: any;
    mc_CountryName: any;
    mrc_ReligionName: any;
    mec_EthnicName: any;
    ss_ManagerStaff: any;
    mrr_ResignReason: any;
    FlagFileUpload: any;
  };
  Staff_MapDepartment: any;
  Staff_InfoDynamicField: any;
  FlagStaff: any;
  FlagContactInfo: any;
  FlagRelativeInfo: any;
  FlagOtherInfor: any;
}

const initialState: Partial<Staff> = {};

export const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setStaff: (state, { payload }) => {
      state.Staff_Staff = payload.Staff_Staff;
      state.Staff_MapDepartment = payload.Staff_MapDepartment;
      state.Staff_InfoDynamicField = payload.Staff_InfoDynamicField;
      state.FlagStaff = payload.FlagStaff;
      state.FlagContactInfo = payload.FlagContactInfo;
      state.FlagRelativeInfo = payload.FlagRelativeInfo;
      state.FlagOtherInfor = payload.FlagOtherInfor;
    },
  },
});

export const { setStaff } = staffSlice.actions;

export default staffSlice.reducer;
