<template>
  <div>
    <Header></Header>
    <div class="base-content abc-flex-x-between">
      <Left></Left>
      <div class="payroll-Detail">
        <div class="title">ABC项目总收入：10000</div>
        <div class="base-info">

          <div>
            <div class="title">一、ABC项目基本薪资部分</div>
            <div class="data-detail">
              <div class="list-header abc-flex-x-start">
                <div style="width: 150px;">参项人员（3）</div>
                <div>创始人基础（元）</div>
                <div>销售（元）</div>
                <div>工时（h）</div>
                <div>工资（100/小时）</div>
                <div>合计</div>
              </div>

              <div class="list-body">

                <div class="body-item abc-flex-x-start">
                  <div style="width: 150px;">欣儿</div>
                  <div>1000</div>
                  <div>1000</div>
                  <div>10h</div>
                  <div>1000</div>
                  <div>3000</div>
                </div>

              </div>

            </div>
          </div>

          <div>
            <div class="title bonus abc-flex-x-start">
              <div>二、ABC项目分红部分</div>
              <div @mouseenter="enter" @mouseleave="leave"
                   class="abc-img"><img src="../../../assets/img/payroll/payrollDetail/question-icon.png"></div>

              <!--悬浮弹窗部分-->
              <div v-if="dialogMark" class="payroll-answer">
                <div class="abc-img"><img src="../../../assets/img/payroll/payrollDetail/up.png"></div>
                <div class="base-body">
                  <div class="abc-flex-x-start">
                    <div>ABC项目共盈利：6000元；</div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <div>参与成员：欣儿、林笛</div>
                  </div>

                  <div>
                    <div>欣儿（10%）：600元</div>
                  </div>

                  <div class="down abc-flex-x-start">
                    <div class="abc-img"><img src="../../../assets/img/payroll/payrollDetail/direction_icon.png"></div>
                    <div>余：5400元</div>
                  </div>

                  <div>
                    <div>工作室（50%）：3000元</div>
                  </div>

                  <div class="down abc-flex-x-start">
                    <div class="abc-img"><img src="../../../assets/img/payroll/payrollDetail/direction_icon.png"></div>
                    <div>余：2400元</div>
                  </div>

                  <div>分红部分：（2400）</div>

                  <div class="data-detail">
                    <div class="list-header abc-flex-x-start">
                      <div style="width: 150px;">参项人员（3）</div>
                      <div>分红金额（元）</div>
                    </div>

                    <div class="list-body">

                      <div class="body-item abc-flex-x-start">
                        <div style="width: 150px;">欣儿</div>
                        <div>1200</div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>

            </div>
            <div class="data-detail">
              <div class="list-header abc-flex-x-start">
                <div style="width: 150px;">参项人员（3）</div>
                <div>创始人基础（元）</div>
                <div>分红金额（元）</div>
                <div>合计（元）</div>
              </div>

              <div class="list-body">

                <div class="body-item abc-flex-x-start">
                  <div style="width: 150px;">欣儿</div>
                  <div>600</div>
                  <div>1200</div>
                  <div>1800</div>
                </div>

              </div>

            </div>
          </div>

          <div>
            <div class="title">三、ABC项目工作室盈利：</div>
            <div class="abc-flex-x-start">
              <span class="count">3000</span>
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
                <div style="width: 150px;">参项人员（3）</div>
                <div>金额（元）</div>
              </div>

              <div class="list-body">

                <div class="body-item abc-flex-x-start">
                  <div style="width: 150px;">欣儿</div>
                  <div>1200</div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import $ from 'n-zepto'
import { getList } from '@/api/test'

import Header from '../../common/header.vue'
import Left from '../../common/left.vue'

export default {
  name: 'payrollList',
  data () {
    return {
      dialogMark: false // 悬浮弹窗显示标识
    }
  },
  created () {

  },
  async mounted () {

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
    Left
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .base-content {
    margin: 0 auto;
    width: 1200px;
    min-height: 800px;
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
            width: 790px;
            height: auto;
            border-radius: 5px;
            border: 1px solid #979797;
            background: #fff;
            padding: 40px 0 40px 50px;
            z-index: 300;
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
