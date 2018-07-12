<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span style="margin-right: 30px">合同资料</span>            
            <el-button v-show="mode === 'edit' && status !== 'editing'" @click="handleEdit" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleCancel" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleComplete" type="success" size="mini">完成</el-button>                            
        </div>
        <el-form ref="form" :model="item" label-width= "180px" v-show="mode === 'create' || mode === 'edit' && status === 'editing'">                                    
            <el-form-item label="上传合同">                
                <upload :fileList.sync="contractFileList" v-if="mode === 'create' || mode === 'edit' && status === 'editing'"></upload>
            </el-form-item>            
            <el-form-item label="合同有无盖公章">
                <el-switch
                    v-model="sealed"
                    active-color="#13ce66"
                    inactive-color="#aaa">
                </el-switch>
            </el-form-item>
            <el-form-item label="特殊条款">
                <el-input type="textarea" v-model="special">
                </el-input>
            </el-form-item>

            <!-- 未注册时只显示这个 -->
            <el-form-item label="承诺书上传">                
                    <upload :fileList.sync="promiseFileList" v-if="mode === 'create' || mode === 'edit' && status === 'editing'"></upload>
            </el-form-item>
        </el-form>

        <el-form :model="item" label-width= "180px" v-show="mode === 'view' || mode === 'edit' && status === ''">                                    
            <el-form-item label="上传合同">                
                    <file-list :fileList="contractFileList"></file-list>
            </el-form-item>            
            <el-form-item label="合同有无盖公章">
                {{sealed&&"有"||"无"}}
            </el-form-item>
            <el-form-item label="特殊条款">
                {{special}}
            </el-form-item>

            <!-- 未注册时只显示这个 -->
            <el-form-item label="承诺书上传">                
                <file-list :fileList="promiseFileList"></file-list>
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
    import {generateComputed} from './_Utils';
    import {mapMutations} from 'vuex';
    // 服务人员信息
    export default {
        name: "contractInfo",
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
                innerItem: {

                },
            };
        },
        methods: {
            handleEdit() {
                this.status = 'editing';                
                this.innerItem = JSON.parse(JSON.stringify(this.$store.state.ContractInfo || {}));          
            },
            handleComplete() {
                this.status = '';
                this.updateItem(this.innerItem);                                
            },
            handleCancel() {
                this.status = '';               
            },
            validate(fn) {
                this.$refs.form.validate(fn);
            },

            ...mapMutations("ContractInfo", ['updateItem', 'updateContractFileList', 'updateSealed', 'updateSpecial', 'updatePromiseFileList'])
        },
        computed: {
            contractFileList: generateComputed("contractFileList", "ContractInfo", "updateContractFileList"),
            sealed: generateComputed("sealed", "ContractInfo", "updateSealed"),
            special: generateComputed("special", "ContractInfo", "updateSpecial"),
            promiseFileList: generateComputed("promiseFileList", "ContractInfo", "updatePromiseFileList"),
        },
        watch: {
            
        }
    }
</script>
<style scoped>

</style>