import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LocalizedValue = {
  key: string;
  value?: string;
};

export type LocalizedSavingValue = {
  cate: string;
  value: string;
};
export type LocalizationCate = {
  [cate: string]: LocalizedValue[];
};

export type LocalizationData = {
  saved?: LocalizationCate;
  saving?: LocalizedSavingValue[];
};

type AddSavingDataPayload = {
  cate: string;
  value: string;
};

const initialState: LocalizationData = {};

export const localizationSlice = createSlice({
  name: "localization",
  initialState,
  reducers: {
    loadData: (state, { payload }) => {
      state.saved = payload;
    },

    clearSavingData: (state) => {
      state.saving = [];
    },

    addSavingData: (state, action: PayloadAction<AddSavingDataPayload>) => {
      const { cate, value } = action.payload;

      if (
        state.saving &&
        state.saving.some((s) => s.cate == cate && s.value == value)
      )
        return;
      var saving: LocalizedSavingValue[] = state.saving
        ? JSON.parse(JSON.stringify(state.saving))
        : [];

      saving.push({ cate: cate, value: value });

      state.saving = saving;
    },
  },
});

export const { loadData, addSavingData, clearSavingData } =
  localizationSlice.actions;

export default localizationSlice.reducer;
