import * as api from "../helper";

const GetByStaffCode = async (StaffCode: any) => {
  return await api.post("Hist_StaffStaff/GetByStaffCode", {
    StaffCode: StaffCode,
  });
};

export default {
  GetByStaffCode,
};
