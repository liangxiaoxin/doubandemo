<template>
  <div class="ing-wrapper">
    <loading :loadingShow="loadingShow"></loading>
    <div class="ui three column grid">
      <div class="ui link cards" v-for="movie in fenYeData">
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
    <router-view></router-view>
    <div class="page-wrapper">
      <ul class="page-ul">
        <li class="page">
          <button class="ui left labeled icon button"><i class="left arrow icon"></i> prev</button>
        </li>
        <!--<li class="page" v-for="(number,index) in 5" @click="goto(index)">-->
          <!--<button class="ui secondary basic button">{{ index+1 }}</button>-->
        <!--</li>-->
        <li class="page">
          <button class="ui secondary basic button">
            <router-link to="/charts/1/one">1</router-link>
          </button>
        </li>
        <li class="page">
          <button class="ui secondary basic button">
            <router-link to="/charts/1/two">2</router-link>
          </button>
        </li>
        <li class="page">
          <button class="ui secondary basic button">
            <router-link to="/charts/1/three">3</router-link>
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
        fenYeData: [],
        current: 0,
        loadingShow: true
      }
    },
    mounted: function () {
      this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=25', {}, {
        headers: {},
        emulateJSON: true
      }).then(function (response) {
        // 这里是处理正确的回调
        this.chartsMovies = response.data.subjects
        console.log(this.chartsMovies)
        this.fenYeData = this.chartsMovies.slice(0, 3)
        this.loadingShow = false
      }, function (response) {
        // 这里是处理错误的回调
        console.log(response)
      })
    },
    computed: {},
    methods: {
      goto: function (index) {
        this.current = index * 3
        console.log(this.current)
      }
    },
    components: {
        loading: loading
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

