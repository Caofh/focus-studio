<template>
  <payrollList></payrollList>

</template>

<script>
  import { mapState } from "vuex"
  import payrollList from '../components/payrollList.vue'

  export default {
    name: 'Home',
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

      console.log(this.test)

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
