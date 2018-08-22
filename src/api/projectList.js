import { callApi } from './_util'

const axios = callApi('http://tpdoc.cn:3001')

export function getProject (para = '') {
  return axios.get(`/getProject?${para}`)
}
