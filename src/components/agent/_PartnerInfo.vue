<template>
    <CollapsePanel @close="handleClose" class="gap-2" :expand="expand" :closable="mode=='create'||mode=='edit'&&status=='editing'">    
        <div align-left slot="header" class="clearfix">
            <span style="margin-right: 30px">合伙人信息</span>
            <el-button v-show="mode === 'edit' && status !== 'editing'" @click="handleEdit" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleCancel" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleComplete" type="success" size="mini">完成</el-button>                
        </div>
        <el-form ref="form" :model="innerItem" label-width= "180px" v-show="mode === 'create' || mode === 'edit' && status === 'editing'" :rules="rules">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名">
                        <el-input v-model="innerItem.name"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="innerItem.email"></el-input>
                    </el-form-item>

                    <el-form-item label="身份证号" prop="idCode">
                        <el-input v-model="innerItem.idCode"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">                    
                    <el-form-item label="手机号" prop="mobile">
                        <el-input v-model="innerItem.mobile"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="芝麻信用">
                        <el-input type="number" v-model="innerItem.credit"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="合伙人背景">                        
                        <el-select v-model="innerItem.background" placeholder="请选择">
                            <el-option
                            v-for="bg in bgs"
                            :key="bg.value"
                            :label="bg.label"
                            :value="bg.value">
                            </el-option>
                        </el-select>
                        <el-input style="margin-top: 6px;" v-model="innerItem.backgroundRemark" v-show="innerItem.background=='5'"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
                        
            <el-form-item v-show="mode === 'create' || mode === 'edit' && status === 'editing'" label="备注信息">
                <el-input type="textarea" :rows="2" v-model="innerItem.remark"></el-input>
            </el-form-item>            
        </el-form>

        <el-form :model="item" label-width= "180px" v-show="mode === 'view' || mode === 'edit' && status === ''">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名">
                        {{innerItem.name}}
                    </el-form-item>
                    <el-form-item label="邮箱">
                        {{innerItem.email}}
                    </el-form-item>

                    <el-form-item label="身份证号">
                        {{innerItem.idCode}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">                    
                    <el-form-item label="手机号">
                        {{innerItem.mobile}}
                    </el-form-item>
                    
                    <el-form-item label="芝麻信用">
                        {{innerItem.credit}}
                    </el-form-item>
                    
                    <el-form-item label="合伙人背景">
                        {{bgText}}
                    </el-form-item>
                </el-col>
            </el-row>
                            
            <el-form-item label="备注信息">
                {{innerItem.remark}}
            </el-form-item>
            </el-form>
    </CollapsePanel>
</template>
<script>
/**
 * 合伙人信息组件
 */
    import CollapsePanel from '@/components/common/CollapsePanel';
    import {Validator} from './_Utils';
    // 服务人员信息
    export default {
        name: "partnerInfo",
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
                innerItem: Object.assign({}, this.item),
                expand: true,
                status: "",
                originalItem: {

                },
                bgs: [{
                    value: "0",
                    label: "请选择"
                },{
                    value: "1",
                    label: "新房代理商"
                },{
                    value: "2",
                    label: "二手房租房中介"
                },{
                    value: "3",
                    label: "头条、美团、58城市代理商"
                },{
                    value: "4",
                    label: "房产开发商"
                },{
                    value: "5",
                    label: "其他"
                }],
                rules: {
                    mobile: [{
                        validator: Validator.mobile,
                        trigger: 'blur'                        
                    }],
                    email: [{
                        type: "email",
                        trigger: 'blur',
                        message: '请输入正确的邮箱'                       
                    }],
                    idCode: [{
                        validator: Validator.idCard,
                        trigger: 'blur'                        
                    }]
                }
            };
        },
        methods: {
            handleEdit() {
                this.status = 'editing';
                this.originalItem = this.innerItem;
                this.innerItem = Object.assign({}, this.innerItem);                
            },
            handleComplete() {
                this.status = '';  
                this.$emit('input', this.innerItem);                  
            },
            handleCancel() {
                this.status = '';
                this.innerItem = this.originalItem;                
            },
            handleClose() {
                this.$emit('close');
            },
            validate(fn) {
            this.$refs.form.validate(fn);
        },
        },
        computed: {
            bgText() {                
                let bg = this.bgs.filter((b)=>{return b.value==this.innerItem.background});
                if(bg && bg.length) {
                    bg = bg[0];
                    if(bg.value == '5'){// 其他
                        return bg.label + '-' + this.innerItem.bgOther||'';
                    }

                    return bg.label;
                }

                return '';
            },
            
        },
        watch: {
            "innerItem.name": function(val) {
                if(this.mode == 'create') {
                    this.$emit('input', this.innerItem);
                }
            },
            "innerItem.mobile": function(val) {
                if(this.mode == 'create') {
                    this.$emit('input', this.innerItem);
                }
            },
            "innerItem.email": function(val) {
                if(this.mode == 'create') {
                    this.$emit('input', this.innerItem);
                }
            },
            "innerItem.credit": function(val) {
                if(this.mode == 'create') {
                    this.$emit('input', this.innerItem);
                }
            },
            "innerItem.idCode": function(val) {
                if(this.mode == 'create') {
                    this.$emit('input', this.innerItem);
                }
            },
            "innerItem.background": function(val) {
                if(this.mode == 'create') {
                    this.$emit('input', this.innerItem);
                }
            },
            "innerItem.remark": function(val) {
                if(this.mode == 'create') {
                    this.$emit('input', this.innerItem);
                }
            },
            "innerItem.backgroundRemark": function(val) {
                if(this.mode == 'create') {
                    this.$emit('input', this.innerItem);
                }
            }

        }
    }
</script>
<style scoped>
.el-select {
    width: 100%;
}
</style>