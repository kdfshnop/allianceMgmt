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
                    <el-form-item label="所属城市" prop="cityList" class="tl">
                        <region v-model="form.cityList" :startLevel="startLevel" :endLevel="endLevel"></region>
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
                    <el-form-item prop="businessType" label="业务" placeholder="请选择">
                        <el-select v-model="form.businessType" filterable>
                                <el-option label="新房和二手房" value="3"></el-option>
                                <el-option label="新房" value="1"></el-option>
                                <el-option label="二手房" value="2"></el-option>
                            </el-select>
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
                <el-select v-model="form.agencyId" placeholder="请选择">
                    <el-option label="暂无代理商" value="0"></el-option>
                    <el-option
                        v-for="item in agencyList"
                        :key="item.agencyId"
                        :label="item.agencyName"
                        :value="item.agencyId">
                    </el-option>
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
import Region from '@/components/common/Region'
export default {
    name:'editorCompany',
    props:['currentCompanyInfo','title'],
    components:{Region},
    data(){
        return {
            agencyList:[
                {
                    agencyId:'1',
                    agencyName:'北京代理商'
                },
                {
                    agencyId:"2",
                    agencyName:'上海代理商'
                }
            ],
            dialogVisible:false,
            startLevel:1,//二级联动城市传参
            endLevel:2,//二级联动城市传参
            form:{
                abbreviation:'',//公司简称
                address:'',//地址
                agencyId:'',//代理商Id
                businessType:'',//房源类型,0为选择，1.新上，2.二手房，3.新房＋二手房
                cityId:'',//所属城市Id
                cityList:[],
                corporate:'',//法人代表
                corporatePhone:'',//电话
                corporateStart:'',//合作开始时间
                corporateEnd:'',//合作结束时间
                deposit:'',//保证金
                name:'',//公司名称
                organizationCode:'',//组织机构代码
                operator:'',//操作人
                provinceId:'',//省份Id
                resourceKey:'',//上传的资源key
                state:''//状态1.合作中，2.合作终止 
            },
            // 必填设置
            rules: {
                name: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
                abbreviation: [{ required: true, message: '请输入公司简称', trigger: 'blur' }],
                cityList: [{ required: true, message: '请输入城市', trigger: 'blur' }],
                deposit: [{ required: true, message: '请输入保证金', trigger: 'blur' }],
                organizationCode: [{ required: true, message: '请输入组织机构代码', trigger: 'blur' }],
                corporateStart: [{ required: true, message: '请输入合作开始时间', trigger: 'blur' }],
                corporateEnd: [{ required: true, message: '请输入合作结束时间', trigger: 'blur' }]
            }
        }
    },
    created(){
        // 获取代理商列表;
        this.$http.get(this.$apiUrl.common.agency)
            .then(function(data){
                 console.log(data,'代理商列表成功');
            })
            .catch(function(err){
                console.log(err,'代理商接口错误');
            })
    },
    methods:{
        open() {
            if(this.title=='编辑公司'){
                this.form=Object.assign({},this.currentCompanyInfo,{cityList:[this.currentCompanyInfo.provinceId,this.currentCompanyInfo.cityId]});
            }else{
                this.form={
                    abbreviation:'',//公司简称
                    address:'',//地址
                    agencyId:'',//代理商Id
                    businessType:'',//房源类型,空为未选择，1.新上，2.二手房，3.新房＋二手房
                    cityId:'',//所属城市
                    cityList:[],//城市二级联动所需
                    corporate:'',//法人代表
                    corporatePhone:'',//电话
                    corporateStart:'',//合作开始时间
                    corporateEnd:'',//合作结束时间
                    deposit:'',//保证金
                    name:'',//公司名称
                    organizationCode:'',//组织机构代码
                    operator:'',//操作人
                    provinceId:'',//省份Id
                    resourceKey:'',//上传的资源key 
                }
            }
            this.dialogVisible = true;
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => { 
                this.$refs.form.resetFields(); 
                done();
            })
            .catch(_ => {});
        },
        submitForm(formName) {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.dialogVisible=false;
                    alert('提交成功');
                    if(this.title=='编辑公司'){
                        this.$emit('editSuccess',this.form);
                    }else{
                        if(this.form.cityList.length){
                            this.form.provinceId=this.form.cityList[0];
                            this.form.cityId=this.form.cityList[1];
                        }
                        let realForm=Object.assign({},this.form);
                        delete realForm.cityList;
                        this.$http.put(this.$apiUrl.company.add,realForm)
                            .then(function(data){
                                console.log(data);
                            })
                            .catch(function(error){
                                console.log(error)
                            });
                        this.$emit('addSuccess',realForm);
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

