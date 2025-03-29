import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 按需引入
import '@fortawesome/fontawesome-free/css/all.css'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.prototype.$ = $ // 将 jQuery 挂载到 Vue 原型上
Vue.use(ElementUI)
Vue.use(VueLazyload)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.onload = function () {
  window.scrollTo({
    left: document.body.scrollWidth,
    top: 0,
    behavior: 'smooth'
  })
}
