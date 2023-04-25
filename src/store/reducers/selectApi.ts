import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ListValue = {
  listCheckStaffInDepartment: any[];
  listCheckedStaff: any[];
  listOrg: any[];
  listDepartment: any[];
  listStaff: any[];
  listCheck: any[];
  listTypeReward: any[];
  listTypeDiscipline: any[];
  listContractType: any[];
  listCountry: any[];
  listPosition: any[];
  listResignReason: any[];
  listAwardType: any[];
  listAppointGroup: any[];
  listReligion: any[];
  listEthnic: any[];
  listGender: any[];
  listGovIdType: any[];
  listStaffType: any[];
  listProvince: any[];
  listDistrict: any[];
  listWard: any[];
  listRank: any[];
  listTrainType: any[];
  listTrCsStatus: any[];
  listChapter: any[];
  listQuestionType: any[];
  ListDataUpload: any;
};

const initialState: ListValue = {
  listOrg: [], // Org
  listDepartment: [], // phòng ban
  listCheckStaffInDepartment: [], // chức danh
  listStaff: [], // nhân viên
  listCheck: [], // check
  listTypeReward: [], // loại khen thưởng
  listTypeDiscipline: [], // loại ký luật
  listContractType: [], // loại hợp đồng
  listCountry: [], // quốc gia
  listPosition: [], // Chức danh
  listResignReason: [], // Lý do nghỉ việc
  listAwardType: [], // Loại khen thưởng
  listAppointGroup: [], // Loại điều động
  listCheckedStaff: [], // list check nhân viên
  listReligion: [], // List dân tộc
  listEthnic: [], // list tôn giáo
  listGender: [], // list giới tính
  listGovIdType: [], // Loại giấy tờ
  listStaffType: [], // loại nhân viên
  listProvince: [], // Thành phố
  listDistrict: [], // phường xã
  listWard: [], // quận huyện
  listRank: [], // Rank
  listTrainType: [], // loại đào tạo
  listTrCsStatus: [],
  listChapter: [], // list các câu hỏi,
  listQuestionType: [], // list loại câu hỏi
  ListDataUpload: {}
};

export const selectApiSlice = createSlice({
  name: "select-api",
  initialState,
  reducers: {
    setListOrg: (state, actions) => {
      state.listOrg = actions.payload;
    },
    setDepartment: (state, actions) => {
      state.listDepartment = actions.payload;
    },
    setListCheckStaffInDepartment: (state, actions) => {
      state.listCheckStaffInDepartment = actions.payload;
    },
    setStaff: (state, actions) => {
      state.listStaff = actions.payload;
    },
    setListCheck: (state, actions) => {
      state.listCheck = actions.payload;
    },
    setListTypeReward: (state, actions) => {
      state.listTypeReward = actions.payload;
    },
    setListTypeDiscipline: (state, actions) => {
      state.listTypeDiscipline = actions.payload;
    },
    setListContractType: (state, actions) => {
      state.listContractType = actions.payload;
    },
    setListCountry: (state, actions) => {
      state.listCountry = actions.payload;
    },
    setListPosition: (state, actions) => {
      state.listPosition = actions.payload;
    },
    setListResignReason: (state, actions) => {
      state.listResignReason = actions.payload;
    },
    setListAwardType: (state, actions) => {
      state.listAwardType = actions.payload;
    },
    setListAppointGroup: (state, actions) => {
      state.listAppointGroup = actions.payload;
    },
    setListCheckedStaffType: (state, actions) => {
      state.listCheckedStaff = actions.payload;
    },
    setListReligion: (state, actions) => {
      state.listReligion = actions.payload;
    },
    setListEthnic: (state, actions) => {
      state.listEthnic = actions.payload;
    },
    setListGender: (state, actions) => {
      state.listGender = actions.payload;
    },
    setListGovIdType: (state, actions) => {
      state.listGovIdType = actions.payload;
    },
    setListStaffType: (state, actions) => {
      state.listStaffType = actions.payload;
    },
    setListProvince: (state, actions) => {
      state.listProvince = actions.payload;
    },
    setListDistrict: (state, actions) => {
      state.listDistrict = actions.payload;
    },
    setListWard: (state, actions) => {
      state.listWard = actions.payload;
    },
    setListRank: (state, actions) => {
      state.listRank = actions.payload;
    },
    setListTrainType: (state, actions) => {
      state.listTrainType = actions.payload;
    },
    setListTrCsStatus: (state, actions) => {
      state.listTrCsStatus = actions.payload;
    },
    setListChapter: (state, actions) => {
      state.listChapter = actions.payload;
    },
    setListQuestionType: (state, actions) => {
      state.listQuestionType = actions.payload;
    },
    // data tu tao
    setListDataUpload: (state, actions) => {
      state.ListDataUpload = actions.payload;
    },
  },
});

export const {
  setListOrg,
  setListReligion,
  setListEthnic,
  setListTrCsStatus,
  setListRank,
  setListGender,
  setListCheckedStaffType,
  setListProvince,
  setListDistrict,
  setListWard,
  setListStaffType,
  setListGovIdType,
  setListAppointGroup,
  setListAwardType,
  setListPosition,
  setListResignReason,
  setListCountry,
  setListContractType,
  setListTypeDiscipline,
  setDepartment,
  setListTypeReward,
  setListCheckStaffInDepartment,
  setStaff,
  setListCheck,
  setListTrainType,
  setListChapter,
  setListQuestionType,
  setListDataUpload
} = selectApiSlice.actions;
export default selectApiSlice.reducer;
