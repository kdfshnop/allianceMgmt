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
                    <el-col :span="12">
                        <el-form-item label="平台服务费">
                            <el-input v-model="serviceFee.fee">
                                <template slot="append">元</template>
                            </el-input>
                            <el-input v-model="serviceFee.month">
                                <template slot="append">个月</template>
                            </el-input>
                        </el-form-item>                    
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="保证金">
                            <el-input v-model="serviceFee.preFee">
                                <template slot="append">元</template>
                            </el-input>
                            <el-input v-model="serviceFee.preMonth">
                                <template slot="append">个月</template>
                            </el-input>
                        </el-form-item>                    
                    </el-col>
                </el-row>                                    
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="费用支付方式">
                            <el-switch
                                v-model="serviceFee.paymentType"
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
                            <el-input v-model="serviceFee.count">
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
                            {{serviceFee.fee}}元{{serviceFee.month}}个月                            
                        </el-form-item>                    
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="保证金">
                            {{serviceFee.preFee}}元{{serviceFee.preMonth}}个月                    
                        </el-form-item>                    
                    </el-col>
                </el-row>                                    
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="费用支付方式">
                            {{serviceFee.paymentType == '2' && "分期" || serviceFee.paymentType == '1' && "一次性" || ""}}                            
                        </el-form-item>                    
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="分期次数">
                            {{serviceFee.count}}期                            
                        </el-form-item>                    
                    </el-col>
                </el-row> 
            </el-form>
        </CollapsePanel>

        <CollapsePanel class="gap-2" :expand="expand2" v-show="serviceFee.paymentType =='2'">    
            <div align-left slot="header" class="clearfix">
                <span style="margin-right: 30px">分期付款约定</span> 
                <el-button v-show="mode === 'edit' && status2 !== 'editing'" @click="handleEdit2" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status2 === 'editing'" @click="handleCancel2" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status2 === 'editing'" @click="handleComplete2" type="success" size="mini">完成</el-button>                           
            </div>
            <el-form :model="item" label-width= "180px" v-show="mode === 'create' || mode === 'edit' && status2 === 'editing'">
                <el-row :key="index" v-for="(v, index) in dividingInfo">
                    <el-col :span="12">
                        <el-form-item :label="'第'+ (+index+1) +'期'">
                            <el-date-picker
                                v-model="v.date"
                                type="date"
                                format="yyyy-MM-dd"
                                placeholder="选择日期">
                            </el-date-picker>                                                                                                                
                        </el-form-item>                    
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="前支付平台服务费">
                            <el-input v-model="v.fee">
                                <template slot="append">元</template>
                            </el-input>                            
                        </el-form-item>                    
                    </el-col>
                </el-row>

                <el-button @click="add">+ 添加期数</el-button>                                    
            </el-form>

            <el-form :model="item" label-width= "180px" v-show="mode === 'view' || mode === 'edit' && status2 === ''">
                <el-row :key="index" v-for="(d, index) in dividingInfo">
                    <el-col :span="12">
                        <el-form-item :label="'第' + (+index+1) + '期'">
                            {{getDate(d.date)}}                                                                                   
                        </el-form-item>                    
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="前支付平台服务费">
                            {{d.fee}}元                                                 
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
                expand2: true,
                status: "",
                status2: "",
                serviceFee: this.item.serviceFee,
                dividingInfo: this.item.dividingInfo
            };
        },
        methods: {
            add() {
                this.dividingInfo.push({
                    date: "",
                    fee: ""
                });
            },
            handleEdit() {
                this.status = 'editing';
                // this.originalItem = this.item;
                // this.item = Object.assign({}, this.item);                
                
            },
            handleComplete() {
                this.status = '';     
                this.item.serviceFee = this.serviceFee;                           
            },
            handleCancel() {
                this.status = '';
                // this.item = this.originalItem;                
                this.serviceFee = Object.assign({}, this.item.serviceFee);
            },
            handleEdit2() {
                this.status2 = 'editing';
                // this.originalItem = this.item;
                // this.item = Object.assign({}, this.item);                
            },
            handleComplete2() {
                this.status2 = '';  
                this.item.dividingInfo = this.dividingInfo;                              
            },
            handleCancel2() {
                this.status2 = '';
                // this.item = this.originalItem;                
                this.dividingInfo = Object.assign({}, this.item.dividingInfo);
            },
            getDate(d) {
                if(d) {
                    return d.getFullYear() + "-" + this.padding(d.getMonth() + 1) + '-' + this.padding(d.getDate());
                }

                return '';
            },
            padding(s) {
                if(s < 10) {
                    return '0' + s;
                }

                return s;
            }
        },
        watch: {
            
        }
    }
</script>
<style scoped>
.el-date-editor {
    width: 100%;
}
</style>