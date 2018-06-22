<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span style="margin-right: 30px">服务经理</span>           
            <el-button v-show="mode === 'edit' && status !== 'editing'" @click="handleEdit" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleCancel" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleComplete" type="success" size="mini">完成</el-button>                                                
        </div>
        <el-form :model="innerItem" label-width= "180px" v-show="mode === 'create' || mode === 'edit' && status === 'editing'">                                                           
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名">                        
                        <el-input v-model="name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机号">                        
                        <el-input v-model="mobile"></el-input>
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row>
                <el-col :span="12">
                    <el-form-item label="微信号">                        
                        <el-input v-model="wechat"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="邮箱">                        
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
    import {generateComputed} from './_Utils';
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
                innerItem: Object.assign({}, this.item)
            };
        },
        computed: {
            // name: {
            //     get() {
            //         if(this.mode == 'edit' && this.status == 'editing'){// 编辑中
            //             return this.innerItem.name;
            //         }
            //         return this.$store.state.ServiceManager.name;
            //     },
            //     set(val) {
            //         if(this.mode == 'edit' && this.status == 'editing') {
            //             this.innerItem.name = val;
            //         }else {
            //             // this.$store.commit('ServiceManager/updateName', val);
            //             this.updateName(val);
            //         }
            //     }
            // },
            // mobile: {
            //     get() {
            //         if(this.mode == 'edit' && this.status == 'editing'){// 编辑中
            //             return this.innerItem.mobile;
            //         }
            //         return this.$store.state.ServiceManager.mobile;
            //     },
            //     set(val) {
            //         if(this.mode == 'edit' && this.status == 'editing') {
            //             this.innerItem.mobile = val;
            //         }else {
            //             // this.$store.commit('ServiceManager/updateMobile', val);
            //             this.updateMobile(val);
            //         }
            //     }
            // },
            // wechat: {
            //     get() {
            //         if(this.mode == 'edit' && this.status == 'editing'){// 编辑中
            //             return this.innerItem.wechat;
            //         }
            //         return this.$store.state.ServiceManager.wechat;
            //     },
            //     set(val) {
            //         if(this.mode == 'edit' && this.status == 'editing') {
            //             this.innerItem.wechat = val;
            //         }else {
            //             // this.$store.commit('ServiceManager/updateWechat', val);
            //             this.updateWechat(val);
            //         }
            //     }
            // },
            // email: {
            //     get() {
            //         if(this.mode == 'edit' && this.status == 'editing'){// 编辑中
            //             return this.innerItem.email;
            //         }
            //         return this.$store.state.ServiceManager.email;
            //     },
            //     set(val) {
            //         if(this.mode == 'edit' && this.status == 'editing') {
            //             this.innerItem.email = val;
            //         }else {
            //             // this.$store.commit('ServiceManager/updateEmail', val);
            //             this.updateEmail(val);
            //         }
            //     }
            // }
            name: generateComputed("name", "BDManager", "updateName"),
            mobile: generateComputed("mobile", "BDManager", "updateMobile"),
            wechat: generateComputed("wechat", "BDManager", "updateWechat"),
            email: generateComputed("email", "BDManager", "updateEmail"),
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
            ...mapMutations('ServiceManager',['updateItem', 'updateName', 'updateWechat', 'updateMobile', 'updateEmail'])
        },
        watch: {

        }
    }
</script>
<style scoped>

</style>