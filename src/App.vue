<template>
  <div id="app">
    <Item/>
  </div>
</template>

<script>
import Item from './components/Item.vue'

export default {
  name: 'App',
  components:{
      Item
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: green;
  margin-top: 0px;
}
</style>
