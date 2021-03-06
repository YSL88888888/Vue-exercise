/*--------------------------------------------------------------------------------------*/
const KEY='goods'

//先取出本地已有的数据
const getLocalGoods=()=>{
    return JSON.parse(localStorage.getItem(KEY)||'{}')
}


//统计本地最新商品数
/*
* {goodsId:87,count:3}
*
* */
const getTotalCount = () => {

    const localGoods = getLocalGoods()

    let totalCount = 0
    for(const key in localGoods){
        totalCount+=localGoods[key]
    }

    return totalCount
}


//存到本地
// 先拿到本地的数据判断 goodsId 是否是空 就是有没数据
//  没有就添加  有就等于  然后再存起来
const addLocalGoods=goods=>{
    const localGoods=getLocalGoods()
    //传过来的goodsId在本地有了就累加
    if(localGoods[goods.goodsId]){
        localGoods[goods.goodsId]+=goods.count
    }else {
        //没有就等于
        localGoods[goods.goodsId] = goods.count
    }
     //重新存储到本地
    localStorage.setItem(KEY,JSON.stringify(localGoods))
    return getTotalCount()
}


const updateGoods=(goods)=>{
    //更新本地商品数量
    //{87:4,88,3}
    const localGoods=getLocalGoods()
    localGoods[goods.goodsId]=goods.count
    localStorage.setItem(KEY,JSON.stringify(localGoods))
    return getLocalGoods()
    //返回重新计算的总数
}

const deleteGoodsById=goodsId=>{
    const localGoods=getLocalGoods()
    //    localGoods[87]
    delete localGoods[goodsId]
    localStorage.setItem(KEY,JSON.stringify(localGoods))
    return getLocalGoods()

}

export {addLocalGoods,getTotalCount,getLocalGoods,updateGoods,deleteGoodsById}
