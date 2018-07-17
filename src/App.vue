<template>
  <div id="app">           
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
  
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  background-color: #fff;
  margin-left: 20px;
  margin-right: 20px;
}

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
