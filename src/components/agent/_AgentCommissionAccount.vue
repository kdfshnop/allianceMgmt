<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span style="margin-right: 30px">分佣账号</span> <span v-show="mode=='view'" style="margin-left: -20px;font-size: 14px; color: #4e4e4e;">(代理商接受返佣的银行账户)</span>  
            <el-button v-show="mode === 'edit' && status !== 'editing'" @click="handleEdit" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleCancel" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleComplete" type="success" size="mini">完成</el-button>                                     
        </div>
        <el-form :model="item" label-width= "180px" v-show="mode === 'create' || mode === 'edit' && status === 'editing'">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="银行名称">
                        <el-input v-model="item.bankName"></el-input>
                    </el-form-item>
                    <el-form-item label="账号名称">
                        <el-input v-model="item.accountName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">                    
                    <el-form-item label="支行名称">
                        <el-input v-model="item.subbankName"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="收款账号">
                        <el-input v-model="item.account"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>                                    
        </el-form>
        <el-form :model="item" label-width= "180px" v-show="mode === 'view' || mode === 'edit' && status === ''">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="银行名称">
                        {{item.bankName}}
                    </el-form-item>
                    <el-form-item label="账号名称">
                        {{item.accountName}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">                    
                    <el-form-item label="支行名称">
                        {{item.subbankName}}
                    </el-form-item>
                    
                    <el-form-item label="收款账号">
                        {{item.account}}
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