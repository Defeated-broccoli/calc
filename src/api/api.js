import axios from 'axios'

const api = axios.create({
  baseURL: 'http://api.nbp.pl/api/exchangerates',
  headers: {},
})

export default api
