import { createSlice } from "@reduxjs/toolkit";

type State = {
    StaffEdit: {
        formValue: any,
        required: boolean,
    }
}


const initialState = {
    StaffEdit: {
        formValue: {},
        required: false,
    }
}

export const Staff_EditSlice = createSlice({
    name: "staff-edit",
    initialState,
    reducers: {
        setFormValue: (state, actions) => {
            state.StaffEdit = actions.payload
        }
    }
})