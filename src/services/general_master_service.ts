import * as api from "./helper";

const nnt_GetAllActive = async () => {
  return await api.post("Mst_NNT/GetAllActive", {});
};

const gender_GetAllActive = async () => {
  return await api.post("Mst_Gender/GetAllActive", {});
};

const govIdType_GetAllActive = async () => {
  return await api.post("Mst_GovIDType/GetAllActive", {});
};

const position_GetAllActive = async () => {
  return await api.post("Mst_Position/GetAllActive", {});
};

const staffType_GetAllActive = async () => {
  return await api.post("Mst_StaffType/GetAllActive", {});
};

const getCurrentUserPermissions = async () => {
  return await api.post("api/GetForCurrentUser", {});
};

const org_GetAllActive = async () => {
  return await api.post("Mst_Org/GetAllOrg", {});
};

const bizType_GetAllActive = async () => {
  return await api.post("api/GetAllBizType", {});
};

const bizField_GetAllActive = async () => {
  return await api.post("api/GetAllBizField", {});
};

export default {
  getCurrentUserPermissions,
  nnt_GetAllActive,
  gender_GetAllActive,
  govIdType_GetAllActive,
  position_GetAllActive,
  staffType_GetAllActive,
  org_GetAllActive,
  bizType_GetAllActive,
  bizField_GetAllActive,
};
