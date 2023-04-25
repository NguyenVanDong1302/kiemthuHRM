import * as api from "../helper";

const GetAllActive = async () => {
  return await api.post("Mst_PersonalBackground/GetAllActive", {});
};

export default {
  GetAllActive,
};
