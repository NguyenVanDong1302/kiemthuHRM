import * as api from './../helper'

const getAllActive = async () => {
    return await api.post("Mst_Gender/GetAllActive", {})
}

export default {
    getAllActive,
}