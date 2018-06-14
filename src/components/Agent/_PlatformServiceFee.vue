<template>
    <div>
        <CollapsePanel class="gap-2" :expand="expand">    
            <div align-left slot="header" class="clearfix">
                <span>平台服务费</span>            
            </div>
            <el-form :model="item" label-width= "180px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="平台服务费">
                            <el-input v-model="item.fee">
                                <template slot="append">元</template>
                            </el-input>
                            <el-input v-model="item.month">
                                <template slot="append">个月</template>
                            </el-input>
                        </el-form-item>                    
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="保证金">
                            <el-input v-model="item.fee">
                                <template slot="append">元</template>
                            </el-input>
                            <el-input v-model="item.month">
                                <template slot="append">个月</template>
                            </el-input>
                        </el-form-item>                    
                    </el-col>
                </el-row>                                    
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="费用支付方式">
                            <el-switch
                                v-model="item.paymentType"
                                active-text="分期"
                                inactive-text="一次性">
                            </el-switch>
                        </el-form-item>                    
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="分期次数">
                            <el-input v-model="item.count">
                                <template slot="append">期</template>
                            </el-input>
                        </el-form-item>                    
                    </el-col>
                </el-row> 
            </el-form>
        </CollapsePanel>

        <CollapsePanel class="gap-2" :expand="expand">    
            <div align-left slot="header" class="clearfix">
                <span>分期付款约定</span>            
            </div>
            <el-form :model="item" label-width= "180px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="第一期">
                            <el-input v-model="item.fee">                                
                            </el-input>                            
                        </el-form-item>                    
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="前支付平台服务费">
                            <el-input v-model="item.fee">
                                <template slot="append">元</template>
                            </el-input>                            
                        </el-form-item>                    
                    </el-col>
                </el-row>

                <el-button @click="add">+ 添加期数</el-button>                                    
            </el-form>
        </CollapsePanel>
    </div>
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