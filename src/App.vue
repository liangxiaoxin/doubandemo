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
    <router-view :hotMovies="hotMovies"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotMovies: []
//      ingMovies: [],
//      newMovies: []
    }
  },
  name: 'app',
  mounted: function () {
      this.$http.jsonp('https://api.douban.com/v2/movie/in_theaters?count=8', {}, {
        headers: {
        },
        emulateJSON: true
      }).then(function(response) {
        // 这里是处理正确的回调
        this.hotMovies = response.data.subjects
      }, function(response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    }
}
</script>

<style>

</style>
