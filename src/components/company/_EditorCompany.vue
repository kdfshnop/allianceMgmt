<template>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
        <el-form :model="form" :rules="rules" ref="form" label-width="110px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="公司名称" prop="name" class="tl">
                        <el-input v-model="form.name" placeholder="50字以内"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="公司简称" prop="abbreviation">
                        <el-input v-model="form.abbreviation" placeholder="50字以内"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="所属城市" prop="cityId" class="tl">
                        <el-input v-model="form.cityId" placeholder="请选择..."></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="保证金" prop="deposit">
                        <el-input v-model="form.deposit"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="组织机构代码" prop="organizationCode" class="tl">
                        <el-input v-model="form.organizationCode" placeholder="50字以内"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="businessType">
                        <el-checkbox-group v-model="form.businessType">
                            <el-checkbox label="1" >二手房</el-checkbox>
                            <el-checkbox label="2" >新房</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="bd" prop="operator"  label-width="40px" class="tl">
                <el-input v-model="form.operator" placeholder="请选择"></el-input>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="合作时间" prop="corporateStart" class="tl team-time">
                                <el-date-picker
                                    format="yyyy-MM-dd"
                                    v-model="form.corporateStart"
                                    type="date"
                                    placeholder="选择日期"
                                    style="width:150px"
                                    value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item prop="corporateEnd" label="至" class="team-time">
                                <el-date-picker
                                    format="yyyy-MM-dd"
                                    v-model="form.corporateEnd"
                                    type="date"
                                    placeholder="选择日期"
                                    style="width:150px"
                                    value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="法人代表" prop="corporate">
                        <el-input v-model="form.corporate"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="电话" class="tl" prop="corporatePhone">
                        <el-input v-model="form.corporatePhone" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="地址" prop="address" >
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="代理商" class="tl" prop="agencyId">
                <el-select v-model="form.agencyId" filterable>
                        <el-option label="暂无代理商" value="暂无代理商"></el-option>
                        <el-option label="城市代理" value="城市代理"></el-option>
                        <el-option label="区域代理" value="区域代理"></el-option>
                </el-select>
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
            <el-button @click="submitForm('form')" type="primary">保存</el-button>
            <el-button @click="resetForm('form')">关闭</el-button>
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
            form:{
                abbreviation:'',//公司简称
                address:'',//地址
                agentcyId:'',//代理商Id
                businessType:[],//房源类型,0为选择，1.新上，2.二手房，3.新房＋二手房
                cityId:'',//所属城市
                corporate:'',//法人代表
                corporatePhone:'',//电话
                corporateStart:'',//合作开始时间
                corporateEnd:'',//合作结束时间
                deposit:'',//保证金
                name:'',//公司名称
                organizationCode:'',//组织机构代码
                operator:'',//操作人
                resourceKey:'',//上传的资源key
                state:''//状态1.合作中，2.合作终止 
            },
            agency:['代理商1','代理商2'],
            // 必填设置
            rules: {
                name: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
                abbreviation: [{ required: true, message: '请输入公司简称', trigger: 'blur' }],
                cityId: [{ required: true, message: '请输入城市', trigger: 'blur' }],
                deposit: [{ required: true, message: '请输入保证金', trigger: 'blur' }],
                organizationCode: [{ required: true, message: '请输入组织机构代码', trigger: 'blur' }],
                corporateStart: [{ required: true, message: '请输入合作开始时间', trigger: 'blur' }],
                corporateEnd: [{ required: true, message: '请输入合作结束时间', trigger: 'blur' }]
            }
        }
    },
    methods:{
        open() {
            if(this.title=='编辑公司'){
                this.ruleForm=Object.assign({agency:'暂无代理商'},this.currentCompanyInfo);
            }else{
                this.ruleForm={
                    address:'',//地址
                    agency:'暂无代理商',//代理商
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
            console.log(this.form,formName,111)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.dialogVisible=false;
                    alert('提交成功');
                    if(this.title=='编辑公司'){
                        this.$emit('editSuccess',this.form);
                    }else{
                        this.$emit('addSuccess',this.form);
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
    .team-time .el-form-item__error{
        width:120px;
    }
</style>

