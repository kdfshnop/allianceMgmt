<template>
    <div>
        <el-form ref="form" :model="form" label-width="180px" class="gap-2">
            <el-row >
                <el-col :span="12">
                    <el-form-item label="提交人" prop="submitterId">
                        <el-select v-model="form.submitterId" placeholder="请选择" @focus="requestSubmitList" filterable>
                            <el-option
                                v-for="item in submitPeopleList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="审核时间" prop="auditTime">
                            <el-date-picker
                                v-model="form.auditTime"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="审核人" prop="auditorId">
                        <el-select v-model="form.auditorId" placeholder="请选择" @focus="requestSubmitList" filterable>
                            <el-option
                                v-for="item in submitPeopleList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="代理商" prop="targetName">
                        <el-input v-model="form.targetName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row :gutter="20">
            <el-col :span="2" :offset="11">
                <el-button class="reset" @click="resetForm">重置</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" @click="search">搜索</el-button>
            </el-col>
        </el-row>
        <div class="search-result" >共搜索到{{rejectList.total}}条数据</div>
        <el-table :data="rejectList.data" border style="width: 100%">
            <el-table-column prop="name" label="代理商公司名称" align="center" ></el-table-column>
            <el-table-column prop="typeName" label="类型" align="center" ></el-table-column>
            <el-table-column prop="submitterName" label="提交人" align="center" ></el-table-column>
            <el-table-column prop="auditorName" label="审核人" align="center"></el-table-column>
            <el-table-column prop="auditTime" label="驳回时间" align="center"></el-table-column>
            <el-table-column prop="auditRemark" label="驳回原因" align="center"></el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="form.currentPage"
                :page-sizes="[10, 20, 50, 100,500]"
                :page-size="form.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="rejectList.total">
            </el-pagination>
        </div>
    </div>  
</template>

<script>
export default {
    name:'auditNoPass',
    data(){
        return {
            // 表单查询信息
            form: {
                auditorId:'',//审核人Id;
                auditName:'',//审核人
                auditType:'1',//资料审核
                auditTime:[],//审核时间
                targetName:'',//代理商名称
                currentPage:1,//页码默认为1
                pageSize:10,//页面量默认为10
                submitterId:'',//提交人Id
                submitName:'',//提交人
                targetState:'2',//已驳回
            },
            rejectList:{},//驳回数据
            submitPeopleList:[]//提交人，审核人列表;
        }
    },
    created(){
        this.requestList();
        this.requestSubmitList();
    },
    methods:{
        //每页多少条
        handleSizeChange(val) {
            this.form.pageSize=val;
            this.requestList();
        },
        //当前页
        handleCurrentChange(val) {
            this.form.currentPage=val;
            this.requestList();
        },
        resetForm() {
            this.$refs.form.resetFields();
        },
        search(){
            this.requestList();
        },
        // 请求公共函数
        requestList(){
            let self=this;
            this.$http.post(this.$apiUrl.agent.firstWaitAuditList,this.form)
                .then(function(data){
                    self.rejectList=data.data.data;
                    console.log(self.rejectList,'成功驳回');
                })
                .catch(function(err){
                    console.log(err,'失败');
                });
        },
        // 获取提交人列表;
        requestSubmitList(){
            let self=this;
            this.$http.get(this.$apiUrl.common.employee+"?personType=9")
                .then(function(data){
                    self.submitPeopleList=data.data.data;
                })
                .catch(function(err){
                    console.log(err);
                })
        }
    }
}
</script>

<style scoped>
    .pagination{
        margin-top: 100px;
        text-align: center;
    }
    .search-result{
        margin:50px 0 20px 0;
    }
</style>


