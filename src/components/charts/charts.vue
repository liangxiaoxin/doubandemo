<template>
  <div class="ing-wrapper">
    <div class="moviecontent-wrapper" v-if="indexShow">
      <div class="ui four column grid" v-if="chartsMovies.length>2">
        <div class="ui link cards" v-for="movie in chartsMovies">
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
    <router-view></router-view>
    <div class="page-wrapper">
      <ul class="page-ul">
        <li class="page">
          <button class="ui left labeled icon button"><i class="left arrow icon"></i> prev</button>
        </li>
        <li class="page" v-for="(number,index) in 3" @click="goto(index)">
          <button class="ui secondary basic button">
            <router-link :to="'/charts/1/'+ (index+1)">{{index+1}}</router-link>
          </button>
        </li>
        <li class="page">
          <button class="ui right labeled icon button"><i class="right arrow icon"></i> Next</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {},
    data() {
      return {
        chartsMovies: [],
        indexShow: true,
        current: 0
      }
    },
    mounted: function () {
      this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=3', {}, {
        headers: {},
        emulateJSON: true
      }).then(function (response) {
        // 这里是处理正确的回调
        this.chartsMovies = response.data.subjects
        console.log(this.chartsMovies)
      }, function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    computed: {

    },
    methods: {
      goto: function (index) {
        this.current = index * 3
        console.log(this.current)
        // 控制首页是否显示
        if (index >= 0) {
            this.indexShow = false
        }
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ing-wrapper
    margin-bottom: 100px
    .page-wrapper
      width: 100%
      margin-top: 50px
      .page-ul
        display: flex
        width: 700px
        margin: 0 auto
        text-align: center
      .page
        flex: 1
</style>

