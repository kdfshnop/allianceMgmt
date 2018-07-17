<template>
    <el-container>
        <el-main> 
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="合作资料" name="first">
                    <service-staff-info :mode="mode"></service-staff-info>
                    <partner-infoes :mode="mode"></partner-infoes>
                </el-tab-pane>
                <el-tab-pane label="代理区域" name="second">
                    <agent-basic-info :mode="mode"></agent-basic-info>
                    <agent-area :mode="mode"></agent-area>            
                </el-tab-pane>
                <el-tab-pane label="代理商资料" name="third">
                    <agent-company-info :mode="mode"></agent-company-info>
                    <corporate-info :mode="mode"></corporate-info>
                    <contract-info :mode="mode"></contract-info>
                </el-tab-pane>
                <el-tab-pane label="服务信息" name="fourth">
                    <service-manager :mode="mode"></service-manager>
                    <b-d-manager :mode="mode"></b-d-manager>
                </el-tab-pane>
                <el-tab-pane label="佣金信息" name="fifth">
                    <agent-commission-ratio :mode="mode"></agent-commission-ratio>
                    <agent-commission-account :mode="mode"></agent-commission-account>
                </el-tab-pane>
                <el-tab-pane label="平台服务费" name="sixth">
                    <platform-service-fee :mode="mode"></platform-service-fee>
                    <dividing-info :mode="mode"></dividing-info>
                    <payment-info :mode="mode"></payment-info>
                </el-tab-pane>
            </el-tabs>
            <el-button-group class="gap-2" style="margin-left: auto; margin-right: auto; width: 200px; display: block;">
                <el-button @click="handleCancel" type="primary">放弃审核</el-button><el-button @click="handleCommit" type="primary">提交审核</el-button>
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
import {generateParam} from './_Utils'; 
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
            activeName: "first",
            mode: 'edit',
            initStr: ""          
        };
    } ,
    created() {
        this.getDetail();
    },
    computed: {
        
    },
    methods: {
        getDetail() {
            // 获取指定代理商的详情
            let agentId = this.$route.params.id;
            let agentState = this.$route.query.state || 0;

            this.$store.dispatch({
                type: 'getAgent',
                agentId: agentId,
                agentState: agentState
            });            
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleCancel() {
            this.getDetail();
        },
        handleCommit() {
            this.$prompt('', '请说明本次修改的内容和原因', {
                confirmButtonText: '确定',
                cancelButtonText: '取消', 
                inputType: "textarea",  
                inputPlaceholder: "请说明本次修改的内容和原因", 
                customClass: 'dialog-commit', 
                inputValidator: function(val){
                    if(val.length > 500) {
                        return "最多输入500个字符";
                    }
                    return true;
                }                 
            }).then(({ value }) => { 
                this.$store.commit("AgentBasicInfo/updateRemark", value);
                let param = generateParam(this.$store.state);
                this.$http.post(this.$apiUrl.agent.edit, param).then((data)=>{                    
                    console.log(data);
                }); 
                // TODO: 接口调试              
                // this.$http.post(this.$apiUrl.materialVerify.reject).then(()=>{
                //     this.$message({
                //         type: 'success',
                //         message: '拒绝成功'
                //     });
                // }).catch(()=>{
                //     this.$message({
                //         type: 'error',
                //         message: '拒绝失败'
                //     });
                // });;
            });
        }
    }
}
</script>
<style scoped>
.dialog-commit {
    /* // 提交编辑后会进行审核，审核通过后编辑生效 */
    width: 560px;
}

.dialog-commit .el-message-box__header .el-message-box__title {
    font-size: 16px;
    padding-right: 12px;
}

.dialog-commit textarea {
    height: 200px;
}

.dialog-commit .el-message-box__header .el-message-box__title span:after{
    content: '(提交编辑后会进行审核，审核通过后编辑生效)';
    color: red;
    font-size: 14px;
}
</style>


