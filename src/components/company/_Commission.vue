<template>
    <el-dialog title="设置分佣账户" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form :model="form" :rules="rules"  ref="form" label-width="110px" class="demo-form">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="开户银行类型" prop="openBankType" class="tl">
                        <el-input v-model="form.openBankType"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="开户支行" prop="openBankBranch">
                        <el-input v-model="form.openBankBranch"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="账户名" prop="accountName" class="tl">
                        <el-input v-model="form.accountName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="银行账号" prop="bankAccount">
                        <el-input v-model="form.bankAccount"></el-input>
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
    props:['companyId'],
    data(){
        return {
            dialogVisible:false,
            form:{
                bankAccount:'',//银行账户
                openBankType:'',//开户银行类型 
                accountName: '',//账户名
                openBankBranch: '',//开户支行 
            },
            rules: {
                openBankType:[{ required: true, message: '请输入开户银行类型', trigger: 'blur' }],
                openBankBranch: [{ required: true, message: '请输入开户支行', trigger: 'blur' }],
                accountName: [{ required: true, message: '请输入账户名', trigger: 'blur' },],
                bankAccount:[{ required: true, message: '请输入银行账号', trigger: 'blur' }]
            }
        }
    },
    methods:{
        submitForm() {
            let self=this;
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let realForm={};
                    realForm.bankAccount=this.form.bankAccount;
                    realForm.openBankType=this.form.openBankType;
                    realForm.accountName=this.form.accountName;
                    realForm.openBankBranch=this.form.openBankBranch;
                    realForm.companyId=this.companyId;
                    this.dialogVisible=false;
                    // 获取输入的表单信息,以及该公司的标识如公司Id;
                    this.$http.post(this.$apiUrl.company.commission,realForm)
                        .then(function(data){
                            alert('提交成功');
                            console.log(data,'成功');
                            self.$refs.form.resetFields();
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
            console.log(this.companyId,123456678899)
            // 获取公司详情;
            let self=this;
            this.$http.get(this.$apiUrl.company.detail+"?companyId="+this.companyId)
                .then(function(data){
                    self.form=data.data.data;
                    console.log(self.form,'公司详情');
                })
                .catch(function(err){
                    console.log(err);
                });
        }
    }
}
</script>

<style scoped>
    .el-dialog__footer{
        text-align: left;
    }
</style>


