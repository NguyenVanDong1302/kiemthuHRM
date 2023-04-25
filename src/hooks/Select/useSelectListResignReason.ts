import { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import { useDispatch } from "react-redux";
import store from 'store/store';
import { ShowError } from "components/Dialogs/Dialogs";
import { setListResignReason } from "store/reducers/selectApi";
import Mst_ResignReason_service from "services/Staff/Mst_ResignReason_service";

const useSelectListResignReason = () => {
    const [loading, setLoading] = useState("");
    const dispatch = useDispatch();
    const select = store.getState().selectApiSlice.listResignReason;
    const fetch = async () => {
        const resp = await Mst_ResignReason_service.getAllActive();
        if (resp.Success) {
            // console.log("res ",resp);
            dispatch(setListResignReason(resp.Data))
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

export default useSelectListResignReason;
