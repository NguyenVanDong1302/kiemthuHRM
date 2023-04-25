import { SearchPropsDefault } from 'components/interface';
import * as api from './../helper'

export interface deleteDepartmentInterface {
    DepartmentCode: string;
    OrgID: string;
}

const search = async (data: SearchPropsDefault) => {
    return await api.post("Mst_Department/Search", data)
}

const update = async ({ isNew, data }: { isNew: boolean, data: any }) => {
    const str = JSON.stringify(data);
    if (isNew) {
        return await api.post("Mst_Department/Create", {
            strJson: str
        })
    }
    else {
        return await api.post("Mst_Department/Update", {
            strJson: str
        })
    }
}

const exportExcel = async () => {
    return await api.post("Mst_Department/Export", {})
}

const exportTemplate = async () => {
    return await api.post("Mst_Department/ExportTemplate", {})
}

const deleteMultiple = async (data: deleteDepartmentInterface[]) => {
    const str = JSON.stringify(data);
    return await api.post("Mst_Department/DeleteMultiple", {
        strJson: str
    })
}

const deleteSingle = async (data: deleteDepartmentInterface) => {
    return await api.post("Mst_Department/Delete", data)
}

const getAllActive = async () => {
    return await api.post("Mst_Department/GetAllActive", {})
}

export default {
    search,
    update,
    exportExcel,
    exportTemplate,
    deleteMultiple,
    deleteSingle,
    getAllActive
}