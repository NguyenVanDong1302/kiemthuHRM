import * as api from "./../../helper";

const addExam = async (data: any) => {
  const str = JSON.stringify(data);
  return await api.post("Test_Staff/Add", {
    strJson: str,
  });
};

export default {
  addExam,
};
