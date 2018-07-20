<template>
    <el-container>        
        <el-main> 
            <bread-crumb :items="breadCrumb"></bread-crumb>   
            <agent-commission-ratio :item="agentCommissionRatio"></agent-commission-ratio>
            <agent-commission-account :item="agentCommissionAccount"></agent-commission-account>
            <platform-service-fee :item="platformServiceFee"></platform-service-fee>
            <payment-info :item="paymentInfo"></payment-info>

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
                prop="commitDate"
                label="提交时间"
                width="180">
                </el-table-column>
                <el-table-column
                prop="verifyDate"
                label="审核时间"
                width="180">
                </el-table-column>
                <el-table-column
                prop="verifyStatus"
                label="审核状态">
                </el-table-column>
                <el-table-column
                prop="rejectReason"
                label="驳回理由">
                </el-table-column>
                <el-table-column
                prop="verifyPerson"
                label="审核人">
                </el-table-column>
            </el-table>            
        </el-main>
  </el-container>
</template>
<script>
import AgentCommissionRatio from '@/components/agent/_AgentCommissionRatio';
import AgentCommissionAccount from '@/components/agent/_AgentCommissionAccount';
import PlatformServiceFee from '@/components/agent/_PlatformServiceFee';
import PaymentInfo from '@/components/agent/_PaymentInfo';
import Vue from 'vue';
import BreadCrumb from '@/components/common/BreadCrumb';
/**
 * 平台服务费审核
 * TODO:
 *  1. 根据状态决定是否显示审核按钮
 *  2. 补充完成接口调用
 *  3. 按照接口来修改字段名称
 */
export default {
    name: "platformServiceFeeVerify",
    components: {
        AgentCommissionRatio, 
        AgentCommissionAccount, 
        PlatformServiceFee, 
        PaymentInfo, 
        BreadCrumb
    },
    data() {
        return {
            breadCrumb: [{text:'首次加盟审核'},{text: "平台服务费审核"},{text: "审核"}],
            visible: false,
            historyRecords:[],// 历史审核记录
            agentCommissionRatio: {

            },
            agentCommissionAccount: {

            },
            platformServiceFee: {
                serviceFee: {
                    paymentType: 'sss',
                    name: "ddd"
                },
                dividingInfo: {

                }
            },
            paymentInfo: {

            }
        };
    },
    methods: {
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
                // type: "error"          
                // iconClass: "el-icon-error"
            }).then(({value}) => {                                
                this.$http.post(this.$apiUrl.platformServiceFeeVerify.approve,{
                    targetId: +this.$route.params.id,
                    targetType: 1,
                    remark: value,
                    auditType: 2
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
                    if(val==null || val == '') {
                        return "驳回理由必填:)";
                    }
                    if(val && val.length > 500) {
                        return "最多输入500个字符";
                    }
                    return true;
                }   
                // type: "error"          
                // iconClass: "el-icon-error"
            }).then(({ value }) => {                                
                this.$http.post(this.$apiUrl.platformServiceFeeVerify.reject,{
                    targetId: +this.$route.params.id,
                    targetType: 1,
                    remark: value,
                    auditType: 2
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
        refresh() {
            this.$store.dispatch({
                type: "getAgent",
                agentId: this.$route.params.id,
                agentState: this.$route.query.state || 0                
            });

            this.$http.post(this.$apiUrl.materialVerify.historyRecords,{
                params: {
                    targetId: this.$route.params.id,
                    targetType: 1 
                }
            }).then((data)=>{
                this.historyRecords = data.data.data;
            });            
        }
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


