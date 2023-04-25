import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type GeneralData = {
  [key: string]: any;
}

const initialState: GeneralData = {};

interface SetDataPayload {
  key: string;
  value: any;
}


export const generalDataSlice = createSlice({
  name: 'generalData',
  initialState,
  reducers: {
    setGeneralData: (state, action: PayloadAction<SetDataPayload>) => {
      const { key, value } = action.payload;
      state[key] = value;
    }
  }
});

export const { setGeneralData } = generalDataSlice.actions;

export default generalDataSlice.reducer;
