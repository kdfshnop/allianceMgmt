<template>
    <el-container>
        <el-main> 
            <el-alert
                style="margin-bottom: 10px"
                :title="rejectedReason"
                :closable="false"
                type="error" v-show="!!rejectedReason">
            </el-alert>
            <bread-crumb :items="breadCrumb"></bread-crumb>        
            <el-tabs v-model="activeName" @tab-click="handleClick" class="gap-2">
                <el-tab-pane label="合作资料" name="first" v-if="privileges.materialTab">
                    <service-staff-info :mode="mode"></service-staff-info>
                    <partner-infoes :mode="mode"></partner-infoes>
                </el-tab-pane>
                <el-tab-pane label="代理区域" name="second" v-if="privileges.regionTab">
                    <agent-basic-info :mode="mode"></agent-basic-info>
                    <agent-area :mode="mode"></agent-area>            
                </el-tab-pane>
                <el-tab-pane label="代理商资料" name="third" v-if="privileges.agentMaterialTab">
                    <agent-company-info :mode="mode"></agent-company-info>
                    <corporate-info :mode="mode"></corporate-info>
                    <contract-info :mode="mode"></contract-info>
                </el-tab-pane>
                <el-tab-pane label="服务信息" name="fourth" v-if="privileges.serviceInfoTab">
                    <service-manager :mode="mode"></service-manager>
                    <b-d-manager :mode="mode"></b-d-manager>
                </el-tab-pane>
                <el-tab-pane label="佣金信息" name="fifth" v-if="privileges.commissionTab">
                    <agent-commission-ratio :mode="mode"></agent-commission-ratio>
                    <agent-commission-account :mode="mode"></agent-commission-account>
                </el-tab-pane>
                <el-tab-pane label="平台服务费" name="sixth" v-if="privileges.platformTab">
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
import BreadCrumb from '@/components/common/BreadCrumb';
import PrivilegeMixin from '@/utils/privilege';

export default {
     mixins: [PrivilegeMixin],
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
      BreadCrumb
    },
    data() {
        return {
            privilegeOption: {
                materialTab: "/agent/editAgent#material",
                regionTab: "/agent/editAgent#region",
                agentMaterialTab: "/agent/editAgent#agent",
                serviceInfoTab: "/agent/editAgent#service",
                commissionTab: "/agent/editAgent#commission",
                platformTab: "/agent/editAgent#platform",
            },
            // activeName: null,
            mode: 'edit',
            initStr: "",
            breadCrumb: [{text:'加盟管理'},{text: "代理商"},{text: "编辑"}],       
        };
    } ,
    created() {
        this.getDetail();
    },
    computed: {
        activeName() {
            // 因为tab是有权限的因此要动态的判断要显示的tab名字
            if(this.privileges.materialTab) {
                return "first";
            }
            if(this.privileges.regionTab) {
                return "second";
            }
            if(this.privileges.agentMaterialTab) {
                return "third";
            }
            if(this.privileges.serviceInfoTab) {
                return "fourth";
            }
            if(this.privileges.commissionTab) {
                return "fifth";
            }
            if(this.privileges.platformTab) {
                return "sixth";
            }
        },
        rejectedReason() {
            return this.$store.state.rejectedReason;
        }
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
            // this.getDetail();
            history.back();
        },
        handleCommit() {
            this.$prompt('', '请说明本次修改的内容和原因', {
                confirmButtonText: '确定',
                cancelButtonText: '取消', 
                inputType: "textarea",  
                inputPlaceholder: "请说明本次修改的内容和原因", 
                customClass: 'dialog-commit', 
                inputValidator: function(val){
                    if(val == null || val == '') {
                        return "内容和原因是必填项!";
                    }
                    if(val && val.length > 500) {
                        return "最多输入500个字符";
                    }
                    return true;
                }                 
            }).then(({ value }) => { 
                this.$store.commit("AgentBasicInfo/updateRemark", value);
                let param = generateParam(this.$store.state);
                this.$http.post(this.$apiUrl.agent.edit, param).then((data)=>{  
                    if(data.data.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '提交成功!',
                            onClose: function() {
                                history.back();
                            }
                        });
                    }                  
                    console.log(data);
                });                 
            });
        },
    }
}
</script>
<style>
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


