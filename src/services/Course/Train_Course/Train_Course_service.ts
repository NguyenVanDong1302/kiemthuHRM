import { UpdateInterface } from "./../../../components/interface";
import { SearchPropsDefault } from "components/interface";
import * as api from "../../helper";

interface Props extends SearchPropsDefault {
  TrCsStatus?: string;
  FlagUsed?: string;
  TrainType?: string;
  DepartmentCode?: string;
  RankCode?: string;
}

const GetByStaffCode = async (StaffCode: any) => {
  const strJson = JSON.stringify({
    Train_Course: {
      StaffCode: StaffCode,
    },
  });

  return await api.post("Train_Course/GetByStaffCode", {
    strJson: strJson,
  });
};

const getAllStatusActive = async () => {
  return await api.post("Train_Course/GetAllStatus", {});
};

const search = async (data: Props) => {
  return await api.post("Train_Course/Search", data);
};

const update = async ({ isNew, data }: UpdateInterface) => {
  const str = JSON.stringify(data);
  if (isNew) {
    return await api.post("Train_Course/Add", {
      strJson: str,
    });
  } else {
    return await api.post("Train_Course/Update", {
      strJson: str,
    });
  }
};

const getByTrCsCodeSys = async (TrCsCodeSys: string) => {
  return await api.post("Train_Course/GetByTrCsCodeSys", { TrCsCodeSys });
};

const getDepartmentByTrCsCodeSys = async (TrCsCodeSys: string) => {
  return await api.post("Train_Course/GetTrain_CourseDepartment", {
    TrCsCodeSys,
  });
};

const getRankByTrCsCodeSys = async (TrCsCodeSys: string) => {
  return await api.post("Train_Course/GetTrain_CourseRank", {
    TrCsCodeSys,
  });
};

const remove = async (TrCsCodeSys: string) => {
  return await api.post("Train_Course/Delete", {
    TrCsCodeSys,
  });
};

const CalcForLearn = async (data: any) => {
  const str = JSON.stringify(data);
  return await api.post("Train_Course/CalcForLearn", {
    strJson: str,
  });
};

const create = async (data: any) => {
  const str = JSON.stringify(data)
  return await api.post('Staff_TranningProcess/Create', {
    strJson: str
  })
}

export default {
  GetByStaffCode,
  search,
  update,
  getAllStatusActive,
  getDepartmentByTrCsCodeSys,
  getRankByTrCsCodeSys,
  getByTrCsCodeSys,
  remove,
  CalcForLearn,
  create
};
