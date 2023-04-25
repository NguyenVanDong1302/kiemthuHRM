import { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import { useDispatch } from "react-redux";
import store from 'store/store';
import { ShowError } from "components/Dialogs/Dialogs";
import { setListEthnic, setListReligion } from "store/reducers/selectApi";
import ethnic_service from "services/Common/ethnic_service";

const useSelectListEthnic = () => {
    const [loading, setLoading] = useState("");
    const dispatch = useDispatch();
    const select = store.getState().selectApiSlice.listEthnic;
    const fetch = async () => {
        const resp = await ethnic_service.getAllActive();
        if (resp.Success) {
            dispatch(setListEthnic(resp.Data))
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

export default useSelectListEthnic;
