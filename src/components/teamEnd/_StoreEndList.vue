<!--
    @页面名称：门店终止合作汇总
    @作者：豆亚东 (douyadong@lifang.com)
    @业务逻辑说明：
        1.
        2.        
-->
<template>
    <div>
        <div class="search-result">共搜索到 956条数据</div>
        <el-table :data="searInfoList" border style="width: 100%">
            <el-table-column prop="name" label="门店名称" align="center" >
                <template slot-scope="scope">
                    <el-button size="mini" @click="detail(scope.$index, scope.row)" type="text">门店名称</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="submitPeople" label="提交人" align="center" ></el-table-column>
            <el-table-column prop="auditPeople" label="审核人" align="center" ></el-table-column>
            <el-table-column prop="auditTime" label="审核时间" align="center" ></el-table-column>
            <el-table-column prop="endReason" label="终止合作原因" align="center"></el-table-column>
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
    name:'StoreEndList',
    data(){
        return{
            // 分页功能
            pagination:{
                currentPage:1,//默认当前页为1;
                pageSize:10,//默认显示10条
                total:400//一共有多少条数据
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
        // 查看代理商详情;
        detail(index,row){
            // 
        },
        //每页多少条
        handleSizeChange(val) {
            this.pagination.pageSize=val;
        },
        //当前页
        handleCurrentChange(val) {
            this.pagination.currentPage=val;
        },
    },
    computed:{
        //分页显示多少条数据
        searInfoList(){
            return this.tableData.slice((this.pagination.currentPage-1)*this.pagination.pageSize,this.pagination.currentPage*this.pagination.pageSize);       
        }
    }
}
</script>

<style>

</style>


