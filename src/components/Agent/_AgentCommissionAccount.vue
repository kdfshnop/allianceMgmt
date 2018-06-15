<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span>分佣账号</span>            
        </div>
        <el-form :model="item" label-width= "180px">
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