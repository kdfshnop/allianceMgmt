<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span>付款信息</span>            
        </div>
        <el-form :model="item" label-width= "180px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="支付情况">
                        <el-switch
                            v-model="item.status"
                            active-text="已支付"
                            inactive-text="未支付">
                        </el-switch>
                    </el-form-item>                    
                </el-col>
                <el-col :span="12">
                    <el-form-item label="支付方式">
                        <el-select v-model="item.type" placeholder="请选择">
                            <el-option
                                v-for="item in types"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>                    
                </el-col>
            </el-row>                                    
            <el-row>
                <el-col :span="12">
                    <el-form-item label="实际支付">
                        <el-input v-model="item.actualPayment">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>                    
                </el-col>
                <el-col :span="12">
                    <el-form-item label="费用包含">
                        <el-checkbox v-model="checked">平台服务费</el-checkbox>
                        <el-checkbox v-model="checked">保证金</el-checkbox>
                    </el-form-item>                    
                </el-col>
            </el-row> 
            <el-row>
                <el-col :span="12">
                    <el-form-item label="汇款单号">
                        <el-input v-model="item.num">                            
                        </el-input>
                    </el-form-item>                    
                </el-col>
                <el-col :span="12">
                    <el-form-item label="汇款支行">
                        <el-input v-model="item.subbankName">                            
                        </el-input>
                    </el-form-item>                    
                </el-col>
            </el-row> 
            <el-form-item label="上传汇款凭证">
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
            </el-form-item> 
            <el-form-item label="备注信息">
                <el-input v-model="item.remark" type="textarea">                            
                </el-input>
            </el-form-item> 
        </el-form>
    </CollapsePanel>
</template>
<script>
/**
 * 付款信息
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
                expand: true,
                types: [{
                    label: "汇款",
                    value: ""
                },{
                    label: "支付宝",
                    value: ""
                },{
                    label: "其他",
                    value: ""
                },]
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