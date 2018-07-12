<!--
    @页面名称：跟进详情页
    @作者：豆亚东 (douyadong@lifang.com)
    @业务逻辑说明：
        1.
        2.        
-->
<template>
  <el-container>
      <el-main>
          <bread-crumb :items="breadCrumb"></bread-crumb>
          <div class="gap-2">
                <div>跟进信息：</div>
                <div style="padding-left:75px;">{{message}}</div>
                <div class="gap-2" v-if="fileName">上传资料：{{fileName}}</div>
            </div>
            <div style="text-align:center;margin-top:40px;">
                <el-button type="primary" @click="back">返回</el-button>
            </div>
      </el-main>
  </el-container>
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb';
export default {
    name:'FollowUpDetail',
    components:{BreadCrumb},
    data(){
        return {
            breadCrumb: [{text:'加盟管理'},{text: "代理商"},{text:'跟进'},{text:'跟进详情'}],
            message:'',
            fileName:'',//文件名
            id:this.$route.query.id
        }
    },
    created(){
        let self=this;
        this.$http.get(this.$apiUrl.agent.followUp+"?id="+this.id)
            .then(function(data){
                self.fileName=data.data.data.resource.fileName;
                self.message=data.data.data.message;
            })
            .catch(function(err){
                console.log(err);
            })
    },
    methods:{
        back(){
            history.back();
        },
        //   上传附件的方法;
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        } 
    }
}
</script>

<style>

</style>


