import { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import { useDispatch } from "react-redux";
import store from 'store/store';
import { ShowError } from "components/Dialogs/Dialogs";
import { setListProvince, setStaff } from "store/reducers/selectApi";
import Mst_Province_service from "services/Staff/Mst_Province_service";

const useSelectListProvince = () => {
    const [loading, setLoading] = useState("");
    const dispatch = useDispatch();
    const select = store.getState().selectApiSlice.listProvince;
    const fetch = async () => {
        const resp = await Mst_Province_service.getAllActive();
        if (resp.Success) {
            dispatch(setListProvince(resp.Data.Lst_Mst_Province))
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

export default useSelectListProvince;
