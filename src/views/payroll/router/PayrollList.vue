<template>
  <payrollList></payrollList>

</template>

<script>
  import { mapState } from "vuex"
  import payrollList from '../components/payrollList.vue'

  export default {
    name: 'PayrollList',
    data(){
      return {

      }
    },
    computed: {
      ...mapState([
        'test' // 当前选中的tab
      ])
    },
    created () {

    },
    watch: {

    },
    mounted () {

    },
    methods: {

    },
    components: {
      payrollList
    }

  }

</script>

<style lang="scss">

</style>
