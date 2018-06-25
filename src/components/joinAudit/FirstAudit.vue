<template>
    <el-container>
        <el-main>    
            <bread-crumb :items="breadCrumb"></bread-crumb>
            <div class="tabs">
                <div class="tab" :class="{agent:agent}" @click="agentTab">
                    <p class="account">12</p>
                    <p>待审核代理商</p>
                </div>
                <div class="tab" :class="{company:company}" @click="companyTab">
                    <p class="account">100</p>
                    <p>已驳回</p>
                </div>
                <div class="tab" :class="{store:store}" @click="storeTab">
                    <p class="account">128</p>
                    <p>通过</p>
                </div>
                <p style="clear:both;"></p>
            </div>
            <div class="search-result" >共搜索到 956条数据</div>
            <el-table :data="searInfoList" border style="width: 100%">
                <el-table-column prop="name" label="代理商公司名称" align="center" ></el-table-column>
                <el-table-column prop="submitPeople" label="地区" align="center" ></el-table-column>
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
        </el-main>
    </el-container>
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb';

export default {
    name:'FirstAudit',
    components:{BreadCrumb},
    data(){
        return {
            breadCrumb: [{text:'首次加盟审核'},{text: "资料审核"}],
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
        //审核
        audit(){}
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
    .circle{
        background-color: #409EFF;
        border-radius: 50%;
        display: inline-block;
        margin-right: 2px;
        height: 5px;
        width:5px;
    }
</style>


