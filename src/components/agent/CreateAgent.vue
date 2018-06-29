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
        <service-staff-info :mode='mode'></service-staff-info>    
        <partner-infoes :mode='mode'></partner-infoes>
    </div>
    <div v-show="active == 1">
        <agent-basic-info :mode='mode'></agent-basic-info>
        <agent-area :mode='mode'></agent-area>
    </div>
    <div v-show="active == 2">
        <agent-company-info :mode='mode'></agent-company-info>
        <corporate-info :mode='mode'></corporate-info>
        <contract-info :mode='mode'></contract-info>
    </div>
    <div v-show="active == 3">
        <service-manager :mode='mode'></service-manager>
        <b-d-manager :mode='mode'></b-d-manager>
    </div>
    <div v-show="active == 4">
        <agent-commission-ratio :mode='mode'></agent-commission-ratio>
        <agent-commission-account :mode='mode'></agent-commission-account>        
    </div>
    <div v-show="active == 5">
        <platform-service-fee :mode='mode'></platform-service-fee>
        <dividing-info :mode='mode'></dividing-info>
        <payment-info :mode='mode'></payment-info>
    </div>
    <div v-show="active == 6" style="text-align: center; margin-top: 200px">
        <p>提交成功了，请等待审核结果</p>
        <p>如若着急，请联系相关学长学姐^_^</p>
        <el-button @click="handleClose" type="success" style="margin-top: 50px; width: 160px;">确定</el-button>
    </div>
    <div v-show="active == 7">
        
    </div>
    <el-button-group class="gap-2" style="margin-left: auto; margin-right: auto; width: 200px; display: block;">
        <el-button v-if="active>0 && active < stepNumber" @click="prev" type="primary">上一步</el-button><el-button type="primary" v-if="active<stepNumber" @click="next">下一步</el-button><el-button type="primary" v-if="active==5" @click="submit">提&nbsp;&nbsp;交</el-button>
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

import { generateParam } from "./_Utils";
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
        regionData: [{
            label: "北京",
            value: "北京",
            children: [{
                label: "北京市",
                value: "北京市"
            },{
                label: "北京周边",
                value: "北京周边"
            }]
        }], 
        arr: [],
        initId: "33",   
      active: 1,// 控制步骤
      stepNumber: 5,// 总步数
      mode: "create",      
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
    submit() {    
        let param = generateParam(this.$store.state);
        this.$confirm('一旦提交，在审核结果之前将不可再修改，你还要确定要提交吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$http.put(this.$apiUrl.agent.create, param).then((data)=>{
                // TODO: 成功则跳转到下一页 this.active++;
                this.active++;
                console.log(data);
            });
        }).catch(() => {
                     
        });        
    },
    handleClose() {
        alert("关闭");
    }      
  },
  created() {
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
