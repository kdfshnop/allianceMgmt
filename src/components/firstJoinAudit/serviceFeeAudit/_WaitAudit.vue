<template>
    <div>
        <div class="search-result" >共搜索到 {{pagination.total}}条数据</div>
        <el-table :data="waitAuditList" border style="width: 100%">
            <el-table-column prop="name" label="代理商公司名称" align="center" ></el-table-column>
            <el-table-column prop="cityName" label="地区" align="center" ></el-table-column>
            <el-table-column prop="submitterName" label="提交人" align="center" ></el-table-column>
            <el-table-column  label="状态" align="center" >
                <template slot-scope="scope">
                    <div><span class="circle"></span><span>待审核</span></div>
                </template>
            </el-table-column>
            <el-table-column prop="auditTime" label="提交时间" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
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
    name:'waitAudit',
    data(){
        return {
            // 分页功能
            pagination:{
                currentPage:1,//默认当前页为1;
                pageSize:10,//默认显示10条
                total:400//一共有多少条数据
            },
            waitAuditList:[],//代理商服务费待审核列表
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
        audit(index,row){
            this.$router.push({name:"PlatformServiceFeeVerify",query:{agencyId:row.id}});
        },
        // 待审核列表信息请求公共函数;
        requestList(){
            let self=this;
            let requestInfo={
                auditType:"2",//1资料审核，2平台服务费审核
                currentPage:this.pagination.currentPage,
                pageSize:this.pagination.pageSize,
                targetState:"1"//1待审核,2.已驳回，3通过
            }
            this.$http.post(this.$apiUrl.agent.firstWaitAuditList,requestInfo)
                .then(function(data){
                    self.pagination.total=data.data.data.total;
                    self.waitAuditList=data.data.data.data;
                    console.log('成功');
                })
                .catch(function(err){
                    console.log(err);
                });
        }
    }
}
</script>

<style>

</style>


