import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 按需导入
import {addLocalGoods,getTotalCount,updateGoods,deleteGoodsById} from "../common/localStorageTool";

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
//{89:3,88:4}
        //引入在本地存储后的数据
        //调用方法 this.$store.commit('addGoods',goods)  goods 传入的参数 可以对象
        addGoods(state,goods){
            // state.buyCount+=goods.count
            state.buyCount = addLocalGoods(goods)
            // console.log(addLocalGoods(goods));
        },
        updateGoods(state,goods){
            state.buyCount=updateGoods(goods)
        },
        deleteGoodsById(state,goodsId){
            state.buyCount=deleteGoodsById(goodsId)
        }
    }

})

export default store