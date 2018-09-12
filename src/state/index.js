import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        buyCount:10
    },
    getters:{
        getBuyCount:state=>{
            return state.buyCount
        }
    },
    mutations:{
        addGoods(state,goods){
            state.buyCount+=goods.count
        }
    }

})

export default store