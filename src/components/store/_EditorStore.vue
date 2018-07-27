<template>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
        <el-form :model="form" :rules="rules" ref="form" label-width="120px">
            <el-form-item label="门店名称" prop="name" >
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="门店类型" prop="storeType">
                <el-select v-model="form.storeType" filterable placeholder="请选择加盟或直营">
                        <el-option label="代理商直营门店" :value="1"></el-option>
                        <el-option label="加盟门店" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="代理商公司名称" prop="agencyId" v-if="form.storeType==1" >
                <el-select v-model="form.agencyId" placeholder="请选择" @focus="agencyList" filterable clearable="true">
                    <el-option label="暂无代理商" :value="0"></el-option>
                    <el-option
                        v-for="item in agencyInfoList"
                        :key="item.agencyId"
                        :label="item.agencyCompanyName"
                        :value="item.agencyId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="中介公司名称" prop="companyId" v-if="form.storeType==2" >
                <el-select v-model="form.companyId" placeholder="请选择" @focus="companyList"  filterable clearable="true">
                    <el-option
                        v-for="item in companyInfoList"
                        :key="item.companyId"
                        :label="item.name"
                        :value="item.companyId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="门店地址" prop="address">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="城市-区域-板块" prop="areaLinkage">
                <region v-model="form.areaLinkage" :startLevel="startLevel" :endLevel="endLevel"></region>
            </el-form-item>
            <el-form-item label="经纬度" prop="longlat" placeholder="经度,纬度">
                <el-input v-model="form.longlat" @blur="longlat"></el-input>
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

export default {
    name:'editorStore',
    props:['storeId','title'],
    components:{Region},
    data(){
        return {
            startLevel:2,//二级联动城市传参
            endLevel:4,//二级联动城市传参
            dialogVisible:false,
            companyInfoList:[],
            longlatFormat:false,//经纬度格式
            form: {
                address:'',//门店地址;
                agencyId:'',//代理商Id;
                areaLinkage:[],//区域联动
                cityId:'',//城市Id;
                companyId:'',//中介公司Id;
                districtId:'',//区域Id;
                longlat:'',//先经度后纬度;
                name:'',//门店名称;
                provinceId:'',//省份Id;
                storeType:'',//门店类型;
                townId:'',//板块Id;
            },
            // 必填设置
            rules: {
                companyId: [{ required: true, message: '请输入中介公司名称', trigger: 'blur' }],
                agencyId:[{ required: true, message: '请输入代理商公司名称', trigger: 'blur' }],
                areaLinkage: [{ required: true, message: '请输入城市区域板块', trigger: 'blur' }],
                address:[{ required: true, message: '请输入门店地址', trigger: 'blur' }],
                name:[{ required: true, message: '请输入门店名称', trigger: 'blur' }],
                storeType:[{ required: true, message: '请输入门店类型', trigger: 'blur' }],
                longlat:[{ required: true, message: '请输入经纬度', trigger: 'blur' }]
            }
        }
    },
    created(){
        // 代理商列表;
        this.agencyList();
        // 中介公司列表;
        this.companyList();
    },
    methods:{
        open() {
            let self =this;
            if(this.title=='编辑门店'){
                // 获取门店详情;
                this.$http.get(this.$apiUrl.store.add+"?id="+this.storeId)
                    .then(function(data){
                        self.form=data.data.data;
                        self.form.areaLinkage=[self.form.cityId,self.form.districtId,self.form.townId];
                    })
                    .catch(function(err){
                        console.log(err);
                    })
            }else{
                this.form= {
                    address:'',//门店地址;
                    agencyId:'',//代理商Id;
                    areaLinkage:[],//区域联动
                    cityId:'',//城市Id;
                    companyId:'',//中介公司Id;
                    districtId:'',//区域Id;
                    longlat:'',//先经度后纬度;
                    name:'',//门店名称;
                    provinceId:'',//省份Id;
                    storeType:'',//门店类型;
                    townId:'',//板块Id;
                }
            }
            this.dialogVisible = true;
        },
        longlat(){
            let longlatArray=this.form.longlat.split(',');
            var reg = /^[0-9]+.?[0-9]*$/;
            if(longlatArray.length==2&&reg.test(longlatArray[0])&&reg.test(longlatArray[1])){
                this.longlatFormat=true;
            }else{
                this.longlatFormat=false;
                this.$message({
                    message: '经纬度格式不正确',
                    type: 'warning'
                });
            }
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
            let self=this;
            this.longlat();
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if(self.longlatFormat){
                        this.dialogVisible=false;
                        if(this.title=='编辑门店'){
                            if(this.form.areaLinkage.length){
                                this.form.cityId=this.form.areaLinkage[0];
                                this.form.districtId=this.form.areaLinkage[1];
                                this.form.townId=this.form.areaLinkage[2];
                            };
                            this.$http.post(this.$apiUrl.store.add,this.form)
                                .then(function(data){
                                    self.$message({
                                        message: '编辑成功',
                                        type: 'success'
                                    });
                                    self.$emit('editSuccess',self.form);
                                })
                                .catch(function(err){
                                    self.$message({
                                        message: '编辑失败',
                                        type: 'error'
                                    });
                                })
                        }else{
                            if(this.form.areaLinkage.length){
                                this.form.cityId=this.form.areaLinkage[0];
                                this.form.districtId=this.form.areaLinkage[1];
                                this.form.townId=this.form.areaLinkage[2];
                            };
                            this.$http.put(this.$apiUrl.store.add,this.form)
                                .then(function(data){
                                    self.$message({
                                        message: '添加成功',
                                        type: 'success'
                                    });
                                    self.$emit('addSuccess',self.form);
                                })
                                .catch(function(err){
                                    self.$message({
                                        message: '添加失败',
                                        type: 'error'
                                    });
                                });
                        };
                    }else{
                        self.$message({
                            message: '经纬度格式不正确',
                            type: 'warning'
                        });
                    }
                    // 此处代码需要加在请求成功之后;
                    // this.$refs[formName].resetFields();
                } else {
                    self.$message({
                        message: '请填写必填信息',
                        type: 'warning'
                    });
                    return false;
                }
            });
        },
        resetForm() {
            this.$refs.form.resetFields();
            this.dialogVisible=false;
        },
        // 代理商列表;
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
        // 中介公司列表;
        companyList(){
            let self=this;
            // 中介公司列表;
            this.$http.get(this.$apiUrl.company.list)
                .then(function(data){
                    self.companyInfoList=data.data.data
                })
                .catch(function(err){
                    console.log(err,'中介公司列表err')
                })
        }
    }
}
</script>

<style>

</style>

