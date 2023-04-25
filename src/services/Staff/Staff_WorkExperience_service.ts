import * as api from "./../helper";

const GetByStaffCode = async (StaffCode: any) => {
  return await api.post("Staff_WorkExperience/GetByStaffCode", {
    StaffCode: StaffCode,
  });
};

const Create = async (data: any) => {
  return await api.post("Staff_WorkExperience/Create", {
    strJson: JSON.stringify(data),
  });
};

const Update = async (data: any) => {
  return await api.post("Staff_WorkExperience/Update", {
    strJson: JSON.stringify(data),
  });
};

const Remove = async ({ StaffCode, Idx }: any) => {
  return await api.post("Staff_WorkExperience/Delete", {
    StaffCode: StaffCode,
    Idx: Idx,
  });
};

const RemoveMultiple = async (data: any) => {
  return await api.post("Staff_WorkExperience/DeleteMultiple", {
    strJson: JSON.stringify(data),
  });
};

export default {
  GetByStaffCode,
  Create,
  Update,
  Remove,
  RemoveMultiple,
};
