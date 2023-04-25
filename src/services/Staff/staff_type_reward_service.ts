import * as api from '../helper'
import { UpdateInterface } from 'components/interface';

const search = async (data: any) => {
    return await api.post("Mst_AwardType/Search", {})
}

const exportExcel = async (data: {
    OrgID: string,
    KeyWord: string,
    FlagActive: number | string,
}) => {
    return await api.post("Mst_AwardType/Export", data)
}

const update = async ({ isNew, data }: UpdateInterface) => {
    const str = JSON.stringify(data);
    if (isNew) {
        return await api.post("Mst_AwardType/Create", {
            strJson: str
        })

    }
    else {
        return await api.post("Mst_AwardType/Update", {
            strJson: str
        })
    }
}

const removeMultiple = async (data: any) => {
    const str = JSON.stringify(data);
    return await api.post("Mst_AwardType/DeleteMultiple", {
        strJson: str
    })
}

const getAllActive = async () => {
    return await api.post("Mst_AwardType/GetAllActive", {})
}

export default {
    search,
    exportExcel,
    update,
    removeMultiple,
    getAllActive
}