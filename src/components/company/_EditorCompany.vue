<template>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="60%" >
        <el-form :model="form" :rules="rules" ref="form" label-width="110px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="公司名称" prop="name" class="tl">
                        <el-input v-model="form.name" placeholder="50字以内" maxlength="50"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="公司简称" prop="abbreviation">
                        <el-input v-model="form.abbreviation" placeholder="50字以内" maxlength="50"></el-input>
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
                        <el-input v-model.number="form.deposit" placeholder="数字"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="组织机构代码" prop="organizationCode" class="tl">
                        <el-input v-model="form.organizationCode" placeholder="50字以内" maxlength="50"></el-input>
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
            <el-form-item label="bd" prop="bds"  label-width="40px" class="tl">
                <el-select v-model="form.bds" placeholder="请选择" @focus="bdList" filterable multiple style="width:100%;" :clearable="true">
                    <el-option
                        v-for="item in bdInfoList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
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
                <el-select v-model="form.agencyId" placeholder="请选择" @focus="agencyList" filterable :clearable="true">
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
                <upload :fileList.sync='form.file' v-if="dialogVisible"></upload> 
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="submitForm" type="primary">保存</el-button>
            <el-button @click="resetForm">关闭</el-button>
        </span>
    </el-dialog>
</template>

<script>
import Region from '@/components/common/Region';
import Upload from '@/components/common/Upload';
export default {
    name:'editorCompany',
    props:['companyId','title'],
    components:{Region,Upload},
    data(){
        return {
            agencyInfoList:[],
            bdInfoList:[],
            dialogVisible:false,
            startLevel:1,//二级联动城市传参
            endLevel:2,//二级联动城市传参
            form:{
                abbreviation:'',//公司简称;
                address:'',//地址
                agencyId:'',//代理商Id
                bds:[],//bdIdlist
                businessType:'',//房源类型,0为全部，1.新上，2.二手房，3.新房＋二手房
                cityId:'',//所属城市Id
                cityList:[],//值必须为number
                corporate:'',//法人代表
                corporatePhone:'',//电话
                cooperationTime:[],//合作时间段
                companyId:'',//公司Id;
                deposit:'',//保证金
                file:[],//上传资料
                name:"",//公司名称;
                organizationCode:'',//组织机构代码
                provinceId:'',//省份Id
                resource:[{
                    fileName:'',//上传文件的名
                    owner:'',//公司Id
                    resourceKey:'',//上传文件的key
                }]//上传所需字段
            },
            // 必填设置
            rules: {
                businessType: [{ required: true, message: '请输入业务', trigger: 'blur' }],
                name: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
                abbreviation: [{ required: true, message: '请输入公司简称', trigger: 'blur' }],
                cityList: [{ required: true, message: '请输入城市', trigger: 'blur' }],
                deposit: [{ required: true, message: '请输入保证金', trigger: 'blur' },{ type: 'number', message: '保证金必须为数字值'}],
                organizationCode: [{ required: true, message: '请输入组织机构代码', trigger: 'blur' }],
                cooperationTime: [{ required: true, message: '请输入合作时间段', trigger: 'blur' }]
            }
        }
    },
    created(){
        //获取代理商列表;
        this.agencyList();
        this.bdList();
    },
    methods:{
        open() {
            let self=this;
            if(this.title=='编辑公司'){
                // 获取公司详情;
                this.$http.get(this.$apiUrl.company.detail+"?companyId="+this.companyId)
                    .then(function(data){
                        if(data.data.data.file) {
                            data.data.data.file = [data.data.data.file];
                        }else{
                            data.data.data.file = [];
                        }
                        // self.form=data.data.data;
                        self.form=Object.assign({},self.form,data.data.data);
                        for(var i in self.form.bdList){
                            self.form.bds.push(self.form.bdList[i].bdId);
                        };
                        self.form.cityList=[self.form.provinceId,self.form.cityId];
                        self.dialogVisible = true;
                })
                .catch(function(err){
                    console.log(err);
                });
            }else{
                this.form={
                    abbreviation:'',//公司简称;
                    address:'',//地址
                    agencyId:'',//代理商Id;
                    bds:[],//bdIdList
                    businessType:'',//房源类型,0为选择，1.新上，2.二手房，3.新房＋二手房
                    cityId:'',//所属城市Id
                    cityList:[],//值必须为number
                    corporate:'',//法人代表
                    corporatePhone:'',//电话
                    cooperationTime:[],//合作时间段
                    companyId:'',//公司id;
                    deposit:'',//保证金
                    file:[],//上传资料
                    name:"",//公司名称;
                    organizationCode:'',//组织机构代码
                    provinceId:'',//省份Id
                    resource:[{
                        fileName:'',//上传文件的名
                        owner:'',//公司Id
                        resourceKey:'',//上传文件的key
                    }],//上传所需字段 
                };
                this.dialogVisible = true;
            }
            
        },
        // bdList
        bdList(){
            console.log(this.form.file,'file')
            this.$http.get(this.$apiUrl.common.employee+"?personType=5")
                .then(data=>{
                    this.bdInfoList=data.data.data;
                }).catch(err=>{
                    console.log(err);
                })
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
        handleClose() {
            this.$refs.form.resetFields();   
        },
        submitForm() {
            let self=this;
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.dialogVisible=false;
                    if(this.title=='编辑公司'){
                        this.form.cooperationStart=this.form.cooperationTime[0];
                        this.form.cooperationEnd=this.form.cooperationTime[1];
                        let realForm=Object.assign({},this.form);
                        realForm.cityId=this.form.cityList[1];
                        if(realForm.file.length){
                            for(var i in realForm.file){
                                realForm.resource.push({
                                    fileName:realForm.file[i].fileName,
                                    owner:realForm.companyId,
                                    resourceKey:realForm.file[i].resourceKey
                                });
                            };
                        };
                        this.$http.post(this.$apiUrl.company.add,realForm)
                            .then(function(data){
                                self.$message({
                                    message: '编辑成功',
                                    type: 'success'
                                });
                                self.$emit('editSuccess',self.form);
                            })
                            .catch(function(error){
                                self.$message({
                                    message: '编辑失败',
                                    type: 'error'
                                });
                            });
                    }else{
                        if(this.form.cityList.length){
                            this.form.provinceId=this.form.cityList[0];
                            this.form.cityId=this.form.cityList[1];
                        };
                        this.form.cooperationStart=this.form.cooperationTime[0];
                        this.form.cooperationEnd=this.form.cooperationTime[1];
                        let realForm=Object.assign({},this.form);
                        if(realForm.file.length){
                            for(var i in realForm.file){
                                realForm.resource.push({
                                    fileName:realForm.file[i].fileName,
                                    owner:realForm.companyId,
                                    resourceKey:realForm.file[i].resourceKey
                                });
                            };
                        };
                        delete realForm.cityList;
                        this.$http.put(this.$apiUrl.company.add,realForm)
                            .then(function(data){
                                self.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                self.$emit('addSuccess',realForm);
                            })
                            .catch(function(error){
                                self.$message({
                                    message: '添加失败',
                                    type: 'err'
                                });
                            });
                    };
                        // 此处代码需要加在请求成功之后;
                        // this.$refs[formName].resetFields();
                }else {
                    this.$message({
                        message:"请填写必填信息",
                        type:"error",
                        dutration:2000
                    });
                    return false;
                }
            });
        },
        resetForm() {
            this.$refs.form.resetFields();
            this.dialogVisible=false;
        }
    }
}
</script>

<style scoped>
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

