<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span style="margin-right: 30px">代理商提佣比率</span><span v-show="mode=='view'" style="margin-left: -20px;font-size: 14px; color: #4e4e4e;">(代理商扩展1个门店所商定的返佣比率，比如代理商分6成，悟空分4成，提拥比率为60%)</span>    
            <el-button v-show="mode === 'edit' && status !== 'editing'" @click="handleEdit" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleCancel" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleComplete" type="success" size="mini">完成</el-button>                            
        </div>
        <el-form :model="item" label-width= "180px" v-show="mode === 'create' || mode === 'edit' && status === 'editing'">            
            <el-form-item label="代理商提佣比率">
                <el-input v-model="item.ratio">
                    <template slot="append">%</template>
                </el-input>
            </el-form-item>
            <el-form-item label="备注信息">
                <el-input v-model="item.remark"></el-input>
            </el-form-item>            
        </el-form>
        <el-form :model="item" label-width= "180px" v-show="mode === 'view' || mode === 'edit' && status === ''">            
            <el-form-item label="代理商提佣比率">
                {{item.ratio}}%                    
            </el-form-item>
            <el-form-item label="备注信息">
                {{item.remark}}
            </el-form-item>            
        </el-form>
    </CollapsePanel>
</template>
<script>
/**
 * 代理商佣金比率
 * TODO:
 */
    import CollapsePanel from '@/components/common/CollapsePanel';
    // 服务人员信息
    export default {
        name: "agentCommissionRatio",
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