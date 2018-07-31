<!--
    @页面名称：门店终止合作汇总
    @作者：豆亚东 (douyadong@lifang.com)
    @业务逻辑说明：
        1.
        2.        
-->
<template>
    <div>
        <div class="search-result">共搜索到{{storeList.total}}条数据</div>
        <el-table :data="storeList.data" border style="width: 100%">
            <el-table-column prop="name" label="门店名称" align="center" >
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
                :total="storeList.total">
            </el-pagination>
        </div>
        <store-detail ref="storeDetail"></store-detail>
    </div>
</template>

<script>
import StoreDetail from '@/components/teamEnd/_StoreDetail';
export default {
    name:'StoreEndList',
    components:{StoreDetail},
    data(){
        return{
            storeList:{},//门店信息;
            // 分页功能
            pagination:{
                currentPage:1,//默认当前页为1;
                pageSize:10,//默认显示10条
            }
        }
    },
    created(){
        this.requestList();
    },
    methods:{
        // 查看代理商详情;
        detail(index,row){
            // 获取门店Id;
            this.storeId=row.id;
            this.$refs.storeDetail.open(this.storeId);
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
        // 终止门店列表;
        requestList(){
            let self=this;
            let form={
                currentPage:this.pagination.currentPage,
                pageSize:this.pagination.pageSize,
                type:"3"
            }
            this.$http.post(this.$apiUrl.teamEnd.tabList,form,{
                loading: {
                    fullscreen: true
                }
            })
                .then(function(data){
                    self.storeList=data.data.data;
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
    .search-result{
        margin:50px 0 20px 0;
    }
</style>


