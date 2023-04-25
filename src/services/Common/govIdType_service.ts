import * as api from '../helper'

const getAllActive = async () => {
    return await api.post("Mst_GovIDType/GetAllActive", {})
}

export default {
    getAllActive,
}