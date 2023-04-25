import { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import { useDispatch } from "react-redux";
import store from 'store/store';
import { ShowError } from "components/Dialogs/Dialogs";
import { setListAwardType } from "store/reducers/selectApi";
import Mst_AwardType_service from "services/Staff/Mst_AwardType_service";

const useSelectListAwardType = () => {
    const [loading, setLoading] = useState("");
    const dispatch = useDispatch();
    const select = store.getState().selectApiSlice.listAwardType;
    const fetch = async () => {
        const resp = await Mst_AwardType_service.getAllActive();
        if (resp.Success) {
            dispatch(setListAwardType(resp.Data))
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

export default useSelectListAwardType;
