<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span>合伙人信息</span>            
        </div>
        <el-form :model="item" label-width= "180px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名">
                        <el-input v-model="item.name"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="item.email"></el-input>
                    </el-form-item>

                    <el-form-item label="身份证号">
                        <el-input v-model="item.idCard"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">                    
                    <el-form-item label="手机号">
                        <el-input v-model="item.mobile"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="芝麻信用">
                        <el-input v-model="item.zmCredit"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="合伙人背景">
                        <el-input v-model="item.bg"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
                        
            <el-form-item label="备注信息">
                <el-input type="textarea" :rows="2" v-model="item.remark"></el-input>
            </el-form-item>
        </el-form>
    </CollapsePanel>
</template>
<script>
/**
 * 合伙人信息组件
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