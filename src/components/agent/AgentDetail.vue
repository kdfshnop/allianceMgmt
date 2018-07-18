<template>
      <el-container>
    <el-main>    
    <bread-crumb :items="breadCrumb"></bread-crumb>             
    <el-tabs v-model="activeName" @tab-click="handleClick" class="gap-2">
        <el-tab-pane label="合作资料" name="first">
            <service-staff-info></service-staff-info>
            <partner-infoes></partner-infoes>
        </el-tab-pane>
        <el-tab-pane label="代理区域" name="second">
            <agent-basic-info></agent-basic-info>
            <agent-area></agent-area>            
        </el-tab-pane>
        <el-tab-pane label="代理商资料" name="third">
            <agent-company-info></agent-company-info>
            <corporate-info></corporate-info>
            <contract-info></contract-info>
        </el-tab-pane>
        <el-tab-pane label="服务信息" name="fourth">
            <service-manager></service-manager>
            <b-d-manager></b-d-manager>
        </el-tab-pane>
        <el-tab-pane label="佣金信息" name="fifth">
            <agent-commission-ratio></agent-commission-ratio>
            <agent-commission-account></agent-commission-account>
        </el-tab-pane>
        <el-tab-pane label="平台服务费" name="sixth">
            <platform-service-fee></platform-service-fee>
            <dividing-info></dividing-info>            
            <payment-info></payment-info>
        </el-tab-pane>
        <el-tab-pane label="日志" name="seventh">
          <record :agencyId="agentId"></record>  
        </el-tab-pane>
    </el-tabs>

    <el-button style="position: fixed; top: 20px; right: 50px" @click="back">返回</el-button>
    </el-main>
      </el-container>
</template>
<script>
import CollapsePanel from '@/components/common/CollapsePanel';
import ServiceStaffInfo from './_ServiceStaffInfo';
import PartnerInfoes from './_PartnerInfoes';
import AgentBasicInfo from './_AgentBasicInfo';
import AgentArea from './_AgentArea';
import AgentCompanyInfo from './_AgentCompanyInfo';
import CorporateInfo from './_CorporateInfo';
import ContractInfo from './_ContractInfo';
import ServiceManager from './_ServiceManager';
import BDManager from './_BDManager';
import AgentCommissionRatio from './_AgentCommissionRatio';
import AgentCommissionAccount from './_AgentCommissionAccount';
import PlatformServiceFee from './_PlatformServiceFee';
import DividingInfo from './_DividingInfo';
import PaymentInfo from './_PaymentInfo';
import Region from '@/components/common/Region';
import {initStore} from './_Utils'; 
import Record from '@/components/record/Record';
import BreadCrumb from '@/components/common/BreadCrumb';

export default { 
    name: "",
     components: {
      CollapsePanel, 
      ServiceStaffInfo, 
      PartnerInfoes, 
      AgentBasicInfo, 
      AgentArea, 
      AgentCompanyInfo, 
      CorporateInfo, 
      ContractInfo, 
      ServiceManager, 
      BDManager, 
      AgentCommissionRatio, 
      AgentCommissionAccount, 
      PlatformServiceFee,
      PaymentInfo,
      DividingInfo,
      Region,
      Record,
      BreadCrumb
    },
    data() {
        return {
            activeName: "first",
            agentId: this.$route.params.id,
            breadCrumb: [{text:'加盟管理'},{text: "代理商"},{text: "详情"}],
        };
    } ,
    created() {
        // 获取指定代理商的详情
        // let agentId = this.$route.params.id;
        let agentId = this.agentId;
        let agentState = this.$route.query.state || 0;        
        this.$store.dispatch({
            type: 'getAgent',
            agentId: agentId,
            agentState: agentState
        });        
    },
    methods: {
         handleClick(tab, event) {
            console.log(tab, event);
        },
        back() {
            history.back();
        }
    }
}
</script>
<style>

</style>


