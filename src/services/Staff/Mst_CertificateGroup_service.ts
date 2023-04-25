import * as api from "./../helper";

const GetAllActive = async () => {
  return await api.post("Mst_CertificateGroup/GetAllActive", {});
};

export default {
  GetAllActive,
};
