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
            <div>{{operateRemark}}</div>
            <div class="gap-2">
                <el-button style="width: 140px" type="danger" @click="handleReject">驳回</el-button>
                <el-button style="width: 140px" type="primary" @click="handleApprove">通过</el-button>
                <el-button style="width: 140px" type="" @click="handleClose">关闭</el-button>
            </div>
            <h2 class="gap-2">历史审核记录</h2>
            <el-table :data="historyRecords" stripe style="width: 100%; margin-bottom: 40px;">
                <el-table-column prop="submitTime" label="提交时间" width="180"></el-table-column>
                <el-table-column prop="auditTime" label="审核时间" width="180"></el-table-column>
                <el-table-column prop="auditState" label="审核状态"></el-table-column>
                <el-table-column prop="remark" label="驳回理由"></el-table-column>
                <el-table-column prop="auditor" label="审核人"></el-table-column>
            </el-table> 
            <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
                <textarea name="" id="" style="width:100%;" rows="10" placeholder="请添加备注" v-model="remark"></textarea>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
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
            breadCrumb: [{text:'业务审核'},{text: "终止合作"},{text:'审核'}],
            historyRecords:[],// 历史审核记录
            dialogVisible:false,
            operateRemark:'',//终止原因
            remark:'',//通过驳回原因
            title:'',
            targetId:this.$route.query.targetId,
            targetType:this.$route.query.targetType
        }
    },
    created(){
        let self=this;
        // 终止合作原因;
        this.$http.get(this.$apiUrl.professionEnd.endDetail+"?targetId="+this.targetId+"&targetType="+this.targetType)
            .then(function(data){
                self.operateRemark=data.data.data.operateRemark;
            })
            .catch(function(err){
                console.log(err,'终止合作失败');
            });
            let form={
                targetId:this.targetId,
                targetType:this.targetType
            }
        // 历史审核记录
        this.$http.post(this.$apiUrl.professionEnd.historyRecords,form)
            .then(function(data){
                //审核记录字段不一致
                self.historyRecords=data.data.data;
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
        cancel(){
            this.dialogVisible = false;
            this.remark="";
        },
        submit(){
            this.dialogVisible = false;
            let form={
                targetId:this.targetId,
                targetType:this.targetType,
                remark:this.remark
            };
                if(this.title=='驳回'){
                    if(this.remark){
                        this.$http.post(this.$apiUrl.professionEnd.reject,form)
                            .then(function(data){
                                this.remark="";
                            })
                            .catch(function(err){
                                console.log(err);
                            });
                    }else{
                        this.$message.error('请填写驳回原因');
                    }
                    
                }else{
                    this.$http.post(this.$apiUrl.professionEnd.adopt,form)
                    .then(function(data){
                        this.remark="";
                    })
                    .catch(function(err){
                        console.log(err);
                    })
                };  
        }
    }
}
</script>

<style scoped>
    .hd{
        margin: 20px 0;
    }
    .skip{
        color:blue;
    }
</style>


