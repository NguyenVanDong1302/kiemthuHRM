import { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import { useDispatch } from "react-redux";
import store from 'store/store';
import { ShowError } from "components/Dialogs/Dialogs";
import { setListDistrict, setListPosition, setStaff } from "store/reducers/selectApi";
import Mst_Province_service from "services/Staff/Mst_Province_service";
import Mst_District_service from "services/Staff/Mst_District_service";

const useSelectListDistrict = () => {
    const [loading, setLoading] = useState("");
    const dispatch = useDispatch();
    const select = store.getState().selectApiSlice.listDistrict;
    const fetch = async () => {
        const resp = await Mst_District_service.getAllActive();
        if (resp.Success) {
            dispatch(setListDistrict(resp.Data))
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

export default useSelectListDistrict;
