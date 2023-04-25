import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import store from "store/store";
import { ShowError } from "components/Dialogs/Dialogs";
import { setUserInfo } from "store/reducers/infoUser";
import staff_service from "services/Staff/staff_service";

const useSelectUser = () => {
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch();
  const select = store.getState().infoUser.userInfo;
  const fetch = async () => {
    const resp = await staff_service.getCurrentUser();
    if (resp.Success) {
      dispatch(setUserInfo(resp.Data));
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

export default useSelectUser;
