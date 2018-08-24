import { callApi } from './_util'

const axios = callApi('http://tpdoc.cn:3001')

export function payRollDetail (para = '') {
  return axios.get(`/payRollDetail?${para}`)
}
