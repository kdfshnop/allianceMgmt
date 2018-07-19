<template>
  <el-container>
    <el-main>  
    <bread-crumb :items="breadCrumb"></bread-crumb>       
    <el-steps align-center class="step-container gap-2" :active="active" finish-status="success">
        <el-step title="合作资料"></el-step>
        <el-step title="代理区域"></el-step>
        <el-step title="代理商资料"></el-step>
        <el-step title="服务信息"></el-step>
        <el-step title="佣金信息"></el-step>
        <el-step title="平台服务费"></el-step>
        <el-step title="提交审核"></el-step>
    </el-steps>      

    <div v-show="active == 0">
        <service-staff-info :mode='mode' ref="serviceStaffInfo"></service-staff-info>    
        <partner-infoes :mode='mode' ref="partnerInfoes"></partner-infoes>
    </div>
    <div v-show="active == 1">
        <agent-basic-info :mode='mode' ref="agentBasicInfo"></agent-basic-info>
        <agent-area :mode='mode' ref="agentArea"></agent-area>
    </div>
    <div v-show="active == 2">
        <agent-company-info :mode='mode' ref="agentCompanyInfo"></agent-company-info>
        <corporate-info :mode='mode' ref="corporateInfo"></corporate-info>
        <contract-info :mode='mode' ref="contractInfo"></contract-info>
    </div>
    <div v-show="active == 3">
        <service-manager :mode='mode' ref="serviceManager"></service-manager>
        <b-d-manager :mode='mode' ref="bdManager"></b-d-manager>
    </div>
    <div v-show="active == 4">
        <agent-commission-ratio :mode='mode' ref="agentCommissionRatio"></agent-commission-ratio>
        <agent-commission-account :mode='mode' ref="agentCommissionAccount"></agent-commission-account>        
    </div>
    <div v-show="active == 5">
        <platform-service-fee :mode='mode' ref="platformServiceFee"></platform-service-fee>
        <dividing-info :mode='mode' ref="dividingInfo"></dividing-info>
        <payment-info :mode='mode' ref="paymentInfo"></payment-info>
    </div>
    <div v-show="active == 6" style="text-align: center; margin-top: 200px">
        <p>提交成功了，请等待审核结果</p>
        <p>如若着急，请联系相关学长学姐^_^</p>
        <el-button @click="handleClose" type="success" style="margin-top: 50px; width: 160px;">确定</el-button>
    </div>
    <div v-show="active == 7">
        
    </div>
    <el-button-group class="gap-2" style="margin-left: auto; margin-right: auto; width: 200px; display: block;">
        <el-button v-if="active>0 && active < stepNumber" @click="prev" type="primary">上一步</el-button><el-button type="primary" v-if="active<stepNumber-1" @click="next">下一步</el-button><el-button type="primary" v-if="active==stepNumber - 1" @click="submit">提&nbsp;&nbsp;交</el-button>
    </el-button-group>   

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
import BreadCrumb from '@/components/common/BreadCrumb';

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
      Region,
      BreadCrumb
    },
  data () {
    return {          
        breadCrumb: [{text:'加盟管理'},{text: "代理商"},{text: "添加代理商"}],
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
      active: 0,// 控制步骤
      stepNumber: 6,// 总步数
      mode: "create",      
    }
  },
  methods: {
      next() {
          if(this.active == this.stepNumber) {
              return;
          }

          let forms = [];
          // 验证当前页的表单是否通过验证
          switch(this.active) {
              case 0:
                //forms.push('serviceStaffInfo');
                forms.push('partnerInfoes');
              break;
              case 1:
                //forms.push('agentBasicInfo');
                //forms.push('agentArea');
              break;
              case 2: 
                forms.push('agentCompanyInfo');
                forms.push('corporateInfo');
                //forms.push('contractInfo');                
              break;
              case 3:
                forms.push('serviceManager');
                forms.push('bdManager');
                break;
              case 4:
                //forms.push('agentCommissionRatio');
                //forms.push('agentCommissionAccount');
                break;
              case 5:
                // forms.push('platformServiceFee');
                // forms.push('dividingInfo');
                // forms.push('paymentInfo');
                break;                
          }

          let r = 0;
          for(let i = 0; i < forms.length; i++) {
              this.$refs[forms[i]].validate((valid)=> {
                  if(valid) {
                      r++;
                  }
              });
          }

          if(r == forms.length) {
            this.active++;
          }          
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
                // 成功则跳转到下一页 this.active++;
                this.active++;                
            });
        }).catch(() => {
                     
        });        
    },
    handleClose() {
        // alert("关闭");
        history.back();
    },
    back() {
        history.back();
    }     
  },
  created() { 
      // 清空store
      this.$store.dispatch("clear");     
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
