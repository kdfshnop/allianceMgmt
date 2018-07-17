import Vue from 'vue';
import Router from 'vue-router';
import CreateAgent from '@/components/agent/CreateAgent';
import PlatformServiceFeeVerify from '@/components/verify/PlatformServiceFeeVerify';
import MaterialVerify from '@/components/verify/MaterialVerify';
import CompanyManagement from '@/components/company/CompanyManagement';
import StoreManagement from '@/components/store/StoreManagement';
import TeamEnd from '@/components/teamEnd/TeamEnd';
import MaterialAuditResult from '@/components/firstJoinAudit/materialAudit/MaterialAuditResult';
import ServiceFeeAuditResult from '@/components/firstJoinAudit/serviceFeeAudit/ServiceFeeAuditResult';
import ProfessionAuditResult from '@/components/professionAudit/ProfessionAuditResult';
import ProfessionEndResult from '@/components/professionEnd/ProfessionEndResult';
import ProfessionAuditVerify from '@/components/professionAudit/ProfessionAuditVerify';
import ProfessionEndVerify from '@/components/professionEnd/ProfessionEndVerify';
import AgentManagement from '@/components/agentManagement/AgentManagement';
import Record from '@/components/record/Record';
import AgentDetail from '@/components/agent/AgentDetail';
import EditAgent from '@/components/agent/EditAgent';
import FollowUp from '@/components/followUp/FollowUp';
import AddFollowUp from '@/components/followUp/AddFollowUp';
import FollowUpDetaile from '@/components/followUp/FollowUpDetail';
import Privileger  from '@/plugins/privileger';
import { getEnv } from '../utils/env';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/agent/createAgent',
      name: 'CreateAgent',
      component: CreateAgent
    },{
      path: '/platformservicefeeverify/:id',
      name: 'PlatformServiceFeeVerify',
      component: PlatformServiceFeeVerify
    },{
      path: "/materialverify/:id",
      name: "MaterialVerify",
      component: MaterialVerify
    },
    {
      path: '/companyManagement',
      name: 'CompanyManagement',
      component: CompanyManagement
    },
    {
      path: '/storeManagement',
      name: 'StoreManagement',
      component: StoreManagement
    },
    {
      path:'/teamEnd',
      name:'TeamEnd',
      component:TeamEnd
    },
    {
      path:'/materialAuditResult',
      name:'MaterialAuditResult',
      component:MaterialAuditResult
    },
    {
      path:'/serviceFeeAuditResult',
      name:'ServiceFeeAuditResult',
      component:ServiceFeeAuditResult
    },
    {
      path:'/professionAuditResult',
      name:'ProfessionAuditResult',
      component:ProfessionAuditResult
    },
    {
      path:'/professionEndResult',
      name:'ProfessionEndResult',
      component:ProfessionEndResult
    },
    {
      path:'/professionAuditVerify',
      name:'ProfessionAuditVerify',
      component:ProfessionAuditVerify
    },
    {
      path:'/professionEndVerify',
      name:'ProfessionEndVerify',
      component:ProfessionEndVerify
    },
    {
      path:'/agentManagement',
      name:'AgentManagement',
      component:AgentManagement
    },
    {
      path:'/record',
      name:'Record',
      component:Record
    },{
      path: '/agent/agentDetail/:id',
      name: 'AgentDetail',
      component: AgentDetail
    },{
      path: '/agent/editAgent/:id',
      name: 'EditAgent',
      component: EditAgent
    },{
      path:'/followUp',
      name:'FollowUp',
      component:FollowUp
    },{
      path:'/addFollowUp',
      name:'AddFollowUp',
      component:AddFollowUp
    },{
      path:'/followUpDetail',
      name:'FollowUpDetail',
      component:FollowUpDetaile
    }
  ]
});

let env = getEnv();
// 调用权限控制接口，判断当前用户是否可以访问该页面
router.beforeEach((to, from, next) => {
  // TODO: 这里需要根据当前环境来获取前缀
  // let url = Vue.apiUrl.pageUrl[env] + '/index.html/#' + to.path;// "https://yun2.test.wkzf/amgmt/index.html/#" + to.path;
  // // TODO: 发送请求，判断是否可以访问，暂定方案如果不能访问直接登出，
  // Vue.http.post(Vue.apiUrl.common.privileges, {
  //   // params: {
  //     urls: [url]
  //   // }
  // }).then((data)=>{
  //   //Privileger.setPrivileges(data.data);

  //   let canAccess = data.data.hasAuth;  
  //   if(canAccess){
  //     next();    
  //   }else{
  //     parent != window && parent.location.reload();
  //   } 
  // }); 

  next();
});
export default router;
