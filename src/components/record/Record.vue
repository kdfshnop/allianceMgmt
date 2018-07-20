<template lang="html">
    <el-table
        :data="isShow"
        border
        style="width: 100%" :row-class-name="setClassName">
        <el-table-column type="expand" >
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand" >
                    <el-form-item :label="item.title" v-for="item in props.row.detail" :key="item.title">
                        <span>{{ item.pre}}-->{{item.now}}</span>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column align="center" label="操作类型" prop="optype"></el-table-column>
        <el-table-column align="center" label="操作人" prop="operatorName"></el-table-column>
        <el-table-column align="center" label="执行结果" prop="result"></el-table-column>
        <el-table-column align="center" label="操作时间" prop="operatetime"></el-table-column>
        <el-table-column align="center" label="备注" prop="remark"></el-table-column>
    </el-table>
</template>

<script>
export default {
    name:"record",
    props:['agencyId'],
    data() {
        return {
            listInfo:[]
        }
    },
    created(){
        let self=this;
        this.$http.get(this.$apiUrl.agent.record+"/"+this.agencyId)
        .then(function(data){
            self.listInfo=data.data.data;
            console.log(self.listInfo,'成功');
        })
        .catch(function(err){
            console.log(err,'错误');
        });
    },
    methods:{
        setClassName({row, index}){
            return row.expand ? 'expand-record' : '';
        },
    },
    computed:{
        // table选项无展开内容时，不展开;
        isShow(){
            // 先遍历数组
            for(var value of this.listInfo){
                var keys=[];//接收对象的key;
                // 遍历对象
                for(var key in value.detail){
                    keys.push(key);
                };
                if(keys.length){
                    value.expand=false;
                }else{
                    value.expand=true;
                }
            };
            console.log(this.listInfo,'日志信息');
            return this.listInfo;
        }
    }
}
</script>

<style scoped>
.demo-table-expand {
   font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>
<style>
.expand-record .el-table__expand-column .cell {
    display: none;
}
</style>
