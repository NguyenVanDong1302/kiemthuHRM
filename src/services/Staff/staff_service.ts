import { SearchPropsDefault, UpdateInterface } from "components/interface";
import * as api from "../helper";

export interface Props extends SearchPropsDefault {
  StaffType?: string;
  DepartmentCode?: string;
  ReasonID?: string;
  NetWorkId?: string;
  ReasonDesc?: string;
  StaffStatus?: string;
  HistDateFrom?: string;
  HistDateTo?: string;
  BackDayFrom?: string;
  BackDayTo?: string;
}

export interface StaffPropsStatus {
  StaffCode: string; // mã nhân viên
  HistDate?: string; // ngày nghỉ việc
  ReasonDesc?: string; // lý do nghỉ việc desc
  BackDay?: string; // ngày đi làm lại
  ReasonID?: string; // lý do nghỉ việc id
}

const getListStaffByDepartmentCode = async (DepartmentCode: string) => {
  return await api.post("Staff_MapDepartment/GetByDepartmentCode", {
    DepartmentCode,
  });
};

const getAllActive = async () => {
  return await api.post("Staff_Staff/GetAllActive", {});
};

const saveStaffToDepartments = async (data: any) => {
  const str = JSON.stringify(data);
  console.log("str ", str);

  return await api.post("Staff_MapDepartment/Save", {
    strJson: str,
  });
};

const search = async (data: Props) => {
  return await api.post("Staff_Staff/Search", data);
};

const searchPause = async (data: Props) => {
  return await api.post("Staff_Staff/SearchStaffPaused", data);
};

const searchInactive = async (data: Props) => {
  return await api.post("Staff_Staff/SearchStaffInactive", data);
};

const update = async ({ isNew, data }: UpdateInterface) => {
  const str = JSON.stringify(data);
  if (isNew) {
    return await api.post("Staff_Staff/Create", {
      strJson: str,
    });
  } else {
    return await api.post("Staff_Staff/Update", {
      strJson: str,
    });
  }
};

const getCurrentUser = async () => {
  return await api.post("Staff_Staff/GetByAccessToken", {})
}

const remove = async (data: any) => {
  return await api.post("Staff_Staff/Delete", data);
};

const removeMultiple = async (data: any) => {
  const str = JSON.stringify(data);
  return await api.post("Staff_Staff/DeleteMultiple", {
    strJson: str,
  });
};

const exportExcel = async (data: any) => {
  return await api.post("Staff_Staff/Export", data);
};

const exportTemplate = async () => {
  return await api.post("Staff_Staff/ExportTemplate", {});
};

const getByStaffCode = async (StaffCode: any) => {
  return await api.post("Staff_Staff/GetByStaffCode", { StaffCode });
};

const addPauseStaff = async (data: any) => {
  return await api.post("Staff_Staff/Pause", data);
};

const addInactiveStaff = async (data: any) => {
  return await api.post("Staff_Staff/InActive", data);
};

const addActiveStaff = async (data: any) => {
  console.log("data ", data);
  return await api.post("Staff_Staff/Active", data);
};

const getByStaffType = async (StaffType: string) => {
  return await api.post("Staff_Staff/GetByStaffType", {
    StaffType,
  });
};

const Active = async (data: StaffPropsStatus) => {
  return await api.post("Staff_Staff/Active", data);
};

const Inactive = async (data: StaffPropsStatus) => {
  return await api.post("Staff_Staff/InActive", data);
};

const Paused = async (data: StaffPropsStatus) => {
  return await api.post("Staff_Staff/Pause", data);
};

const getHistoryStaffHistDate = async (StaffCode: string) => {
  return await api.post("Hist_StaffStaff/GetByStaffCode", {
    StaffCode,
  });
};

const getHistoryStaffType = async (StaffCode: string) => {
  return await api.post("Hist_StaffType/GetByStaffCode", {
    StaffCode,
  });
};


export default {
  getListStaffByDepartmentCode,
  getAllActive,
  saveStaffToDepartments,
  search,
  update,
  remove,
  getHistoryStaffType,
  exportExcel,
  getHistoryStaffHistDate,
  exportTemplate,
  getByStaffCode,
  searchPause,
  searchInactive,
  addPauseStaff,
  addInactiveStaff,
  addActiveStaff,
  getByStaffType,
  Active,
  Inactive,
  Paused,
  getCurrentUser,
  removeMultiple,
  // create
};
