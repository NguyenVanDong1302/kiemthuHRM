import * as api from "./../helper";

const GetAllActive = async () => {
  return await api.post("Mst_GovIDType/GetAllActive", {});
};

export default {
  GetAllActive,
};
