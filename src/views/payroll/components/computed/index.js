
// 创始人id映射表
function personMapList (id) {
  const idNew = String(id)
  let personName = ''

  switch (idNew) {
    case ('1') : personName = '欣儿'; break;
    case ('2') : personName = '林笛'; break;
    case ('3') : personName = '方晖'; break;
    case ('4') : personName = '李琦'; break;
    case ('5') : personName = '旭光'; break;
    case ('6') : personName = '叶凡'; break;
    case ('7') : personName = '功勋'; break;
  }

  return personName
  
}

// 处理返回的项目详情数据
function handleData (arr = '') {
  const data = arr ? arr[0] : ''

  // 处理person_list属性成使用数据结构
  let arrNew = []
  const person_list = data.person_list ? JSON.parse(data.person_list) : []
  person_list.map((item) => {
    arrNew.push(item.id)
  })

  const dataInfo = {
    projectName: data.project_name || '', // 项目名称
    personArr: arrNew,
    personList: data.person_list ? JSON.parse(data.person_list) : [],  // 最终成员id数据
    startTime: data.start_time || '',    // 项目启动时间时间戳
    endTime: data.end_time || '',        // 项目结束时间时间戳
    addIncome: data.add_income || '',    // 项目总收入
    complete: data.complete || '',             // 项目是否完成：1：完成；2：未完成
    saleMan: data.sale_man || '',             // 项目是否完成：1：完成；2：未完成
    id: data.id || '' // 项目的标识
  }

  return dataInfo
}




export {
  personMapList,
  handleData

}