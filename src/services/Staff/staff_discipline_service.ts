import { SearchPropsDefault, UpdateInterface } from "components/interface";
import * as api from "./../helper";

interface Props extends SearchPropsDefault {
  DisciplineCode?: string;
  DepartmentCode?: string;
  BreachDayFrom?: string;
  BreachDayTo?: string;
  EffectiveDateFrom?: string;
  EffectiveDateTo?: string;
  ExpirationDateFrom?: string;
  ExpirationDateTo?: string;
}

const search = async (data: Props) => {
  return await api.post("Staff_Discipline/Search", data);
};

const update = async ({ isNew, data }: UpdateInterface) => {
  const str = JSON.stringify(data);
  if (isNew) {
    return await api.post("Staff_Discipline/Create", {
      strJson: str,
    });
  } else {
    return await api.post("Staff_Discipline/Update", {
      strJson: str,
    });
  }
};

const getByCode = async (StaffCode: string) => {
  return await api.post("Staff_Discipline/GetByStaffCode", {
    StaffCode,
  });
};

const removeMultiple = async (data: any) => {
  const str = JSON.stringify(data);
  return await api.post("Staff_Discipline/DeleteMultiple", {
    strJson: str,
  });
};

const remove = async ({ StaffCode, Idx }: any) => {
  return await api.post("Staff_Discipline/Delete", {
    StaffCode: StaffCode,
    Idx: Idx,
  });
};

const exportExcel = async () => {};

const getIdx = async (data: { StaffCode: string; Idx: number }) => {
  return await api.post("Staff_Discipline/GetDetailIdx", {
    StaffCode: data.StaffCode,
    Idx: data.Idx,
  });
};

const getAllActiveType = async () => {
  return await api.post("Mst_Discipline/GetAllActive", {});
};

export default {
  search,
  update,
  removeMultiple,
  exportExcel,
  getIdx,
  getAllActiveType,
  getByCode,
  remove,
};
