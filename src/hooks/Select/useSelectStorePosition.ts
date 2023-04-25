import { ShowError } from "components/Dialogs/Dialogs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import position_service from "services/Admin/position_service";
import { setListPosition } from "store/reducers/selectApi";
import store from "store/store";
import { v4 as uuid } from "uuid";

const useSelectStorePosition = () => {
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch();
  const select = store.getState().selectApiSlice.listPosition;
  const fetch = async () => {
    const resp = await position_service.getAllActive();
    if (resp.Success) {
      dispatch(setListPosition(resp.Data));
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

export default useSelectStorePosition;
