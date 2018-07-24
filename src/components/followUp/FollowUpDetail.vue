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
          <div class="gap">
                <div>跟进信息：</div>
                <div style="padding-left:75px;">{{message}}</div>
                <div class="gap-2" v-if="fileName">上传资料：{{fileName}}</div>                                  
                    <file-list :fileList="fileList"></file-list>              
            </div>
            <div style="text-align:center;margin-top:40px;">
                <el-button type="primary" @click="back">返回</el-button>
            </div>
      </el-main>
  </el-container>
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb';
import FileList from '@/components/common/FileList';

export default {
    name:'FollowUpDetail',
    components:{BreadCrumb, FileList},
    data(){
        return {
            breadCrumb: [{text:'加盟管理'},{text: "代理商"},{text:'跟进'},{text:'跟进详情'}],
            message:'',
            fileName:'',//文件名
            fileList:[],
            id:this.$route.query.id
        }
    },
    created(){
        let self=this;
        this.$http.get(this.$apiUrl.agent.followUp+"?id="+this.id)
            .then(function(data){
                if(data.data.data.resource){
                    self.fileName=data.data.data.resource.fileName;
                    self.fileList=[data.data.data.resource];
                }; 
                self.message=data.data.data.message;
            })
            .catch(function(err){
                console.log(err);
            })
    },
    methods:{
        back(){
            history.back();
        } 
    }
}
</script>

<style>

</style>


