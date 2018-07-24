<template>
    <el-container>        
        <el-main> 
            <bread-crumb :items="breadCrumb"></bread-crumb>
            <service-staff-info :item="serviceStaffInfo"></service-staff-info>
            <partner-infoes :item="partnerInfoes"></partner-infoes>
            <agent-basic-info :item="agentBasicInfo"></agent-basic-info>
            <agent-area :item="agentArea"></agent-area>
            <agent-company-info :item="agentCompanyInfo"></agent-company-info>
            <corporate-info :item="corporateInfo"></corporate-info>
            <contract-info :item="contractInfo"></contract-info>
            <service-manager :item="serviceManager"></service-manager>
            <b-d-manager :item="bdManager"></b-d-manager>    

            <div class="gap-2">
                <el-button style="width: 140px" type="danger" @click="handleReject">驳回</el-button>
                <el-button style="width: 140px" type="primary" @click="handleApprove">通过</el-button>
                <el-button style="width: 140px" type="" @click="handleClose">关闭</el-button>
            </div>

            <h2 class="gap-2">历史审核记录</h2>
            <el-table
                :data="historyRecords"
                stripe
                style="width: 100%; margin-bottom: 40px;">
                <el-table-column
                prop="operatetime"
                label="提交时间"
                width="180">
                </el-table-column>
                <el-table-column
                prop="auditTime"
                label="审核时间"
                width="180">
                </el-table-column>
                <el-table-column
                prop="result"
                label="审核状态">
                </el-table-column>
                <el-table-column
                prop="remark"
                label="驳回理由">
                </el-table-column>
                <el-table-column
                prop="auditorName"
                label="审核人">
                </el-table-column>
            </el-table>         
        </el-main>
    </el-container>
</template>
<script>
/**
 * 资料审核
 * TODO:
 *  1. 接口调试
 *  2. 根据状态判断是否出现审核按钮
 */
import ServiceStaffInfo from '@/components/agent/_ServiceStaffInfo';
import PartnerInfoes from '@/components/agent/_PartnerInfoes';
import AgentBasicInfo from '@/components/agent/_AgentBasicInfo';
import AgentArea from '@/components/agent/_AgentArea';
import AgentCompanyInfo from '@/components/agent/_AgentCompanyInfo';
import CorporateInfo from '@/components/agent/_CorporateInfo';
import ContractInfo from '@/components/agent/_ContractInfo';
import ServiceManager from '@/components/agent/_ServiceManager';
import BDManager from '@/components/agent/_BDManager';
import BreadCrumb from '@/components/common/BreadCrumb';
export default {
    name: "materialVerify",
    components: {
        ServiceStaffInfo,
        PartnerInfoes,
        AgentBasicInfo,
        AgentArea,
        AgentCompanyInfo,
        CorporateInfo,
        ContractInfo,
        ServiceManager,
        BDManager,
        BreadCrumb
    },
    data() {
        return {
            serviceStaffInfo: {
                bdInfo: {

                },
                cxInfo: {

                },
                directorInfo: {

                }
            },
            partnerInfoes: {},
            agentBasicInfo: {},
            agentArea: {},
            agentCompanyInfo: {},
            corporateInfo: {},
            contractInfo: {},
            serviceManager: {},
            bdManager: {},
            breadCrumb: [{text:'首次加盟审核'},{text: "资料审核"},{text: "审核"}],            
            historyRecords:[],// 历史审核记录
        };
    },
    methods: {
        refresh() {
            this.$store.dispatch({
                type: "getAgent",
                agentId: this.$route.params.id,
                agentState: this.$route.query.state || 0                
            });
            
            this.$http.post(this.$apiUrl.materialVerify.historyRecords,{                
                targetId: this.$route.params.id,
                targetType: 1,
                auditType: 1,                 
            }).then((data)=>{
                this.historyRecords = data.data.data;
            });
        },
        handleApprove() {// 同意
            this.$prompt('', '通过', {
                confirmButtonText: '确定',
                cancelButtonText: '取消', 
                inputType: "textarea",  
                inputPlaceholder: "备注", 
                customClass: 'dialog-pass',   
                inputValidator: function(val){
                    if(val && val.length > 500) {
                        return "最多输入500个字符";
                    }
                    return true;
                } 
            }).then(({value}) => {                                
                this.$http.post(this.$apiUrl.materialVerify.approve,{
                    targetId: +this.$route.params.id,
                    targetType: 1,
                    remark: value,
                    auditType: 1
                }).then(()=>{
                    this.$message({
                        type: 'success',
                        message: '通过成功!',
                        onClose: function() {
                            history.back();
                        }
                    });
                }).catch((e)=>{
                    console.log(e);
                    this.$message({
                        type: 'error',
                        message: e.message || '通过失败!'
                    });
                });
            })
        },
        handleClose(){// 返回前一页
            history.back();
        },
        handleReject() {// 拒绝
            this.$prompt('', '驳回', {
                confirmButtonText: '确定',
                cancelButtonText: '取消', 
                inputType: "textarea",  
                inputPlaceholder: "请输入驳回理由", 
                customClass: 'dialog-reject', 
                inputValidator: function(val){
                    if(val == null || val == '') {
                        return "驳回理由必填";
                    }                    
                    if(val && val.length > 500) {
                        return "最多输入500个字符";
                    }
                    return true;
                }   
            }).then(({ value }) => {                                
                this.$http.post(this.$apiUrl.materialVerify.reject,{
                    targetId: +this.$route.params.id,
                    targetType: 1,
                    remark: value,
                    auditType: 1
                }).then(()=>{
                    this.$message({
                        type: 'success',
                        message: '驳回成功',
                        onClose: function() {
                            history.back();
                        }
                    });
                }).catch((e)=>{
                    this.$message({
                        type: 'error',
                        message: '驳回失败'
                    });
                });
            });
        },
    },
    created() {
        this.refresh();
    }

}
</script>
<style>
.dialog-reject .el-message-box__header .el-message-box__title{    
    color: red;    
}

.dialog-pass textarea {
    height: 100px;
}


.dialog-reject textarea {
    height: 100px;
}
</style>
