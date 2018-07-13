<!--
    @页面名称：终止合作汇总页
    @作者：豆亚东 (douyadong@lifang.com)
    @业务逻辑说明：
        1.代理商公司，中介公司，门店经过审核之后，同意终止合作后的信息汇总
        2.        
-->
<template>
    <el-container>
        <el-main>    
            <bread-crumb :items="breadCrumb"></bread-crumb>
            <div class="tabs">
                <div class="tab" :class="{agent:agent}" @click="agentTab">
                    <p class="account">{{endTotal.terminatedAgency}}</p>
                    <p>代理商</p>
                </div>
                <div class="tab" :class="{company:company}" @click="companyTab">
                    <p class="account">{{endTotal.terminatedCompany}}</p>
                    <p>公司</p>
                </div>
                <div class="tab" :class="{store:store}" @click="storeTab">
                    <p class="account">{{endTotal.terminatedStore}}</p>
                    <p>门店</p>
                </div>
                <p style="clear:both;"></p>
            </div>
            <!--代理商终止合作列表-->
            <agent-end-list v-if="agent"></agent-end-list>
            <!--公司终止合作列表-->
            <company-end-list v-if="company"></company-end-list>
            <!--门店终止合作列表-->
            <store-end-list v-if="store"></store-end-list>
        </el-main>
    </el-container>
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb';
import AgentEndList from '@/components/teamEnd/_AgentEndList';
import CompanyEndList from '@/components/teamEnd/_CompanyEndList';
import StoreEndList from '@/components/teamEnd/_StoreEndList';

export default {
    name:'TeamEnd',
    components:{BreadCrumb,AgentEndList,CompanyEndList,StoreEndList},
    data(){
        return {
            breadCrumb: [{text:'加盟管理'},{text: "终止合作"}],
            agent:true,
            company:false,
            store:false,
            endTotal:{},//代理商，门店，公司终止合作汇总;
            label:'代理商民称',
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
    created(){
        let self=this;
        this.$http.get(this.$apiUrl.teamEnd.summary)
            .then(function(data){
                self.endTotal=data.data.data;
            })
            .catch(function(err){
                console.log(err);
            });
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
            this.label="代理商名称";
            this.pagination.currentPage=1;
            this.pagination.pageSize=10;
        },
        companyTab(){
            this.agent=false;
            this.company=true;
            this.store=false;
            this.label="公司名称";
            this.pagination.currentPage=1;
            this.pagination.pageSize=10;
        },
        storeTab(){
            this.agent=false;
            this.company=false;
            this.store=true;
            this.label="门店名称";
            this.pagination.currentPage=1;
            this.pagination.pageSize=10;
        },
        // 查看详情;
        detail(){
            // 代理商详情;
            if(this.agent){};
            // 公司详情;
            if(this.company){};
            // 门店详情;
            if(this.store){};
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


