<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <AppContent/>
  </div>
</template>

<script>
import AppContent from './components/AppContent.vue'

export default {
  name: 'App',
  components: {
    AppContent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
