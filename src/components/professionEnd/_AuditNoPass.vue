<template>
    <div>
        <el-form ref="form" :model="form" label-width="180px" class="gap-2">
            <el-row >
                <el-col :span="12">
                    <el-form-item label="提交人" prop="submitterId">
                        <el-select v-model="form.submitterId" placeholder="请选择" @focus="requestSubmitList" filterable :clearable="true">
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
                        <el-select v-model="form.auditorId" placeholder="请选择" @focus="requestSubmitList" filterable :clearable="true">
                            <el-option
                                v-for="item in submitPeopleList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="门店/代理商" prop="targetName">
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
        <div class="search-result" >共搜索到 {{pagination.total}}条数据</div>
        <el-table :data="passAuditList" border style="width: 100%">
            <el-table-column prop="targetName" label="名称" align="center" ></el-table-column>
            <el-table-column prop="targetTypeName" label="类型" align="center" ></el-table-column>
            <el-table-column prop="subbmitterName" label="提交人" align="center" ></el-table-column>
            <el-table-column prop="auditTime" label="审核时间" align="center"></el-table-column>
            <el-table-column prop="operateRemark" label="终止原因" align="center"></el-table-column>
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
                :total="pagination.total">
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
            pagination:{
                currentPage:1,//默认当前页为1;
                pageSize:10,//默认显示10条
                total:null//一共有多少条数据
            },
            passAuditList:[],//通过审核的数据
            submitPeopleList:[],//提交人审核人列表;
            // 表单查询信息
            form: {
                auditorId:'',//审核人Id;
                auditName:'',//审核人
                auditTime:[],//审核时间
                targetState:"2",//驳回
                targetName:'',//名称
                currentPage:1,//页码默认为1
                pageSize:10,//页面量默认为10
                submitterId:'',//提交人Id
                submitName:'',//提交人
            }
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
            this.form.currentPage=1;
            this.form.pageSize=10;
            this.$refs.form.resetFields();
        },
        search(){
            this.requestList();
        },
        // 请求公共函数
        requestList(){
            let self=this;
            this.$http.post(this.$apiUrl.professionEnd.list,this.form,{
                loading: {
                    fullscreen: true
                }
            })
                .then(function(data){
                    self.pagination.total=data.data.data.total;
                    self.passAuditList=data.data.data.data;
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
        margin-top: 50px;
        margin-bottom: 20px;
    }
</style>


