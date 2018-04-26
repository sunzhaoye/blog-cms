import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css/normalize.css'
import './assets/styles/base.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import 'simplemde/dist/simplemde.min.css';
import 'highlight.js/styles/atom-one-dark.css';
import 'flex.css'
// import 'github-markdown-css/github-markdown.css';
import 'markdown.css/markdown.css';
import axios from 'axios';
import VueSimplemde from 'vue-simplemde'
import store from './store'
Vue.use(VueSimplemde)

Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.use(ElementUI);
/* eslint-disable */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})