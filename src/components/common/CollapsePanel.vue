<template>
  <el-card :class="{'box-card': true, 'collapse': collapse}">        
    <template slot="header">
        <slot name="header">        
        </slot>
        <el-button class="btn-collapse" @click="toggle" type="text"><i :class="{'el-icon-arrow-up': !collapse, 'el-icon-arrow-down': collapse}"></i></el-button>
        <el-button v-show="closable" class="btn-close" @click="close" type="text"><i class="el-icon-circle-close"></i></el-button>
    </template>
    
    <slot></slot>
  </el-card>
</template> 

<script>
export default {
  name: 'CollapsePanel',
  props: ['expand', 'closable'],
  data () {
    return {   
        collapse: !this.expand   
    }
  },
  methods: {    
      toggle () {
          this.collapse = !this.collapse;
      },
      close() {
          this.$emit('close');
      } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.box-card {
    position: relative;    
}

.collapse .el-card__body {
    display: none !important;
}    

.btn-collapse {
    position: absolute;
    top: 6px;
    right: 16px;
}

.btn-close {
    position: absolute;
    top: -30px;
    left: -30px;
    color: red !important;
    font-size: 30px;    
}
.btn-close:visited, .btn-close:hover, .btn-close:active {
    color: red !important;
}


.el-card {
    overflow: visible;
}
</style>
