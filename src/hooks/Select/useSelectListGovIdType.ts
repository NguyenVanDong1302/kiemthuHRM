import { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import { useDispatch } from "react-redux";
import store from 'store/store';
import { ShowError } from "components/Dialogs/Dialogs";
import { setListGovIdType } from "store/reducers/selectApi";
import govIdType_service from "services/Common/govIdType_service";

const useSelectListGovIdType = () => {
    const [loading, setLoading] = useState("");
    const dispatch = useDispatch();
    const select = store.getState().selectApiSlice.listGovIdType;
    const fetch = async () => {
        const resp = await govIdType_service.getAllActive();
        if (resp.Success) {
            dispatch(setListGovIdType(resp.Data))
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

export default useSelectListGovIdType;
