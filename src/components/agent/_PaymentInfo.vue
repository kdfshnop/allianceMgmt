<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span style="margin-right: 30px">付款信息</span><span v-show="mode=='view'" style="margin-left: -20px;font-size: 14px; color: #4e4e4e;">(代理商支付的实际发生的合作费用)</span>
            <el-button v-show="mode === 'edit' && status !== 'editing'" @click="handleEdit" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleCancel" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleComplete" type="success" size="mini">完成</el-button>                            
        </div>
        <el-form ref="form" :model="item" label-width= "180px" v-show="mode === 'create' || mode === 'edit' && status === 'editing'">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="支付情况">
                        <el-switch
                            v-model="paymentStatus"
                            active-text="已支付"
                            inactive-text="未支付">
                        </el-switch>
                    </el-form-item>                    
                </el-col>
                <el-col :span="12">
                    <el-form-item label="支付方式" v-show="paymentStatus">
                        <el-select v-model="type" placeholder="请选择">
                            <el-option
                                v-for="item in types"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>  
                    <el-form-item label="预计支付时间" v-show="!paymentStatus">
                        <el-date-picker
                                v-model="planPaymentDate"
                                type="date"
                                :format="format"
                                :value-format="valueFormat"
                                placeholder="选择日期">
                            </el-date-picker>
                    </el-form-item>                   
                </el-col>
            </el-row> 
            <!-- <template >                                    -->
            <el-row v-show="paymentStatus">
                <el-col :span="12">
                    <el-form-item label="实际支付">
                        <el-input v-model="actualPayment">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>                    
                </el-col>
                <el-col :span="12">
                    <el-form-item label="费用包含">
                        <el-checkbox-group v-model="containPayment">
                        <el-checkbox label="1">平台服务费</el-checkbox>
                        <el-checkbox label="2">保证金</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>                    
                </el-col>
            </el-row> 
            <el-row v-show="paymentStatus">
                <el-col :span="12">
                    <el-form-item label="汇款单号">
                        <el-input v-model="number">                            
                        </el-input>
                    </el-form-item>                    
                </el-col>
                <el-col :span="12">
                    <el-form-item label="汇款支行">
                        <el-input v-model="subbankName">                            
                        </el-input>
                    </el-form-item>                    
                </el-col>
            </el-row> 
            <el-form-item label="上传汇款凭证" v-show="paymentStatus">                
                <upload v-if="mode === 'create' || mode === 'edit' && status === 'editing'" :fileList.sync="fileList"></upload>
            </el-form-item> 
            <!-- </template> -->
            <!-- <template > -->
                <el-row v-if="!paymentStatus">
                    <el-col :span="12">
                        <el-form-item label="代理商对接人">
                            <el-input v-model="brokerName" placeholder="请输入姓名">                            
                            </el-input>
                        </el-form-item>                    
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="代理商对接人手机号">
                            <el-input v-model="brokerMobile" placeholder="请输入手机号">                            
                            </el-input>
                        </el-form-item>                    
                    </el-col>
                </el-row> 
                <el-form-item label="承诺支付书" v-if="!paymentStatus">                
                    <upload v-if="mode === 'create' || mode === 'edit' && status === 'editing'" :fileList.sync="promiseFileList"></upload>
                </el-form-item>
            <!-- </template> -->
            <el-form-item label="备注信息">
                <el-input v-model="remark" type="textarea">                            
                </el-input>
            </el-form-item> 
        </el-form>

        <el-form :model="item" label-width= "180px" v-show="mode === 'view' || mode === 'edit' && status === ''">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="支付情况">
                        {{paymentStatus&&"已支付" || "未支付"}}                        
                    </el-form-item>                    
                </el-col>
                <el-col :span="12">
                    <el-form-item label="支付方式" v-show="paymentStatus">
                        {{paymentType}}                        
                    </el-form-item>    
                    <el-form-item label="预计支付时间" v-show="!paymentStatus">
                        {{planPaymentDate}}                        
                    </el-form-item>                
                </el-col>
            </el-row>  
            <!-- <template >                                   -->
                <el-row v-show="paymentStatus">
                    <el-col :span="12">
                        <el-form-item label="实际支付">
                            {{actualPayment}}元                        
                        </el-form-item>                    
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="费用包含">
                            {{containPayment && containPayment.indexOf('1') > -1&&'平台服务费'||''}} 
                            {{containPayment && containPayment.indexOf('2') > -1&&'保证金'||''}}
                        </el-form-item>                    
                    </el-col>
                </el-row> 
                <el-row v-show="paymentStatus">
                    <el-col :span="12">
                        <el-form-item label="汇款单号">
                            {{number}}                        
                        </el-form-item>                    
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="汇款支行">
                            {{subbankName}}                        
                        </el-form-item>                    
                    </el-col>
                </el-row> 
                <el-form-item label="上传汇款凭证" v-show="paymentStatus">                                    
                    <file-list :fileList="fileList"></file-list>               
                </el-form-item> 
            <!-- </template> -->
            <!-- <template>                                   -->
                <el-row v-show="!paymentStatus">
                    <el-col :span="12">
                        <el-form-item label="代理商对接人">
                            {{brokerName}}                        
                        </el-form-item>                    
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="代理商对接人手机号">
                            {{brokerMobile}}                        
                        </el-form-item>                    
                    </el-col>
                </el-row> 
                <el-form-item label="承诺支付书" v-show="!paymentStatus">                                    
                    <file-list :fileList="promiseFileList"></file-list>               
                </el-form-item> 
            <!-- </template> -->
            <el-form-item label="备注信息">
                {{remark}}                
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
    import {generateComputed} from './_Utils';
    import {mapMutations} from 'vuex';
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
                innerItem: {},  
                format: "yyyy-MM-dd",
                valueFormat: "yyyy-MM-dd"              
            };
        },
        methods: {
            handleEdit() {
                this.status = 'editing';                
                this.innerItem = JSON.parse(JSON.stringify(this.$store.state.PaymentInfo || {}));          
            },
            handleComplete() {
                this.status = '';   
                this.updateItem(this.innerItem);                             
            },
            handleCancel() {
                this.status = '';                              
            },
            validate(fn) {
                this.$refs.form.validate(fn);
            },


            ...mapMutations('PaymentInfo', ['updateItem', 
                'updatePaymentStatus', 
                'updateType', 
                'updateActualPayment', 
                'updateContainPayment', 
                'updateNumber', 
                'updateSubbankName', 
                'updateFileList', 
                'updateRemark',
                'updateStageNumber',
                'updatePlanPaymentDate',
                'updateBrokerName',
                'updateBrokerMobile',
                'updatePromiseFileList'])                
        },
        watch: {
            
        },
        computed: {
            paymentStatus: generateComputed('paymentStatus', 'PaymentInfo', 'updatePaymentStatus'),
            type: generateComputed('type', 'PaymentInfo', 'updateType'),
            actualPayment: generateComputed('actualPayment', 'PaymentInfo', 'updateActualPayment'),
            containPayment: generateComputed('containPayment', 'PaymentInfo', 'updateContainPayment'),
            number: generateComputed('number', 'PaymentInfo', 'updateNumber'),
            subbankName: generateComputed('subbankName', 'PaymentInfo', 'updateSubbankName'),
            fileList: generateComputed('fileList', 'PaymentInfo', 'updateFileList'),
            remark: generateComputed('remark', 'PaymentInfo', 'updateRemark'),
            stageNumber: generateComputed('stageNumber', 'PaymentInfo', "updateStageNumber"),
            planPaymentDate: generateComputed('planPaymentDate', 'PaymentInfo', "updatePlanPaymentDate"),
            brokerName: generateComputed('brokerName', 'PaymentInfo', "updateBrokerName"),
            brokerMobile: generateComputed('brokerMobile', 'PaymentInfo', "updateBrokerMobile"),
            promiseFileList: generateComputed('promiseFileList', 'PaymentInfo', "updatePromiseFileList"),


            paymentType: function(){
                let tmp = this.types.filter((v)=>{return v.value == this.type});
                if(tmp && tmp.length){
                    return tmp[0].label;
                }

                return this.type;
            }
        }
    }
</script>
<style scoped>
.el-select, .el-date-editor {
    width: 100%;
}
</style>