<template>
    <CollapsePanel class="gap-2" :expand="expand">    
        <div align-left slot="header" class="clearfix">
            <span style="margin-right: 30px">代理商公司信息</span>     
            <el-button v-show="mode === 'edit' && status !== 'editing'" @click="handleEdit" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleCancel" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleComplete" type="success" size="mini">完成</el-button>                                   
        </div>
        <el-form ref="form" :rules="rules" :model="this" label-width= "180px" v-show="mode === 'create' || mode === 'edit' && status === 'editing'">
            <el-form-item label="代理商是否已注册公司">
                <el-switch
                    v-model="signed"
                    active-color="#13ce66"
                    inactive-color="#aaa">
                </el-switch>
            </el-form-item>
            <el-row v-show="signed">
                <el-col :span="12">
                    <el-form-item label="公司名" prop="name">
                        <el-input v-model="name" placeholder="请输入营业执照全名" maxlength="50"></el-input>
                    </el-form-item>                                                                         
                </el-col>
                <el-col :span="12">
                    <el-form-item label="公司简称">
                        <el-input v-model="shortName" maxlength="50"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>   
            <el-row v-show="signed">
                <el-col :span="12">
                    <el-form-item label="营业执照号">
                        <el-input v-model="number" maxlength="50"></el-input>
                    </el-form-item>                                                                         
                </el-col>
                <el-col :span="12">
                    <el-form-item label="组织机构代码">
                        <el-input v-model="code" maxlength="50"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>     
            <el-form-item label="公司具体地址" v-show="signed">
                <el-input v-model="address" maxlength="100"></el-input>
            </el-form-item> 
            <el-form-item label="上传营业执照" v-show="signed">                
                    <upload :fileList.sync="numberFileList" v-if="mode === 'create' || mode === 'edit' && status === 'editing'"></upload>
            </el-form-item>  

            <!-- 下面是未注册显示的 -->
            <el-row v-show="!signed">
                <el-col :span="12">
                    <el-form-item label="预计注册完成时间">
                        <el-date-picker
                            v-model="finishDate"
                            type="date"
                            :value-format="valueFormat"
                            :format="format"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>                                                                         
                </el-col>               
            </el-row>  
            <el-row v-show="!signed">
                <el-col :span="12">
                    <el-form-item label="代理商负责跟踪人">
                        <el-input v-model="tracerName"></el-input>
                    </el-form-item>                                                                         
                </el-col>               
                <el-col :span="12">
                    <el-form-item label="手机号" prop="mobile">
                        <el-input v-model="mobile"></el-input>
                    </el-form-item>                                                                         
                </el-col>
            </el-row>     
            <el-row v-show="!signed">
                <el-col :span="12">
                    <el-form-item label="邮箱号" prop="email">
                        <el-input v-model="email"></el-input>
                    </el-form-item>                                                                         
                </el-col>               
                <el-col :span="12">
                    <el-form-item label="身份证号" prop="idCard">
                        <el-input v-model="idCard"></el-input>
                    </el-form-item>                                                                         
                </el-col>
            </el-row>  
            <el-form-item label="备注信息" v-show="!signed">
                <el-input type="textarea" v-model="remark"></el-input>
            </el-form-item> 

            <el-form-item label="上传身份证正面照" v-show="!signed">                
                    <upload :fileList.sync="idCardFrontFileList" v-if="mode === 'create' || mode === 'edit' && status === 'editing'"></upload>
            </el-form-item>
            <el-form-item label="上传身份证反面照" v-show="!signed">
                <upload :fileList.sync="idCardBackFileList" v-if="mode === 'create' || mode === 'edit' && status === 'editing'"></upload>
            </el-form-item>
        </el-form>

        <el-form :model="innerItem" label-width= "180px" v-show="mode === 'view' || mode === 'edit' && status === ''">
            <el-form-item label="代理商是否已注册公司">
                {{signed&&"是" || "否"}}                
            </el-form-item>
            <el-row v-show="signed">
                <el-col :span="12">
                    <el-form-item label="公司名">
                        {{name}}
                    </el-form-item>                                                                         
                </el-col>
                <el-col :span="12">
                    <el-form-item label="公司简称">
                        {{shortName}}
                    </el-form-item>
                </el-col>
            </el-row>   
            <el-row v-show="signed">
                <el-col :span="12">
                    <el-form-item label="营业执照号">
                        {{number}}
                    </el-form-item>                                                                         
                </el-col>
                <el-col :span="12">
                    <el-form-item label="组织机构代码">
                        {{code}}
                    </el-form-item>
                </el-col>
            </el-row>     
            <el-form-item label="公司具体地址" v-show="signed">
                {{address}}
            </el-form-item> 
            <el-form-item label="上传营业执照" v-show="signed">                
                    <file-list :fileList="numberFileList"></file-list>
            </el-form-item>  

            <!-- 下面是未注册显示的 -->
            <el-row v-show="!signed">
                <el-col :span="12">
                    <el-form-item label="预计注册完成时间">
                        {{finishDateStr}}
                    </el-form-item>                                                                         
                </el-col>               
            </el-row>  
            <el-row v-show="!signed">
                <el-col :span="12">
                    <el-form-item label="代理商负责跟踪人">
                        {{tracerName}}
                    </el-form-item>                                                                         
                </el-col>               
                <el-col :span="12">
                    <el-form-item label="手机号">
                        {{mobile}}
                    </el-form-item>                                                                         
                </el-col>
            </el-row>     
            <el-row v-show="!signed">
                <el-col :span="12">
                    <el-form-item label="邮箱号">
                        {{email}}
                    </el-form-item>                                                                         
                </el-col>               
                <el-col :span="12">
                    <el-form-item label="身份证号">
                        {{idCard}}
                    </el-form-item>                                                                         
                </el-col>
            </el-row>  
            <el-form-item label="备注信息" v-show="!signed">
                {{remark}}
            </el-form-item> 

            <el-form-item label="上传身份证正面照" v-show="!signed">                
                    <file-list :fileList="idCardFrontFileList"></file-list>
            </el-form-item>
            <el-form-item label="上传身份证反面照" v-show="!signed">
                <file-list :fileList="idCardBackFileList"></file-list>
            </el-form-item>
        </el-form>
    </CollapsePanel>
</template>
<script>
import CollapsePanel from '@/components/common/CollapsePanel';
import Upload from '@/components/common/Upload';
import FileList from '@/components/common/FileList';
import {generateComputed, Validator, getDateStr} from './_Utils';
import {mapMutations} from 'vuex';
/**
 * 代理商公司信息组件
 * TODO: 
 *  1. 上传文件接口
 *  2. 交互
 */
let agentCompanyInfo;// 这是一个尴尬的事情，rules中的validator不能访问到vue实例，因此需要把实例保存下来:(
export default {
    name: "agentCompanyInfo",
    props: {
            item: Object,
            mode: {
                type: String,
                default: "view"
            }
        },
    components: {CollapsePanel, Upload, FileList},
    data() {
        return {
            expand: true,
            status: "",
            innerItem: {

            },
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            format: "yyyy-MM-dd",
            rules: {
                mobile: [{
                    validator: Validator.mobile,
                    trigger: 'blur'
                }],
                email: [{
                    type: 'email',
                    trigger: 'blur',
                    message: '请输入正确的邮箱'
                }],
                idCard: [{
                    validator: Validator.idCard,
                    trigger: 'blur'
                }],
                name: [{
                    //required: true, message: "公司名称为必填项", trigger: 'blur'
                    validator: function(rule, value, callback){
                        //console.log(agentCompanyInfo);   
                        if(agentCompanyInfo.signed) {
                            if(value == null || value == '') {
                                callback('公司名是必填项!');
                            }else{
                                callback();
                            }                            
                        }else{
                            callback(); 
                        }                        
                    },
                    trigger: 'blur'
                }]
            }
        };
    },
    computed: {
        signed: generateComputed('signed', 'AgentCompanyInfo', 'updateSigned'),
        name: generateComputed('name', 'AgentCompanyInfo', 'updateName'),
        shortName: generateComputed('shortName', 'AgentCompanyInfo', 'updateShortName'),
        number: generateComputed('number', 'AgentCompanyInfo', 'updateNumber'),
        code: generateComputed('code', 'AgentCompanyInfo', 'updateCode'),
        address: generateComputed('address', 'AgentCompanyInfo', 'updateAddress'),
        numberFileList: generateComputed('numberFileList', 'AgentCompanyInfo', 'updateNumberFileList'),
        finishDate: generateComputed('finishDate', 'AgentCompanyInfo', 'updateFinishDate'),
        tracerName: generateComputed('tracerName', 'AgentCompanyInfo', 'updateTracerName'),
        mobile: generateComputed('mobile', 'AgentCompanyInfo', 'updateMobile'),
        email: generateComputed('email', 'AgentCompanyInfo', 'updateEmail'),
        idCard: generateComputed('idCard', 'AgentCompanyInfo', 'updateIdCard'),
        remark: generateComputed('remark', 'AgentCompanyInfo', 'updateRemark'),
        idCardFrontFileList: generateComputed('idCardFrontFileList', 'AgentCompanyInfo', 'updateIdCardFrontFileList'),
        idCardBackFileList: generateComputed('idCardBackFileList', 'AgentCompanyInfo', 'idCardBackFileList'),

        finishDateStr: function() {
            return getDateStr(this.finishDate);
        }
    },
    methods: {
        handleEdit() {
                this.status = 'editing';                
                this.innerItem = JSON.parse(JSON.stringify(this.$store.state.AgentCompanyInfo));          
            },
            handleComplete() {
                this.status = '';  
                this.updateItem(this.innerItem);                              
            },
            handleCancel() {
                this.status = '';                             
            },
            validate(fn) {
                if(this.signed) {
                    this.$refs.form.validate(fn);
                }else{
                    this.$refs.form.validate(fn);
                }                
            },

            ...mapMutations('AgentCompanyInfo', ['updateItem',
                'updateSigned',
                'updateName',
                'updateShortName',
                'updateNumber',
                'updateCode',
                'updateAddress',
                'updateNumberFileList',
                'updateFinishDate',
                'updateTracerName',
                'updateMobile',
                'updateEmail',
                'updateIdCard',
                'updateRemark',
                'updateIdCardFrontFileList',
                'updateIdCardBackFileList'])
    },
    created() {
        agentCompanyInfo = this;
    }
}
</script>
<style scoped>
.el-date-editor {
    width: 100%;
}
</style>