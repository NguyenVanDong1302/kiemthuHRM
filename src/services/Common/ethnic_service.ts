import * as api from './../helper'

const getAllActive = async () => {
    return await api.post("Mst_EthnicCategory/GetAllActive", {})
}

export default {
    getAllActive,
}