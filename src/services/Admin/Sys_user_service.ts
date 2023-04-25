import { SearchPropsDefault, UpdateInterface } from "components/interface";
import * as api from "./../helper";

interface UpdateExtend extends UpdateInterface {
  flagExist: number;
  flagChangeAvatar: number;
}

const search = async (data: SearchPropsDefault) => {
  return await api.post("Sys_User/Search", data);
};

const checkExist = async (Email: string) => {
  return await api.post("Sys_User/CheckUserExistAccCenter", {
    Email,
  });
};

const getByUserCode = async (UserCode: string) => {
  return await api.post("Sys_User/GetByUserCode", {
    UserCode,
  });
};

const update = async ({
  isNew,
  data,
  flagExist,
  flagChangeAvatar,
}: UpdateExtend) => {
  const str = JSON.stringify(data);
  console.log("strJson ", {
    strJson: str,
    flagExist,
    flagChangeAvatar,
  });

  if (isNew) {
    return await api.post("Sys_User/Create", {
      strJson: str,
      flagExist,
      flagChangeAvatar,
    });
  } else {
    return await api.post("Sys_User/Update", {
      strJson: str,
      flagExist,
      flagChangeAvatar,
    });
  }
};

const remove = async (data: any) => {
  const str = JSON.stringify(data);
  return await api.post("Sys_User/DeleteMultiple", {
    strJson: str,
  });
};

const GetAllActive = async () => {
  return await api.post("Sys_User/GetAllActive", {});
};

export default {
  search,
  update,
  remove,
  checkExist,
  getByUserCode,
  GetAllActive,
};
