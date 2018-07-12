<template>
    <CollapsePanel class="gap-2" :expand="expand" v-show="needShow">    
        <div align-left slot="header" class="clearfix">
            <span style="margin-right: 30px">法人信息</span>      
            <el-button v-show="mode === 'edit' && status !== 'editing'" @click="handleEdit" type="primary" size="mini">编辑</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleCancel" type="danger" size="mini">取消</el-button>         
            <el-button v-show="mode === 'edit' && status === 'editing'" @click="handleComplete" type="success" size="mini">完成</el-button>                                  
        </div>
        <el-form :rules="rules" ref="form" :model="this" label-width= "180px" v-show="mode === 'create' || mode === 'edit' && status === 'editing'">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="法人姓名">
                        <el-input v-model="name"></el-input>
                    </el-form-item>
                    <el-form-item label="法人手机号" prop="mobile">
                        <el-input v-model="mobile"></el-input>
                    </el-form-item>

                    <el-form-item label="芝麻信用分">
                        <el-input type="number" v-model="score"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">                    
                    <el-form-item label="法人身份证" prop="idCard">
                        <el-input v-model="idCard"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="法人邮箱" prop="email">
                        <el-input v-model="email"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
                        
            <el-form-item label="上传身份证正面照">                
                    <upload :fileList.sync="idCardFrontFileList" v-if="mode === 'create' || mode === 'edit' && status === 'editing'"></upload>
            </el-form-item>
            <el-form-item label="上传身份证反面照">                
                    <upload :fileList.sync="idCardBackFileList" v-if="mode === 'create' || mode === 'edit' && status === 'editing'"></upload>
            </el-form-item>
            <el-form-item label="上传芝麻信用截图">                
                    <upload :fileList.sync="scoreFileList" v-if="mode === 'create' || mode === 'edit' && status === 'editing'"></upload>
            </el-form-item>
            <el-form-item label="备注信息">                
                <el-input type="textarea" v-model="remark"></el-input>                   
            </el-form-item>
        </el-form>

        <el-form :model="item" label-width= "180px" v-show="mode === 'view' || mode === 'edit' && status === ''">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="法人姓名">
                        {{name}}
                    </el-form-item>
                    <el-form-item label="法人手机号">
                        {{mobile}}
                    </el-form-item>

                    <el-form-item label="芝麻信用分">
                        {{score}}
                    </el-form-item>
                </el-col>
                <el-col :span="12">                    
                    <el-form-item label="法人身份证">
                        {{idCard}}
                    </el-form-item>
                    
                    <el-form-item label="法人邮箱">
                        {{email}}
                    </el-form-item>
                </el-col>
            </el-row>
                        
            <el-form-item label="上传身份证正面照">                                    
                    <file-list :fileList="idCardFrontFileList"></file-list>
            </el-form-item>
            <el-form-item label="上传身份证反面照">                
                    <file-list :fileList="idCardBackFileList"></file-list>
            </el-form-item>
            <el-form-item label="上传芝麻信用截图">                
                    <file-list :fileList="scoreFileList"></file-list>
            </el-form-item>
            <el-form-item label="备注信息">                
                {{remark}}
            </el-form-item>
        </el-form>
    </CollapsePanel>
</template>
<script>
/**
 * 合伙人信息组件
 */
    import CollapsePanel from '@/components/common/CollapsePanel';
    import Upload from '@/components/common/Upload';
    import FileList from '@/components/common/FileList';
    import {generateComputed, Validator} from './_Utils';
    import {mapMutations} from 'vuex';
    // 服务人员信息
    export default {
        name: "corporateInfo",
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
                status: "",
                innerItem: {

                },
                rules: {
                    mobile: [{
                        validator: Validator.mobile,
                        trigger: 'blur'
                    }],
                    idCard: [{
                        validator: Validator.idCard,
                        trigger: 'blur'
                    }],
                    email: [{
                        type: 'email',
                        trigger: 'blur',
                        message: '请输入正确的邮箱'
                    }]
                }
            };
        },
        computed: {
            "name": generateComputed("name", "CorporateInfo", "updateName"),
            "mobile": generateComputed("mobile", "CorporateInfo", "updateMobile"),
            "idCard": generateComputed("idCard", "CorporateInfo", "updateIdCard"),
            "email": generateComputed("email", "CorporateInfo", "updateEmail"),
            "score": generateComputed("score", "CorporateInfo", "updateScore"),
            "idCardFrontFileList": generateComputed("idCardFrontFileList", "CorporateInfo", "updateIdCardFrontFileList"),
            "idCardBackFileList": generateComputed("idCardBackFileList", "CorporateInfo", "updateIdCardBackFileList"),
            "scoreFileList": generateComputed("scoreFileList", "CorporateInfo", "updateScoreFileList"),
            "remark": generateComputed("remark", "CorporateInfo", "updateRemark"),
            "needShow": function() {
                return this.$store.state.AgentCompanyInfo.signed;
            }
        },
        methods: {
            handleEdit() {
                this.status = 'editing';                
                this.innerItem = JSON.parse(JSON.stringify(this.$store.state.CorporateInfo || {}));          
            },
            handleComplete() {
                this.status = '';                                
                this.updateItem(this.innerItem);
            },
            handleCancel() {
                this.status = '';                              
            },
            validate(fn) {
                if(this.needShow)
                    this.$refs.form.validate(fn);
                else
                    fn(true);
            },

/**
 * state.name = item.name;
            state.mobile = item.mobile;
            state.idCard = item.idCard;
            state.email = item.email;
            state.score = item.score;
            state.idCardFrontFileList = item.idCardFrontFileList;
            state.idCardBackFileList = item.idCardBackFileList;
            state.scoreFileList = item.scoreFileList;
            state.remark = item.remark;
 */
            ...mapMutations("CorporateInfo", ['updateItem', 
                'updateMobile', 
                'updateName', 
                'updateIdCard', 
                'updateEmail', 
                'updateScore',
                'updateIdCardFrontFileList',
                'updateIdCardBackFileList',
                'updateScoreFileList',
                'updateRemark'])
        },
        watch: {
            
        }
    }
</script>
<style scoped>

</style>