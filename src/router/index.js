import Vue from 'vue'
import Router from 'vue-router'
import AgentManagement from '@/components/AgentManagement'
import CompanyManagement from '@/components/CompanyManagement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AgentManagement',
      component: AgentManagement
    },{
      path:'/CompanyManagement',
      name:'CompanyManagement',
      component:CompanyManagement
    }
  ]
})
