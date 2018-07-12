<template>
    
        <CollapsePanel class="gap-2" :expand="expand" v-show="visible">    
            <div align-left slot="header" class="clearfix">
                <span style="margin-right: 30px">分期付款约定</span> 
                <el-button v-show="mode === 'edit' && status !== 'editing'" @click="handleEdit" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleCancel" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleComplete" type="success" size="mini">完成</el-button>                           
            </div>
            <el-form ref="form" :model="item" label-width= "180px" v-show="mode === 'create' || mode === 'edit' && status === 'editing'">
                <el-row class="data-row" :key="index" v-for="(v, index) in dividingInfo">
                    <el-col :span="12">
                        <el-form-item :label="'第'+ (+index+1) +'期'">
                            <el-date-picker
                                :value="v.date"
                                @input="handleInputDate($event, index, v)"
                                type="date"
                                :format="format"
                                :value-format="valueFormat"
                                placeholder="选择日期">
                            </el-date-picker>                                                                                                                
                        </el-form-item>                    
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="前支付平台服务费">
                            <el-input type="number" :value="v.fee" @input="handleInputFee($event, index, v)">
                                <template slot="append">元</template>
                            </el-input>                            
                        </el-form-item>                    
                    </el-col>
                    <el-button @click="handleRemove(index, v)" class="btn-remove" type="text"><i class="el-icon-error"></i></el-button>
                </el-row>

                <el-button @click="add">+ 添加期数</el-button>                                    
            </el-form>

            <el-form :model="item" label-width= "180px" v-show="mode === 'view' || mode === 'edit' && status === ''">
                <el-row :key="index" v-for="(d, index) in dividingInfo">
                    <el-col :span="12">
                        <el-form-item :label="'第' + (+index+1) + '期'">
                            {{getDateStr(d.date)}}
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
</template>
<script>
import CollapsePanel from '@/components/common/CollapsePanel';
import {generateComputed, getDateStr} from './_Utils';
import {mapMutations} from 'vuex';
export default {
    name: "",
    components: {CollapsePanel},
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
            status: "",
            innerItem: [],
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd HH:mm:ss"
        };
    },
    methods: {
        handleEdit() {
            this.status = 'editing';
            let innerItem = [];
            let length = this.$store.state.DividingInfo.dividingInfo.length;
            let tmp = this.$store.state.DividingInfo.dividingInfo;
            for(var i = 0; i < length; i++){
                innerItem.push(Object.assign({}, tmp[i]));
            }
            this.innerItem = innerItem;
        },
        handleComplete() {
            this.status = '';  
            this.updateItems(this.innerItem);                           
        },
        handleCancel() {
            this.status = '';
        },
        handleInputDate(e,index,v) {
            v.date = e;
            this.updateItem({...v, index});
        },
        handleInputFee(e, index, v) {
            v.fee = e;
            this.updateItem({...v, index});
        },
        add() {
            this.dividingInfo.push({
                date: "",
                fee: ""
            });
            this.dividingInfo = this.dividingInfo;
        },
        handleRemove(index) {
            if(this.mode == 'create') {
                this.removeItem(index);
            }else{
                this.innerItem.splice(index, 1);
            }
        },
        validate(fn) {
            this.$refs.form.validate(fn);
        },

        ...mapMutations('DividingInfo', ['updateItems', 'updateItem', 'removeItem']),

        getDateStr: getDateStr
    },
    computed: {
        // dividingInfo: generateComputed("dividingInfo", "DividingInfo", "updateItems"),
        dividingInfo: {
            get() {
                if(this.mode == 'edit' && this.status == 'editing') {// 编辑
                    return this.innerItem;
                }

                return this.$store.state.DividingInfo.dividingInfo;
            },
            set(val) {
                if(this.mode == 'edit' && this.status == 'editing') {// 编辑
                    this.innerItem = val;
                }else{
                    this.updateItems(val);
                }
            }
        },
        visible() {
            return this.$store.state.PlatformServiceFee.paymentType == '2';
        }
    }
}
</script>
<style  scoped>
.el-date-editor {
    width: 100% !important;
}

.data-row {
    position: relative;
}

.data-row .btn-remove {
    position: absolute;
    right: -10px;
    top: -20px;
    color: red;
    font-size: 26px;
}

</style>

