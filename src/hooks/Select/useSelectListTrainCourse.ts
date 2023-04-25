import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import store from "store/store";
import { ShowError } from "components/Dialogs/Dialogs";
import { setListChapter } from "store/reducers/selectApi";
import Train_Course_Chapter_service from "services/Course/Train_Course/Train_Course_Chapter_service";

const useSelectTrainCourse = () => {
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch();
  const select = store.getState().selectApiSlice.listChapter;
  const fetch = async () => {
    const resp = await Train_Course_Chapter_service.getAllActive();
    if (resp.Success) {
      dispatch(setListChapter(resp.Data.Lst_Train_CourseChapter));
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

export default useSelectTrainCourse;
