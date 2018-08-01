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
        :limit="limit || 10"
        :on-exceed="handleExceed"
        :file-list="fl" 
        list-type="picture"       
        >
        <el-button size="small" type="primary">{{ btnText || '点击上传'}}</el-button>
        <div slot="tip" class="el-upload__tip">{{ tipText || '只能上传图片文件(jpg/jpeg/gif/png/bmp)，且不超过2M'}}</div>
    </el-upload>
</template>
<script>
/**
 * 封装上传组件，把一些通用的属性隐藏掉，比如上传接口
 */
import Vue from 'vue';
export default {
    name: "upload",
    // fileValidator是一个函数，接收的是file对象，跟beforeUpload一样，返回是一个对象，包含status和message,status=1表示成功
    props: ['fileList', 'btnText', 'tipText', 'mode', 'status', 'multiple', 'limit', 'fileValidator'],// mode暂时没用到,status会是editing和空
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
            this.innerFileList.push({
                uid: data2.uid,                
                ...data.data
            });
            this.$emit('update:fileList', this.innerFileList);
        },        
        beforeUpload(file) {
            // 默认只支持图片，可以自己通过扩展fileTypeValidator来支持别的类型
            let ret = true;
            if(this.fileValidator) {                
                let result = this.fileValidator(file);
                if(result.status != 1) {// 1表示成功
                    this.$message.error(result.message || "不支持此类型的文件");                    
                    ret = false;
                }                
            }else{
                let isImg = file.type.indexOf('image') > -1;
                let isLt2M = file.size / 1024 / 1024 < 2;
                 if(!isImg) {
                    this.$message.error('只能上传图片哦^_^');  
                    ret = false;              
                }
                if(!isLt2M) {
                    this.$message.error('文件大小不能超过2M:-)');
                    ret = false;
                }
            }
            // let isPdf = file.type.indexOf('pdf') > -1;
            
            this.name = file.name; 
            return ret;           
        }
    }
}
</script>
<style>

</style>


