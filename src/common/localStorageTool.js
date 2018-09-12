const KEY='goods'

//先取出本地已有的数据
const getLocalGoods=()=>{
    return JSON.parse(localStorage.getItem(KEY)||'{}')
}
//统计本地最新商品数
const getTotalCount = () => {

    const localGoods = getLocalGoods()

    let totalCount = 0
    for(const key in localGoods){
        totalCount+=localGoods[key]
    }

    return totalCount
}


//存到本地

const addLocalGoods=goods=>{
    const localGoods=getLocalGoods()
    if(localGoods[goods.goodsId]){
        localGoods[goods.goodsId]+=goods.count
    }else {
        localGoods[goods.goodsId] = goods.count
    }

    localStorage.setItem(KEY,JSON.stringify(localGoods))
    return getLocalGoods()
}
export {addLocalGoods,getTotalCount}
