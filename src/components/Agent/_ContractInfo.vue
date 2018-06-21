<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span style="margin-right: 30px">合同资料</span>            
            <el-button v-show="mode === 'edit' && status !== 'editing'" @click="handleEdit" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleCancel" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleComplete" type="success" size="mini">完成</el-button>                            
        </div>
        <el-form :model="item" label-width= "180px" v-show="mode === 'create' || mode === 'edit' && status === 'editing'">                                    
            <el-form-item label="上传合同">                
                    <upload v-if="mode === 'create' || mode === 'edit' && status === 'editing'"></upload>
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
                    <upload v-if="mode === 'create' || mode === 'edit' && status === 'editing'"></upload>
            </el-form-item>
        </el-form>

        <el-form :model="item" label-width= "180px" v-show="mode === 'view' || mode === 'edit' && status === ''">                                    
            <el-form-item label="上传合同">                
                    <file-list></file-list>
            </el-form-item>            
            <el-form-item label="合同有无盖公章">
                {{item.sealed&&"有"||"无"}}
            </el-form-item>
            <el-form-item label="特殊条款">
                {{item.special}}
            </el-form-item>

            <!-- 未注册时只显示这个 -->
            <el-form-item label="承诺书上传">                
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