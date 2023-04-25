import * as api from './../helper'

const getListOrg = async () => {
    return await api.post("Mst_Org/GetAllActive", {})
}

export default {
    getListOrg
}