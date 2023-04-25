import { createSlice } from "@reduxjs/toolkit";

interface WorkingTimeSlider {
  TimeStart: number;
  TimeEnd: number;
  Idx: number;
}

interface WorkingTimeContentFormInterface {
  Day: number;
  Slider: WorkingTimeSlider[];
  Check: boolean;
  hasMoreSlide: boolean;
}

interface WorkingTimeInfo {
  WorkingTimeCode: string;
  OrgID: string;
  WorkingTimeName: string;
  WorkingType: string;
  FlagDefault: string | number;
  Flag247: string | number;
  Remark: string | null;
  FlagActive: string | null;
}

interface Holiday {
  Day: string;
  HolidayName: string;
  Remark: string;
}

interface WorkingTimeReducer {
  defaultList: WorkingTimeContentFormInterface[];
  currentList: WorkingTimeContentFormInterface[];
  info: WorkingTimeInfo;
  holidayList: Holiday[];
}

export const defaultList = Array.from({ length: 7 }, (v: any, k: any) => {
  return {
    Day: k + 1,
    Slider: Array.from({ length: 2 }, (v: any, i: any) => {
      return {
        TimeStart: 0,
        TimeEnd: 0,
        Idx: k * 2 + i + 1,
      };
    }),
    Check: false,
    hasMoreSlide: false,
  };
});

const fullList = Array.from({ length: 7 }, (v: any, k: any) => {
  return {
    Day: k + 1,
    Slider: Array.from({ length: 2 }, (v: any, i: any) => {
      return {
        TimeStart: 0,
        TimeEnd: 1440,
        Idx: k * 2 + i + 1,
      };
    }),
    Check: true,
    hasMoreSlide: false,
  };
});

const initialState: WorkingTimeReducer = {
  defaultList: Array.from({ length: 7 }, (v: any, k: any) => {
    return {
      Day: k + 1,
      Slider: Array.from({ length: 2 }, (v: any, i: any) => {
        return {
          TimeStart: 0,
          TimeEnd: 0,
          Idx: k * 2 + i + 1,
        };
      }),
      Check: false,
      hasMoreSlide: false,
    };
  }),
  currentList: defaultList,
  info: {
    WorkingTimeCode: "",
    OrgID: "",
    WorkingTimeName: "",
    WorkingType: "",
    FlagDefault: "0",
    Flag247: "0",
    FlagActive: "1",
    Remark: "",
  },
  holidayList: [],
};

export const workingTimeSlice = createSlice({
  name: "workingTime",
  initialState,
  reducers: {
    setWorkingTime: (state, { payload }) => {
      state.currentList = payload;
    },
    setAllWorkingTime: (state) => {
      state.currentList = fullList;
    },
    resetWorkingTime: (state) => {
      state.currentList = defaultList;
      state.holidayList = [];
    },

    setWorkingTimeInfo: (state, { payload }) => {
      state.info = { ...state.info, ...payload };
    },
    resetWorkingTimeInfo: (state) => {
      state.info = initialState.info;
    },
    setFlag247: (state, { payload }) => {
      state.info.Flag247 = payload;
      state.currentList = payload == 1 ? fullList : defaultList;
    },

    updateFormData: (state, { payload }) => {
      const { index, value } = payload;
      state.currentList[index] = value;
    },
    updateCheckbox: (state, { payload }) => {
      const { index } = payload;
      state.currentList[index] = {
        ...state.currentList[index],
        Check: !state.currentList[index].Check,
      };
    },
    updateSlider: (state, { payload }) => {
      const { index, value, idx } = payload;
      state.currentList[index].Slider[idx % 2 === 0 ? 1 : 0] = {
        Idx: idx,
        TimeStart: value[0],
        TimeEnd: value[1],
      };
    },
    updateHasMoreSlider: (state, { payload }) => {
      const { index } = payload;
      state.currentList[index] = {
        ...state.currentList[index],
        hasMoreSlide: !state.currentList[index].hasMoreSlide,
      };
    },
    setHolidayList: (state, { payload }) => {
      state.holidayList = payload;
    },
    updateHolidayList: (state, { payload }) => {
      const found = state.holidayList.findIndex(
        (item: Holiday) => item.Day === payload.Day
      );

      if (found === -1) {
        state.holidayList.push(payload);
      }
    },
    deleteHoliday: (state, { payload }) => {
      const arr = state.holidayList.filter(
        (item: Holiday) => item.Day !== payload.Day
      );

      state.holidayList = arr;
    },
  },
});

export const {
  setWorkingTime,
  resetWorkingTime,
  setAllWorkingTime,
  setWorkingTimeInfo,
  setFlag247,
  resetWorkingTimeInfo,
  updateFormData,
  updateCheckbox,
  updateSlider,
  updateHasMoreSlider,
  setHolidayList,
  updateHolidayList,
  deleteHoliday,
} = workingTimeSlice.actions;

export default workingTimeSlice.reducer;
