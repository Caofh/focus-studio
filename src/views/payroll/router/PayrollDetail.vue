<template>
  <payrollDetail></payrollDetail>

</template>

<script>
import { mapState } from "vuex";
import payrollDetail from '../components/payrollDetail.vue'

export default {
  name: 'PayrollDetail',
  data(){
    return {
      limitMark: true, // 滚动加载禁止重复加载标识

    }
  },
  computed: {
    ...mapState([
      'test' // 当前选中的tab
    ])
  },
  created(){

    console.log(this.test)

  },
  watch: {

  },
  mounted () {

  },
  methods:{

  },
  components: {
    payrollDetail
  }

}

</script>

<style lang="scss">

</style>
