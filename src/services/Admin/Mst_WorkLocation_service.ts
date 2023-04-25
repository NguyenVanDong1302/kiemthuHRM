import * as api from "../helper";

const Search = async (params: any) => {
  return await api.post("Mst_WorkLocation/Search", params);
};

const Create = async (data: any) => {
  return await api.post("Mst_WorkLocation/Create", {
    strJson: JSON.stringify(data),
  });
};

const Update = async (data: any) => {
  return await api.post("Mst_WorkLocation/Update", {
    strJson: JSON.stringify(data),
  });
};

const Remove = async ({ LocationCode, OrgID }: any) => {
  return await api.post("Mst_WorkLocation/Delete", {
    LocationCode: LocationCode,
    OrgID: OrgID,
  });
};

export default {
  Search,
  Create,
  Update,
  Remove,
};
