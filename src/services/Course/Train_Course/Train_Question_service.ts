import { FileTypeCustom } from "components/CustomModal/UpLoader";
import { SearchPropsDefault } from "components/interface";
import * as api from "./../../helper";

type Props = {
  TrCsCodeSys: string;
  QuestionType?: string;
  ChapterCodeSys?: string;
};

type QuestionListUpdateIdx = {
  QuestionCodeSys: string;
  QuestionIdx: string;
};

interface SearchTrainQuestion extends SearchPropsDefault {
  QuestionType?: string;
}

type AddQuestion = {
  Train_Question: {
    QuestionType: string;
    TrCsCodeSys?: string;
    ChapterCodeSys?: string;
  };
  Lst_Train_Question: [
    {
      QuestionIdx: number;
      QuestionName: string;
      QuestionAnswer: string;
      QuestionCodeSys: string;
      QuestionWeight: number;
    }
  ];
};

type UpdateQuestion = {
  Train_Question: {
    QuestionCodeSys?: string;
    QuestionType?: string;
    TrCsCodeSys?: string;
    ChapterCodeSys?: string;
    QuestionIdx?: string;
    QuestionName?: string;
    QuestionAnswer?: string;
    QuestionWeight?: number;
    FlagActive?: string;
  };
};

const search = async (data: SearchTrainQuestion) => {
  return await api.post("Train_Question/Search", data);
};

const getByTrCsSysCode = async (data: Props) => {
  return await api.post("Train_Question/GetByTrCsCodeSys", data);
};

const add = async (data: AddQuestion) => {
  const str = JSON.stringify(data);
  return await api.post("Train_Question/Add", {
    strJson: str,
  });
};

const remove = async (QuestionCodeSys: string) => {
  return await api.post("Train_Question/Delete", {
    QuestionCodeSys,
  });
};

const updateQuestionIdx = async (data: QuestionListUpdateIdx[]) => {
  const str = JSON.stringify(data);

  return await api.post("Train_Question/UpdateQuestionIdx", {
    strJson: str,
  });
};

const addQuestion = async (data: any) => {
  const str = JSON.stringify(data);
  return await api.post("Train_Question/Add", {
    strJson: str,
  });
};

const update = async (data: UpdateQuestion) => {
  const str = JSON.stringify(data);
  return await api.post("Train_Question/Update", {
    strJson: str,
  });
};

const getAllQuestionsTypeActive = async () => {
  return await api.post("Mst_QuestionType/GetAllActive", {});
};

const template = async () => {
  return await api.post("Train_Question/ExportTemplate", {});
};

const exportValueByChapter = async (data: Props) => {
  return await api.post("Train_Question/ExportByChapter", data);
};

const exportValueByCourse = async (data: Props) => {
  return await api.post("Train_Question/ExportByCourse", data);
};

const importValue = async (file: any) => {
  return await api.posts("Train_Question/Import", file);
};

const getMaxIdx = async (data: Props) => {
  return await api.post("Train_Question/GetMaxQuestionIdx", data);
};

export default {
  search,
  getByTrCsSysCode,
  add,
  remove,
  updateQuestionIdx,
  update,
  getAllQuestionsTypeActive,
  template,
  exportValueByChapter,
  exportValueByCourse,
  importValue,
  getMaxIdx,
  addQuestion,
};
