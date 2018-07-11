<template lang="html">
    <el-table
        :data="listInfo"
        border
        style="width: 100%">
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item :label="item.title" v-for="item in props.row.detail" :key="item.title">
                        <span>{{ item.pre}}-->{{item.now}}</span>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column align="center" label="操作类型" prop="operatortype"></el-table-column>
        <el-table-column align="center" label="操作人" prop="operator"></el-table-column>
        <el-table-column align="center" label="执行结果" prop="result"></el-table-column>
        <el-table-column align="center" label="操作时间" prop="operatetime"></el-table-column>
        <el-table-column align="center" label="备注" prop="remark"></el-table-column>
    </el-table>
</template>

<script>
export default {
    data() {
        return {
            listInfo:[],
        }
    },
    created(){
        let self=this;
        this.$http.get(this.$apiUrl.agent.record+"/1")
        .then(function(data){
            self.listInfo=data.data.data;
            self.listInfo=[
                {
                    "id": 1,
                    "agencyid": 1,
                    "optype": "测试",
                    "operator": "刘哥",
                    "operatortype": "编辑资料",
                    "result": "成功",
                    "operatetime": "2018-07-03 13:54:06",
                    "remark": "审核不通过,资料填写过于简单",
                    "detail": [
                        {
                            "title": "名字",
                            "pre": "小刘",
                            "now": "小豆"
                        },
                        {
                            "title":'上传资料',
                            "pre":'xxx.jpg',
                            "now":"yyy.png"
                        },
                        {
                            "title":'门店',
                            "pre":'上海',
                            "now":"商丘"
                        },
                        {
                            "title":'佣金',
                            "pre":'100',
                            "now":"10000"
                        }
                    ]
                },
                {
                    "id": 1,
                    "agencyid": 1,
                    "optype": "测试",
                    "operator": "刘哥",
                    "operatortype": "编辑资料",
                    "result": "成功",
                    "operatetime": "2018-07-03 13:54:06",
                    "remark": "审核不通过,资料填写过于简单",
                    // "detail": [
                    //     {
                    //         "title": "名字",
                    //         "pre": "小刘",
                    //         "now": "小豆"
                    //     },
                    //     {
                    //         "title":'上传资料',
                    //         "pre":'xxx.jpg',
                    //         "now":"yyy.png"
                    //     },
                    //     {
                    //         "title":'门店',
                    //         "pre":'上海',
                    //         "now":"商丘"
                    //     },
                    //     {
                    //         "title":'佣金',
                    //         "pre":'100',
                    //         "now":"10000"
                    //     }
                    // ]
                }
            ];
            console.log(self.listInfo,'成功');
        })
        .catch(function(err){
            console.log(err,'错误');
        });
    },
    methods:{
        
    },
    mounted() {
        
    }
}
</script>

<style lang="css">
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