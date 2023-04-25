import * as api from "./../helper";

const GetAllActive = async () => {
  return await api.post("Mst_Grade/GetAllActive", {});
};

export default {
  GetAllActive,
};
