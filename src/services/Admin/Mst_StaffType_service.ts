import * as api from "../helper";

const Search = async (params: any) => {
  return await api.post("Mst_StaffType/Search", params);
};

const Update = async (data: any) => {
  return await api.post("Mst_StaffType/Update", {
    strJson: JSON.stringify(data),
  });
};

const Remove = async ({ StaffType, OrgID }: any) => {
  return await api.post("Mst_StaffType/Delete", {
    StaffType: StaffType,
    OrgID: OrgID,
  });
};

const Create = async (data: any) => {
  return await api.post("Mst_StaffType/Create", {
    strJson: JSON.stringify(data),
  });
};

export default {
  Search,
  Update,
  Remove,
  Create,
};
