<template>
  <div id="app">
    <Tabbar></Tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue';

export default {
  name: 'app',
  components: {
    Tabbar
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
