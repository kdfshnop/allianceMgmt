<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span style="margin-right: 30px">分佣账号</span> <span v-show="mode=='view'" style="margin-left: -20px;font-size: 14px; color: #4e4e4e;">(代理商接受返佣的银行账户)</span>  
            <el-button v-show="mode === 'edit' && status !== 'editing'" @click="handleEdit" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleCancel" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleComplete" type="success" size="mini">完成</el-button>                                     
        </div>
        <el-form :model="innerItem" label-width= "180px" v-show="mode === 'create' || mode === 'edit' && status === 'editing'">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="银行名称">
                        <el-input v-model="bankName"></el-input>
                    </el-form-item>
                    <el-form-item label="账号名称">
                        <el-input v-model="accountName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">                    
                    <el-form-item label="支行名称">
                        <el-input v-model="subbankName"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="收款账号">
                        <el-input v-model="receiptAccount"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>                                    
        </el-form>
        <el-form :model="item" label-width= "180px" v-show="mode === 'view' || mode === 'edit' && status === ''">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="银行名称">
                        {{bankName}}
                    </el-form-item>
                    <el-form-item label="账号名称">
                        {{accountName}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">                    
                    <el-form-item label="支行名称">
                        {{subbankName}}
                    </el-form-item>
                    
                    <el-form-item label="收款账号">
                        {{receiptAccount}}
                    </el-form-item>
                </el-col>
            </el-row>                                    
        </el-form>
    </CollapsePanel>
</template>
<script>
/**
 * 分佣账号
 * TODO:
 */
    import CollapsePanel from '@/components/common/CollapsePanel';
    import {generateComputed} from './_Utils';
    import {mapMutations} from 'vuex';
    // 服务人员信息
    export default {
        name: "corporateInfo",
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
                innerItem: {}
            };
        },
        computed: {
            "bankName": generateComputed("bankName", "AgentCommissionAccount", "updateBankName"),
            "subbankName": generateComputed("subbankName", "AgentCommissionAccount", "updateSubbankName"),
            "accountName": generateComputed("accountName", "AgentCommissionAccount", "updateAccountName"),
            "receiptAccount": generateComputed("receiptAccount", "AgentCommissionAccount", "updateReceiptAccount"),
        },
        methods: {
            handleEdit() {
                this.status = 'editing';                
                this.innerItem = Object.assign({}, this.$store.state.AgentCommissionAccount);                
            },
            handleComplete() {
                this.status = '';    
                this.updateItem(this.innerItem);                            
            },
            handleCancel() {
                this.status = '';                              
            },

            ...mapMutations('AgentCommissionAccount', ['updateItem', 'updateBankName', 'updateSubbankName', 'updateReceiptAccount', 'updateAccountName'])
        },
        watch: {
            
        }
    }
</script>
<style scoped>

</style>