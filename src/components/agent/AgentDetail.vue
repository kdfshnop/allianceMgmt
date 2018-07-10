<template>
      <el-container>
    <el-main> 
    <el-tabs v-model="activeName" @tab-click="handleClick">
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
    </el-tabs>
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
      Region
    },
    data() {
        return {
            activeName: "first"
        };
    } ,
    created() {
        // 获取指定代理商的详情
        let agentId = this.$route.params.id;
        let agentState = this.$route.params.state || 0;
        // this.$http.get(this.$apiUrl.agent.detail,{
        //     params: {
        //         agencyId: agentId,
        //         agencyState: agentState
        //     }
        // }).then((data)=>{
        //     // initStore(this.$store, data.data);
        //     console.log(data);
        // });
        this.$store.dispatch({
            type: 'getAgent',
            agentId: agentId,
            agentState: agentState
        });
    },
    methods: {
         handleClick(tab, event) {
            console.log(tab, event);
        }
    }
}
</script>
<style>

</style>


