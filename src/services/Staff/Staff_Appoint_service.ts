import * as api from "../helper";
import { UpdateInterface } from "../../components/interface";

interface RemoveStaffAppoint {
  StaffAppointCodeSys: string;
}

const getByCode = async (StaffCode: any) => {
  return await api.post("Staff_Appoint/GetByStaffCode", {
    StaffCode,
  });
};

const Search = async (params: any) => {
  return await api.post("Staff_Appoint/Search", { ...params });
};

const getByStaffAppointCodeSys = async (StaffAppointCodeSys: string) => {
  return await api.post("Staff_Appoint/GetByStaffAppointCodeSys", {
    StaffAppointCodeSys,
  });
};

const getTemplateByAppointGroup = async ({
  AppointGroup,
  OrgID,
}: {
  AppointGroup: string;
  OrgID: string;
}) => {
  return await api.post("Staff_Appoint/GetTemplateByAppointGroup", {
    AppointGroup,
    OrgID,
  });
};

const exportExcel = async (data: any) => {
  return await api.post("Staff_Appoint/Export", data);
};

const update = async ({ isNew, data }: UpdateInterface) => {
  const str = JSON.stringify(data);
  if (isNew) {
    return await api.post("Staff_Appoint/Create", {
      strJson: str,
    });
  } else {
    return await api.post("Staff_Appoint/Update", {
      strJson: str,
    });
  }
};

const removeMultiple = async (data: RemoveStaffAppoint[]) => {
  const str = JSON.stringify(data);

  return await api.post("Staff_Appoint/DeleteMultiple", {
    strJson: str,
  });
};

export default {
  getByCode,
  Search,
  getTemplateByAppointGroup,
  exportExcel,
  update,
  removeMultiple,
  getByStaffAppointCodeSys,
};
