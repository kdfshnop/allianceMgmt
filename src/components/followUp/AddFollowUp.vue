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
                <el-input type="textarea" v-model="remark" rows="10" placeholder="请输入跟进信息"></el-input>
                <el-upload
                    class="upload-demo gap-2"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed">
                    <el-button size="small" type="primary">资料上传</el-button>
                    <div slot="tip" class="el-upload__tip">(上传附件的格式后缀名为txt,doc,docx,xls,xlsx,ppt,pptx,pdf,jpg,jpeg,png,gif,rar,zip)</div>
                </el-upload>
            </div>
            <div style="text-align:center;margin-top:40px;">
                <el-button type="primary" @click="submit">提交</el-button>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb';
export default {
    name:'AddFollowUp',
    components:{BreadCrumb},
    data(){
        return {
            breadCrumb: [{text:'加盟管理'},{text: "代理商"},{text:'跟进'},{text:'添加跟进'}],
            remark:'',
        }
    },
    methods:{
        submit(){
            this.getNowFormatDate();
            console.log(this.currentdate,2222)
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


