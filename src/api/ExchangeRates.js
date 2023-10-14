import api from './api'

export const fetchExchangeData = async (code) => {
  const response = await api.get(`/rates/a/${code}/2023-10-12/`)
  return response.data
}
