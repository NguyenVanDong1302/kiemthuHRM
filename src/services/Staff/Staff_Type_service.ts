import * as api from '../helper'
import { UpdateInterface } from 'components/interface';

const search = async (data: any) => {
    return await api.post("Mst_StaffType/Search", data)
}

const exportExcel = async (data: {
    OrgID: string,
    KeyWord: string,
    FlagActive: number | string,
}) => {
    return await api.post("Mst_StaffType/Export", data)
}

const update = async ({ isNew, data }: UpdateInterface) => {
    const str = JSON.stringify(data);
    if (isNew) {
        return await api.post("Mst_StaffType/Create", {
            strJson: str
        })

    }
    else {
        return await api.post("Mst_StaffType/Update", {
            strJson: str
        })
    }
}

const removeMultiple = async (data: any) => {
    const str = JSON.stringify(data);
    return await api.post("Mst_StaffType/DeleteMultiple", {
        strJson: str
    })
}

const getAllActive = async () => {
    return await api.post("Mst_StaffType/GetAllActive", {})
}

const saveStaffToStaffType = async (data: any) => {
    const str = JSON.stringify(data);
    return await api.post("Staff_MapStaffType/Save", {
        strJson: str
    })
}

export default {
    search,
    exportExcel,
    update,
    removeMultiple,
    getAllActive,
    saveStaffToStaffType
}