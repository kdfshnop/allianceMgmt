<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :key="item.text" v-for="item in innerItems">{{item.text}}</el-breadcrumb-item>      
  </el-breadcrumb>
</template>
<script>
export default {
    name: "breadCrumb",
    props: ['items'],
    data() {
        return {
            innerItems: this.items
        };
    }    
}
</script>
<style>

</style>


