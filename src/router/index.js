import Vue from 'vue'
import Router from 'vue-router'
import CreateAgent from '@/components/Agent/CreateAgent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CreateAgent',
      component: CreateAgent
    }
  ]
})
