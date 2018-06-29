<template>
    <el-dialog title="设置分佣账户" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form :model="form" :rules="rules"  ref="form" label-width="110px" class="demo-form">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="开户银行类型" prop="bankType" class="tl">
                        <el-input v-model="form.bankType"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="开户支行" prop="subBranch">
                        <el-input v-model="form.subBranch"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="账户名" prop="name" class="tl">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="银行账号" prop="account">
                        <el-input v-model="form.account"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="submitForm" type="primary">保存</el-button>
            <el-button @click="resetForm">关闭</el-button>
        </span> 
    </el-dialog>
</template>

<script>
export default {
    name:'commission',
    props:['currentCompanyInfo'],
    data(){
        return {
            dialogVisible:false,
            form:{
                account:'',//银行账户
                bankType:'',//开户银行类型 
                name: '',//账户名
                subBranch: '',//开户支行 
            },
            rules: {
                bankType:[{ required: true, message: '请输入开户银行类型', trigger: 'blur' }],
                subBranch: [{ required: true, message: '请输入开户支行', trigger: 'blur' }],
                name: [{ required: true, message: '请输入账户名', trigger: 'blur' },],
                account:[{ required: true, message: '请输入银行账号', trigger: 'blur' }]
            }
        }
    },
    methods:{
        submitForm() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.dialogVisible=false;
                    alert('提交成功');
                    // 获取输入的表单信息,以及该公司的标识如公司Id;
                    this.form.companyId=this.currentCompanyInfo.companyId||'';
                    this.$http.post(this.$apiUrl.company.commission,this.form)
                        .then(function(data){
                            console.log(data,'成功');
                        })
                        .catch(function(err){
                            console.log(err,'失败');
                        });
                    // 提交成功后重置
                    // this.$refs.form.resetFields();
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
        handleClose(done) {
            // 此处执行点击x号;
            this.$confirm('确认关闭？')
            .then(_ => { 
                //此处执行点击确定 
                this.$refs.form.resetFields();
                done();
            })
            .catch(_ => {
                //此处执行取消
            });
        },
        // 调用子组件方法;
        open(){
            this.dialogVisible=true;
        }
    }
}
</script>

<style scoped>
    .el-dialog__footer{
        text-align: left;
    }
</style>


