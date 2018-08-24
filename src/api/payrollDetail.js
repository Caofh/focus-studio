import { callApi } from './_util'

const axios = callApi()

export function payRollDetail (para = '') {
  return axios.get(`/payRollDetail?${para}`)
}
