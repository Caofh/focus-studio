<template>
  <div>
    <Header></Header>
    <div class="base-content abc-flex-x-between">
      <Left></Left>
      <div class="payroll-list">
        <div class="total-part abc-flex-x-between">
          <div class="total abc-flex-x-start">
            <span>总数：</span>
            <span class="count">{{ dataList.length || 0 }}</span>
          </div>

          <a class="add abc-img" href="./payroll.html#/addProject">
            <img src="../../../assets/img/payroll/payrollList/add-icon.png">
          </a>
        </div>

        <div class="data-list">
          <div class="list-header abc-flex-x-center">
            <div>项目名称</div>
            <div style="width: 150px;">参项人员</div>
            <div>总收入</div>
            <div>工时成本</div>
            <div>盈利</div>
            <div>启动时间</div>
            <div>完成时间</div>
            <div class="operate" style="width: 50px;">操作</div>
          </div>

          <div class="list-body">
            <div v-if="!dataList.length" class="loading abc-img"><img src="../../../assets/img/common/loading.gif"></div>

            <div v-for="item in dataList" class="body-item abc-flex-x-center">
              <div>{{ item.project_name || '-' }}</div>
              <div style="width: 150px;">{{ item.personList_new || '-' }}</div>
              <div>{{ item.add_income || '-' }}</div>
              <div>{{ item.cost || '-' }}</div>
              <div>{{ item.gain || '-' }}</div>
              <div>
                <div>{{ item.start_time ? item.start_time.split(' ')[0] : '-' }}</div>
                <!--<div>{{ item.start_time ? item.start_time.split(' ')[1] : '-' }}</div>-->
              </div>
              <div>
                <div>{{ item.end_time ? item.end_time.split(' ')[0] : '-' }}</div>
                <!--<div>{{ item.end_time ? item.end_time.split(' ')[1] : '-' }}</div>-->
              </div>
              <div class="operate" style="width: 50px;">
                <a class="look" href="./payroll.html#/payrollDetail" target="_blank">查看</a>
                <a class="edit" :href="'./payroll.html#/addProject?id=' + item.id">编辑</a>
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
import { getProject } from '@/api/projectList'
import { handlePayrollData } from './computed/payrollList'

import Header from '../../common/header.vue'
import Left from '../../common/left.vue'
import of_dialog from '@/views/components/dialog.vue'

export default {
  name: 'payrollList',
  data () {
    return {
      message: {}, // 弹窗配置数据

      dataList: [], // 项目列表数据
    }
  },
  created () {

  },
  async mounted () {
    try {
      const dataList = await getProject()

      const data = dataList.data || []
      const dataResult = handlePayrollData(data)

      console.log(dataResult)

      this.dataList = dataResult

    } catch (error) {
      this.message = {
        html: error.message || '',
        visiable: true // 是否显示弹窗
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
        opacity: .8;
      }
      .add:hover {
        opacity: 1;
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
        .loading {
          width: 30px;
          height: 30px;
          margin: 30px auto 0;
        }

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
            & > a:hover {
              text-decoration: underline;
              color: #64a4ff;
            }
          }
        }
      }
    }

  }

</style>
