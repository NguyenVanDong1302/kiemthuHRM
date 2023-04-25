import { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import { useDispatch } from "react-redux";
import store from 'store/store';
import { ShowError } from "components/Dialogs/Dialogs";
import { setListStaffType } from "store/reducers/selectApi";
import Staff_Type_service from 'services/Staff/Staff_Type_service';

const useSelectListStaffType = () => {
    const [loading, setLoading] = useState("");
    const dispatch = useDispatch();
    const select = store.getState().selectApiSlice.listStaffType;
    const fetch = async () => {
        const resp = await Staff_Type_service.getAllActive();
        if (resp.Success) {
            dispatch(setListStaffType(resp.Data))
            setLoading(uuid())
        }
        else {
            ShowError(resp.ErrorData)
        }
    }

    useEffect(() => {
        render();
    }, [loading, select])

    const render = () => {
        if (select.length) {
            return select
        }
        else {
            fetch();
        }
    }
    return select
}

export default useSelectListStaffType;
