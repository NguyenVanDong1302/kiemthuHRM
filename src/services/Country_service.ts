import * as api from './helper'

const getListCountry = async () => {
    return await api.post("Mst_Country/GetAllActive", {})
}

export default {
    getListCountry
}