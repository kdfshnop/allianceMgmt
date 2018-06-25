<template>
  <el-container>
    <el-main>    
    <el-steps align-center class="step-container" :active="active" finish-status="success">
        <el-step title="合作资料"></el-step>
        <el-step title="代理区域"></el-step>
        <el-step title="代理商资料"></el-step>
        <el-step title="服务信息"></el-step>
        <el-step title="佣金信息"></el-step>
        <el-step title="平台服务费"></el-step>
        <el-step title="提交审核"></el-step>
    </el-steps>      

    <div v-show="active == 0">
        <service-staff-info :item.sync="serviceInfo" :mode='mode'></service-staff-info>    
        <partner-infoes :items.sync="partners" :mode='mode'></partner-infoes>
    </div>
    <div v-show="active == 1">
        <agent-basic-info :item="agentBaseInfo" :mode='mode'></agent-basic-info>
        <agent-area :mode='mode'></agent-area>
    </div>
    <div v-show="active == 2">
        <agent-company-info :item="agentCompanyInfo" :mode='mode'></agent-company-info>
        <corporate-info :item="corporateInfo" :mode='mode'></corporate-info>
        <contract-info :item="conctratInfo" :mode='mode'></contract-info>
    </div>
    <div v-show="active == 3">
        <service-manager :item.sync="serviceManager" :mode='mode'></service-manager>
        <b-d-manager :item.sync="bdManager" :serviceManager="serviceManager" :mode='mode'></b-d-manager>
    </div>
    <div v-show="active == 4">
        <agent-commission-ratio :item.sync="agentCommissionRatio" :mode='mode'></agent-commission-ratio>
        <agent-commission-account :item="agentCommissionAccount" :mode='mode'></agent-commission-account>        
    </div>
    <div v-show="active == 5">
        <platform-service-fee :item="platformServiceFee" :mode='mode'></platform-service-fee>
        <dividing-info :mode='mode'></dividing-info>
        <payment-info :item="paymentInfo" :mode='mode'></payment-info>
    </div>
    <div v-show="active == 6">
        
    </div>
    <div v-show="active == 7">
        
    </div>
    <el-button-group class="gap-2" style="margin-left: auto; margin-right: auto; width: 200px; display: block;">
        <el-button v-if="active>0" @click="prev" type="primary">上一步</el-button><el-button type="primary" v-if="active<stepNumber" @click="next">下一步</el-button>
    </el-button-group>    
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
export default {
  name: 'CreateAgent',
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
  data () {
    return {      
      active: 1,// 控制步骤
      stepNumber: 7,// 总步数
      mode: "edit",
      serviceInfo: {
          bdInfo: {
              
          },
          cxInfo: {
              
          },
          directorInfo: {
              
          }
      },
      partners: [],
      agentBaseInfo: {
          type: "",
          parent: "",
          startDate: "",
          endDate: ""
      },
      agentArea: {

      },
      agentCompanyInfo: {

      },
      corporateInfo: {

      },
      conctratInfo: {

      },
      serviceManager:{

      },
      bdManager: {

      },
      agentCommissionRatio: {

      },
      agentCommissionAccount: {

      },
      platformServiceFee: {
          serviceFee: {},
          dividingInfo: []
      },
      paymentInfo: {

      },
      selectedOptions: [1, 1, 1, 1]
    }
  },
  methods: {
      next() {
          if(this.active == this.stepNumber) {
              return;
          }

          this.active++;
      },

      prev() {
          if(this.active == 0) {
              return;
          }

          this.active--;
      },

      
  },
  created() {
    //   this.$http.get(this.$apiUrl.test, function(res){
    //       console.log(res.data);
    //   });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-button-group {
    text-align: center;    
}

.el-button-group .el-button {
    float: none;
}
</style>
