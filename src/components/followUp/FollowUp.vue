<!--
    @页面名称：跟进页
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
                <el-button type="primary">返回</el-button>
                <el-button type="primary" @click="addFollowUp">+添加跟进</el-button>
            </div>
            <el-table :data="mockData" border style="width: 100%">
                <el-table-column prop="time" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="addPeople" label="添加人" align="center" ></el-table-column>
                <el-table-column prop="name" label="中介公司全称" align="center" ></el-table-column>
                <el-table-column prop="info" label="信息" align="center" ></el-table-column>
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
            mockData:[
                {
                    addPeople:'豆豆',
                    time:'2015-03-02',
                    name:'上海好居',
                    info:'今天去拜访了，但是谈的条件比较严格，还要回来继续讨……',
                    id:'1'
                },
                {
                    addPeople:'豆豆',
                    time:'2015-03-02',
                    name:'上海好居',
                    info:'今天去拜访了，但是谈的条件比较严格，还要回来继续讨……',
                    id:2
                },
                {
                    addPeople:'豆豆',
                    time:'2015-03-02',
                    name:'上海好居',
                    info:'今天去拜访了，但是谈的条件比较严格，还要回来继续讨……',
                    id:3
                }
            ]
        }
    },
    methods:{
        addFollowUp(){
            this.$router.push({name:'AddFollowUp'});
        },
        detail(index,row){
            this.$router.push({name:'FollowUpDetail',params:{id:row.id}});
        }
    }
}
</script>

<style>

</style>


