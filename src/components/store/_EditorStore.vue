<template>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
        <el-form :model="form" :rules="rules" ref="form" label-width="120px">
            <el-form-item label="门店名称" prop="name" >
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="门店类型" prop="storeType">
                <el-select v-model="form.storeType" filterable placeholder="请选择加盟或直营">
                        <el-option label="代理商直营门店" value="1"></el-option>
                        <el-option label="加盟门店" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="代理商公司名称" prop="companyName" >
                <el-input v-model="form.companyName"></el-input>
            </el-form-item>
            <el-form-item label="门店地址" prop="address">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="城市" prop="city" label-width="60px">
                        <el-input v-model="form.city"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="区域" prop="districtId">
                        <el-input v-model="form.districtId"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="板块" prop="townId">
                        <el-input v-model="form.city"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="经纬度" prop="lonlat" placeholder="经度,纬度">
                <el-input v-model="form.lonLat"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="submitForm('form')" type="primary">保存</el-button>
            <el-button @click="resetForm('form')">关闭</el-button>
        </span>
    </el-dialog>
</template>

<script>
import Region from '@/components/common/Region';

export default {
    name:'editorStore',
    props:['currentStoreInfo','title'],
    components:{Region},
    data(){
        return {
            startLevel:2,//二级联动城市传参
            endLevel:4,//二级联动城市传参
            dialogVisible:false,
            form: {
                address:'',//地址
                agencyId:'',//代理商Id
                city:'',//门店所属城市
                companyId:'',//公司Id
                companyName:'',//代理商名称
                districtId:'',//区域Id
                name:'',//门店名称
                status:'',
                storeType:'',//门店类型1.直营，2.加盟
                storeState:'',//门店状态1.合作中，2终止
                townId:'',//板块Id
                lonLat:''//经度纬度
            },
            cityList:'',//城市列表
            array:[],
            // 必填设置
            rules: {
                companyName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
                abbreviation: [{ required: true, message: '请输入公司简称', trigger: 'blur' }],
                city: [{ required: true, message: '请输入城市', trigger: 'blur' }],
                cash: [{ required: true, message: '请输入保证金', trigger: 'blur' }],
                code: [{ required: true, message: '请输入组织机构代码', trigger: 'blur' }],
                bd: [{ required: true, message: '请输入bd', trigger: 'blur' }],
                districtId: [{ required: true, message: '请输入区域', trigger: 'blur' }],
                townId:[{ required: true, message: '请输入板块', trigger: 'blur' }],
                address:[{ required: true, message: '请输入门店地址', trigger: 'blur' }],
                name:[{ required: true, message: '请输入门店名称', trigger: 'blur' }],
                storeType:[{ required: true, message: '请输入门店类型', trigger: 'blur' }]
            }
        }
    },
    methods:{
        open() {
            if(this.title=='编辑门店'){
                this.ruleForm=Object.assign({},this.currentStoreInfo);
            }else{
                this.ruleForm= {
                    address:'',//地址
                    area:'',//区域
                    companyName:'',//公司名称
                    plate:'',//板块
                    storeAdress:'',//门店地址
                    storeName:'',//门店名称
                    storeType:'',//门店类型
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
                    if(this.title=='编辑门店'){
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

</style>

