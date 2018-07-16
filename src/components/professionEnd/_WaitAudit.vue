<template>
    <div>
        <div class="search-result" >共搜索到{{pagination.total}}条数据</div>
        <el-table :data="waitAuditList" border style="width: 100%">
            <el-table-column prop="targetName" label="名称" align="center" ></el-table-column>
            <el-table-column prop="targetTypeName" label="类型" align="center" ></el-table-column>
            <el-table-column prop="submitterName" label="提交人" align="center" ></el-table-column>
            <el-table-column prop="auditTime" label="提交时间" align="center"></el-table-column>
            <el-table-column prop="operateRemark" label="终止原因" align="center"></el-table-column>
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
            targetState:"1",//待审核
            // 分页功能
            pagination:{
                currentPage:1,//默认当前页为1;
                pageSize:10,//默认显示10条
                total:null//一共有多少条数据
            },
            waitAuditList:[]
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
            this.$router.push({name:"ProfessionEndVerify",query:{targetId:row.targetId,targetType:row.targetType}})
        },
        // 终止合作待审核列表信息请求公共函数;
        requestList(){
            let self=this;
            let form={
                targetState:this.targetState,
                currentPage:this.pagination.currentPage,
                pageSize:this.pagination.pageSize
            }
            this.$http.post(this.$apiUrl.professionEnd.list,form)
                .then(function(data){
                    self.pagination.total=data.data.data.total;
                    self.waitAuditList=data.data.data.data;
                    console.log(data,self.pagination.total,'成功请求');
                })
                .catch(function(err){
                    console.log(err,'waitAudit失败');
                });
        }
    }
}
</script>

<style>

</style>


