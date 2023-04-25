import * as api from "./../helper";

const GetByStaffCode = async (StaffCode: any) => {
  return await api.post("Staff_Skill/GetByStaffCode", {
    StaffCode: StaffCode,
  });
};

const Create = async (data: any) => {
  return await api.post("Staff_Skill/Create", {
    strJson: JSON.stringify({ Staff_Skill: data }),
  });
};

const Update = async (data: any) => {
  return await api.post("Staff_Skill/Update", {
    strJson: JSON.stringify({ Staff_Skill: data }),
  });
};

const Remove = async ({ StaffCode, Idx }: any) => {
  return await api.post("Staff_Skill/Delete", {
    StaffCode: StaffCode,
    Idx: Idx,
  });
};

const RemoveMultiple = async (data: any) => {
  return await api.post("Staff_Skill/DeleteMultiple", {
    strJson: JSON.stringify(data),
  });
};

export default {
  GetByStaffCode,
  Create,
  Remove,
  Update,
  RemoveMultiple,
};
