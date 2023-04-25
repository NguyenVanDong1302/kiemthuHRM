import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import store from "store/store";
import { ShowError } from "components/Dialogs/Dialogs";
import { setListGovIdType, setListQuestionType, setListRank } from "store/reducers/selectApi";
import govIdType_service from "services/Common/govIdType_service";
import mst_rank from "services/Common/mst_rank";
import Train_Question_service from "services/Course/Train_Course/Train_Question_service";

const useSelectListQuestionType = () => {
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch();
  const select = store.getState().selectApiSlice.listQuestionType;
  const fetch = async () => {
    const resp = await Train_Question_service.getAllQuestionsTypeActive();
    if (resp.Success) {
      dispatch(setListQuestionType(resp.Data));
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

export default useSelectListQuestionType;
