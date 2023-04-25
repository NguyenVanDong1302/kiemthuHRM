import * as api from "./../helper";

const GetByStaffCode = async (StaffCode: any) => {
  return await api.post("Staff_Degree/GetByStaffCode", {
    StaffCode: StaffCode,
  });
};

const Create = async (data: any) => {
  return await api.post("Staff_Degree/Create", {
    strJson: JSON.stringify({ Staff_Degree: data }),
  });
};

const Update = async (data: any) => {
  return await api.post("Staff_Degree/Update", {
    strJson: JSON.stringify({ Staff_Degree: data }),
  });
};

const Remove = async ({ StaffCode, Idx }: any) => {
  return await api.post("Staff_Degree/Delete", {
    StaffCode: StaffCode,
    Idx: Idx,
  });
};

const RemoveMultiple = async (data: any) => {
  return await api.post("Staff_Degree/DeleteMultiple", {
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
