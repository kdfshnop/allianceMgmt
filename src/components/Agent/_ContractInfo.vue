<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span>合同资料</span>            
        </div>
        <el-form :model="item" label-width= "180px">                                    
            <el-form-item label="上传合同">
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
            </el-form-item>            
            <el-form-item label="合同有无盖公章">
                <el-switch
                    v-model="item.sealed"
                    active-color="#13ce66"
                    inactive-color="#aaa">
                </el-switch>
            </el-form-item>
            <el-form-item label="特殊条款">
                <el-input type="textarea" v-model="item.special">

                </el-input>
            </el-form-item>

            <!-- 未注册时只显示这个 -->
            <el-form-item label="承诺书上传">
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
            </el-form-item>
        </el-form>
    </CollapsePanel>
</template>
<script>
/**
 * 合伙人信息组件
 */
    import CollapsePanel from '@/components/common/CollapsePanel';
    // 服务人员信息
    export default {
        name: "corporateInfo",
        components: {CollapsePanel},
        props: ['item', 'mode'],
        data() {
            return {
                expand: true
            };
        },
        methods: {
            
        },
        watch: {
            
        }
    }
</script>
<style scoped>

</style>