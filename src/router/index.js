import Vue from 'vue';
import Router from 'vue-router';
import CreateAgent from '@/components/agent/CreateAgent';
import PlatformServiceFeeVerify from '@/components/verify/PlatformServiceFeeVerify';
import MaterialVerify from '@/components/verify/MaterialVerify';
import CompanyManagement from '@/components/company/CompanyManagement';
import StoreManagement from '@/components/store/StoreManagement';
import EndTeam from '@/components/endTeam/EndTeam';
import MaterialAuditResult from '@/components/firstJoinAudit/materialAudit/MaterialAuditResult';
import ServiceFeeAuditResult from '@/components/firstJoinAudit/serviceFeeAudit/ServiceFeeAuditResult';
import ProfessionAuditResult from '@/components/professionAudit/ProfessionAuditResult';
import ProfessionEndResult from '@/components/professionEnd/ProfessionEndResult';
import ProfessionAuditVerify from '@/components/professionAudit/ProfessionAuditVerify';
import ProfessionEndVerify from '@/components/professionEnd/ProfessionEndVerify';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'CreateAgent',
      component: CreateAgent
    },{
      path: '/platformservicefeeverify',
      name: 'PlatformServiceFeeVerify',
      component: PlatformServiceFeeVerify
    },{
      path: "/materialverify",
      name: "MaterialVerify",
      component: MaterialVerify
    },
    {
      path: '/CompanyManagement',
      name: 'CompanyManagement',
      component: CompanyManagement
    },
    {
      path: '/StoreManagement',
      name: 'StoreManagement',
      component: StoreManagement
    },
    {
      path:'/EndTeam',
      name:'EndTeam',
      component:EndTeam
    },
    {
      path:'/MaterialAuditResult',
      name:'MaterialAuditResult',
      component:MaterialAuditResult
    },
    {
      path:'/ServiceFeeAuditResult',
      name:'ServiceFeeAuditResult',
      component:ServiceFeeAuditResult
    },
    {
      path:'/ProfessionAuditResult',
      name:'ProfessionAuditResult',
      component:ProfessionAuditResult
    },
    {
      path:'/ProfessionEndResult',
      name:'ProfessionEndResult',
      component:ProfessionEndResult
    },
    {
      path:'/ProfessionAuditVerify',
      name:'ProfessionAuditVerify',
      component:ProfessionAuditVerify
    },
    {
      path:'/ProfessionEndVerify',
      name:'ProfessionEndVerify',
      component:ProfessionEndVerify
    }
  ]
});

// 调用权限控制接口，判断当前用户是否可以访问该页面
router.beforeEach((to, from, next) => {
  // TODO: 这里需要根据当前环境来获取前缀
  let url = "https://yun2.test.wkzf/alliance/index.html#" + to.path;
  // TODO: 发送请求，判断是否可以访问，暂定方案如果不能访问直接登出
  let canAccess = true;  
  if(canAccess){
    next();    
  }else{
    parent != window && parent.location.reload();
  }  
});
export default router;
