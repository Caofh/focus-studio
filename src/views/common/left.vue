<template>
    <div class="left-container">
        <div class="left-item" v-for="item in listData">
            <div class="title abc-flex-x-start">
                <div class="img abc-img"><img :src="item.icon"></div>
                <div class="title-detail">{{item.title}}</div>
            </div>

            <div class="content">
                <a v-for="itemSon in item.menu" :class="['content-item', {'selected':itemSon.selected}]"
                    :href="itemSon.url">{{itemSon.title}}</a>
            </div>
        </div>
    </div>
</template>

<script>
  import payrollIcon from '../../assets/img/common/left/left-icon-payroll.png' // 薪资的icon

  const url = window.location.href
  const address = url.split('#/')[1] ? url.split('#/')[1] : ''
  const addressResult = address.indexOf('?') ? address.split('?')[0] : address // 当前页面路由

  export default {
    data () {
      return {

        listData: [
          {
            title: '薪资管理',
            icon: payrollIcon,
            menu: [
              {
                title: '项目列表',
                url: './payroll.html',
                selected: (addressResult == '' || addressResult == 'addProject' || addressResult == 'payrollDetail') ?
                  true :
                  false
              }
            ]

          }

        ]

      }
    },
    created () {

    },
    async mounted () {

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    .left-container {
        background: #f0f0f0;
        width: 200px;
        min-height: 800px;

        .left-item {
            .title {
                width: 200px;
                height: 50px;
                background: #d7d7d7;
                padding-left: 15px;
                .img {
                    margin-right: 5px;
                    width: 20px;
                    height: 20px;
                }
                .title-detail {
                    font-size: 20px;
                    color: #333;
                }
            }

            .content {
                padding: 15px 0 15px 20px;
                .content-item {
                    float: left;
                    margin-right: 30px;
                }
                .content-item:hover {
                    color: #f71;
                }
                .content-item.selected {
                    color: #f71;
                }

            }

        }

    }

</style>
