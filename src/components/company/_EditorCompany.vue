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
                                <el-option label="新房和二手房" :value="3"></el-option>
                                <el-option label="新房" :value="1"></el-option>
                                <el-option label="二手房" :value="2"></el-option>
                            </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="bd" prop="bdName"  label-width="40px" class="tl">
                <el-input v-model="form.bdName" placeholder="请选择"></el-input>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="合作开始时间" prop="cooperationTime">
                            <el-date-picker
                                v-model="form.cooperationTime"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="法人代表" prop="corporate" >
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
                <el-select v-model="form.agencyId" placeholder="请选择" @focus="agencyList" filterable>
                    <el-option label="暂无代理商" :value="0"></el-option>
                    <el-option
                        v-for="item in agencyInfoList"
                        :key="item.agencyId"
                        :label="item.agencyCompanyName"
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
            <el-button @click="submitForm" type="primary">保存</el-button>
            <el-button @click="resetForm">关闭</el-button>
        </span>
    </el-dialog>
</template>

<script>
import Region from '@/components/common/Region'
export default {
    name:'editorCompany',
    props:['companyId','title'],
    components:{Region},
    data(){
        return {
            agencyInfoList:[],
            dialogVisible:false,
            startLevel:1,//二级联动城市传参
            endLevel:2,//二级联动城市传参
            form:{
                abbreviation:'',//公司简称;
                address:'',//地址
                agencyId:'',//代理商Id
                bdName:'',//bd名字
                businessType:'',//房源类型,0为选择，1.新上，2.二手房，3.新房＋二手房
                cityId:'',//所属城市Id
                cityList:[],//值必须为number
                corporate:'',//法人代表
                corporatePhone:'',//电话
                cooperationTime:[],//合作时间段
                deposit:'',//保证金
                comapnyId:'',//公司Id;
                name:"",//公司名称;
                organizationCode:'',//组织机构代码
                provinceId:'',//省份Id
                resourceKey:'',//上传的资源key 
            },
            // 必填设置
            rules: {
                name: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
                abbreviation: [{ required: true, message: '请输入公司简称', trigger: 'blur' }],
                cityList: [{ required: true, message: '请输入城市', trigger: 'blur' }],
                deposit: [{ required: true, message: '请输入保证金', trigger: 'blur' }],
                organizationCode: [{ required: true, message: '请输入组织机构代码', trigger: 'blur' }],
                cooperationTime: [{ required: true, message: '请输入合作时间段', trigger: 'blur' }]
            }
        }
    },
    created(){
        let self=this;
        //获取代理商列表;
        this.$http.get(this.$apiUrl.agent.list)
        .then(function(data){
            self.agencyInfoList=data.data.data;
        })
        .catch(function(err){
            console.log(err,'代理商列表失败');
        });
    },
    methods:{
        open() {
            let self=this;
            if(this.title=='编辑公司'){
                // 获取公司详情;
                this.$http.get(this.$apiUrl.company.detail+"?companyId="+this.companyId)
                    .then(function(data){
                        self.form=data.data.data;
                        self.form.cityList=[self.form.provinceId,self.form.cityId];
                        self.form.cooperationTime=[self.form.cooperationStart,self.form.cooperationEnd];
                        console.log(self.form,'公司详情');
                })
                .catch(function(err){
                    console.log(err);
                });
            }else{
                this.form={
                    abbreviation:'',//公司简称;
                    address:'',//地址
                    agencyId:'',//代理商Id;
                    bdName:'',//bd名字
                    businessType:'',//房源类型,0为选择，1.新上，2.二手房，3.新房＋二手房
                    cityId:'',//所属城市Id
                    cityList:[],//值必须为number
                    corporate:'',//法人代表
                    corporatePhone:'',//电话
                    cooperationTime:[],//合作时间段
                    deposit:'',//保证金
                    companyId:'',//公司id;
                    name:"",//公司名称;
                    organizationCode:'',//组织机构代码
                    provinceId:'',//省份Id
                    resourceKey:'',//上传的资源key 
                }
            }
            this.dialogVisible = true;
        },
        agencyList(){
            let self=this;
            this.$http.get(this.$apiUrl.agent.list)
            .then(function(data){
                self.agencyInfoList=data.data.data;
            })
            .catch(function(err){
                console.log(err,'代理商列表失败');
            })
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => { 
                this.$refs.form.resetFields(); 
                done();
            })
            .catch(_ => {});
        },
        submitForm() {
             this.$refs.form.validate((valid) => {
               if (valid) {
                    this.dialogVisible=false;
                    alert('提交成功');
                    if(this.title=='编辑公司'){
                        this.form.cooperationStart=this.form.cooperationTime[0];
                        this.form.cooperationEnd=this.form.cooperationTime[1];
                        this.$http.post(this.$apiUrl.company.add,realForm)
                            .then(function(data){
                                console.log(data);
                            })
                            .catch(function(error){
                                console.log(error)
                            });
                        this.$emit('editSuccess',this.form);
                    }else{
                        if(this.form.cityList.length){
                            this.form.provinceId=this.form.cityList[0];
                            this.form.cityId=this.form.cityList[1];
                        };
                        this.form.cooperationStart=this.form.cooperationTime[0];
                        this.form.cooperationEnd=this.form.cooperationTime[1];
                        let realForm=Object.assign({},this.form);
                        delete realForm.cityList;
                        this.$http.put(this.$apiUrl.company.add,realForm)
                            .then(function(data){
                                alert(12)
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
        resetForm() {
            this.$refs.form.resetFields();
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
            // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
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

