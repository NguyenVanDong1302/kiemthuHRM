import * as api from './../helper'
import { SearchPropsDefault, UpdateInterface } from 'components/interface';

export interface Props extends SearchPropsDefault {
    StaffType?: string;
    DepartmentCode?: string;
    NetWorkId?: string;
}

const getListStaffByDepartmentCode = async (DepartmentCode: string) => {
    return await api.post('Staff_MapDepartment/GetByDepartmentCode', {
        DepartmentCode
    })
}

const getAllActive = async () => {
    return await api.post("Staff_Staff/GetAllActive", {})
}

const saveStaffToDepartments = async (data: any) => {
    const str = JSON.stringify(data);
    console.log("str ", str)

    return await api.post("Staff_MapDepartment/Save", {
        strJson: str,
    })
}

const search = async (data: Props) => {
    return await api.post("Staff_Staff/Search", data)
}

const update = async ({ isNew, data }: UpdateInterface) => {
    const str = JSON.stringify(data);
    if (isNew) {
        return await api.post("Staff_Staff/Create", {
            strJson: str
        })
    }
    else {
        return await api.post("Staff_Staff/Update", {
            strJson: str
        })
    }
}

const remove = async (data: any) => {
    return await api.post("Staff_Staff/Delete", data)
}

const exportExcel = async () => {
    return await api.post("Staff_Staff/Export", {})
}

const exportTemplate = async () => {
    return await api.post("Staff_Staff/ExportTemplate", {})
}

const getByStaffCode = async (StaffCode: string) => {
    return await api.post("Staff_Staff/Get", StaffCode)
}

export default {
    getListStaffByDepartmentCode, getAllActive, saveStaffToDepartments, search, update,
    remove,
    exportExcel,
    exportTemplate,
    getByStaffCode
}