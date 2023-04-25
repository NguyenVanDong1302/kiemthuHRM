import { SearchPropsDefault, UpdateInterface } from 'components/interface';
import * as api from '../helper'

export interface StaffLabourContractInterface extends SearchPropsDefault {
    ContactType?: string;
    DepartmentCode?: string;
    EffectiveDateFrom?: string;
    EffectiveDateTo?: string;
    ExpirationDateFrom?: string;
    ExpirationDateTo?: string;
    SignDateFrom?: string;
    SignDateTo?: string;
}

const search = async (data: StaffLabourContractInterface) => {
    return await api.post("Staff_LaborContract/Search", data)
}

const exportExcel = async (data: StaffLabourContractInterface) => {
    return await api.post("Staff_LaborContract/Export", data)
}

const getByStaffCode = async (StaffCode: any) => {
    return await api.post("Staff_LaborContract/GetByStaffCode", {
        StaffCode
    })
}

const update = async ({ isNew, data }: UpdateInterface) => {
    const str = JSON.stringify(data);
    if (isNew) {
        return await api.post("Staff_LaborContract/Create", {
            strJson: str
        })
    }
    console.log("update ", str)
    return await api.post("Staff_LaborContract/Update", {
        strJson: str
    })
}

const removeMultiple = async (data: any[]) => {
    const str = JSON.stringify(data);
    console.log("str ", str)
    return await api.post("Staff_LaborContract/DeleteMultiple", { strJson: str })
}

const getAllActiveContractType = async () => {
    return await api.post("Mst_ContractType/GetAllActive", {})
}

const remove = async ({ StaffCode, ContractCodeSys }: any) => {
    return await api.post('Staff_LaborContract/Delete', {
        StaffCode,
        ContractCodeSys

    })
}
const create = async (data: any) => {
    const str = JSON.stringify(data);
    return await api.post('Staff_LaborContract/Create', {
        strJson: str
    })
}

export default {
    search,
    exportExcel,
    getByStaffCode,
    update,
    removeMultiple,
    getAllActiveContractType,
    remove,
    create
}