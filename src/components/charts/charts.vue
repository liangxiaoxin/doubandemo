<template>
  <div class="ing-wrapper">
    <loading v-show="controlShow.loading"></loading>
    <div class="moviecontent-wrapper" v-if="controlShow.content">
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
    <router-view :current="current" :controlShow="controlShow"></router-view>
    <div class="page-wrapper">
      <ul class="page-ul">
        <li class="page">
          <button class="ui left labeled icon button"><i class="left arrow icon"></i> prev</button>
        </li>
        <li class="page" v-for="(number,index) in 3" @click="goto(index)" :class="{'active': current/3===index}">
          <button class="ui secondary basic button">
            <router-link :to="'/charts/'+ (index+1)">{{index+1}}</router-link>
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
  import loading from '../loading/loading'
  export default {
    props: {},
    data() {
      return {
        chartsMovies: [],
        current: 0,
        controlShow: {
            loading: true,
            content: false
        }
      }
    },
    mounted: function () {
      this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=3', {}, {
        headers: {},
        emulateJSON: true
      }).then(function (response) {
        // 这里是处理正确的回调
        this.controlShow.loading = false
        this.controlShow.content = true
        this.chartsMovies = response.data.subjects
      }, function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    computed: {
      _activeIndex() {

      }
    },
    methods: {
      goto: function (index) {
        this.current = index * 3
        console.log(this.current)
        this.controlShow.content = false
        this.controlShow.loading = true
        // 控制首页是否显示
      }
    },
    components: {
        loading
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
        margin: 0 20px
      .active
        background-color: skyblue;
</style>

