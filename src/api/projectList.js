import { callApi } from './_util'

const axios = callApi()

export function getProject (para = '') {
  return axios.get(`/getProject?${para}`)
}
