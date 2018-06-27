<template>
    <div>
        <CollapsePanel class="gap-2" :expand="expand">    
            <div align-left slot="header" class="clearfix">
                <span style="margin-right: 30px">平台服务费</span> <span v-show="mode=='view'" style="margin-left: -20px;font-size: 14px; color: #4e4e4e;">(代理商支付给悟空总部的费用)</span>    
                <el-button v-show="mode === 'edit' && status !== 'editing'" @click="handleEdit" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleCancel" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleComplete" type="success" size="mini">完成</el-button>                       
            </div>
            <el-form :model="item" label-width= "180px" v-show="mode === 'create' || mode === 'edit' && status === 'editing'">
                <el-row>
                    <el-col :span="12" class="service-fee">
                        <el-form-item label="平台服务费">
                            <!-- 此处两个el-input必须紧跟着，否则它们之间会有空格，导致两个不能在同一行内 -->
                            <el-input v-model="fee">
                                <template slot="append">元</template>
                            </el-input><el-input v-model="month">
                                <template slot="append">个月</template>
                            </el-input>
                        </el-form-item>                    
                    </el-col>
                    <el-col :span="12" class="service-fee">
                        <el-form-item label="保证金">
                            <el-input v-model="prefee">
                                <template slot="append">元</template>
                            </el-input><el-input v-model="premonth">
                                <template slot="append">个月</template>
                            </el-input>
                        </el-form-item>                    
                    </el-col>
                </el-row>                                    
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="费用支付方式">
                            <el-switch
                                v-model="paymentType"
                                active-text="分期"
                                inactive-text="一次性"
                                active-value="2"
                                inactive-value="1"
                                >
                            </el-switch>
                        </el-form-item>                    
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="分期次数">
                            <el-input v-model="count">
                                <template slot="append">期</template>
                            </el-input>
                        </el-form-item>                    
                    </el-col>
                </el-row> 
            </el-form>

            <el-form :model="item" label-width= "180px" v-show="mode === 'view' || mode === 'edit' && status === ''">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="平台服务费">
                            {{fee}}元{{month}}个月                            
                        </el-form-item>                    
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="保证金">
                            {{prefee}}元{{premonth}}个月                    
                        </el-form-item>                    
                    </el-col>
                </el-row>                                    
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="费用支付方式">
                            {{paymentType == '2' && "分期" || paymentType == '1' && "一次性" || ""}}                            
                        </el-form-item>                    
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="分期次数">
                            {{count}}期                            
                        </el-form-item>                    
                    </el-col>
                </el-row> 
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
    import {generateComputed} from './_Utils';
    import {mapMutations} from 'vuex';
    // 服务人员信息
    export default {
        name: "platformServiceFee",
        components: {CollapsePanel},
        props:  {
            item: Object,
            mode: {
                type: String,
                default: "view"
            }
        },
        data() {
            console.log('serviceFee:', this.item.serviceFee);
            return {
                expand: true,                
                status: "",
                innerItem: {}
            };
        },
        computed: {
            "fee": generateComputed("fee", "PlatformServiceFee", "updateFee"),
            "month": generateComputed("month", "PlatformServiceFee", "updateMonth"),
            "prefee": generateComputed("prefee", "PlatformServiceFee", "updatePrefee"),
            "premonth": generateComputed("premonth", "PlatformServiceFee", "updatePremonth"),
            "paymentType": generateComputed("paymentType", "PlatformServiceFee", "updatePaymentType"),
            "count": generateComputed("count", "PlatformServiceFee", "updateCount")            
        },
        methods: {
            handleEdit() {
                this.status = 'editing';                
                this.innerItem = Object.assign({}, this.$store.state.PlatformServiceFee);                
                
            },
            handleComplete() {
                this.status = '';     
                this.updateItem(this.innerItem);
            },
            handleCancel() {
                this.status = '';
            },            

            ...mapMutations('PlatformServiceFee', [
                'updateItem', 
                'updateFee', 
                'updateMonth', 
                'updatePrefee', 
                'updatePremonth', 
                'updatePaymentType', 
                'updateCount', 
                'updateDividingInfo'])
        },
        watch: {
            
        }
    }
</script>
<style scoped>
.el-date-editor {
    width: 100%;
}

.service-fee .el-input-group {
    width: 50%;
}
</style>