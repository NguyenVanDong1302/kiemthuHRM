import { SearchPropsDefault, UpdateInterface } from "components/interface";
import * as api from "./../helper";

const search = async (data: SearchPropsDefault) => {
  return await api.post("Mst_AppointType/Search", data);
};

const removeMultiple = async (data: any[]) => {
  const str = JSON.stringify(data);
  return await api.post("Mst_AppointType/DeleteMultiple", {
    strJson: str,
  });
};

const remove = async (AwardTypeCode: string) => {
  return await api.post("Mst_AppointType/Delete", {
    AwardTypeCode,
  });
};

const exportExcel = async (data: {
  OrgID: string;
  KeyWord: string;
  FlagActive: string;
}) => {
  return await api.post("Mst_AppointType/Export", data);
};

const update = async ({ isNew, data }: UpdateInterface) => {
  const str = JSON.stringify(data);
  if (isNew) {
    return await api.post("Mst_AppointType/Create", {
      strJson: str,
    });
  } else {
    return await api.post("Mst_AppointType/Update", {
      strJson: str,
    });
  }
};

const getAllActive = async () => {
  return await api.post("Mst_AppointType/GetAllActive", {});
};

const getByAppointGroup = async (AppointGroup: string) => {
  return await api.post("Mst_AppointType/GetByAppointGroup", {
    AppointGroup,
  });
};

export default {
  search,
  remove,
  exportExcel,
  update,
  getAllActive,
  removeMultiple,
  getByAppointGroup,
};
