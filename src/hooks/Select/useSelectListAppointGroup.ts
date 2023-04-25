import { ShowError } from "components/Dialogs/Dialogs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Mst_AppointGroup from "services/Staff/Mst_AppointGroup_service";
import { setListAppointGroup } from "store/reducers/selectApi";
import store from "store/store";
import { v4 as uuid } from "uuid";

const useSelectListAppointGroup = () => {
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch();
  const select = store.getState().selectApiSlice.listAppointGroup;
  const fetch = async () => {
    const resp = await Mst_AppointGroup.getAllActive();
    if (resp.Success) {
      dispatch(setListAppointGroup(resp.Data));
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

export default useSelectListAppointGroup;
