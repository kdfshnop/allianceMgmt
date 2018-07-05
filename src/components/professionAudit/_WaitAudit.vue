<template>
    <div>
        <div class="search-result" >共搜索到 956条数据</div>
        <el-table :data="searInfoList" border style="width: 100%">
            <el-table-column prop="name" label="门店/代理商公司名称" align="center" ></el-table-column>
            <el-table-column prop="submitPeople" label="类型" align="center" ></el-table-column>
            <el-table-column prop="auditPeople" label="提交人" align="center" ></el-table-column>
            <el-table-column  label="状态" align="center" >
                <template slot-scope="scope">
                    <div><span class="circle"></span><span>待审核</span></div>
                </template>
            </el-table-column>
            <el-table-column prop="endReason" label="提交时间" align="center"></el-table-column>
            <el-table-column prop="endReason" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="audit(scope.$index, scope.row)" type="text">审核</el-button>
                </template>
            </el-table-column>
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
    name:'waitAudit',
    data(){
        return {
            // 分页功能
            pagination:{
                currentPage:1,//默认当前页为1;
                pageSize:10,//默认显示10条
                total:400//一共有多少条数据
            },
            tableData:[
                {
                    agencyId:"0",
                    name:'key',
                    submitPeople:'wk',
                    auditPeople:'经纪人',
                    auditTime:'2018-12-05',
                    endReason:'不合格'
                },
                {
                    agencyId:"1",
                    name:'key',
                    submitPeople:'wk',
                    auditPeople:'经纪人',
                    auditTime:'2018-12-05',
                    endReason:'不合格'
                },
                {
                    agencyId:"2",
                    name:'key',
                    submitPeople:'wk',
                    auditPeople:'经纪人',
                    auditTime:'2018-12-05',
                    endReason:'不合格'
                },
                {
                    agencyId:"3",
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
            console.log(123)
            this.pagination.pageSize=val;
        },
        //当前页
        handleCurrentChange(val) {
            this.pagination.currentPage=val;
        },
        audit(index,row){
            this.$router.push({name:'ProfessionAuditVerify',params:{agencyId:row.agencyId}});
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


