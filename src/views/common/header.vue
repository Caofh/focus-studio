<template>
    <div class="header-container">
        <div class="header abc-flex-x-start">
            <div class="logo">focus studio管理系统</div>
        </div>
    </div>
</template>

<script>
//  import $ from 'n-zepto'
//  import { getList } from '@/api/test'

  export default {
    data () {
      return {

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

    .header-container {
        width: 100%;
        height: 70px;
        background: #000;
        margin-bottom: 20px;
        .header {
            width: 1200px;
            height: 70px;
            margin: 0 auto;
            .logo {
                color: #fff;
                font-size: 20px;
            }
        }
    }

</style>
