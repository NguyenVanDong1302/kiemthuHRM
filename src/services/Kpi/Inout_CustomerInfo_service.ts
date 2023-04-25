import * as api from "./../helper";

const Search = async (params: any) => {
  return await api.post("InOut_CustomerInfo/Search", {
    ...params,
  });
};

const GetByCustomerInfoID = async (CustomerInfoID: any) => {
  return await api.post("InOut_CustomerInfo/GetByCustomerInfoID", {
    CustomerInfoID: CustomerInfoID,
  });
};

const SaveAndApprove = async (data: any) => {
  return await api.post("InOut_CustomerInfo/SaveAndApprove", {
    strJson: JSON.stringify(data),
  });
};

const Save = async (data: any) => {
  return await api.post("InOut_CustomerInfo/Save", {
    strJson: JSON.stringify(data),
  });
};

const Approve = async (data: any) => {
  return await api.post("InOut_CustomerInfo/Approve", {
    strJson: JSON.stringify(data),
  });
};

const Remove = async (data: any) => {
  return await api.post("InOut_CustomerInfo/Delete", {
    strJson: JSON.stringify(data),
  });
};

const RemoveMultiple = async (data: any) => {
  return await api.post("InOut_CustomerInfo/DeleteMulti", {
    strJson: JSON.stringify(data),
  });
};

const Update = async (data: any) => {
  return await api.post("InOut_CustomerInfo/Update", {
    strJson: JSON.stringify(data),
  });
};

const Export = async (params: any) => {
  return await api.post("InOut_CustomerInfo/Export", {
    ...params,
  });
};

const Reject = async (data: any) => {
  return await api.post("InOut_CustomerInfo/Reject", {
    strJson: JSON.stringify(data),
  });
};

const Extend = async (data: any) => {
  return await api.post("InOut_CustomerInfo/Extend", {
    strJson: JSON.stringify(data),
  });
};

export default {
  Search,
  GetByCustomerInfoID,
  SaveAndApprove,
  Save,
  Approve,
  Remove,
  Reject,
  Extend,
  Update,
  Export,
  RemoveMultiple,
};
