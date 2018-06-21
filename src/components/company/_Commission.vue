<template>
    <el-dialog title="设置分佣账户" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="110px" class="demo-ruleForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="开户银行类型" prop="bankType" class="tl">
                        <el-input v-model="ruleForm.bankType"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="开户支行" prop="subBranch">
                        <el-input v-model="ruleForm.subBranch"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="账户名" prop="name" class="tl">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="银行账号" prop="account">
                        <el-input v-model="ruleForm.account"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="submitForm('ruleForm')" type="primary">保存</el-button>
            <el-button @click="resetForm('ruleForm')">关闭</el-button>
        </span> 
    </el-dialog>
</template>

<script>
export default {
    data(){
        return {
            dialogVisible:false,
            ruleForm:{
                name: '',//账户名
                subBranch: '',//开户支行
                account:'',//银行账户
                a:'',
                bankType:'',//开户银行类型  
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
        submitForm(formName) {
            console.log(this.ruleForm,234)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.dialogVisible=false;
                    alert('提交成功');
                    this.$refs[formName].resetFields();
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
        handleClose(done) {
            // 此处执行点击x号;
            this.$confirm('确认关闭？')
            .then(_ => { 
                //此处执行点击确定 
                this.$refs.ruleForm.resetFields();
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

<style>
    .el-dialog__footer{
        text-align: left;
    }
</style>


