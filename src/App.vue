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
body {
  background-color: #fff;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
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
