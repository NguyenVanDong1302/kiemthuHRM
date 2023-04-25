import { createSlice } from "@reduxjs/toolkit";
import { setListCheck } from "store/reducers/selectApi";

interface StateType {
  listCheckItem: any[];
}

const initialState: StateType = {
  listCheckItem: [],
};

const LearnCourseSlice = createSlice({
  name: "LearnCourseSlice",
  initialState,
  reducers: {
    setListLearnCourseChecked: (state, actions) => {
      state.listCheckItem = actions.payload;
    },
  },
});

export const { setListLearnCourseChecked } = LearnCourseSlice.actions;
export default LearnCourseSlice.reducer;
