<template>
  <div id="app">
    <TheAppHeader/>
    <TheAppContent/>
  </div>
</template>

<script>
import TheAppHeader from './components/TheAppHeader.vue'
import TheAppContent from './components/TheAppContent.vue'

export default {
  name: 'App',
  components: {
    TheAppHeader,
    TheAppContent
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
