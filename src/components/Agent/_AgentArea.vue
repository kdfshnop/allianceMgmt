<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span>请选择代理区域</span>            
        </div>
        <el-form :model="item" label-width= "180px">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="所属城市">
                        <el-select v-model="item.type" placeholder="请选择">
                            <el-option
                                v-for="item in []"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="代理区域">                        
                         
                    </el-form-item>                                                         
                </el-col>
            </el-row>                        
        </el-form>
    </CollapsePanel>
</template>
<script>
import CollapsePanel from '@/components/common/CollapsePanel';
/**
 * 代理区域组件
 * TODO:
 *  1. 城市数组件调研
 *  2. 交互
 */
export default {
    name: "agentArea",
    props: ['item', 'mode'],
    components: {CollapsePanel},
    data() {
        return {
            expand: true
        };
    }
}
</script>
<style scoped>
.el-select {
    width: 100%;
}
</style>