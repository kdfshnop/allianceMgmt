<!--
    @页面名称：代理商、公司、门店终止合作是否通过页
    @作者：豆亚东 (douyadong@lifang.com)
    @业务逻辑说明：
        1.代理商、公司、门店终止合作是否通过;
        2.        
-->
<template>
    <el-container>
        <el-main>    
            <bread-crumb :items="breadCrumb"></bread-crumb>
            <div class="hd">终止合作原因： </div>
            <div>不合格不合格</div>
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
            <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
                <textarea name="" id="" style="width:100%;" rows="10" placeholder="请添加备注" v-model="remark"></textarea>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false,submit()">确 定</el-button>
                </span>
            </el-dialog>
        </el-main>
    </el-container> 
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb';

export default {
    name:'ProfessionEndVerify',
    components:{BreadCrumb},
    data(){
        return {
            auditType:'2',//终止合作
            breadCrumb: [{text:'业务审核'},{text: "终止合作"},{text:'审核'}],
            historyRecords:[],// 历史审核记录
            searInfoList:[],
            dialogVisible:false,
            remark:'',
            title:'',
            id:this.$route.query.id
        }
    },
    created(){
        // 终止合作原因;
        this.$http.get(this.$apiUrl.professionAudit.detailContract+"?id="+this.id)
            .then(function(data){
                console.log('编辑详情')
            })
            .catch(function(err){
                console.log(err);
            });
        // 历史审核记录
        this.$http.get(this.$apiUrl.professionAudit.historyAudit+"?id="+this.id)
            .then(function(data){
                console.log('历史审核记录');
            })
            .catch(function(err){
                console.log(err);
            });
    },
    methods:{
        handleReject(){
            this.dialogVisible=true;
            this.title='驳回';
        },
        handleApprove(){
            this.dialogVisible=true;
            this.title='通过';
        },
        handleClose(){
            history.back();
        },
        submit(){
            let form={
                targetId:this.id,
                auditType:this.auditType,
                remark:this.remark
            };
            if(this.title=='驳回'){
                this.$http.post(this.$apiUrl.professionAudit.reject,form)
                .then(function(data){
                    console.log('驳回');
                    this.remark="";
                })
                .catch(function(err){
                    console.log(err);
                })
            }else{
                this.$http.post(this.$apiUrl.professionAudit.pass,form)
                .then(function(data){
                    console.log('通过');
                    this.remark="";
                })
                .catch(function(err){
                    console.log(err);
                })
            }  
        }
    }
}
</script>

<style>
    .hd{
        margin: 30px 0;
    }
    .skip{
        color:blue;
    }
</style>


