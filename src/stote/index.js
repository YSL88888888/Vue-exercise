import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 按需导入
import {addLocalGoods,getTotalCount} from "../common/localStorageTool";

const store = new Vuex.Store({

    state:{
        buyCount:0
    },

    getters:{
        // app页面取用相当于计算属性
        getBuyCount:state=>{
            //判断商品数,没有的话本地获取赋值 三目表达式
            return state.buyCount>0?state.buyCount:getTotalCount()
        }
    },
    mutations:{
        addGoods(state,goods){
            // state.buyCount+=goods.count
            state.buyCount = addLocalGoods(goods)

        }
    }

})

export default store