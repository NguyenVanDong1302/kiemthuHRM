import * as api from '../helper'

const getAllActive = async() => {
    return await api.post("Mst_District/GetAllActive" , {})
}

const getDetail = async(ProvinceCode: string) => {
    return await api.post("Mst_District/GetByProvinceCode" , {
        ProvinceCode
    })
}

export default {
    getAllActive,
    getDetail
}