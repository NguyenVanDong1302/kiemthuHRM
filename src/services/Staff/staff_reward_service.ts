import { SearchPropsDefault, UpdateInterface } from "components/interface";
import * as api from "../helper";

interface Props extends SearchPropsDefault {
  SortColumn?: string;
  SortBy?: string;
  AwardTypeCode?: string;
  DepartmentCode?: string;
  RewardDateFrom?: string;
  RewardDateTo?: string;
  EffectiveDateFrom?: string;
  EffectiveDateTo?: string;
}

const search = async (data: Props) => {
  return await api.post("Staff_Reward/Search", data);
};

const exportExcel = async () => {
  return await api.post("Staff_Reward/Export", {});
};

const update = async ({ isNew, data }: UpdateInterface) => {
  const str = JSON.stringify(data);
  if (isNew) {
    return await api.post("Staff_Reward/Create", {
      strJson: str,
    });
  } else {
    return await api.post("Staff_Reward/Update", {
      strJson: str,
    });
  }
};

const removeMultiple = async (data: any) => {
  const str = JSON.stringify(data);
  return await api.post("Staff_Reward/DeleteMultiple", {
    strJson: str,
  });
};

const GetByStaffCode = async (StaffCode: any) => {
  return await api.post("Staff_Reward/GetByStaffCode", {
    StaffCode: StaffCode,
  });
};

const Remove = async ({ StaffCode, Idx }: any) => {
  return await api.post("Staff_Reward/Delete", {
    StaffCode: StaffCode,
    Idx: Idx,
  });
};

export default {
  search,
  exportExcel,
  update,
  removeMultiple,
  GetByStaffCode,
  Remove,
};
