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
/**
 * 资料审核
 * TODO:
 *  1. 接口调试
 *  2. 根据状态判断是否出现审核按钮
 */
import ServiceStaffInfo from '@/components/Agent/_ServiceStaffInfo';
import PartnerInfoes from '@/components/Agent/_PartnerInfoes';
import AgentBasicInfo from '@/components/Agent/_AgentBasicInfo';
import AgentArea from '@/components/Agent/_AgentArea';
import AgentCompanyInfo from '@/components/Agent/_AgentCompanyInfo';
import CorporateInfo from '@/components/Agent/_CorporateInfo';
import ContractInfo from '@/components/Agent/_ContractInfo';
import ServiceManager from '@/components/Agent/_ServiceManager';
import BDManager from '@/components/Agent/_BDManager';
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
            // TODO: 调用接口获取详情
            // this.$http.get(this.$apiUrl.materialVerify.detail).then(((data)=>{

            // });
            // TODO: 获取历史审核记录
            // this.$http.get(this.$apiUrl.materialVerify.historyRecords).then((data)=>{

            // });
        },
        handleApprove() {// 同意
            this.$confirm('是否通过该审核？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {                
                // TODO: 调用审核通过接口
                // this.$http.post(this.$apiUrl.materialVerify.approve).then(()=>{
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
        },
    },
    created() {
        this.refresh();
    }

}
</script>
<style>

</style>
