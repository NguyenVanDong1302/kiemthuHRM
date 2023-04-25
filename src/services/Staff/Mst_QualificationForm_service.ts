import * as api from "./../helper";

const GetAllActive = async () => {
  return await api.post("Mst_QualificationForm/GetAllActive", {});
};

export default {
  GetAllActive,
};
