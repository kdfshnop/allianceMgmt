<template>
    <div>
        <el-form ref="form" :model="form" label-width="180px" class="gap-2">
            <el-row >
                <el-col :span="12">
                    <el-form-item label="提交人" prop="submitName">
                        <el-input v-model="form.city"></el-input>
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
                    <el-form-item label="审核人" prop="auditName">
                        <el-input v-model="form.auditName"></el-input>
                    </el-form-item>
                    <el-form-item label="代理商" prop="agencyName">
                        <el-input v-model="form.agencyName"></el-input>
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
        <div class="search-result" >共搜索到 {{pagination.total}}条数据</div>
        <el-table :data="passAuditList" border style="width: 100%">
            <el-table-column prop="name" label="代理商名称" align="center" ></el-table-column>
            <el-table-column prop="typeName" label="类型" align="center" ></el-table-column>
            <el-table-column prop="submitterName" label="提交人" align="center" ></el-table-column>
            <el-table-column prop="auditorName" label="审核人" align="center"></el-table-column>
            <el-table-column prop="auditTime" label="驳回时间" align="center"></el-table-column>
            <el-table-column prop="auditRemark" label="驳回原因" align="center"></el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagination.currentPage"
                :page-sizes="[10, 20, 50, 100,500]"
                :page-size="pagination.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagination.total">
            </el-pagination>
        </div>
    </div>  
</template>

<script>
export default {
    name:'auditPass',
    data(){
        return {
            // 分页功能
            pagination:{
                currentPage:1,//默认当前页为1;
                pageSize:10,//默认显示10条
                total:400//一共有多少条数据
            },
            passAuditList:[],
            // 表单查询信息
            form: {
                auditType:"1",//业务审核
                auditName:'',//审核人
                auditTime:[],//审核时间
                agencyName:'',//代理商名称
                currentPage:1,//页码默认为1
                pageSize:10,//页面量默认为10
                submitName:'',//提交人
                targetState:'2',//已驳回
            },
            tableData:[
                {
                    name:'key',
                    submitPeople:'wk',
                    auditPeople:'经纪人',
                    auditTime:'2018-12-05',
                    endReason:'不合格'
                },
                {
                    name:'key',
                    submitPeople:'wk',
                    auditPeople:'经纪人',
                    auditTime:'2018-12-05',
                    endReason:'不合格'
                },
                {
                    name:'key',
                    submitPeople:'wk',
                    auditPeople:'经纪人',
                    auditTime:'2018-12-05',
                    endReason:'不合格'
                },
                {
                    name:'key',
                    submitPeople:'wk',
                    auditPeople:'经纪人',
                    auditTime:'2018-12-05',
                    endReason:'不合格'
                }
            ]
        }
    },
    created(){
        this.requestList();
    },
    methods:{
        //每页多少条
        handleSizeChange(val) {
            this.pagination.pageSize=val;
            this.requestList();
        },
        //当前页
        handleCurrentChange(val) {
            this.pagination.currentPage=val;
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
            this.$http.post(this.$apiUrl.professionAudit.auditList,this.form)
                .then(function(data){
                    self.pagination.total=data.data.data.total;
                    self.passAuditList=data.data.data.data;
                    console.log(data,'成功');
                })
                .catch(function(err){
                    console.log(err,'失败');
                });
        }
    },
    computed:{
        //分页显示多少条数据
        searInfoList(){
            return this.tableData.slice((this.pagination.currentPage-1)*this.pagination.pageSize,this.pagination.currentPage*this.pagination.pageSize); 
        }
    },
}
</script>

<style>

</style>


