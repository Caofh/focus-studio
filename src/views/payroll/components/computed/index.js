
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




export {
  personMapList




}