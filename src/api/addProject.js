import { callApi } from './_util'

const axios = callApi()

export function addProject (data) {
  return axios.post('/addProject', data)
}
