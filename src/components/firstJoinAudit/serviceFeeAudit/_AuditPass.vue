<template>
    <div>
        <el-form ref="form" :model="form" label-width="180px" class="gap-2">
            <el-row >
                <el-col :span="12">
                    <el-form-item label="提交人" prop="submitName">
                        <el-input v-model="form.submitName"></el-input>
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
        <div class="search-result" >共搜索到 956条数据</div>
        <el-table :data="searInfoList" border style="width: 100%">
            <el-table-column prop="name" label="代理商公司名称" align="center" ></el-table-column>
            <el-table-column prop="typeName" label="类型" align="center" ></el-table-column>
            <el-table-column prop="submitterName" label="提交人" align="center" ></el-table-column>
            <el-table-column prop="auditorName" label="审核人" align="center"></el-table-column>
            <el-table-column prop="auditTime" label="审核时间" align="center"></el-table-column>
            <el-table-column prop="auditRemark" label="备注" align="center"></el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="form.currentPage"
                :page-sizes="[10, 20, 50, 100,500]"
                :page-size="form.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>  
</template>

<script>
export default {
    name:'auditNoPass',
    data(){
        return {
            // 分页功能
            total:100,
            // 表单查询信息
            form: {
                auditName:'',//审核人
                auditType:'2',//平台服务费审核
                auditTime:[],//审核时间
                agencyName:'',//代理商名称
                currentPage:1,//页码默认为1
                pageSize:10,//页面量默认为10
                submitName:'',//提交人
                targetState:'3',//已通过
            },
            tableData:[
                {
                    name:'key',
                    submitterName:'wk',
                    auditorName:'经纪人',
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
            return this.tableData.slice((this.form.currentPage-1)*this.form.pageSize,this.form.currentPage*this.form.pageSize); 
        }
    },
}
</script>

<style>

</style>


