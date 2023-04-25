import { createSlice } from "@reduxjs/toolkit";

interface Props {
  flag: string; // flag modules
  formValue: any; // form
  flagQuestion: boolean; // gọi component question
  flagLearnCourse: boolean; // gọi component learn course
  flagExam: boolean; // gọi component kiểm tra
  loadingValue: string; // loading
  flagCompleteTest: boolean; // gọi component hoàn thành khóa học;
  flagCourse: "" | "ListQuestion" | "Edit" | "ExamChapter" | "ExamCourse";
}

const initialState: Props = {
  formValue: {},
  loadingValue: "",
  flag: "add",
  flagQuestion: false,
  flagLearnCourse: false,
  flagExam: false,
  flagCompleteTest: false,
  flagCourse: "",
};

const TrainingCourseSlice = createSlice({
  name: "Training Course",
  initialState,
  reducers: {
    setFlag: (state, actions) => {
      state.flag = actions.payload;
    },
    setFormValue: (state, actions) => {
      state.formValue = actions.payload;
    },
    setFlagQuestion: (state, actions) => {
      state.flagQuestion = actions.payload;
    },
    setFlagLearnCourse: (state, actions) => {
      state.flagLearnCourse = actions.payload;
    },
    setLoadingValue: (state, actions) => {
      state.loadingValue = actions.payload;
    },
    setFlagExam: (state, actions) => {
      state.flagExam = actions.payload;
    },
    setFlagCompleteTest: (state, actions) => {
      state.flagCompleteTest = actions.payload;
    },
    setFlagCourse: (state, actions) => {
      state.flagCourse = actions.payload;
    },

  },
});

export default TrainingCourseSlice.reducer;
export const {
  setFlag,
  setFlagCourse,
  setLoadingValue,
  setFormValue,
  setFlagLearnCourse,
  setFlagQuestion,
  setFlagCompleteTest,
  setFlagExam,
} = TrainingCourseSlice.actions;
