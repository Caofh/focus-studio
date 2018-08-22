import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PayrollList',
      component: () => import(/* webpackChunkName: "ChannelShow" */ './PayrollList')
    },{
      path: '/payrollDetail',
      name: 'PayrollDetail',
      component: () => import(/* webpackChunkName: "ChannelShow" */ './PayrollDetail')
    },{
      path: '/addProject',
      name: 'AddProject',
      component: () => import(/* webpackChunkName: "ChannelShow" */ './AddProject')
    }
  ]
})
