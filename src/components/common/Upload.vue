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
        :file-list="fl"
        multiple
        >
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
            url: Vue.apiUrl.getFullUrl(Vue.apiUrl.upload),            
            innerFileList: this.fileList && this.fileList.slice() || [],
            fl: (this.fileList && this.fileList.slice() || []).map(f=>{
                let tmp = Object.assign({}, f);
                tmp.name = tmp.fileName;
                return tmp;
            }),
            name: ""
        };
    },
    methods: {
        handlePreview() {

        },
        handleRemove(data) {            
            for(let i = this.innerFileList.length - 1; i >= 0; i--){
                if(this.innerFileList[i].url == data.url || this.innerFileList[i].uid == data.uid){
                    this.innerFileList.splice(i, 1);  
                    this.$emit('update:fileList', this.innerFileList);                  
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
            this.innerFileList.push({
                // name: data.name,
                // url: data.url,
                uid: data2.uid,
                // key: data.key
                ...data.data
            });
            this.$emit('update:fileList', this.innerFileList);
        },
        beforeUpload(data) {
            this.name = data.name;
            //console.log('beforeUpload；', data);
        }
    }
}
</script>
<style>

</style>


