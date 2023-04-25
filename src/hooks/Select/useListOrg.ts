import { ShowError } from "components/Dialogs/Dialogs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import org_service from "services/Admin/org_service";
import { setListOrg } from "store/reducers/selectApi";
import store from "store/store";
import { v4 as uuid } from "uuid";

const useListOrg = () => {
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch();
  const selectOrg:any[] = store.getState().selectApiSlice.listOrg;
  const fetch = async () => {
    const resp = await org_service.getListOrg();
    if (resp.Success) {
      dispatch(setListOrg(resp.Data));
      setLoading(uuid());
    } else {
      ShowError(resp.ErrorData);
    }
  };

  useEffect(() => {
    render();
  }, [loading, selectOrg]);

  const render = () => {
    if (selectOrg.length) {
      return selectOrg;
    } else {
      fetch();
    }
  };
  return selectOrg;
};

export default useListOrg;
