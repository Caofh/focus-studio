import { callApi } from './_util'

const axios = callApi()

// 增加项目数据接口
export function addProject (data) {
  return axios.post('/addProject', data)
}

// 计算预算成本接口
export function computedGain (data) {
  return axios.post('/computedGain', data)
}
