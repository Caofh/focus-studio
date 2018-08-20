<template>
  <div>
    <Header></Header>
    <div class="base-content abc-flex-x-between">
      <Left></Left>
      <div class="payroll-list">
        <div class="total-part abc-flex-x-between">
          <div class="total abc-flex-x-start">
            <span>总数：</span>
            <span class="count">4</span>
          </div>

          <a class="add abc-img" href="./payroll.html#/addProject">
            <img src="../../../assets/img/payroll/payrollList/add-icon.png">
          </a>
        </div>

        <div class="data-list">
          <div class="list-header abc-flex-x-center">
            <div>项目名称</div>
            <div style="width: 150px;">参项人员（3）</div>
            <div>总收入</div>
            <div>成本</div>
            <div>盈利</div>
            <div>启动时间</div>
            <div>完成时间</div>
            <div class="operate" style="width: 50px;">操作</div>
          </div>

          <div class="list-body">

            <div class="body-item abc-flex-x-center">
              <div>ABC项目</div>
              <div style="width: 150px;">欣儿、旭光、林笛、方晖</div>
              <div>40000</div>
              <div>30000</div>
              <div>10000</div>
              <div>
                <div>2018-08-10</div>
                <div>15:00:00</div>
              </div>
              <div>
                <div>2018-08-10</div>
                <div>15:00:00</div>
              </div>
              <div class="operate" style="width: 50px;">
                <a class="look" href="./payroll.html#/payrollDetail" target="_blank">查看</a>
                <a class="edit" href="./payroll.html#/addProject">编辑</a>
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
      radio: window.devicePixelRatio,
    }
  },
  created () {

  },
  async mounted () {

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
  .payroll-list {
    width: 980px;
    min-height: 800px;
    .total-part {
      height: 40px;
      .add {
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
    }

    .data-list {
      .list-header {
        background: #E1E1E1;
        height: 40px;
        & > div {
          width: 100px;
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
            width: 100px;
            margin-right: 20px;
          }
          .operate {
            margin-right: 0;
            & > a {
              display: block;
              cursor: pointer;
              color: #2c3e50;
            }
          }
        }
      }
    }

  }

</style>
