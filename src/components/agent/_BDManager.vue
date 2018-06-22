<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span style="margin-right: 30px">BD经理</span>  
            <el-button v-show="mode === 'edit' && status !== 'editing'" @click="handleEdit" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleCancel" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleComplete" type="success" size="mini">完成</el-button>                                               
        </div>
        <el-form :model="innerItem" label-width= "180px" v-show="mode === 'create' || mode === 'edit' && status === 'editing'">                                                           
            <el-form-item label="和服务经理同一人">
                <el-switch
                    v-model="same"
                    @change="handleChange"
                    active-color="#13ce66"
                    inactive-color="#aaa">
                </el-switch>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名">                        
                        <el-input :readonly="same" v-model="name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机号">                        
                        <el-input :readonly="same" v-model="mobile"></el-input>
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row>
                <el-col :span="12">
                    <el-form-item label="微信号">                        
                        <el-input :readonly="same" v-model="wechat"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="邮箱">                        
                        <el-input :readonly="same" v-model="email"></el-input>
                    </el-form-item>
                </el-col>
            </el-row> 
        </el-form>
        <el-form :model="innerItem" label-width= "180px" v-show="mode === 'view' || mode === 'edit' && status === ''">                                                           
            <el-form-item label="和服务经理同一人">
                {{same&&"是"||"否"}}
            </el-form-item>
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
 * BD经理组件
 * TODO:
 *  1. 和服务经理同一人逻辑
 */
    import CollapsePanel from '@/components/common/CollapsePanel';
    import {mapMutations} from 'vuex';
    
    // 服务人员信息
    export default {
        name: "bdManager",
        components: {CollapsePanel},
        props: {
            item: Object,
            serviceManager: Object,
            mode: {
                type: String,
                default: "view"
            }
        },
        data() {
            let innerItem = Object.assign({}, this.item);
            if(this.item.same){
                innerItem = Object.assign({}, this.serviceManager, {same: true});                
            }
            return {
                expand: true,
                status: "",                
                innerItem: innerItem                
            };
        },
        computed: {
            name: {
                get() {
                    if(this.same) {
                        return this.$store.state.ServiceManager.name;
                    }
                    if(this.mode == 'edit' && this.status == 'editing') {// 编辑
                        return this.innerItem.name;
                    }

                    return this.$store.state.BDManager.name;
                },
                set(val) {
                    if(this.mode == 'edit' && this.status == 'editing') {// 编辑
                        this.innerItem.name = val;
                    }else{
                        this.updateName(val);
                    }
                }
            },            
            mobile: {
                get() {
                    if(this.same) {
                        return this.$store.state.ServiceManager.mobile;
                    }
                    if(this.mode == 'edit' && this.status == 'editing') {// 编辑
                        return this.innerItem.mobile;
                    }

                    return this.$store.state.BDManager.mobile;
                },
                set(val) {
                    if(this.mode == 'edit' && this.status == 'editing') {// 编辑
                        this.innerItem.mobile = val;
                    }else{
                        this.updateMobile(val);
                    }
                }
            },
            email: {
                get() {
                    if(this.same) {
                        return this.$store.state.ServiceManager.email;
                    }
                    if(this.mode == 'edit' && this.status == 'editing') {// 编辑
                        return this.innerItem.email;
                    }

                    return this.$store.state.BDManager.email;
                },
                set(val) {
                    if(this.mode == 'edit' && this.status == 'editing') {// 编辑
                        this.innerItem.email = val;
                    }else{
                        this.updateEmail(val);
                    }
                }
            },
            wechat: {
                get() {
                    if(this.same) {
                        return this.$store.state.ServiceManager.wechat;
                    }
                    if(this.mode == 'edit' && this.status == 'editing') {// 编辑
                        return this.innerItem.wechat;
                    }

                    return this.$store.state.BDManager.wechat;
                },
                set(val) {
                    if(this.mode == 'edit' && this.status == 'editing') {// 编辑
                        this.innerItem.name = wechat;
                    }else{
                        this.updateWechat(val);
                    }
                }
            },
            same: {
                get() {
                    if(this.mode == 'edit' && this.status == 'editing') {// 编辑
                        return this.innerItem.same;
                    }

                    return !!this.$store.state.BDManager.same;
                },
                set(val) {
                    if(this.mode == 'edit' && this.status == 'editing') {// 编辑
                        this.innerItem.same = val;
                    }else{
                        this.updateSame(val);
                    }
                }
            }
        },
        methods: {
            handleChange(val) {
                if(!val) {
                    if(this.mode == 'create') {
                        this.name = this.$store.state.ServiceManager.name;
                        this.mobile = this.$store.state.ServiceManager.mobile;
                        this.wechat = this.$store.state.ServiceManager.wechat;
                        this.email = this.$store.state.ServiceManager.email;
                    }
                }
            },
            handleEdit() {
                this.status = 'editing';                
                this.innerItem = Object.assign({}, this.$store.state.BDManager);                
            },
            handleComplete() {
                this.status = ''; 
                // this.$emit('update:item', this.innerItem);
                this.updateItem(this.innerItem);                               
            },
            handleCancel() {
                this.status = '';                              
            },

            ...mapMutations('BDManager', ['updateItem', 'updateName', 'updateWechat', 'updateMobile', 'updateEmail', 'updateSame'])
        },
        watch: {
                        
        }
    }
</script>
<style scoped>

</style>