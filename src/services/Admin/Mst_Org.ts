import * as api from "../helper";

const GetAllActive = async () => {
  return await api.post("Mst_Org/GetAllActive", {});
};

const Search = async (keyword: any) => {
  return await api.post("Mst_Org/Search", {
    Keyword: keyword,
  });
};

export default {
  GetAllActive,
  Search,
};
