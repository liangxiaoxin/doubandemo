// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../node_modules/semantic-ui-css/semantic.min.css'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.config.debug = true

Vue.use(VueRouter)
Vue.use(VueResource)

import charts from './components/charts/charts'
import hot from './components/hot/hot'
import ing from './components/ing/ing'
import newmovie from './components/newmovie/newmovie'

import moviecontent from './components/moviecontent/moviecontent'
import moviecontent2 from './components/moviecontent2/moviecontent2'
import moviecontent3 from './components/moviecontent3/moviecontent3'
const router = new VueRouter({
  linkActiveClass: 'active',
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: charts
    },
    {
      path: '/charts',
      component: charts
    },
    {
      path: '/charts/:id',
      component: charts,
      children: [
        {path: '1', component: moviecontent},
        {path: '2', component: moviecontent2},
        {path: '3', component: moviecontent3}
        ]
    },
    {
      path: '/hot',
      component: hot
    },
    {
      path: '/ing',
      component: ing
    },
    {
      path: '/newmovie',
      component: newmovie
    }
  ]
})

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
