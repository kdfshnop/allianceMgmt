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
import AgentCommissionRatio from '@/components/Agent/_AgentCommissionRatio';
import AgentCommissionAccount from '@/components/Agent/_AgentCommissionAccount';
import PlatformServiceFee from '@/components/Agent/_PlatformServiceFee';
import PaymentInfo from '@/components/Agent/_PaymentInfo';
import Dialogv from './Dialog';
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
            this.$confirm('是否通过该审核？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {                
                // TODO: 调用审核通过接口
                // this.$http.post(this.$apiUrl.platformServiceFeeVerify.approve).then(()=>{
                //     this.$message({
                //         type: 'success',
                //         message: '通过成功!'
                //     });
                // }).catch(()=>{
                //     this.$message({
                //         type: 'error',
                //         message: '通过失败!'
                //     });
                // });
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
                inputPlaceholder: "请输入拒绝理由",   
                // type: "error"          
                // iconClass: "el-icon-error"
            }).then(({ value }) => {  
                // TODO: 接口调试              
                // this.$http.post(this.$apiUrl.platformServiceFeeVerify.reject).then(()=>{
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
        },
        refresh() {
            // TODO: 详情接口获取详情信息
            // this.$http.get(this.$apiUrl.platformServiceFee.detail).then((data)=>{
            //     // 赋值
            // });

            // TODO: 查询历史审核记录
            // this.$http.get(this.$apiUrl.platformServiceFee.historyRecords).then((data)=>{
            //     this.historyRecords = data.data;
            // });
            // TODO: 此处是模拟，等接口通了就干掉
            setTimeout(()=>{
                this.historyRecords = [{
                    commitDate: "2015-03-06",
                    verifyDate: "2016-03-05",
                    verifyStatus: "通过",
                    rejectReason: "",
                    verifyPerson: "张三"
                },{
                    commitDate: "2015-03-06",
                    verifyDate: "2016-03-05",
                    verifyStatus: "通过",
                    rejectReason: "",
                    verifyPerson: "张三"
                },{
                    commitDate: "2015-03-06",
                    verifyDate: "2016-03-05",
                    verifyStatus: "通过",
                    rejectReason: "",
                    verifyPerson: "张三"
                },{
                    commitDate: "2015-03-06",
                    verifyDate: "2016-03-05",
                    verifyStatus: "通过",
                    rejectReason: "",
                    verifyPerson: "张三"
                }];
            }, 1000);
        }
    },
    created() {
        this.refresh();
    }
}
</script>
<style>

</style>


