import * as api from "../helper";

const GetByWorkingTimeCode = async (WorkingTimeCode: string) => {
  return await api.post("Mst_WorkingTime/GetByWorkingTimeCode", {
    WorkingTimeCode,
  });
};

const Create = async (data: any) => {
  return await api.post("Mst_WorkingTime/Create", {
    strJson: JSON.stringify(data),
  });
};

const Search = async (props: any) => {
  return await api.post("Mst_WorkingTime/Search", {
    OrgID: props.OrgID,
    KeyWord: props.KeyWord,
    FlagActive: props.FlagActive,
    Ft_PageIndex: props.Ft_PageIndex,
    Ft_PageSize: props.Ft_PageSize,
  });
};

const Update = async (data: any) => {
  return await api.post("Mst_WorkingTime/Update", {
    strJson: JSON.stringify(data),
  });
};

const Remove = async ({ WorkingTimeCode, OrgID }: any) => {
  return await api.post("Mst_WorkingTime/Delete", {
    WorkingTimeCode: WorkingTimeCode,
    OrgID: OrgID,
  });
};

const RemoveMultiply = async (list: any) => {
  return await api.post("Mst_WorkingTime/DeleteMultiple", {
    strJson: JSON.stringify(list),
  });
};

export default {
  GetByWorkingTimeCode,
  Create,
  Search,
  Update,
  Remove,
  RemoveMultiply,
};
