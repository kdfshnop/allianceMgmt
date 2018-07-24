<template>
    <el-dialog title="设置分佣账户" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
        <el-form :model="form" ref="form" label-width="110px" class="demo-form">
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
    data(){
        return {
            companyId:'',//公司Id;
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
            let realForm={};
            realForm.bankAccount=this.form.bankAccount;
            realForm.openBankType=this.form.openBankType;
            realForm.accountName=this.form.accountName;
            realForm.openBankBranch=this.form.openBankBranch;
            realForm.companyId=this.companyId;
            // 获取输入的表单信息,以及该公司的标识如公司Id;
            this.$http.post(this.$apiUrl.company.commission,realForm)
                .then(function(data){
                    self.$message({
                        message: '成功',
                        type: 'success'
                    });
                    self.$refs.form.resetFields();
                    self.dialogVisible=false;
                })
                .catch(function(err){
                    self.$message({
                        message: '成功',
                        type: 'error'
                    });
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
        open(companyId){
            // 获取公司详情;
            let self=this;
            this.companyId=companyId;
            this.$http.get(this.$apiUrl.company.detail+"?companyId="+companyId)
                .then(function(data){
                    self.form=data.data.data;
                    self.dialogVisible=true;
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


