<!--
    @页面名称：添加跟进页
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
                <el-input type="textarea" v-model="message" rows="10" placeholder="请输入跟进信息"></el-input>
                <div class="gap-2">
                    <upload :fileList.sync='file' :limit="1"></upload>
                </div>
            </div>
            <div style="text-align:center;margin-top:40px;">
                <el-button type="primary" @click="submit">提交</el-button>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb';
import Upload from '@/components/common/Upload';
export default {
    name:'AddFollowUp',
    components:{BreadCrumb,Upload},
    data(){
        return {
            agencyId:this.$route.query.agencyId,
            breadCrumb: [{text:'加盟管理'},{text: "代理商"},{text:'跟进'},{text:'添加跟进'}],
            message:'',
            file:[],
            form:{},//提交的数据
            resource:{
                fileName:'',//上传文件的名
                owner:'',//公司Id
                resourceKey:'',//上传文件的key
            },//上传所需字段
            resourceKey:'',//上传的资源key;
        }
    },
    methods:{
        submit(){
            let self=this;
            console.log(this.message,2222222)
            console.log(this.file.length,1234555555)
            if(this.file.length){
                this.form={
                    agencyId:this.agencyId,
                    message:this.message,
                    resource:{
                        fileName:this.file[0].fileName,//上传文件的名
                        resourceKey:this.file[0].resourceKey,//上传文件的key
                    },
                    resourceKey:this.file[0].resourceKey
                };
            }else{
                this.form={
                    agencyId:this.agencyId,
                    message:this.message
                }
            };
            if(this.message){
                this.$http.put(this.$apiUrl.agent.followUp,this.form)
                .then(function(data){
                    self.message="";
                    self.$message({
                        message: '已提交',
                        type: 'success',
                        duration:1000
                    });
                    setTimeout(function(){
                        self.$router.push({name:"FollowUp",query:{agencyId:self.agencyId}});
                    },1000);
                })
                .catch(function(err){
                    console.log(err)
                })
            }else{
                alert('请填写信息');
            }      
        }
    }
}
</script>

<style>

</style>


