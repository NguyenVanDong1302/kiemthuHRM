import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import store from "store/store";
import { ShowError } from "components/Dialogs/Dialogs";
import { setListTrCsStatus, setStaff } from "store/reducers/selectApi";
import Train_Course_service from "services/Course/Train_Course/Train_Course_service";

const useSelectTrainStatus = () => {
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch();
  const select = store.getState().selectApiSlice.listTrCsStatus;
  const fetch = async () => {
    const resp = await Train_Course_service.getAllStatusActive();
    if (resp.Success) {
      dispatch(setListTrCsStatus(resp.Data.Lst_TrCsStatus));
      setLoading(uuid());
    } else {
      ShowError(resp.ErrorData);
    }
  };

  useEffect(() => {
    render();
  }, [loading, select]);

  const render = () => {
    if (select.length) {
      return select;
    } else {
      fetch();
    }
  };
  return select;
};

export default useSelectTrainStatus;
