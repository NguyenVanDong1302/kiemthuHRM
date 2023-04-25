import * as api from "../helper";

const getAllMenu = async () => {
  return await api.post("Sys_Object/GetAllMenuActive", {});
};

const saveFunctionMenu = async (data: any) => {
  const str = JSON.stringify(data);

  return await api.post("Sys_Access/SaveFuncInMenu", {
    strJson: str,
  });
};

const GetByGroupCode = async (GroupCode: string) => {
  return await api.post("Sys_Access/GetByGroupCode", {
    GroupCode: GroupCode,
  });
};

const SaveMenuButtonInGroup = async (GroupCode: string, data: any[]) => {
  return await api.post("Sys_Access/SaveMenuButtonInGroup", {
    strJson: JSON.stringify({
      Sys_Group: {
        GroupCode: GroupCode,
      },
      Lst_Sys_Access: data,
    }),
  });
};

export default {
  getAllMenu,
  saveFunctionMenu,
  GetByGroupCode,
  SaveMenuButtonInGroup,
};
