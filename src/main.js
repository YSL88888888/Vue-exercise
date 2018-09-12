import Vue from 'vue'
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'
import App from './App'

// 集成ElementUI
Vue.use(ElementUI) // 其实在注册组件
Vue.use(VueLazyload, {
    loading: require('./statics/site/images/01.gif')
})
import 'element-ui/lib/theme-chalk/index.css'

// 在浏览器端建议使用 import es6的module形式导入模块
import router from './router'
/*
* 网络请求
* */
import axios from 'axios'
axios.defaults.baseURL = 'http://47.106.148.205:8899/'
Vue.prototype.$axios = axios

// 导入过滤器
import './filters'

/*
* 状态管理器引入  数据共享
* */
import store from './state'


new Vue({
    router,
    store,
    render:h=>h(App)
}).$mount('#app')
