import * as api from "../helper";

const Search = async (props: any) => {
  return await api.post("Mst_NNT/Search", {
    KeyWord: props.KeyWord,
    OrgID: props.OrgID,
    FlagActive: props.FlagActive,
    Ft_PageIndex: props.Ft_PageIndex,
    Ft_PageSize: props.Ft_PageSize,
    SortBy: props.SortBy,
    SortColumn: props.SortColumn,
  });
};

const GetByMST = async (MST: any) => {
  return await api.post("Mst_NNT/GetByMST", {
    MST: MST,
  });
};

const Update = async (data: any) => {
  return await api.post("Mst_NNT/Update", {
    strJson: JSON.stringify(data),
  });
};

const Remove = async (MST: any) => {
  return await api.post("Mst_NNT/Delete", {
    MST: MST,
  });
};

const Create = async (data: any) => {
  return await api.post("Mst_NNT/Create", {
    strJson: JSON.stringify(data),
  });
};

export default {
  Search,
  GetByMST,
  Update,
  Remove,
  Create,
};
