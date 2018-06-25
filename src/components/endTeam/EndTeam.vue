<template>
    <el-container>
        <el-main>    
            <bread-crumb :items="breadCrumb"></bread-crumb>
            <div class="tabs">
                <div class="tab" :class="{agent:agent}" @click="agentTab">
                    <p class="account">12</p>
                    <p>代理商</p>
                </div>
                <div class="tab" :class="{company:company}" @click="companyTab">
                    <p class="account">100</p>
                    <p>公司</p>
                </div>
                <div class="tab" :class="{store:store}" @click="storeTab">
                    <p class="account">128</p>
                    <p>门店</p>
                </div>
                <p style="clear:both;"></p>
            </div>
            <div class="search-result" >共搜索到 956条数据</div>
            <el-table :data="searInfoList" border style="width: 100%">
                <el-table-column prop="name" label="代理商名称" align="center" ></el-table-column>
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
                    :page-sizes="[10, 2, 3, 400]"
                    :page-size="pagination.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination.total">
                </el-pagination>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb';

export default {
    name:'endTeam',
    components:{BreadCrumb},
    data(){
        return {
            breadCrumb: [{text:'加盟管理'},{text: "终止合作"}],
            agent:true,
            company:false,
            store:false,
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
    computed:{
        //分页显示多少条数据
        searInfoList(){
            if(this.company){
                return this.tableData.slice((this.pagination.currentPage-1)*this.pagination.pageSize,this.pagination.currentPage*this.pagination.pageSize);
            };
            if(this.agent){
                return this.tableData.slice((this.pagination.currentPage-1)*this.pagination.pageSize,this.pagination.currentPage*this.pagination.pageSize);
            };
            if(this.store){
                return this.tableData.slice((this.pagination.currentPage-1)*this.pagination.pageSize,this.pagination.currentPage*this.pagination.pageSize);
            }       
        }
    },
    methods:{
        agentTab(){
            this.agent=true;
            this.company=false;
            this.store=false;
            this.pagination.currentPage=1;
            this.pagination.pageSize=10;
        },
        companyTab(){
            this.agent=false;
            this.company=true;
            this.store=false;
            this.pagination.currentPage=1;
            this.pagination.pageSize=10;
        },
        storeTab(){
            this.agent=false;
            this.company=false;
            this.store=true;
            this.pagination.currentPage=1;
            this.pagination.pageSize=10;
        },
        //每页多少条
        handleSizeChange(val) {
            this.pagination.pageSize=val;
        },
        //当前页
        handleCurrentChange(val) {
            this.pagination.currentPage=val;
        },
    }
}
</script>

<style>
    p{
        line-height: 40px;
        margin:0;
    }
    .tabs{
        margin-top: 50px;
        margin-left: 50px;
    }
    .tabs div{
        border: 1px solid black;
        float: left;
        height:80px;
        text-align: center;
        width:120px;
    }
    .tab +.tab{
        margin-left: 50px;
    }
    .account{
        color:green;
    }
    .agent{
        border: 1px solid red!important;
    }
    .agent .account{
        color:red;
    }
    .company{
        border: 1px solid red!important;
    }
    .company .account{
        color:red;
    }
    .store{
        border: 1px solid red!important;
    }
    .store .account{
        color:red;
    }
    .search-result{
        margin:50px 0 20px 0;
    }
    .block{
        margin-top: 100px;
        text-align: center;
    }
</style>


