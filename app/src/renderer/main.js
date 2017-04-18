import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'
import 'semantic-ui-css/semantic.css'
import 'semantic-ui-css/components/icon.css'
import App from './App'
import routes from './routes'
// register the plugin on vue
import Toasted from 'vue-toasted';

Vue.use(Toasted)

Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
Vue.config.debug = true

const router = new Router({
  scrollBehavior: () => ({y: 0}),
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
