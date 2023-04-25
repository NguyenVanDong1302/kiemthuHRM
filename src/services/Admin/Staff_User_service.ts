import * as api from './../helper'
import { UpdateInterface } from 'components/interface';

const update = async ({ isNew, data }: UpdateInterface) => {
    const str = JSON.stringify(data);
    if (isNew) {
        return await api.post("Sys_User/Create", {
            strJson: str
        })
    }
    else {
        return await api.post("Sys_User/Update", {
            strJson: str
        })
    }
}

const remove = async (UserCode: string) => {
    return await api.post("Sys_User/Delete", UserCode)
}

export default {
    update , remove
}