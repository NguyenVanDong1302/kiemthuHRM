import * as api from "../helper";

const Search = async (params: any) => {
  return await api.post("KPI_InOut/Search", {
    ...params,
  });
};

const Get = async (data: any) => {
  return await api.post("KPI_InOut/Get", {
    ...data,
  });
};

const Export = async (params: any) => {
  return await api.post("KPI_InOut/Export", {
    ...params,
  });
};

const ExportTemplate = async () => {
  return await api.post("KPI_InOut/ExportTemplate", {});
};

const Import = async (params: any) => {
  return await api.post("KPI_InOut/Import", {
    ...params,
  });
};

export default { Search, Get, Export, ExportTemplate, Import };
