import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import store from "store/store";
import { ShowError } from "components/Dialogs/Dialogs";
import { setDepartment} from "store/reducers/selectApi";
import department_service from "services/Admin/department_service";

const useSelectStoreDepartment = () => {
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch();
  const select = store.getState().selectApiSlice.listDepartment;
  const fetch = async () => {
    const resp = await department_service.getAllActive();
    if (resp.Success) {
      dispatch(setDepartment(resp.Data));
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

export default useSelectStoreDepartment;
