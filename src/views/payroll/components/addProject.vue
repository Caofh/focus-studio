<template>
  <div>
    <Header></Header>
    <div class="base-content abc-flex-x-between">
      <Left></Left>
      <div class="add-project">
        <div class="title">
          {{ this.editMark == 1 ? '新增项目' : '编辑项目' }}
        </div>

        <div class="content">
          <div class="abc-flex-x-start">
            <div class="content-title">项目名称：</div>
            <div><input v-model="projectName" class="project-name" type="text"></div>
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
                <div>销售人员</div>
              </div>

              <div class="list-body">

                <div v-for="(item, index) in personList_new" class="body-item abc-flex-x-start">
                  <div style="width: 150px;">{{ item.name || '-' }}</div>
                  <div><input v-model="item.hours" @input="changeHours(item, index)"
                              type="text" onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )'></div>
                  <div><input type="radio" name="saleMan" v-model="saleMan" :value="item.id"></div>
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
            <div><input v-model="addIncome" @input="addIncomeInput" class="income" placeholder="请输入项目总收入"></div>
            <div v-if="addIncome" class="computed-gain">
                本项目工作室可盈利
                <span class="abc-f71">{{ this.studioGain && this.studioGain.studio_money ? this.studioGain.studio_money : '' }}</span>
                元
            </div>

          </div>

          <div class="start-time abc-flex-x-start">
            <div class="content-title">启动时间：</div>
            <div class="abc-flex-x-start">
              <div class="abc-img"><img src="../../../assets/img/payroll/addProject/date.png"></div>
              <div class="start-time-input">
                <input @keyup="startTimeKeyup" :value="startTime_str"
                       type="text" class="startTime" placeholder="项目启动时间">
              </div>

            </div>
          </div>

          <div class="end-time abc-flex-x-start">
            <div class="content-title">完成时间：</div>
            <div class="abc-flex-x-start">
              <div class="abc-img"><img src="../../../assets/img/payroll/addProject/date.png"></div>
              <div class="end-time-input">
                <input @keyup="endTimeKeyup" :value="endTime_str"
                       type="text" class="endTime" placeholder="项目完成时间" />
              </div>

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
import { personMapList, handleData } from './computed/index'
import date_plugin from '@/assets/js/focus-vendor/date' // 日期控件
import { incomeMap } from '@/assets/js/static-data/income'
import { getUrl } from '@/assets/js/focus-vendor/getObj'

import Header from '../../common/header.vue'
import Left from '../../common/left.vue'
import of_dialog from '@/views/components/dialog.vue'

import { addProject, computedGain } from '@/api/addProject'
import { getProject } from '@/api/projectList'

export default {
  name: 'addProject',
  data () {
    return {
      personList_result: [], // 包含成员工时信息的最终数据(用户暂存工时数据，无实际意义)
      incomeAll: 0, // 工资成本,
      message: {}, // 弹窗配置数据
      studioGain: '', // 工作室可盈利金额

      personList: ['0'], // 最终成员id数据
      startTime: '', // 项目启动时间时间戳
      endTime: '', // 项目结束时间时间戳
      addIncome: '', // 项目总收入
      complete: '1', // 项目是否完成：1：完成；2：未完成
      projectName: '', // 项目名称
      saleMan: '', // 销售人员的id
      id: '', // 当editMark为2时才存在，意义为：当前项目的id

      confirmMark: true, // 确定按钮的防重复点击标识

      editMark: '1' // 判断是否是编辑回来的标识（1：是新增；2：编辑）
    }
  },
  computed: {
    // 监听选中的成员列边，重组工时列表数据(与personList联动，改变personList_new和incomeAll字段)
    personList_new () {
      let arr = [] // 工时部分数组
      let incomeAll = 0 // 工资成本
      this.personList.map((item, index) => {

        // 从最终数据中取出hours数据***
        const hours = this.personList_result.length && this.personList_result[index] ? this.personList_result[index].hours : ''

        const obj = {
          id: item,
          name: personMapList(item),
          hours: hours,
          perHoursMoney: incomeMap[item] || ''
        }

        arr.push(obj)

        // 更新工资成本
        const income_hours = hours || 0
        const unit = incomeMap[item] || 0
        incomeAll += unit * income_hours

      })

      this.incomeAll = incomeAll

      return arr
    },

    startTime_str () {
      return this.startTime ? moment(parseInt(this.startTime)).format('YYYY-MM-DD') : ''
    },
    endTime_str () {
      return this.endTime ? moment(parseInt(this.endTime)).format('YYYY-MM-DD') : ''
    }

  },
  created () {

  },
  watch: {
    studioGain (val, oldVal) {
        console.log(val)


    }

  },
  mounted () {
    this.datePlugin() // 日期控件调用

    // 编辑项目时执行
    this.edit()

  },
  methods: {
    // 计算本项目工作室可盈利金额
    async addIncomeInput () {
      const addIncome = this.addIncome || ''
      const personList = this.personList_new || ''
      const saleMan = this.saleMan || ''

      const para = {
        addIncome: addIncome,
        saleMan: saleMan,
        personList: personList
      }
      const dataList = await computedGain(para)
      const data = dataList.data || ''
//      console.log(data)

      this.studioGain = data

    },

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

    startTimeKeyup () {
      this.startTime = ''
      $('.startTime').val('')

    },
    endTimeKeyup () {
      this.endTime = ''
      $('.endTime').val('')

    },

    // 确定按钮方法
    async confirm () {
      let that = this

      // 防止重复点击
      if (!this.confirmMark) return
      this.confirmMark = false

      const para = {
        projectName: this.projectName, // 项目名称
        personList: this.personList_new,  // 最终成员id数据
        startTime: this.startTime,    // 项目启动时间时间戳
        endTime: this.endTime,        // 项目结束时间时间戳
        addIncome: this.addIncome,    // 项目总收入
        complete: this.complete,      // 项目是否完成：1：完成；2：未完成
        saleMan: this.saleMan,      // 项目销售人员
        edit: this.editMark == 1 ? 1 : 2 // 本次操作是增加还是编辑（1：新增；2：编辑）
      }

      // 是编辑页面才传id
      if (this.editMark == 2) {
        para.id = this.id
      }

      // 验证数据的完整性
//      console.log(para)
      const validate = this.validate(para)
      if (!validate) {
        this.message = {
          html: '亲，请将信息填写完整哦😯',
          visiable: true // 是否显示弹窗
        }

        this.confirmMark = true // 释放确定按钮的禁止重复点击状态

        return false
      }

      try {
        const dataList = await addProject(para)
//        console.log(dataList)

        this.message = {
          html: '操作成功',
          btnType: '3',
          callback () {
            setTimeout(() => {
              window.location.href = './payroll.html'
            }, 1500)
          },
          visiable: true // 是否显示弹窗
        }

      } catch (error) {
        this.message = {
          html: error.message || '',
          callback () {
            that.confirmMark = true // 释放确定按钮的禁止重复点击状态
          },
          visiable: true // 是否显示弹窗
        }

      }

    },

    // 数据验证
    validate (data) {
      let mark = true

      // 任意数据为空时,置为false
      for (let key in data) {
        if (!data[key]) {
          mark = false
          break
        }
      }

      // 各个成员内容必须全填
      const personList = data.personList
      personList.map((item) => {
        if (!item.id || !item.name || !item.hours) {
          mark = false
        }
      })

      return mark
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

    },


    // 判断是编辑项目时执行此方法
    async edit () {
      const url = window.location.href
      const windowPara = url.indexOf('?') && url.split('?')[1] ? url.split('?')[1] : ''
      const id = getUrl(windowPara).id ? getUrl(windowPara).id : '' // get参数的id值

      // 不存在id则不执行
      if (!id) return

      this.editMark = '2' // 更新编辑标识

      try {
        const para = 'id='+id+''
        const dataList = await getProject(para)

        const data = dataList.data || ''
        const dataResult = handleData(data) // 处理返回的项目详情数据

        // 将返回的详情数据填充
        this.projectName = dataResult.projectName // 项目名称
        this.personList_result = dataResult.personList
        this.personList = dataResult.personArr // 最终成员id数据
        this.startTime = dataResult.startTime // 项目启动时间时间戳
        this.endTime = dataResult.endTime // 项目结束时间时间戳
        this.addIncome = dataResult.addIncome // 项目总收入
        this.complete = dataResult.complete // 项目是否完成：1：完成；2：未完成
        this.saleMan = dataResult.saleMan // 项目是否完成：1：完成；2：未完成
        this.id = dataResult.id || '' // 当edit=2时才有值(当前项目的id)

        this.addIncomeInput() // 计算本项目工作室可盈利金额

      } catch (error) {
        this.message = {
          html: error.message || '',
          visiable: true // 是否显示弹窗
        }

      }

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

        .computed-gain {
            margin-left: 20px;
            .abc-f71 {
                margin: 0 5px;
            }
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

        .income, .project-name {
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
