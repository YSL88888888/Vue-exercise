//es6的导入方式 commonjs const Vue = require('vue')
import Vue from 'vue'
import VueRouter from 'vue-router' 

// 才算集成完VueRouter
Vue.use(VueRouter)


// 网络请求相关
import axios from 'axios'
axios.defaults.withCredentials=true
axios.defaults.baseURL = 'http://47.106.148.205:8899/'
Vue.prototype.$axios = axios

// 导入组件
import goodslist from '../components/goods/goodslist.vue'

//商品详情
import goodsinfo from '../components/goods/goodsinfo'

//购物车
import shopcart from '../components/shopcart/shopcart'

//提交订单详情
import order from '../components/order/order'

//登录页面
import login from '../components/accout/login'

//付款页面
import pay from '../components/pay/pay'

//付款完成页面跳转
import paySuccess from '../components/pay/paySuccess'

// 创建路由对象，设置路由规则，自动注册组件
const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/goodslist'},
        {path:'/goodslist',component:goodslist},
        {path:'/goodsinfo/:goodsid',component:goodsinfo},
        {path:'/shopcart',component:shopcart},
        {path:'/login',component:login},
        {path:'/order',meta:{needLogin:true},component:order},
        {path:'/pay',meta: { needLogin : true },component:pay},
      {path:'/paySuccess',meta: { needLogin : true },component:paySuccess}


    ]
})

/*
* to想去组件的链接
* from 从哪里来
* next 控制是否有权限去
*
* */
//非父子组件传值实例导入
import {bus} from '../common/common'

router.beforeEach((to, from, next) => {
    // ...
   if (to.fullPath!=='/login'){
       localStorage.setItem('lastVisitPath',to.fullPath)
   }
    if(to.meta.needLogin){ // 需要先进行登录判断
        const url = `site/account/islogin`
        axios.get(url).then(response=>{
            if(response.data.code === 'logined'){

                //告诉app 登录成功了
                bus.$emit('loginSuccess')
                next()
            }else{
                // 使用编程式导航，跳转到登录页面
                router.push({path:'/login'})
            }
        })
    }else{ // 不需要验证是否登录
        next()
    }
})





//es6的导出 相当于 commonjs module.exports = router
export default router