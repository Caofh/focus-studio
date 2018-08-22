import { callApi } from './_util'

const axios = callApi('http://tpdoc.cn:3001')

export function addProject (data) {
  return axios.post('/addProject', data)
}
