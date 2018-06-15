<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span>服务经理</span>            
        </div>
        <el-form :model="item" label-width= "180px">                                                           
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名">                        
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机号">                        
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row>
                <el-col :span="12">
                    <el-form-item label="微信号">                        
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="邮箱">                        
                        <el-input></el-input>
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
    // 服务人员信息
    export default {
        name: "bdManager",
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