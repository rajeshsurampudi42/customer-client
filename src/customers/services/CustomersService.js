import axios from "axios"

const baseUrl = 'http://localhost:15301/customers/fetch'
export const fetchCustomers = (queryString) => axios.get(baseUrl+queryString)

export default {
    fetchCustomers
}