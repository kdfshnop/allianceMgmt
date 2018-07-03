<!--
    @页面名称：代理商、公司、门店审核终止合作页
    @作者：豆亚东 (douyadong@lifang.com)
    @业务逻辑说明：
        1.代理商、公司、门店列表页终止合作后信息流转至该页面，进行审核
        2.        
-->
<template>
    <el-container>
        <el-main>    
            <bread-crumb :items="breadCrumb"></bread-crumb>
            <div class="tabs">
                <div class="tab" :class="{wait:wait}" @click="agentTab">
                    <p class="account">12</p>
                    <p>待审核代理商</p>
                </div>
                <div class="tab" :class="{reject:reject}" @click="companyTab">
                    <p class="account">100</p>
                    <p>已驳回</p>
                </div>
                <div class="tab" :class="{pass:pass}" @click="storeTab">
                    <p class="account">128</p>
                    <p>通过</p>
                </div>
                <p style="clear:both;"></p>
            </div>
            <!--待审核-->
            <wait-audit v-if="wait"></wait-audit>
            <!--审核不通过-->
            <audit-no-pass v-if="reject"></audit-no-pass>
            <!--审核通过-->
            <audit-pass v-if="pass"></audit-pass>
        </el-main>
    </el-container>
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb';
import WaitAudit from '@/components/professionEnd/_WaitAudit';
import AuditNoPass from '@/components/professionEnd/_AuditNoPass';
import AuditPass from '@/components/professionEnd/_AuditPass';

export default {
    name:'ProfessionEndResult',
    components:{BreadCrumb,WaitAudit,AuditNoPass,AuditPass},
    data(){
        return {
            breadCrumb: [{text:'业务审核'},{text: "终止合作"}],
            wait:true,
            reject:false,
            pass:false,
        }
    },
    methods:{
        agentTab(){
            this.wait=true;
            this.reject=false;
            this.pass=false;
        },
        companyTab(){
            this.wait=false;
            this.reject=true;
            this.pass=false;
        },
        storeTab(){
            this.wait=false;
            this.reject=false;
            this.pass=true;
        }
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
    .wait{
        border: 1px solid red!important;
    }
    .wait .account{
        color:red;
    }
    .reject{
        border: 1px solid red!important;
    }
    .reject .account{
        color:red;
    }
    .pass{
        border: 1px solid red!important;
    }
    .pass .account{
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


