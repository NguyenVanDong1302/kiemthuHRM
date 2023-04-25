import * as api from "./../../helper";
import { SearchPropsDefault } from "components/interface";

type ArrayType = {
  TrCsCodeSys: string;
  StaffCode: string;
};

interface LearnCourseSearch extends SearchPropsDefault {
  TrainType?: string;
  KeyWord: string;
  StaffCode?: string;
}

const joinToCourse = async (data: any) => {
  const str = JSON.stringify(data);
  return await api.post("Learn_Course/Add", {
    strJson: str,
  });
};

const getListCourseByStaffCode = async (data: LearnCourseSearch) => {
  return await api.post("Learn_Course/GetByStaffCode", data);
};

const search = async (data: LearnCourseSearch) => {
  return await api.post("Learn_Course/Search", data);
};

const getByTrCsSysCode = async ({
  TrCsCodeSys,
  DepartmentCode,
}: {
  TrCsCodeSys: string;
  DepartmentCode: string;
}) => {
  return await api.post("Learn_Course/GetByTrCsCodeSys", {
    TrCsCodeSys,
    DepartmentCode,
  });
};

const submit = async ({ type, data }: { type: string; data: ArrayType[] }) => {
  const str = JSON.stringify(data);
  if (type === "Approve") {
    return await api.post("Learn_Course/ApproveMulti", {
      strJson: str,
    });
  } else {
    return await api.post("Learn_Course/RejectMulti", {
      strJson: str,
    });
  }
};

const getTotal = async (TrCsCodeSys: string, flag: string) => {
  if (flag === "learn") {
    return await api.post("Learn_Course/GetTotalLearn", {
      TrCsCodeSys,
    });
  }
  if (flag === "finish") {
    return await api.post("Learn_Course/GetTotalFinish", {
      TrCsCodeSys,
    });
  }
  if (flag === "staff") {
    return await api.post("Learn_Course/GetTotalStaff", {
      TrCsCodeSys,
    });
  }
};

export default {
  getByTrCsSysCode,
  submit,
  getTotal,
  joinToCourse,
  search,
  getListCourseByStaffCode,
};
