<!--
    @页面名称：公司终止合作汇总
    @作者：豆亚东 (douyadong@lifang.com)
    @业务逻辑说明：
        1.
        2.        
-->
<template>
    <div>
        <div class="search-result">共搜索到{{companyList.total}}条数据</div>
        <el-table :data="companyList.data" border style="width: 100%">
            <el-table-column prop="name" label="公司名称" align="center" >
                <template slot-scope="scope">
                    <el-button size="mini" @click="detail(scope.$index, scope.row)" type="text">{{scope.row.name}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="submitterName" label="提交人" align="center" ></el-table-column>
            <el-table-column prop="auditorName" label="审核人" align="center" ></el-table-column>
            <el-table-column prop="auditTime" label="审核时间" align="center" ></el-table-column>
            <el-table-column prop="remark" label="终止合作原因" align="center"></el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagination.currentPage"
                :page-sizes="[10, 20, 50, 100,500]"
                :page-size="pagination.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="companyList.total">
            </el-pagination>
        </div>
        <company-detail ref="companyDetail"></company-detail>
    </div>
</template>

<script>
import CompanyDetail from '@/components/teamEnd/_CompanyDetail';
export default {
    name:'CompanyEndList',
    components:{CompanyDetail},
    data(){
        return{
            companyId:"",//公司Id;
            companyList:{},
            // 分页功能
            pagination:{
                currentPage:1,//默认当前页为1;
                pageSize:10,//默认显示10条
                total:null//一共有多少条数据
            }
        }
    },
    created(){
        this.requestList();
    },
    methods:{
        // 查看公司详情;
        detail(index,row){
            // 获取公司id;
            this.companyId=row.id;
            this.$refs.companyDetail.open(this.companyId);
        },
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
        // 终止公司列表;
        requestList(){
            let self=this;
            let form={
                currentPage:this.pagination.currentPage,
                pageSize:this.pagination.pageSize,
                type:"2"
            }
            this.$http.post(this.$apiUrl.teamEnd.tabList,form)
                .then(function(data){
                    self.companyList=data.data.data;
                    console.log(self.companyList,'终止公司列表123');
                })
                .catch(function(err){
                    console.log(err);
                });
        }
    }
}
</script>

<style scoped>
    .pagination{
        margin-top: 100px;
        text-align: center;
    }
</style>


