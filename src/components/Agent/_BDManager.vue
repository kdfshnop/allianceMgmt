<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span style="margin-right: 30px">BD经理</span>  
            <el-button v-show="mode === 'edit' && status !== 'editing'" @click="handleEdit" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleCancel" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleComplete" type="success" size="mini">完成</el-button>                                               
        </div>
        <el-form :model="item" label-width= "180px" v-show="mode === 'create' || mode === 'edit' && status === 'editing'">                                                           
            <el-form-item label="和服务经理同一人">
                <el-switch
                    v-model="item.same"
                    active-color="#13ce66"
                    inactive-color="#aaa">
                </el-switch>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名">                        
                        <el-input v-model="item.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机号">                        
                        <el-input v-model="item.mobile"></el-input>
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row>
                <el-col :span="12">
                    <el-form-item label="微信号">                        
                        <el-input v-model="item.wx"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="邮箱">                        
                        <el-input v-model="item.email"></el-input>
                    </el-form-item>
                </el-col>
            </el-row> 
        </el-form>
        <el-form :model="item" label-width= "180px" v-show="mode === 'view' || mode === 'edit' && status === ''">                                                           
            <el-form-item label="和服务经理同一人">
                {{item.same==1?"是":"否"}}
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名">                        
                        {{item.name}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机号">                        
                        {{item.mobile}}
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row>
                <el-col :span="12">
                    <el-form-item label="微信号">                        
                        {{item.wx}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="邮箱">                        
                        {{item.email}}
                    </el-form-item>
                </el-col>
            </el-row> 
        </el-form>
    </CollapsePanel>
</template>
<script>
/**
 * BD经理组件
 * TODO:
 *  1. 和服务经理同一人逻辑
 */
    import CollapsePanel from '@/components/common/CollapsePanel';
    // 服务人员信息
    export default {
        name: "bdManager",
        components: {CollapsePanel},
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

                }
            };
        },
        methods: {
            handleEdit() {
                this.status = 'editing';
                this.originalItem = this.item;
                this.item = Object.assign({}, this.item);                
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