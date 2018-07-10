<!--
    @页面名称：跟进列表页
    @作者：豆亚东 (douyadong@lifang.com)
    @业务逻辑说明：
        1.代理商、公司、门店列表页终止合作后信息流转至该页面，进行审核
        2.        
-->
<template>
    <el-container>
        <el-main>
            <bread-crumb :items="breadCrumb"></bread-crumb>
            <div style="text-align:right;margin-bottom:50px;">
                <el-button type="primary" @click="goBack">返回</el-button>
                <el-button type="primary" @click="addFollowUp">+添加跟进</el-button>
            </div>
            <el-table :data="apiData" border style="width: 100%">
                <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="operator" label="添加人" align="center" ></el-table-column>
                <el-table-column prop="message" label="信息" align="center" ></el-table-column>
                <el-table-column  label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="detail(scope.$index,scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb';
export default {
    name:"FollowUp",
    components:{BreadCrumb},
    data(){
        return {
            breadCrumb:[{text:'加盟管理'},{text:'代理商'},{text:'跟进'}],
            agencyId:this.$route.query.agencyId,
            apiData:[]
        }
    },
    created(){
        let self=this;
        this.$http.post(this.$apiUrl.agent.followUp,{agencyId:this.agencyId})
            .then(function(data){
                self.apiData=data.data.data;
            })
            .catch(function(err){
                console.log(err,'列表失败');
            })
    },
    methods:{
        addFollowUp(){
            this.$router.push({name:'AddFollowUp',query:{agencyId:this.agencyId}});
        },
        detail(index,row){
            this.$router.push({name:'FollowUpDetail',query:{id:row.id}});
        },
        goBack(){
            history.back();
        }
    }
}
</script>

<style>

</style>


