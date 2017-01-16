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
      },
      controlShow: {
          type: Object
      }
    },
    data() {
      return {
        chartsMovies: []
      }
    },
    methods: {
//      getData: function () {
//          // 优化，先另chartMoves等于空数组
//        this.chartsMovies = []
//        this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
//          headers: {},
//          emulateJSON: true
//        }).then(function (response) {
//          // 这里是处理正确的回调
//          this.chartsMovies = response.data.subjects
//          this.controlShow.loading = false
//          console.log('eee')
//        }, function (response) {
//          // 这里是处理错误的回调
//          console.log(response)
//        })
//      }
    },
    computed: {
      _someMovies() {
        // 根据current传过来的值改变chartMovies这个数组
        return this.chartsMovies.splice(this.current, 3)
      }
    },
    created: function () {
        // 第一次进入实例创建之后，挂载到实例
      this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
        headers: {},
        emulateJSON: true
      }).then(function (response) {
        // 这里是处理正确的回调
        this.chartsMovies = response.data.subjects
        this.controlShow.loading = false
        console.log('success')
      }, function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    watch: {
        // 因为路由切换同一组件时，实例创建的是同一个实例，之后不会再创建了，所以只能调用一次mounted,因此要使用$route监听getData方法，重新调用获取数据
//      '$route': 'getData'
      current: function () {
        // 优化，先另chartMoves等于空数组
        this.chartsMovies = []
        this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
          headers: {},
          emulateJSON: true
        }).then(function (response) {
          // 这里是处理正确的回调
          this.chartsMovies = response.data.subjects
          this.controlShow.loading = false
          console.log('eee')
        }, function (response) {
          // 这里是处理错误的回调
          console.log(response)
        })
      }
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
