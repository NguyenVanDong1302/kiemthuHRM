import { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import { useDispatch } from "react-redux";
import store from 'store/store';
import { ShowError } from "components/Dialogs/Dialogs";
import { setListTypeDiscipline } from "store/reducers/selectApi";
import staff_discipline_service from "services/Staff/staff_discipline_service";

const useSelectListDiscipline = () => {
    const [loading, setLoading] = useState("");
    const dispatch = useDispatch();
    const select = store.getState().selectApiSlice.listTypeDiscipline;
    const fetch = async () => {
        const resp = await staff_discipline_service.getAllActiveType();
        if (resp.Success) {
            dispatch(setListTypeDiscipline(resp.Data))
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

export default useSelectListDiscipline;
