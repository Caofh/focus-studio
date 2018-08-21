/**
 * Created by caofanghui on 17/6/23.
 * @preserve jQuery DateTimePicker plugin v2.1.9
 * @homepage http://xdsoft.net/jqplugins/datetimepicker/
 * (c) 2014, Chupurnov Valeriy.
/*

 var startTime = '2017-9-10'
 var endTime = '2017-9-15'

 调用方法：
 参数1：input对象名称
 参数2：datetimepicker的参数属性，可自定义
date('[node-type="startTime"]', {
  onShow: function () {
    console.log(111)
  },
  minDate: startTime, // 可选范围开始时间
  maxDate: endTime // 可选范围结束时间
})
 */
//日期控件方法（传入对象名）

 import '../vendor/datetimepicker/jquery.datetimepicker.css'

// 基础配置参数
var config_default = {
  //language: 'pt-BR',
  lang: 'ch',
  format: 'Y-m-d',
  //format: 'Y-m-d H:i:00',
  //formatTime:'H:i:00',
  //formatDate:'Y-m-d',
  //step: 60,
  timepicker: false,
  //scrollMonth: false,
  //scrollTime: false,
  scrollInput: false,
  validateOnBlur: false,
  //maxDate:'+1970/01/02', //tomorrow is maximum date calendar
  onChangeDateTime: function(dp, $input) {
    //base.checkForm()
  }
}

export default function date (nodeName, option) {
  var nodeName = nodeName || ''
  var option = option || {}

  var config = $.extend({}, config_default, option)

  import('../vendor/datetimepicker/jquery.datetimepicker.js').then(function () {
    $(nodeName).datetimepicker(config)
  })


}
