import { SearchPropsDefault, UpdateInterface } from 'components/interface';
import * as api from './../helper'

const search = async (data: SearchPropsDefault) => {
    return await api.post("Mst_Position/Search", data)
}
const update = async ({ isNew, data }: UpdateInterface) => {
    const str = JSON.stringify(data)
    if (isNew) {
        return await api.post("Mst_Position/Create", {
            strJson: str
        })
    }
    else {
        return await api.post("Mst_Position/Update", {
            strJson: str
        })
    }
}

const getAllActive = async () => {
    return await api.post("Mst_Position/GetAllActive", {})
}

const remove = async (data: any) => {
    return await api.post("Mst_Position/Delete", data)
}

const exportExcel = async () => {
    return await api.post("Mst_Position/Export", {})
}

const exportTemplate = async () => {
    return await api.post("Mst_Position/exportTemplate", {})
}

export default {
    search,
    update,
    remove,
    exportExcel,
    exportTemplate,
    getAllActive
}