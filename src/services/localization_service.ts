import * as api from "./helper";

const ccsDomain: string = `${import.meta.env.VITE_CCS_BASE_URL}`;
const solutionCode: string = `${import.meta.env.VITE_SOLUTION_CODE}`;

export const loadData: any = async () => {
  var resp = await api.post(`${ccsDomain}/api/localization/GetData`, {
    solutionCode: solutionCode,
  });

  if (resp.Success) {
    return resp.Data;
  }
};

export const addData = async (values: any) => {
  var resp = await api.post(`${ccsDomain}/api/localization/AddData`, {
    solutionCode: solutionCode,
    values: values,
  });

  if (resp.Success) {
    return resp.Data;
  }
};
