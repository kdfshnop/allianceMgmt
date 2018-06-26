<template>
    <el-container>
        <el-main>
            <el-table :data="recordData" border style="width: 100%">
                <el-table-column prop="title" label="操作类型" align="center" >
                </el-table-column>
                <el-table-column prop="name" label="城市" align="center" ></el-table-column>
                <el-table-column prop="address" label="公司全称" align="center" ></el-table-column>
                <el-table-column prop="address" label="公司简称" align="center" ></el-table-column>
                <el-table-column prop="address" label="代理商公司" align="center"></el-table-column>
                <el-table-column prop="name" label="有效期始" align="center"></el-table-column>
                <el-table-column prop="name" label="有效期止" align="center"></el-table-column>
                <el-table-column prop="name" label="bd" align="center"></el-table-column>
                <el-table-column prop="name" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="name" label="创建人" align="center"></el-table-column>
                <el-table-column prop="name" label="操作" width="300px" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="editorCompany(scope.$index, scope.row)" type="text">编辑|</el-button>
                        <el-button size="mini" @click="bankAccount(scope.$index, scope.row)" type="text">分佣账号设置|</el-button>
                        <el-button size="mini"  type="text" @click="firstDialogVisible = true,handleEnd(scope.$index, scope.row)">终止合作</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="门店" align="center"></el-table-column>
            </el-table>
            <div class="gap-2">
                代理商姓名：张三-->李四;上传合同资料 xxx.jpg  
            </div>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name:'Record',
    data(){
        return {
             tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
        }
    },
    computed:{
        recordData(){
            let hd=['创建','资料审核','平台服务费审核','编辑资料'];
            this.tableData.forEach(function(v,i){
                v.title=hd[i];
            });
            return this.tableData;
        }
    }
}
</script>

<style>

</style>

