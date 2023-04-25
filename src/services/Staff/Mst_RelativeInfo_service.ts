import * as api from "./../helper";

const GetByStaffCode = async (StaffCode: any) => {
  return await api.post("Mst_RelativeInfo/GetByStaffCode", {
    StaffCode: StaffCode,
  });
};

const GetRelativeType = async () => {
  return await api.post("Mst_RelativeInfo/GetRelativeType", {});
};

const Create = async (data: any) => {
  return await api.post("Mst_RelativeInfo/Create", {
    strJson: JSON.stringify(data),
  });
};

const Update = async (data: any) => {
  return await api.post("Mst_RelativeInfo/Update", {
    strJson: JSON.stringify(data),
  });
};

const Remove = async ({ StaffCode, RelativeInfoID, OrgID }: any) => {
  return await api.post("Mst_RelativeInfo/Delete", {
    StaffCode: StaffCode,
    RelativeInfoID: RelativeInfoID,
    OrgID: OrgID,
  });
};

const RemoveMultiple = async (data: any) => {
  return await api.post("Mst_RelativeInfo/DeleteMultiple", {
    strJson: JSON.stringify(data),
  });
};

export default {
  GetByStaffCode,
  Create,
  Update,
  Remove,
  RemoveMultiple,
  GetRelativeType,
};
