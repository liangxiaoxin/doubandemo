<template>
  <div class="moviecontent-wrapper">
    <div class="ui four column grid" v-if="chartsMovies.length>2">
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
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      chartsMovies: {
        type: Array
      },
      fenYeData: {
        type: Array
      },
      current: {
        type: Number
      }
    },
    data() {
      return {
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .moviecontent-wrapper
    margin-top: 20px
    width: 100%
</style>
