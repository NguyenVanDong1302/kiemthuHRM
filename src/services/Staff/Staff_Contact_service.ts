import { UpdateInterface } from 'components/interface'
import * as api from './../helper'

const getByStaffCode = async(StaffCode:string) => {
    return await api.post("Staff_ContactInfo/GetByStaffCode", {StaffCode})
}

const update = async({ isNew , data } : UpdateInterface) => {
    const str = JSON.stringify(data);
    console.log("str ",str)
    if(isNew) {
        return await api.post("Staff_ContactInfo/Create" , {
            strJson: str
        })
    }
    else {
        return await api.post("Staff_ContactInfo/Update" , {
            strJson: str
        })
    }
}

const updateContractByCode = async({ isNew , data } : UpdateInterface) => {
    const str = JSON.stringify(data);
    console.log("str ",str)
    if(isNew) {
        return await api.post("Staff_LaborContract/Create" , {
            strJson: str
        })
    }
    else {
        return await api.post("Staff_LaborContract/Update" , {
            strJson: str
        })
    }
}

const removeByCode = async(data:any) => {
    const str = JSON.stringify(data);
    return await api.post("Staff_LaborContract/DeleteMultiple" , {
        strJson: str
    })
}

const remove = async(
    {StaffCode , Idx} : {StaffCode:string , Idx:number}
) => {
    return await api.post("Staff_ContactInfo/Delete" , {
        StaffCode,
        Idx
    })
}

export default {
    getByStaffCode,
    update,
    remove,
    updateContractByCode,
    removeByCode
}