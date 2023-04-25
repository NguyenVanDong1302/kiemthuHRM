import * as api from '../helper'

const getAllActive = async () => {
    return await api.post("Mst_ReligionCategory/GetAllActive", {})
}

export default {
    getAllActive,
}