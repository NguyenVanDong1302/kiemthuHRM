import { SearchPropsDefault, UpdateInterface } from "components/interface";
import * as api from "../helper";

const search = async (data: SearchPropsDefault) => {
  return await api.post("Sys_Group/Search", data);
};

const update = async ({ isNew, data }: UpdateInterface) => {
  const str = JSON.stringify(data);
  if (isNew) {
    return await api.post("Sys_Group/Create", {
      strJson: str,
    });
  } else {
    return await api.post("Sys_Group/Update", {
      strJson: str,
    });
  }
};

const remove = async (GroupCode: string) => {
  return await api.post("Sys_Group/Delete", {
    GroupCode,
  });
};

const GetByGroupCode = async (GroupCode: string) => {
  return await api.post("Sys_Group/GetByGroupCode", { GroupCode: GroupCode });
};

const Save = async (GroupCode: string, data: any[]) => {
  return await api.post("Sys_UserInGroup/Save", {
    strJson: JSON.stringify({
      Sys_Group: {
        GroupCode: GroupCode,
      },
      Lst_Sys_UserInGroup: data,
    }),
  });
};

export default {
  search,
  update,
  remove,
  GetByGroupCode,
  Save,
};
