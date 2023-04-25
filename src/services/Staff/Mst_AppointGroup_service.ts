import * as api from "../helper";

const getAllActive = async () => {
  return await api.post("Mst_AppointGroup/GetAllActive", {});
};

export default {
  getAllActive,
};
