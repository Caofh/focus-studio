
import moment from 'moment'

// 获得参项成员的名字
function getNameArr (personList) {

  let nameArr = []
  let cost = 0
  personList.map((item) => {
    nameArr.push(item.name || '')

    cost += parseFloat(item.hours) * parseFloat(item.perHoursMoney)
  })
  const nameStr = nameArr.join('、')

  return {
    nameStr,
    cost
  }
}




// 处理项目列表页数据
function handlePayrollData (arr) {
  let arr_new = arr.slice()

  arr_new.map((item) => {
    const personList = item.person_list ? JSON.parse(item.person_list) : ''
    const info = getNameArr(personList) // 获得名字
    item.personList_new = info.nameStr || ''
    item.cost = info.cost || ''
    item.gain = parseFloat(item.add_income) - parseFloat(item.cost)
    item.start_time = moment(parseInt(item.start_time)).format('YYYY-MM-DD HH:mm:ss')
    item.end_time = moment(parseInt(item.end_time)).format('YY-MM-DD HH:mm:ss')

  })

  return arr_new

}




export {
  handlePayrollData




}