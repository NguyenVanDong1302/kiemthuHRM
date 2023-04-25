import * as api from '../helper'
import { SearchPropsDefault, UpdateInterface } from 'components/interface';

const getAllActive = async () => {
    return await api.post("Mst_ResignReason/GetAllActive", {})
}

const search = async (data: SearchPropsDefault) => {
    return await api.post('Mst_ResignReason/Search', data)
}

const removeMultiple = async (data: any[]) => {
    const str = JSON.stringify(data);
    return await api.post("Mst_ResignReason/DeleteMultiple", {
        strJson: str
    })
}

const remove = async (AwardTypeCode: string) => {
    return await api.post("Mst_ResignReason/Delete", {
        AwardTypeCode
    })
}

const exportExcel = async (data: {
    OrgID: string,
    KeyWord: string,
    FlagActive: string,
}) => {
    return await api.post("Mst_ResignReason/Export", data)
}

const update = async ({ isNew, data }: UpdateInterface) => {
    const str = JSON.stringify(data);
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

export default {
    search,
    remove,
    exportExcel,
    update,
    getAllActive,
    removeMultiple,
}