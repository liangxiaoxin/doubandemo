<template>
  <div class="moviecontent-wrapper">
    <div class="ui four column grid" v-if="chartsMovies.length>2">
      <div class="ui link cards" v-for="movie in _someMovies">
        <div class="card">
          <div class="image">
            <img :src="movie.images.large" width="100%" height="100%">
          </div>
          <div class="content">
            <div class="header">{{movie.title}}</div>
            <div class="meta">
              <a v-for="genre in movie.genres">{{genre}}</a>
            </div>
            <div class="description">{{current}}</div>
          </div>
          <div class="extra content">
            <span class="right floated">{{movie.year}}</span>
            <span v-for="director in movie.directors">导演：{{director.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  {{current}}
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      current: {
        type: Number
      }
    },
    data() {
      return {
        chartsMovies: [],
        loadingShow: true
      }
    },
    computed: {
        _someMovies() {
            return this.chartsMovies.splice(0, 3)
        }
    },
    mounted: function getData() {
      this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
        headers: {},
        emulateJSON: true
      }).then(function (response) {
        // 这里是处理正确的回调
        // 根据current传过来的值改变chartMovies这个数组
        this.chartsMovies = response.data.subjects
        this.loadingShow = false
      }, function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .moviecontent-wrapper
    margin-top: 20px
    width: 100%
</style>
