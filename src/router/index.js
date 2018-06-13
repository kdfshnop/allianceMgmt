import Vue from 'vue'
import Router from 'vue-router'
import AgentManagement from '@/components/AgentManagement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AgentManagement',
      component: AgentManagement
    }
  ]
})
