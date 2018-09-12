import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 按需导入
import {addLocalGoods,getTotalCount} from "../common/localStorageTool";

const store = new Vuex.Store({
    state:{
        buyCount:10
    },
    getters:{
        getBuyCount:state=>{
            return state.buyCount>0?state.buyCount: getTotalCount()
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