<template>
  <div>
    <Header></Header>
    <div class="base-content abc-flex-x-between">
      <Left></Left>
      <div class="add-project">
        <div class="title">
          新增项目
        </div>

        <div class="content">
          <div class="abc-flex-x-start">
            <div class="content-title">项目名称：</div>
            <div>ABC项目</div>
          </div>

          <!--参项人员-->
          <div class="abc-flex-x-start">
            <div class="content-title">参项人员：</div>
            <div class="person-info-par">
              <div class="person-info">
                <select v-for="(item, index) in personList" v-model="personList[index]">
                  <option value="0">请选择</option>
                  <option value="1">欣儿</option>
                  <option value="2">林笛</option>
                  <option value="3">方晖</option>
                  <option value="4">李琦</option>
                  <option value="5">旭光</option>
                  <option value="6">叶凡</option>
                  <option value="7">功勋</option>
                </select>

              </div>

              <div @click="addPerson" class="add-person abc-img"><img src="../../../assets/img/payroll/addProject/add_icon.png"></div>
              <div v-if="personList.length > 1" @click="removePerson"
                   class="remove-person abc-img"><img src="../../../assets/img/payroll/addProject/remove_icon.png"></div>

            </div>
          </div>

          <!--工时计算-->
          <div class="time-all">
            <div class="data-detail">
              <div class="list-header abc-flex-x-start">
                <div style="width: 150px;">人员</div>
                <div>工时</div>
              </div>

              <div class="list-body">

                <div v-for="(item, index) in personList_new" class="body-item abc-flex-x-start">
                  <div style="width: 150px;">{{ item.name || '-' }}</div>
                  <div><input v-model="item.hours" @input="changeHours(item, index)"
                              type="text" onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )'></div>
                </div>

              </div>

            </div>
          </div>

          <div class="abc-flex-x-start">
            <div class="content-title">工资成本：</div>
            <div>{{ incomeAll || '0' }}</div>
          </div>

          <div class="abc-flex-x-start">
            <div class="content-title">总收入：</div>
            <div><input v-model="addIncome" class="income" placeholder="请输入项目总收入"></div>
          </div>

          <div class="start-time abc-flex-x-start">
            <div class="content-title">启动时间：</div>
            <div class="abc-flex-x-start">
              <div class="abc-img"><img src="../../../assets/img/payroll/addProject/date.png"></div>
              <div class="start-time-input"><input type="text" class="startTime" placeholder="项目启动时间"></div>
            </div>
          </div>

          <div class="end-time abc-flex-x-start">
            <div class="content-title">完成时间：</div>
            <div class="abc-flex-x-start">
              <div class="abc-img"><img src="../../../assets/img/payroll/addProject/date.png"></div>
              <div class="end-time-input"><input type="text" class="endTime" placeholder="项目完成时间" /></div>
            </div>
          </div>

          <div class="status abc-flex-x-start">
            <div class="content-title">是否完成：</div>
            <div class="complete">
              <select v-model="complete">
                <option value="1">已完成</option>
                <option value="2">未完成</option>
              </select>
            </div>
          </div>

        </div>

        <div class="btn-group abc-flex-x-start">
          <div @click="confirm" class="abc-btn">确定</div>
          <a class="abc-btn" href="./payroll.html">取消</a>
        </div>

      </div>
    </div>


    <of_dialog :message="message"></of_dialog>
  </div>
</template>

<script>
import moment from 'moment'
//import { getList } from '@/api/test'

import { personMapList } from './computed/index'
import date_plugin from '@/assets/js/focus-vendor/date.js' // 日期控件
import { incomeMap } from '@/assets/js/static-data/income'

import Header from '../../common/header.vue'
import Left from '../../common/left.vue'
import of_dialog from '@/views/components/dialog.vue'

export default {
  name: 'addProject',
  data () {
    return {
      personList_result: [], // 包含成员工时信息的最终数据(用户暂存工时数据，无实际意义)
      incomeAll: 0, // 工资成本,
      // 弹窗配置数据
      message: {},

      personList: ['0'], // 最终成员id数据
      startTime: '', // 项目启动时间时间戳
      endTime: '', // 项目结束时间时间戳
      addIncome: '', // 项目总收入
      complete: '1', // 项目是否完成：1：完成；2：未完成

    }
  },
  computed: {
    // 监听选中的成员列边，重组工时列表数据
    personList_new () {
      let arr = [] // 工时部分数组
      let incomeAll = 0 // 工资成本
      this.personList.map((item, index) => {

        // 从最终数据中取出hours数据***
        const hours = this.personList_result.length && this.personList_result[index] ? this.personList_result[index].hours : ''

        const obj = {
          id: item,
          name: personMapList(item),
          hours: hours
        }

        arr.push(obj)

        // 更新工资成本
        const income_hours = hours || 0
        const unit = incomeMap[item] || 0
        incomeAll += unit * income_hours

      })

      this.incomeAll = incomeAll

      return arr
    }



  },
  created () {
    console.log(incomeMap)

  },
  watch: {
    personList (val, valOld) {
      console.log(val)
    },
    personList_new (val, valOld) {
      console.log(val)
    },
    startTime (val, valOld) {
      console.log(val)
    },
    endTime (val, valOld) {
      console.log(val)
    },



  },
  async mounted () {
    this.datePlugin() // 日期控件调用

  },
  methods: {
    // 新增项目成员方法
    addPerson () {
      // 新增选中项目成员
      const newList = this.personList.slice()
      newList.push('0')
      this.personList = newList

      // 新增含有工时的数据最后一项
      const newList_result = this.personList_result.slice()
      newList_result.push({id: '', name: '', hours: ''}) // 没有用处，只是为了占位置.
      this.personList_result = newList_result
    },

    // 删除成员
    removePerson () {
      // 删除选中的项目成员
      const newList = this.personList.slice()
      newList.pop()
      this.personList = newList

      // 删除含有工时的数据最后一项
      const newList_result = this.personList_result.slice()
      newList_result.pop()
      this.personList_result = newList_result
    },

    // 改变个人工时方法
    changeHours (item, index) {
//      console.log(item)
//      console.log(index)

      const personListNew = this.personList_new.slice()
      this.personList_result = personListNew
    },

    // 确定按钮方法
    confirm () {
      const para = {
        personList: this.personList,  // 最终成员id数据
        startTime: this.startTime,    // 项目启动时间时间戳
        endTime: this.endTime,        // 项目结束时间时间戳
        addIncome: this.addIncome,    // 项目总收入
        complete: this.complete,      // 项目是否完成：1：完成；2：未完成
      }

      console.log(para)
      this.message = {
        header: '我是标题',
        html: '我是内容',
        footer: '我是底部',
        btnType: 2,
        buttons: {
          confirm: function () {
            console.log('success')
          },
//          cancel: function () {
//            console.log('cancel')
//          }
        },
        name: 'vue',
        visiable: true // 是否显示弹窗
      }

    },

    // 日期控件调用
    datePlugin () {
      const that = this

      date_plugin('.startTime', {
        stopShow: false, // 修改源码新增参数，和onShow有关，为true时，禁止掉源码内部相关操作（详见源码990行，只此一处）
        onShow: function () {},
        onChangeDateTime: function (dp, $input) {
//        console.log($input, dp)
          // 项目启动时间时间戳
          const startStamp = moment(dp).format('x')
          that.startTime = startStamp
        },
        onChangeMonth: function (dp, $input) {},
//      minDate: startTime,
//      maxDate: endTime,
        scrollMonth: false,
        // scrollTime: false,
        // scrollInput: false
      })

      date_plugin('.endTime', {
        stopShow: false, // 修改源码新增参数，和onShow有关，为true时，禁止掉源码内部相关操作（详见源码990行，只此一处）
        onShow: function () {},
        onChangeDateTime: function (dp, $input) {
//        console.log($input, dp)
          // 项目启动时间时间戳
          const endStamp = moment(dp).format('x')
          that.endTime = endStamp
        },
        onChangeMonth: function (dp, $input) {},
//      minDate: startTime,
//      maxDate: endTime,
        scrollMonth: false,
        // scrollTime: false,
        // scrollInput: false
      })
    }

  },
  components: {
    Header,
    Left,
    of_dialog
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../../assets/js/vendor/datetimepicker/jquery.datetimepicker.css';

  .base-content {
    margin: 0 auto;
    width: 1200px;
    min-height: 800px;
    align-items: flex-start;
  }
  .add-project {
    width: 980px;
    min-height: 1000px;

    .title {
      height: 50px;
      width: 980px;
      border-bottom: 1px solid #979797;
      line-height: 50px;
      font-size: 20px;
      text-align: left;
    }

    .content {
      & > div {
        margin-top: 12px;
        text-align: left;

        .content-title {
          width: 150px;
        }

        .person-info-par {
          width: 800px;
          overflow: hidden;

          .person-info {
            float: left;
            overflow: hidden;
            select {
              float: left;
              margin-right: 10px;
              width: 100px;
              height: 30px;
            }
          }

          .add-person {
            float: left;
            cursor: pointer;
            width: 20px;
            height: 20px;
            margin-top: 5px;
            margin-right: 5px;
          }
          .remove-person {
            float: left;
            cursor: pointer;
            margin-top: 6px;
            width: 18px;
            height: 18px;
          }

        }

        .data-detail {
          margin-left: 150px;
          .list-header {
            background: #E1E1E1;
            width: 400px;
            height: 40px;
            padding: 10px 0 10px 10px;
            & > div {
              width: 170px;
              margin-right: 20px;
            }
            .operate {
              margin-right: 0;
            }
          }

          .list-body {
            width: 400px;
            .body-item {
              width: 400px;
              height: 40px;
              padding: 10px 0 10px 10px;
              border-bottom: 1px solid #CACACA;
              & > div {
                width: 170px;
                margin-right: 20px;

                input {
                  width: 80px;
                  height: 30px;
                  background: #f0f0f0;
                  color: #000;
                  padding: 0 5px;
                }
              }
              .operate {
                margin-right: 0;
                & > div {
                  cursor: pointer;
                }
              }
            }
          }
        }

        .start-time-input input, .end-time-input input {
          width: 120px;
          height: 30px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-left: 10px;
          padding: 0 5px;
        }

        .complete {
          select {
            width: 100px;
            height: 30px;
          }
        }

        .income {
          width: 120px;
          height: 30px;
          background: #f0f0f0;
          color: #000;
          padding: 0 5px;
        }

      }

    }

    .btn-group {
      margin-top: 100px;
      .abc-btn {
        margin-right: 20px;
        color: #fff;
      }
    }




  }

</style>
