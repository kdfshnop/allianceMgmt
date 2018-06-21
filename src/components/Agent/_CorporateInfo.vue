<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span style="margin-right: 30px">法人信息</span>      
            <el-button v-show="mode === 'edit' && status !== 'editing'" @click="handleEdit" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleCancel" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleComplete" type="success" size="mini">完成</el-button>                                  
        </div>
        <el-form :model="item" label-width= "180px" v-show="mode === 'create' || mode === 'edit' && status === 'editing'">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="法人姓名">
                        <el-input v-model="item.name"></el-input>
                    </el-form-item>
                    <el-form-item label="法人手机号">
                        <el-input v-model="item.mobile"></el-input>
                    </el-form-item>

                    <el-form-item label="芝麻信用分">
                        <el-input v-model="item.score"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">                    
                    <el-form-item label="法人身份证">
                        <el-input v-model="item.idCard"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="法人邮箱">
                        <el-input v-model="item.email"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
                        
            <el-form-item label="上传身份证正面照">                
                    <upload v-if="mode === 'create' || mode === 'edit' && status === 'editing'"></upload>
            </el-form-item>
            <el-form-item label="上传身份证反面照">                
                    <upload v-if="mode === 'create' || mode === 'edit' && status === 'editing'"></upload>
            </el-form-item>
            <el-form-item label="上传芝麻信用截图">                
                    <upload v-if="mode === 'create' || mode === 'edit' && status === 'editing'"></upload>
            </el-form-item>
        </el-form>

        <el-form :model="item" label-width= "180px" v-show="mode === 'view' || mode === 'edit' && status === ''">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="法人姓名">
                        {{item.name}}
                    </el-form-item>
                    <el-form-item label="法人手机号">
                        {{item.mobile}}
                    </el-form-item>

                    <el-form-item label="芝麻信用分">
                        {{item.score}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">                    
                    <el-form-item label="法人身份证">
                        {{item.idCard}}
                    </el-form-item>
                    
                    <el-form-item label="法人邮箱">
                        {{item.email}}
                    </el-form-item>
                </el-col>
            </el-row>
                        
            <el-form-item label="上传身份证正面照">                
                    <!-- <upload></upload> -->
                    <file-list></file-list>
            </el-form-item>
            <el-form-item label="上传身份证反面照">                
                    <file-list></file-list>
            </el-form-item>
            <el-form-item label="上传芝麻信用截图">                
                    <file-list></file-list>
            </el-form-item>
        </el-form>
    </CollapsePanel>
</template>
<script>
/**
 * 合伙人信息组件
 */
    import CollapsePanel from '@/components/common/CollapsePanel';
    import Upload from '@/components/common/Upload';
    import FileList from '@/components/common/FileList';
    // 服务人员信息
    export default {
        name: "corporateInfo",
        components: {CollapsePanel, Upload, FileList},
        props: {
            item: Object,
            mode: {
                type: String,
                default: "view"
            }
        },
        data() {
            return {
                expand: true,
                status: "",
                originalItem: {

                },
            };
        },
        methods: {
            handleEdit() {
                this.status = 'editing';
                this.originalItem = this.item;
                this.item = JSON.parse(JSON.stringify(this.item || {}));          
            },
            handleComplete() {
                this.status = '';                                
            },
            handleCancel() {
                this.status = '';
                this.item = this.originalItem;                
            }
        },
        watch: {
            
        }
    }
</script>
<style scoped>

</style>