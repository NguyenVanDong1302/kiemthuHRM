import * as api from "../helper";

const GetByStaffCode = async (StaffCode: any) => {
  return await api.post("Staff_OtherInfor/GetByStaffCode", {
    StaffCode: StaffCode,
  });
};

const Update = async (data: any) => {
  return await api.post("Staff_OtherInfor/Update", {
    strJson: JSON.stringify({
      Staff_OtherInfor: data,
    }),
  });
};

export default {
  GetByStaffCode,
  Update,
};
