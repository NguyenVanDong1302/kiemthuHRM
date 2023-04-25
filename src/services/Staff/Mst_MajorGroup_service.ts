import * as api from "./../helper";

const GetAllActive = async () => {
  return await api.post("Mst_MajorGroup/GetAllActive", {});
};

export default {
  GetAllActive,
};
