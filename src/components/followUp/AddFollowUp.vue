<!--
    @页面名称：添加跟进页
    @作者：豆亚东 (douyadong@lifang.com)
    @业务逻辑说明：
        1.
        2.        
-->
<template>
  <el-container>
      <el-main>
          <bread-crumb :items="breadCrumb"></bread-crumb>
      </el-main>
  </el-container>
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb';
export default {
    name:'AddFollowUp',
    components:{BreadCrumb},
    data(){
        return {
            breadCrumb: [{text:'加盟管理'},{text: "代理商"},{text:'跟进'},{text:'添加跟进'}],
        }
    }
  
}
</script>

<style>

</style>


