<template>
  <div>
    <Header></Header>
    <div class="base-content abc-flex-x-between">
      <Left></Left>
      <div class="payroll-Detail">
        <div class="title">{{ dataList.project_name || '' }}总收入：{{ dataList.allPay && dataList.incomePay ? dataList.allPay + dataList.incomePay : 0 }}<span> 元</span></div>
        <div class="base-info">

          <div>
            <div class="title">一、{{ dataList.project_name || '' }}基本薪资部分</div>
            <div class="data-detail">
              <div class="list-header abc-flex-x-start">
                <div style="width: 150px;">参项人员（{{ dataList.baseData ? dataList.baseData.length : 0 }}）</div>
                <div>创始人基础（元）</div>
                <div>销售（元）</div>
                <div>工时（h）</div>
                <div>工资（元）</div>
                <div>合计</div>
              </div>

              <div class="list-body">

                <div v-for="item in dataList.baseData" class="body-item abc-flex-x-start">
                  <div style="width: 150px;">{{ item.name || '-' }}</div>
                  <div>{{ item.founder_money || '-' }}</div>
                  <div>{{ item.sale || '-' }}</div>
                  <div>{{ item.hours || '-' }}h</div>
                  <div>{{ item.hours_sale || '-' }}</div>
                  <div>{{ item.all || '-' }}</div>
                </div>

              </div>

            </div>
          </div>

          <div>
            <div class="title bonus abc-flex-x-start">
              <div>二、{{ dataList.project_name || '' }}分红部分</div>
              <div @mouseenter="enter" @mouseleave="leave"
                   class="abc-img"><img src="../../../assets/img/payroll/payrollDetail/question-icon.png"></div>

              <!--悬浮弹窗部分-->
              <div v-if="dialogMark" class="payroll-answer">
                <div class="abc-img"><img src="../../../assets/img/payroll/payrollDetail/up.png"></div>
                <div class="base-body">
                  <div class="abc-flex-x-start">
                    <div>{{ dataList.project_name || '' }}共盈利：{{ dataList.incomePay || '' }}元；</div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <div>参与成员：<span v-for="(item, index) in dataList.bonusData">{{ item.name || '-' }} {{index == (dataList.bonusData.length - 1) ? '' : '、'}} </span></div>
                  </div>

                  <div>
                    <div>欣儿（10%）：{{ dataList.incomePay ? Math.round(parseFloat(dataList.incomePay * 10 / 100)) : '-' }}元</div>
                  </div>

                  <div class="down abc-flex-x-start">
                    <div class="abc-img"><img src="../../../assets/img/payroll/payrollDetail/direction_icon.png"></div>
                    <div>余：{{ dataList.incomePay ? dataList.incomePay - (Math.round(parseFloat(dataList.incomePay * 10 / 100))) : '-' }}元</div>
                  </div>

                  <div>
                    <div>工作室（50%）：{{ dataList.incomePay ? Math.round(parseFloat(dataList.incomePay * 50 / 100)) : '-' }}元</div>
                  </div>

                  <div class="down abc-flex-x-start">
                    <div class="abc-img"><img src="../../../assets/img/payroll/payrollDetail/direction_icon.png"></div>
                    <div>余：{{ dataList.incomePay ? dataList.incomePay - (Math.round(parseFloat(dataList.incomePay * 10 / 100))) - (Math.round(parseFloat(dataList.incomePay * 50 / 100))) : '-' }}元</div>
                  </div>

                  <div>分红部分：（{{ dataList.incomePay ? dataList.incomePay - (Math.round(parseFloat(dataList.incomePay * 10 / 100))) - (Math.round(parseFloat(dataList.incomePay * 50 / 100))) : '-' }}）</div>

                  <div class="data-detail">
                    <div class="list-header abc-flex-x-start">
                      <div style="width: 150px;">参项人员（{{ dataList.bonusData ? dataList.bonusData.length: 0 }}）</div>
                      <div>分红金额（元）</div>
                    </div>

                    <div class="list-body">

                      <div v-for="item in dataList.bonusData" class="body-item abc-flex-x-start">
                        <div style="width: 150px;">{{ item.name || '-' }}</div>
                        <div>{{ item.bonus_money || '-' }}</div>
                      </div>

                    </div>
                  </div>

                  <div>
                    由于个人分红按照小数位舍去原则，将剩余金额并入工作室资金中，本次分红剩余<span class="big-word">{{ dataList.studio_money - Math.round(parseFloat(dataList.incomePay * 50 / 100)) }}</span> 元<br/>
                    并入工作室总收入。<br/>
                    故工作室总收入为<span class="big-word">{{ dataList.studio_money }}</span>元
                  </div>

                </div>
              </div>

            </div>
            <div class="data-detail">
              <div class="list-header abc-flex-x-start">
                <div style="width: 150px;">参项人员（{{ dataList.bonusData ? dataList.bonusData.length: 0 }}）</div>
                <div>创始人基础（元）</div>
                <div>分红金额（元）</div>
                <div>合计（元）</div>
              </div>

              <div class="list-body">

                <div v-for="item in dataList.bonusData" class="body-item abc-flex-x-start">
                  <div style="width: 150px;">{{ item.name || '-' }}</div>
                  <div>{{ item.founder_money || '-' }}</div>
                  <div>{{ item.bonus_money || '-' }}</div>
                  <div>{{ item.all || '-' }}</div>
                </div>

              </div>

            </div>
          </div>

          <div>
            <div class="title">三、{{ dataList.project_name || '' }}工作室盈利：</div>
            <div class="abc-flex-x-start">
              <span class="count">{{ dataList.studio_money ? dataList.studio_money : '' }}</span>
              <span class="unit">元</span>
            </div>
          </div>


          <!--各成员最终所得-->
          <div>
            <div class="title bonus abc-flex-x-start">
              <div>各参项人员最终所得</div>
            </div>
            <div class="data-detail">
              <div class="list-header abc-flex-x-start">
                <div style="width: 150px;">参项人员（{{ dataList.bonusData ? dataList.bonusData.length: 0 }}）</div>
                <div>金额（元）</div>
              </div>

              <div class="list-body">

                <div v-for="item in dataList.bonusData" class="body-item abc-flex-x-start">
                  <div style="width: 150px;">{{ item.name || '-' }}</div>
                  <div>{{ item.payAndBonus || '-' }}</div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </div>

    <of_dialog :message="message"></of_dialog>
  </div>
</template>

<script>
import $ from 'n-zepto'
import { payRollDetail } from '@/api/payrollDetail'
import { getUrl } from '@/assets/js/focus-vendor/getObj'

import Header from '../../common/header.vue'
import Left from '../../common/left.vue'
import of_dialog from '@/views/components/dialog.vue'

export default {
  name: 'payrollList',
  data () {
    return {
      dialogMark: false, // 悬浮弹窗显示标识
      message: {}, // 弹窗配置数据


      dataList: '', // 请求接口获取的薪酬详情页数据

    }
  },
  created () {

  },
  async mounted () {
    const url = window.location.href
    const windowPara = url.indexOf('?') && url.split('?')[1] ? url.split('?')[1] : ''
    const id = getUrl(windowPara).id ? getUrl(windowPara).id : '' // get参数的id值

    try {
      const para = 'id='+id+''
      const dataList = await payRollDetail(para)
//      console.log(dataList)

      this.dataList = dataList.data || ''

    } catch (error) {
      this.message = {
        html: error.message || '',
        visiable: true // 是否显示弹窗
      }

    }





  },
  methods: {
    enter () {
      this.dialogMark = true
    },
    leave () {
      this.dialogMark = false
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

  .base-content {
    margin: 0 auto;
    width: 1200px;
    min-height: 1500px;
    align-items: flex-start;
  }
  .payroll-Detail {
    min-height: 1000px;
    & > .title {
      text-align: left;
      font-size: 30px;
      margin-bottom: 20px;
    }

    .base-info {
      width: 980px;
      min-height: 800px;

      & > div {
        margin-bottom: 50px;

        .title {
          text-align: left;
          font-size: 20px;
          margin-bottom: 10px;
        }
        .bonus {
          position: relative;
          width: 980px;
          height: 30px;

          .abc-img {
            width: 20px;
            height: 20px;
            margin-left: 10px;
          }
          .payroll-answer {
            position: absolute;
            top: 40px;
            left: 100px;
            max-width: 790px;
            height: auto;
            /*border-radius: 5px;*/
            border: 1px solid #979797;
            background: #fff;
            padding: 20px;
            z-index: 300;
            font-size: 16px;
             & > .abc-img {
              position: absolute;
              width: 19px;
              height: 14px;
              top: -14px;
              left: 100px;
            }
            .base-body {
              & > div {
                margin-bottom: 20px;

                .big-word {
                  font-size: 24px;
                  color: #f71;
                }
              }
              & > .down {
                padding-left: 40px;

                .abc-img {
                  width: 75px;
                  height: 75px;
                }

              }
              & > .data-detail {
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
                    padding: 10px 0 10px 10px;
                    border-bottom: 1px solid #CACACA;
                    & > div {
                      width: 170px;
                      margin-right: 20px;
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

            }
          }
        }
        .count {
          font-size: 36px;
          color: #f71;
          margin-right: 10px;
        }
        .unit {
          font-size: 20px;
        }

        .data-detail {
          .list-header {
            background: #E1E1E1;
            height: 40px;
            & > div {
              width: 130px;
              margin-right: 20px;
            }
            .operate {
              margin-right: 0;
            }
          }

          .list-body {
            .body-item {
              padding: 10px 0;
              border-bottom: 1px solid #CACACA;
              & > div {
                width: 130px;
                margin-right: 20px;
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
      }

    }

  }

</style>
