import * as api from '../helper'

const getAllActive = async() => {
    return await api.post("Mst_Province/GetAllActive" , {})
}

export default {
    getAllActive
}