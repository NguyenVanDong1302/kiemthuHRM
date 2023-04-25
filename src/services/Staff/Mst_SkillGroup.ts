import * as api from "./../helper";

const GetAllActive = async () => {
  return await api.post("Mst_SkillGroup/GetAllActive", {});
};

export default {
  GetAllActive,
};
