<template>
  <div id="app">
    <PoemComponent />
  </div>
</template>

<script>
import PoemComponent from './components/PoemComponent.vue'

export default {
  name: 'app',
  components: {
    PoemComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
