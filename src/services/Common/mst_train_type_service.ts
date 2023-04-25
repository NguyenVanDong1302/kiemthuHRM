import * as api from './../helper'

const getAllActive = async() => {
    return await api.post("Mst_TrainType/GetAllActive" , {})
}

export default {
    getAllActive,
}