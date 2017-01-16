<template>
  <div class="hot-wrapper">
    <loading v-show="controlShow.loading"></loading>
    <div class="ui three column grid">
      <div class="ui link cards" v-for="movie in hotMovies">
        <div class="card">
          <div class="image">
            <img :src="movie.images.large" width="100%" height="100%">
          </div>
          <div class="content">
            <div class="header">{{movie.title}}</div>
            <div class="meta">
              <a v-for="genre in movie.genres">{{genre}}</a>
            </div>
            <div class="description"> </div>
          </div>
          <div class="extra content">
            <span class="right floated">{{movie.year}}</span>
            <span v-for="director in movie.directors">导演：{{director.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import loading from '../loading/loading.vue'
  export default {
    props: {
    },
    data() {
      return {
        hotMovies: [],
        controlShow: {
          loading: true,
          content: false
        }
      }
    },
    mounted: function () {
      this.$http.jsonp('https://api.douban.com/v2/movie/in_theaters?count=8', {}, {
        headers: {
        },
        emulateJSON: true
      }).then(function(response) {
        // 这里是处理正确的回调
        this.hotMovies = response.data.subjects
        this.controlShow.loading = false
      }, function(response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    components: {
      loading
    }
  }
</script>

<style></style>
