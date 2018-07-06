<template>
    <div>
        <el-form ref="form" :model="form" label-width="180px" class="gap-2">
            <el-row >
                <el-col :span="12">
                    <el-form-item label="提交人" prop="city">
                        <el-input v-model="form.city"></el-input>
                    </el-form-item>
                    <!--<el-row>
                        <el-col :span="5">
                            <el-form-item label="审核时间" prop="timeStart">
                                <el-date-picker
                                    format="yyyy-MM-dd"
                                    v-model="form.timeStart"
                                    type="date"
                                    placeholder="选择日期"
                                    style="width:150px"
                                    value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="19">
                            <el-form-item prop="timeEnd" label="至">
                                <el-date-picker
                                    format="yyyy-MM-dd"
                                    v-model="form.timeEnd"
                                    type="date"
                                    placeholder="选择日期"
                                    style="width:150px"
                                    value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>-->
                    <el-form-item label="审核时间" prop="auditStartTime">
                            <el-date-picker
                                v-model="form.auditStartTime"
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
                    <el-form-item label="审核人" prop="companyName">
                        <el-input v-model="form.companyName"></el-input>
                    </el-form-item>
                    <el-form-item label="代理商" prop="agent">
                        <el-input v-model="form.agent"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row :gutter="20">
            <el-col :span="2" :offset="11">
                <el-button class="reset" @click="resetForm('form')">重置</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" @click="search('form')">搜索</el-button>
            </el-col>
        </el-row>
        <div class="search-result" >共搜索到 956条数据</div>
        <el-table :data="searInfoList" border style="width: 100%">
            <el-table-column prop="name" label="代理商名称" align="center" ></el-table-column>
            <el-table-column prop="submitPeople" label="类型" align="center" ></el-table-column>
            <el-table-column prop="auditPeople" label="提交人" align="center" ></el-table-column>
            <el-table-column prop="endReason" label="审核人" align="center"></el-table-column>
            <el-table-column prop="endReason" label="审核时间" align="center"></el-table-column>
            <el-table-column prop="endReason" label="备注" align="center"></el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagination.currentPage"
                :page-sizes="[10, 2, 3, 400]"
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
            // 表单查询信息
            form: {
                auditStartTime:'',
                agent:'',//代理商
                business:'全部',//业务
                city:'',//门店所属城市
                companyName:'',//公司名称
                timeStart:'',//创建开始时间
                timeEnd:'',//创建结束时间
                storeName: '',//门店名称
                storeAddress:'',//门店地址
                timeOver:''//到期查询
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
    methods:{
        //每页多少条
        handleSizeChange(val) {
            this.pagination.pageSize=val;
        },
        //当前页
        handleCurrentChange(val) {
            this.pagination.currentPage=val;
        },
        resetForm(formName) {
            this.$refs.form.resetFields();
        },
        search(formName){

        },
        audit(){}
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


