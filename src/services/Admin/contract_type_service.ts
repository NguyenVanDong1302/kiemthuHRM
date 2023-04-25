import { SearchPropsDefault } from 'components/interface';
import * as api from '../helper'

export interface deleteDepartmentInterface {
    DepartmentCode: string;
    OrgID: string;
}

const search = async (data: SearchPropsDefault) => {
    console.log("data : ", data)
    return await api.post("Mst_ContractType/Search", data)
}

const update = async ({ isNew, data }: { isNew: boolean, data: any }) => {
    const str = JSON.stringify(data);
    if (isNew) {
        return await api.post("Mst_ContractType/Create", {
            strJson: str
        })
    }
    else {
        return await api.post("Mst_ContractType/Update", {
            strJson: str
        })

    }
}

const exportExcel = async () => {
    return await api.post("Mst_ContractType/Export", {})
}

const exportTemplate = async () => {
    return await api.post("Mst_ContractType/Export", {})
}


const deleteMultiple = async (data: deleteDepartmentInterface[]) => {
    const str = JSON.stringify(data);
    return await api.post("Mst_ContractType/DeleteMultiple", {
        strJson: str
    })
}

const getAllActive = async () => {
    return await api.post("Mst_ContractType/GetAllActive", {})
}

const remove = async (data: {
    ContractTypeCode: string;
    OrgID: string;
}) => {
    return await api.post("Mst_ContractType/Delete", data)
}

export default {
    search,
    update,
    exportExcel,
    exportTemplate,
    deleteMultiple,
    getAllActive,
    remove
}