<template>
  <div id="app">
    <div class="ui secondary pointing menu">
      <router-link to="/charts" class="item">Top250</router-link>
      <router-link to="/hot" class="item">正在热映</router-link>
      <router-link to="/ing" class="item">即将上映</router-link>
      <router-link to="/newmovie" class="item">新片榜</router-link>
      <div class="right menu">
        <a class="ui item">More</a>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
//      hotMovies: []
//      ingMovies: [],
//      newMovies: []
    }
  },
  name: 'app'
}
</script>

<style>

</style>
