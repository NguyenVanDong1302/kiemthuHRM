import * as api from '../helper'

const getAllActive = async() => {
    return await api.post("Mst_Ward/GetAllActive" , {})
}

const getDetail = async({ProvinceCode , DistrictCode} : {
    ProvinceCode:string , DistrictCode:string
} ) => {
    return await api.post("Mst_Ward/GetWardDetail" , {
        ProvinceCode,DistrictCode
    })
}

export default {
    getAllActive,
    getDetail
}