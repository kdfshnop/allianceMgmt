<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span style="margin-right: 30px">服务经理</span><span style="margin-left: -20px;font-size: 14px; color: #4e4e4e;">(为门店提供各种咨询服务，一般由代理商指派，首次添加后交由代理商维护)</span>            
            <el-button v-show="mode === 'edit' && status !== 'editing'" @click="handleEdit" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleCancel" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleComplete" type="success" size="mini">完成</el-button>                                                
        </div>
        <el-form ref="form" :model="this" label-width= "180px" v-show="mode === 'create' || mode === 'edit' && status === 'editing'" :rules="rules">                                                           
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名">                        
                        <el-input v-model="name" maxlength="20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机号" prop="mobile">                        
                        <el-input v-model="mobile"></el-input>
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row>
                <el-col :span="12">
                    <el-form-item label="微信号">                        
                        <el-input v-model="wechat" maxlength="20"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="邮箱" prop="email">                        
                        <el-input v-model="email"></el-input>
                    </el-form-item>
                </el-col>
            </el-row> 
        </el-form>
        <el-form :model="innerItem" label-width= "180px" v-show="mode === 'view' || mode === 'edit' && status === ''">                                                           
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名">                        
                        {{name}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机号">                        
                        {{mobile}}
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row>
                <el-col :span="12">
                    <el-form-item label="微信号">                        
                        {{wechat}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="邮箱">                        
                        {{email}}
                    </el-form-item>
                </el-col>
            </el-row> 
        </el-form>
    </CollapsePanel>
</template>
<script>
/**
 * 服务经理组件
 * TODO: 
 */
    import CollapsePanel from '@/components/common/CollapsePanel';
    import {mapMutations} from 'vuex';
    import {generateComputed, Validator} from './_Utils';

    // 服务人员信息
    export default {
        name: "serviceManager",
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
                innerItem: Object.assign({}, this.item),
                rules: {
                    mobile: [{
                        validator: Validator.mobile, message: '请输入正确的手机号', trigger: 'blur'
                    }],
                    email: [{
                        type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'
                    }]
                }
            };
        },
        computed: {            
            name: generateComputed("name", "ServiceManager", "updateName"),
            mobile: generateComputed("mobile", "ServiceManager", "updateMobile"),
            wechat: generateComputed("wechat", "ServiceManager", "updateWechat"),
            email: generateComputed("email", "ServiceManager", "updateEmail"),
        },
        methods: {
            handleEdit() {
                this.status = 'editing';                
                this.innerItem = Object.assign({}, this.$store.state.ServiceManager);                
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
            ...mapMutations('ServiceManager',['updateItem', 'updateName', 'updateWechat', 'updateMobile', 'updateEmail'])
        },
        watch: {

        }
    }
</script>
<style scoped>

</style>