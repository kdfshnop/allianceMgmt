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
            <el-form-item label="代理商公司名称" prop="agencyId" v-if="form.storeType==1" >
                <el-select v-model="form.agencyId" placeholder="请选择"  filterable>
                    <el-option
                        v-for="item in agencyList"
                        :key="item.agencyId"
                        :label="item.agencyName"
                        :value="item.agencyId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="中介公司名称" prop="companyId" v-if="form.storeType==2" >
                <el-select v-model="form.agencyId" placeholder="请选择"  filterable>
                    <el-option
                        v-for="item in companyList"
                        :key="item.companyId"
                        :label="item.companyName"
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
            <el-form-item label="经纬度" prop="lonLat" placeholder="经度,纬度">
                <el-input v-model="form.lonLat"></el-input>
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
    props:['currentStoreInfo','title'],
    components:{Region},
    data(){
        return {
            startLevel:2,//二级联动城市传参
            endLevel:4,//二级联动城市传参
            dialogVisible:false,
            agencyList:[],
            companyList:[],
            form: {
                address:'',//地址
                agencyId:'',//代理商Id
                cityId:'',//门店所属城市Id
                areaLinkage:[],//区域联动
                companyId:'',//公司Id
                districtId:'',//区域Id
                name:'',//门店名称
                status:'',
                storeType:'',//门店类型1.直营，2.加盟
                storeState:'',//门店状态1.合作中，2终止
                townId:'',//板块Id
                lonLat:''//经度纬度
            },
            // 必填设置
            rules: {
                companyId: [{ required: true, message: '请输入中介公司名称', trigger: 'blur' }],
                agencyId:[{ required: true, message: '请输入代理商公司名称', trigger: 'blur' }],
                areaLinkage: [{ required: true, message: '请输入城市区域板块', trigger: 'blur' }],
                address:[{ required: true, message: '请输入门店地址', trigger: 'blur' }],
                name:[{ required: true, message: '请输入门店名称', trigger: 'blur' }],
                storeType:[{ required: true, message: '请输入门店类型', trigger: 'blur' }],
                lonLat:[{ required: true, message: '请输入经纬度', trigger: 'blur' }]
            }
        }
    },
    created(){
        // 代理商列表;
        this.agencyList=[
            {
                agencyId:'1',
                agencyName:'商丘代理商'
            },
            {
                agencyId:"2",
                agencyName:'上海代理商'
            }
        ];
        this.companyList=[
            {
                companyId:'1',
                companyName:'商丘中介'
            },
            {
                companyId:"2",
                companyName:'上海中介'
            }
        ]
        // 获取代理商公司列表;
        this.$http.get(this.$apiUrl.agent.list)
            .then(function(data){
                console.log(data,'代理商公司列表success');
            })
            .catch(function(err){
                console.log(err,'代理商公司列表err')
            });
        // 中介公司列表;
        this.$http.get(this.$apiUrl.company.list)
            .then(function(data){
                console.log(data,'中介公司列表success');
            })
            .catch(function(err){
                console.log(err,'中介公司列表err')
            })
    },
    methods:{
        open() {
            if(this.title=='编辑门店'){
                this.form=Object.assign({},this.currentStoreInfo,{areaLinkage:[this.currentStoreInfo.cityId,this.currentStoreInfo.districtId,this.currentStoreInfo.townId]});
            }else{
                this.form= {
                    address:'',//地址
                    agencyId:'',//代理商Id
                    cityId:'',//门店所属城市Id
                    areaLinkage:[],//区域联动
                    companyId:'',//公司Id
                    districtId:'',//区域Id
                    name:'',//门店名称
                    status:'',
                    storeType:'',//门店类型1.直营，2.加盟
                    storeState:'',//门店状态1.合作中，2终止
                    townId:'',//板块Id
                    lonLat:''//经度纬度
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
        submitForm() {
            console.log(this.form,111)
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.dialogVisible=false;
                    alert('提交成功');
                    if(this.title=='编辑门店'){
                        this.$emit('editSuccess',this.form);
                    }else{
                        if(this.form.areaLinkage.length){
                            this.form.cityId=this.form.areaLinkage[0];
                            this.form.districtId=this.form.areaLinkage[1];
                            this.form.townId=this.form.areaLinkage[2];
                        };
                        let realForm=Object.assign({},this.form);
                        delete realForm.companyList;
                        this.$http.post(this.$apiUrl.store.add,realForm)
                            .then(function(data){
                                console.log(data,'添加门店success');
                            })
                            .catch(function(err){
                                console.log(err,'添加门店err')
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

