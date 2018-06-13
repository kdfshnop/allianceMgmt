<template>
  <el-container>
    <el-main>
    <el-steps align-center class="step-container" :active="active" finish-status="success">
        <el-step title="合作资料"></el-step>
        <el-step title="代理区域"></el-step>
        <el-step title="代理商资料"></el-step>
        <el-step title="服务信息"></el-step>
        <el-step title="佣金信息"></el-step>
        <el-step title="平台服务费"></el-step>
        <el-step title="提交审核"></el-step>
    </el-steps>  

    <CollapsePanel class="gap-2" :expand="true">
        <div align-left slot="header" class="clearfix">
            <span>悟空服务人员信息</span>            
        </div>
        <el-form :model="serviceInfo" label-width= "180px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="BD人员姓名">
                        <el-input v-model="serviceInfo.bdName"></el-input>
                    </el-form-item>
                    <el-form-item label="彩霞服务人员姓名">
                        <el-input v-model="serviceInfo.cxName"></el-input>
                    </el-form-item>
                    <el-form-item label="1对1落地指导">
                        <el-input v-model="serviceInfo.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="xxx部门 xxx职位">                        
                    </el-form-item>
                    <el-form-item label="xxx部门 xxx职位">                        
                    </el-form-item>
                    <el-form-item label="xxx部门 xxx职位">                        
                    </el-form-item>
                </el-col>
            </el-row>            
        </el-form>
    </CollapsePanel>

    <CollapsePanel class="gap-2" :expand="partner.expand" v-for="partner in partners">    
        <div align-left slot="header" class="clearfix">
            <span>合伙人信息</span>            
        </div>
        <el-form :model="partner" label-width= "180px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名">
                        <el-input v-model="partner.name"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="partner.email"></el-input>
                    </el-form-item>

                    <el-form-item label="身份证号">
                        <el-input v-model="partner.idCard"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">                    
                    <el-form-item label="手机号">
                        <el-input v-model="partner.mobile"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="芝麻信用">
                        <el-input v-model="partner.zmCredit"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="合伙人背景">
                        <el-input v-model="partner.bg"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            
            
            <el-form-item label="备注信息">
                <el-input type="textarea" :rows="2" v-model="partner.remark"></el-input>
            </el-form-item>
        </el-form>
    </CollapsePanel>

    <el-button type="primary" class="full-row gap-2" @click="addPartner">+ 添加合伙人</el-button>

    <el-button-group class="gap-2" style="margin-left: auto; margin-right: auto; width: 200px; display: block;">
        <el-button v-if="active>0" @click="prev">上一步</el-button> <el-button v-if="active<stepNumber" @click="next">下一步</el-button>
    </el-button-group>    
    </el-main>
  </el-container>
</template>

<script>
import CollapsePanel from './CollapsePanel';
export default {
  name: 'AgentManagement',
  components: {CollapsePanel},
  data () {
    return {      
      active: 0,// 控制步骤
      stepNumber: 7,// 总步数
      serviceInfo: {
          bdName: "",
          cxName: "",
          name: ""
      },
      partners: []
    }
  },
  methods: {
      next() {
          if(this.active == this.stepNumber) {
              return;
          }

          this.active++;
      },

      prev() {
          if(this.active == 0) {
              return;
          }

          this.active--;
      },

      addPartner() {
          this.partners.push({expand: true});
      }
  },
  created() {
      this.$http.get(this.$apiUrl.test, function(res){
          console.log(res.data);
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.full-row {
    width: 100%;
    display: block;
}

.gap {
    margin-top: 20px;
}

.gap-2 {
    margin-top: 40px;
}
</style>
