import { createSlice } from "@reduxjs/toolkit";

type Props = {
  active: string;
  flag: "add" | "detail" | "update" | "delete";
  fileList: any[];
};

const initialState: Props = {
  active: "Basic Info",
  flag: "detail",
  fileList: [],
};

export const NavStaffSlice = createSlice({
    name: "Nav-Staff",
    initialState,
    reducers: {
        setActiveNavItem: (state, actions) => {
            state.active = actions.payload;
        },
        setFlagStaff: (state, actions) => {
            state.flag = actions.payload
        },
        setFileListValue: (state, actions) => {
            state.fileList = actions.payload
        },
    }
})

export const { setActiveNavItem, setFlagStaff, setFileListValue } =
  NavStaffSlice.actions;
export default NavStaffSlice.reducer;
