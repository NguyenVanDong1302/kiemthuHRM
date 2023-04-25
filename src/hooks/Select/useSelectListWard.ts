import { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import { useDispatch } from "react-redux";
import store from 'store/store';
import { ShowError } from "components/Dialogs/Dialogs";
import { setListDistrict, setListPosition, setListWard, setStaff } from "store/reducers/selectApi";
import Mst_Ward_service from "services/Staff/Mst_Ward_service";

const useSelectListWard = () => {
    const [loading, setLoading] = useState("");
    const dispatch = useDispatch();
    const select = store.getState().selectApiSlice.listWard;
    const fetch = async () => {
        const resp = await Mst_Ward_service.getAllActive();
        if (resp.Success) {
            dispatch(setListWard(resp.Data))
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

export default useSelectListWard;
