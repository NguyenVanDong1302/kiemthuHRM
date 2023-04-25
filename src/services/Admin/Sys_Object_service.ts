import * as api from "../helper";

const GetAllMenuButtonActive = async () => {
  return await api.post("Sys_Object/GetAllMenuButtonActive", {});
};

const GetByGroupCode = async (GroupCode: string) => {
  return await api.post("Sys_Object/GetByGroupCode", {
    GroupCode: GroupCode,
  });
};

export default { GetAllMenuButtonActive, GetByGroupCode };
