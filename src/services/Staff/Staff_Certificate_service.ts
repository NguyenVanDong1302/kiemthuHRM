import * as api from "./../helper";

const GetByStaffCode = async (StaffCode: any) => {
  return await api.post("Staff_Certificate/GetByStaffCode", {
    StaffCode: StaffCode,
  });
};

const Create = async (data: any) => {
  return await api.post("Staff_Certificate/Create", {
    strJson: JSON.stringify({ Staff_Certificate: data }),
  });
};

const Update = async (data: any) => {
  return await api.post("Staff_Certificate/Update", {
    strJson: JSON.stringify({ Staff_Certificate: data }),
  });
};

const Remove = async ({ StaffCode, Idx }: any) => {
  return await api.post("Staff_Certificate/Delete", {
    StaffCode: StaffCode,
    Idx: Idx,
  });
};

const RemoveMultiple = async (data: any) => {
  return await api.post("Staff_Certificate/DeleteMultiple", {
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
