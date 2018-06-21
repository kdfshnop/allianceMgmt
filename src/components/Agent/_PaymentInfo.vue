<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span style="margin-right: 30px">付款信息</span><span v-show="mode=='view'" style="margin-left: -20px;font-size: 14px; color: #4e4e4e;">(代理商支付的实际发生的合作费用)</span>
            <el-button v-show="mode === 'edit' && status !== 'editing'" @click="handleEdit" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleCancel" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleComplete" type="success" size="mini">完成</el-button>                            
        </div>
        <el-form :model="item" label-width= "180px" v-show="mode === 'create' || mode === 'edit' && status === 'editing'">
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
                        <el-checkbox v-model="checked2">保证金</el-checkbox>
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
                <upload v-if="mode === 'create' || mode === 'edit' && status === 'editing'" :fileList.sync="fileList"></upload>
            </el-form-item> 
            <el-form-item label="备注信息">
                <el-input v-model="item.remark" type="textarea">                            
                </el-input>
            </el-form-item> 
        </el-form>

        <el-form :model="item" label-width= "180px" v-show="mode === 'view' || mode === 'edit' && status === ''">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="支付情况">
                        {{item.status&&"已支付" || "未支付"}}                        
                    </el-form-item>                    
                </el-col>
                <el-col :span="12">
                    <el-form-item label="支付方式">
                        {{paymentType}}                        
                    </el-form-item>                    
                </el-col>
            </el-row>                                    
            <el-row>
                <el-col :span="12">
                    <el-form-item label="实际支付">
                        {{item.actualPayment}}元                        
                    </el-form-item>                    
                </el-col>
                <el-col :span="12">
                    <el-form-item label="费用包含">
                        {{checked&&'平台服务费'||''}} 
                        {{checked2&&'保证金'||''}}
                    </el-form-item>                    
                </el-col>
            </el-row> 
            <el-row>
                <el-col :span="12">
                    <el-form-item label="汇款单号">
                        {{item.num}}                        
                    </el-form-item>                    
                </el-col>
                <el-col :span="12">
                    <el-form-item label="汇款支行">
                        {{item.subbankName}}                        
                    </el-form-item>                    
                </el-col>
            </el-row> 
            <el-form-item label="上传汇款凭证">                                    
                <file-list :fileList="fileList"></file-list>               
            </el-form-item> 
            <el-form-item label="备注信息">
                {{item.remark}}                
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
    import Upload from '@/components/common/Upload';
    import FileList from '@/components/common/FileList';
    // 服务人员信息
    export default {
        name: "paymentInfo",
        components: {CollapsePanel, Upload, FileList},
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
                checked: "",
                checked2: "",
                types: [{
                    label: "汇款",
                    value: "1"
                },{
                    label: "支付宝",
                    value: "2"
                },{
                    label: "其他",
                    value: "3"
                },],
                status: "",
                originalItem: {

                },
                fileList:[]
            };
        },
        methods: {
            handleEdit() {
                this.status = 'editing';
                this.originalItem = this.item;
                this.item = JSON.parse(JSON.stringify(this.item || {}));          
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
            
        },
        computed: {
            paymentType: function(){
                let tmp = this.types.filter((v)=>{return v.value == this.item.type});
                if(tmp && tmp.length){
                    return tmp[0].label;
                }

                return this.item.type;
            }
        }
    }
</script>
<style scoped>

</style>