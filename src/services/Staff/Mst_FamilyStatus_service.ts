import * as api from "../helper";

const GetAllActive = async () => {
  return await api.post("Mst_FamilyStatus/GetAllActive", {});
};

export default {
  GetAllActive,
};
