import { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import { useDispatch } from "react-redux";
import store from 'store/store';
import { ShowError } from "components/Dialogs/Dialogs";
import { setListGovIdType, setListRank } from "store/reducers/selectApi";
import govIdType_service from "services/Common/govIdType_service";
import mst_rank from "services/Common/mst_rank";

const useSelectListRank = () => {
    const [loading, setLoading] = useState("");
    const dispatch = useDispatch();
    const select = store.getState().selectApiSlice.listRank;
    const fetch = async () => {
        const resp = await mst_rank.getAllActive();
        if (resp.Success) {
            dispatch(setListRank(resp.Data))
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

export default useSelectListRank;
