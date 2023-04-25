import { createSlice } from "@reduxjs/toolkit";

type QuestionType = {
  QuestionCodeSys?: string;
  NetworkID?: string;
  OrgID?: string;
  QuestionType?: string;
  TrCsCodeSys?: string;
  ChapterCodeSys?: string;
  QuestionIdx?: string | number;
  QuestionName?: string;
  QuestionAnswer?: string;
  QuestionWeight?: number;
  FlagUsed?: string;
  FlagActive?: string;
  LogLUDTimeUTC?: string;
  LogLUBy?: string;
  mtrtp_QuestionType?: string;
  mtrtp_QuestionTypeName?: string;
  trcscht_ChapterCodeSys?: string;
  trcscht_ChapterName?: string;
};

interface TypeQuestionExam extends QuestionType {
  TestStaffAnswer?: string;
}

export interface FormValueType {
  TrCsCodeSys: string;
  QuestionType?: string;
  ChapterCodeSys?: string;
  ChapterName?: string;
};

type State = {
  formValue: FormValueType; // điều kiện search của màn hình đào tạo khóa học
  listQuestion: QuestionType[]; // danh sách câu hỏi
  listExamQuestion: TypeQuestionExam[]; //
};

const initialState: State = {
  formValue: {
    TrCsCodeSys: "",
  },
  listExamQuestion: [],
  listQuestion: [],
};

const TrainSlice = createSlice({
  name: "TrainSlice",
  initialState,
  reducers: {
    setFormValue: (state, actions) => {
      state.formValue = actions.payload;
    },
    setTrCsCodeSys: (state, actions) => {
      state.formValue = {
        ...state.formValue,
        TrCsCodeSys: actions.payload,
      };
    },
    setListQuestion: (state, actions) => {
      state.listQuestion = actions.payload;
    },
    setListExamQuestion: (state, actions) => {
      state.listExamQuestion = actions.payload;
    },
    addToListQuestion: (state, actions) => {
      state.listQuestion = [...state.listQuestion, actions.payload];
    },
    removeToListQuestion: (state, actions) => {
      state.listQuestion = state.listQuestion.filter((item: any) => {
        return item.QuestionIdx !== actions.payload;
      });
    },
    changeListCourse: (state, actions) => {
      const newArr = [...state.listExamQuestion].map((item: any) => {
        if (item.QuestionCodeSys === actions.payload.QuestionCodeSys) {
          return actions.payload;
        } else {
          return item;
        }
      });

      state.listExamQuestion = newArr;
    },
  },
});

export default TrainSlice.reducer;
export const {
  setFormValue,
  setTrCsCodeSys,
  addToListQuestion,
  setListQuestion,
  removeToListQuestion,
  changeListCourse,
  setListExamQuestion,
} = TrainSlice.actions;
