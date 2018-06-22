<template>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="公司名称" prop="companyName" class="tl">
                        <el-input v-model="ruleForm.companyName" placeholder="50字以内"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="公司简称" prop="abbreviation">
                        <el-input v-model="ruleForm.abbreviation" placeholder="50字以内"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="所属城市" prop="city" class="tl">
                        <el-input v-model="ruleForm.city" placeholder="请选择..."></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="保证金" prop="cash">
                        <el-input v-model="ruleForm.cash"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="组织机构代码" prop="code" class="tl">
                        <el-input v-model="ruleForm.code" placeholder="50字以内"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="radio">
                        <el-radio-group v-model="ruleForm.radio">
                            <el-radio label="二手房" value="二手房"></el-radio>
                            <el-radio label="新房" value="新房"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="bd" prop="bd"  label-width="40px" class="tl">
                <el-input v-model="ruleForm.bd" placeholder="请选择"></el-input>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="合作时间" prop="joinTime" class="tl">
                        <el-input v-model="ruleForm.joinTime" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="法人代表" prop="legal">
                        <el-input v-model="ruleForm.legal"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="电话" class="tl" prop="tel">
                        <el-input v-model="ruleForm.tel" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="地址" prop="address" >
                        <el-input v-model="ruleForm.address"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="代理商" class="tl" prop="agency">
                <el-input v-model="ruleForm.date"></el-input>
            </el-form-item>
            <el-form-item  class="tl upload">
                <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed">
                    <el-button size="small" type="primary">上传附件</el-button>
                    <div slot="tip" class="el-upload__tip">(上传附件的格式后缀名为txt,doc,docx,xls,xlsx,ppt,pptx,pdf,jpg,jpeg,png,gif,rar,zip)</div>
                </el-upload>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="submitForm('ruleForm')" type="primary">保存</el-button>
            <el-button @click="resetForm('ruleForm')">关闭</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name:'editorCompany',
    props:['currentCompanyInfo','title'],
    data(){
        return {
            dialogVisible:false,
            ruleForm: {
                address:'',//地址
                agency:'',//代理商
                companyName:'',//公司名称
                bd:'',//bd
                abbreviation:'',//公司简称
                city:'',//公司所属城市
                cash:'',//保证金
                code:'',//组织机构代码
                radio:'',//新房二手房
                joinTime:'',//合作时间
                legal:'',//法人
                tel:''//电话
            },
            // 必填设置
            rules: {
                companyName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
                abbreviation: [{ required: true, message: '请输入公司简称', trigger: 'blur' }],
                city: [{ required: true, message: '请输入城市', trigger: 'blur' }],
                cash: [{ required: true, message: '请输入保证金', trigger: 'blur' }],
                code: [{ required: true, message: '请输入组织机构代码', trigger: 'blur' }],
                bd: [{ required: true, message: '请输入bd', trigger: 'blur' }],
                joinTime: [{ required: true, message: '请输入合作时间', trigger: 'blur' }]
            }
        }
    },
    methods:{
        open() {
            if(this.title=='编辑公司'){
                this.ruleForm=Object.assign({},this.currentCompanyInfo);
            }else{
                this.ruleForm={
                    address:'',//地址
                    agency:'',//代理商
                    companyName:'',//公司名称
                    bd:'',//bd
                    abbreviation:'',//公司简称
                    city:'',//公司所属城市
                    cash:'',//保证金
                    code:'',//组织机构代码
                    radio:'',//新房二手房
                    joinTime:'',//合作时间
                    legal:'',//法人
                    tel:''//电话
                }
            }
            this.dialogVisible = true;
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => { 
                this.$refs.ruleForm.resetFields(); 
                done();
            })
            .catch(_ => {});
        },
        submitForm(formName) {
            console.log(this.ruleForm,111)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.dialogVisible=false;
                    alert('提交成功');
                    if(this.title=='编辑公司'){
                        this.$emit('editSuccess',this.ruleForm);
                    }else{
                        this.$emit('addSuccess',this.ruleForm);
                    };
                    // 此处代码需要加在请求成功之后;
                    // this.$refs[formName].resetFields();
                } else {
                    alert('请填写必填信息')
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.dialogVisible=false;
        },
        //   上传附件的方法;
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        } 
    }
}
</script>

<style>
    .tl .el-form-item__label{
        text-align: left;
    }
    .upload .el-form-item__content{
        margin-left: 0!important;
    }
</style>

