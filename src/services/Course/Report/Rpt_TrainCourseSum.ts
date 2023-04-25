import * as api from "./../../helper";

const reportTrainCourseSumSearch = async (data: any) => {
  return await api.post("Report/Rpt_TrainCourseSum_01", data);
};

const exportExcel = async (data: any) => {
  return await api.post("Report/Export", data);
};

export default { reportTrainCourseSumSearch, exportExcel };
