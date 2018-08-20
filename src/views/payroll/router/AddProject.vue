<template>
  <AddProject></AddProject>

</template>

<script>
import { mapState } from "vuex";
import AddProject from '../components/addProject.vue'

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
    AddProject
  }

}

</script>

<style lang="scss">

</style>
