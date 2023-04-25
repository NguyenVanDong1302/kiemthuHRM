import * as api from './../helper'

const getAllActive = async() => {
    return await api.post("Mst_Rank/GetAllActive" , [])
}

export default {
    getAllActive
}