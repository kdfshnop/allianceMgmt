<template>
    <el-upload
        class="upload-demo"
        :action="url"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-success="handleSuccess"
        :on-change="handleChange"
        :before-upload="beforeUpload"        
        :multiple="multiple"
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="innerFileList">
        <el-button size="small" type="primary">{{ btnText || '点击上传'}}</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
</template>
<script>
/**
 * 封装上传组件，把一些通用的属性隐藏掉，比如上传接口
 * TODO:
 *  1. xxxx
 */
import Vue from 'vue';
export default {
    name: "upload",
    props: ['fileList', 'btnText', 'tipText', 'mode', 'status', 'multiple'],// mode暂时没用到,status会是editing和空
    data() {
        return {
            // url: Vue.apiUrl.getFullUrl(Vue.apiUrl.upload),
            url: this.$apiUrl.upload,
            innerFileList: this.filterList && this.fileList.slice() || []
        };
    },
    methods: {
        handlePreview() {

        },
        handleRemove(data) {            
            for(let i = this.fileList.length - 1; i >= 0; i--){
                if(this.fileList[i].url == data.url || this.fileList[i].uid == data.uid){
                    this.fileList.splice(i, 1);                    
                    break;
                }
            }
        },
        beforeRemove() {
            
        },
        handleExceed() {
            this.$message.warning("超过了限制");
        },
        handleChange() {

        },
        handleSuccess(data, data2) {
            // TODO: 上传接口需要返回文件的名字和文件的地址            
            this.fileList.push({
                name: data.name,
                url: data.url,
                uid: data2.uid
            });
        },
        beforeUpload(data) {
            
        }
    }
}
</script>
<style>

</style>


