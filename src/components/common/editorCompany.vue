<template>
    <el-dialog title="新增公司" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="公司名称" prop="name" class="tl">
                        <el-input v-model="ruleForm.name" placeholder="50字以内"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="公司简称" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="50字以内"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="所属城市" prop="name" class="tl">
                        <el-input v-model="ruleForm.name" placeholder="请选择..."></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="保证金" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="组织机构代码" prop="name" class="tl">
                        <el-input v-model="ruleForm.name" placeholder="50字以内"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="公司简称" prop="name">
                        <el-radio-group v-model="radio">
                            <el-radio label="二手房"></el-radio>
                            <el-radio label="新房"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="bd" prop="name"  label-width="40px" class="tl">
                <el-input v-model="ruleForm.name" placeholder="请选择"></el-input>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="合作时间" prop="name" class="tl">
                        <el-input v-model="ruleForm.name" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="法人代表" >
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="电话" class="tl">
                        <el-input v-model="ruleForm.name" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="地址" >
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="代理商" class="tl">
                <el-input v-model="ruleForm.name"></el-input>
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
            <el-button @click="dialogVisible= false" type="primary">保存</el-button>
            <el-button @click="dialogVisible= false">关闭</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
  name:'editorCompany',
  data(){
      return {
        
        radio:'1',
        dialogVisible:false,
         ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      }
  },
  methods:{
      open() {
        this.dialogVisible = true;
      },
       handleClose(done) {
           console.log(this.edit,22223445)
        this.$confirm('确认关闭？')
          .then(_ => {
              console.log(111111111111)
              this.edit=false;
              console.log(this.edit)
            done();
          })
          .catch(_ => {});
      },
      submitForm(formName) {
          console.log(2222)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
</style>

