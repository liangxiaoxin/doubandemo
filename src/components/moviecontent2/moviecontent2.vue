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
            <div class="description"></div>
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

<script type="text/ecmascript-6">
  export default {
    props: {
      current: {
        type: Number
      }
//      loadingShow: {
//          type: Boolean
//      }
    },
    data() {
      return {
        chartsMovies: [],
        loadingShow: true
      }
    },
    computed: {
      _someMovies() {
        // 根据current传过来的值改变chartMovies这个数组
        return this.chartsMovies.splice(this.current, 3)
      }
    },
    route: {
      data(transition) {
        // 更新数据的方法
      }
    },
    beforeCreate() {
      this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=8', {}, {
        headers: {},
        emulateJSON: true
      }).then(function (response) {
        // 这里是处理正确的回调
        this.chartsMovies = response.data.subjects
        console.log('success')
      }, function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    watch: {
      '$route' (to, from) {
        this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=8', {}, {
          headers: {},
          emulateJSON: true
        }).then(function (response) {
          // 这里是处理正确的回调
          this.chartsMovies = response.data.subjects
          console.log('watch success')
        }, function (response) {
          // 这里是处理错误的回调
          console.log(response)
        })
      }
    },
    mounted: function () {
    },
    components: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .moviecontent-wrapper
    margin-top: 20px
    width: 100%
</style>
