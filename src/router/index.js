import Vue from 'vue'
import Router from 'vue-router'
import CreateAgent from '@/components/Agent/CreateAgent'
import CompanyManagement from '@/components/CompanyManagement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CreateAgent',
      component: CreateAgent
    },{
      path:'/CompanyManagement',
      name:'CompanyManagement',
      component:CompanyManagement
    }
  ]
})
