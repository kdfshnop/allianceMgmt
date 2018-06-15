<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span>代理商提佣比率</span>            
        </div>
        <el-form :model="item" label-width= "180px">            
            <el-form-item label="代理商提佣比率">
                <el-input v-model="item.ratio">
                    <template slot="append">%</template>
                </el-input>
            </el-form-item>
            <el-form-item label="备注信息">
                <el-input v-model="item.remark"></el-input>
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
        props: ['item', 'mode'],
        data() {
            return {
                expand: true
            };
        },
        methods: {
            
        },
        watch: {
            
        }
    }
</script>
<style scoped>

</style>