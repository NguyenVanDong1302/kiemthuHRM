import { SearchPropsDefault, UpdateInterface } from 'components/interface';
import * as api from '../helper'

const search = async (data: SearchPropsDefault) => {
    return await api.post('Mst_ResignReason/Search', data)
}

const remove = async (data: any) => {
    console.log("data ", data)
    return await api.post("Mst_ResignReason/Delete", data)
}

const update = async ({
    isNew, data
}: UpdateInterface) => {
    const str = JSON.stringify(data);
    console.log("str ", str)

    if (isNew) {
        return await api.post("Mst_ResignReason/Create", {
            strJson: str
        })
    }
    else {
        return await api.post("Mst_ResignReason/Update", {
            strJson: str
        })
    }
}

const exportExcel = async () => {
    return await api.post("Mst_ResignReason/Export", {})
}

const exportTemplate = async () => {
    return await api.post("Mst_ResignReason/ExportTemplate", {})
}

export default {
    search, update, remove, exportExcel,
    exportTemplate
}