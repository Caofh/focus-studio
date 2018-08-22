/**
 * Created by caofanghui on 17/5/25.
 */

/*
  将url的传参参数形式的字符串转化为json对象格式

  let param = 'school=gongda&hobby=skating&number=3'

  let jsonObj = getUrl(param)

  console.log(jsonObj)

  输出：{
          school: 'gongda',
          hobby: 'skaing',
          number: '3'
        }
*/
function getUrl(str) {
  var theRequest = {};
  if (str) {
    var strs = str.indexOf('&') ? str.split("&") : str;
    for(let i = 0; i < strs.length; i ++) {
      theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

export {
  getUrl
}