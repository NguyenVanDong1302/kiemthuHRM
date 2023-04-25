import { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import { useDispatch } from "react-redux";
import store from 'store/store';
import { ShowError } from "components/Dialogs/Dialogs";
import { setListProvince, setListTrainType, setStaff } from "store/reducers/selectApi";
import Mst_Province_service from "services/Staff/Mst_Province_service";
import mst_train_type_service from "services/Common/mst_train_type_service";

const useSelectTrainType = () => {
    const [loading, setLoading] = useState("");
    const dispatch = useDispatch();
    const select = store.getState().selectApiSlice.listTrainType;
    const fetch = async () => {
        const resp = await mst_train_type_service.getAllActive();
        if (resp.Success) {
            dispatch(setListTrainType(resp.Data))
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

export default useSelectTrainType;
