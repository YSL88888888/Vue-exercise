<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div v-if="goodsData.goodsinfo" class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!-- 放大镜的代码写在这里 -->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in goodsData.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path"/>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsData.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsData.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsData.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsData.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsData.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number size="small" v-model="goodsCount" :min="1"
                                                                 :max="goodsData.goodsinfo.stock_quantity"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <!-----------------------插件--------------------------->
                                                <em id="commodityStockNum">{{goodsData.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">
                                                    立即购买
                                                </button>
                                                <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车
                                                </button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li @click="isShowIntroduction = true">
                                            <a href="javascript:;" :class="{selected:isShowIntroduction}">商品介绍</a>
                                        </li>
                                        <li @click="isShowIntroduction = false">
                                            <a :class="{selected:!isShowIntroduction}" href="javascript:;">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <!-- 商品介绍 -->
                            <div v-show="isShowIntroduction" class="tab-content entry" style="display: block;">
                                <p style="padding:5px;" v-html="goodsData.goodsinfo.content"></p>
                            </div>
                            <!-- 商品评论 -->
                            <div v-show="!isShowIntroduction" class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <!------------------ref使用--------------------------------------->
                                                <textarea ref="txtContentRef" id="txtContent" name="txtContent" sucmsg=" "
                                                          datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" @click="postComment"
                                                       class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <!----------------------商品评论------------------------------->
                                    <ul id="commentList" class="list-box">
                                        <!--------------------数据为0的时候显示------------------------->
                                        <p v-if="commentInfo.totalcount === 0"
                                           style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">
                                            暂无评论，快来抢沙发吧！</p>

                                        <li v-for="item in commentInfo.message" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <!-----------------------自己添加样式---------------------------->
                                                    <span>{{item.add_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <!---------------------------分页条的位置--------------------------------->
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <el-pagination
                                                @size-change="handleSizeChange"
                                                @current-change="handleCurrentChange"
                                                :current-page="pageIndex"
                                                :page-sizes="[2, 5, 10, 20]"
                                                :page-size="pageSize"
                                                layout="total, sizes, prev, pager, next, jumper"
                                                :total="commentInfo.totalcount">
                                        </el-pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!---------------------右边推荐商品------------------------------->
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in goodsData.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!------------监控路由--------------->
                                            <router-link :to="'/goodsinfo/'+item.id" class="">
                                                <img v-lazy="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time | dateFmt}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import '../../statics/site/jqimgzoom/css/magnifier.css';

</style>

<script>
    import $ from "jquery"
    // 把导入的jquery挂在到window
    window.$ = $
    window.jQuery = $


    // 3按需导入图钉
    import {Affix} from 'iview'


    //2 导入放大镜插件
    import '../../statics/site/jqimgzoom/js/magnifier'

    export default {
        components: {Affix},
        data() {
            return {
                goodsData: {},
                goodsCount: 1,  // 商品数量
                isShowIntroduction: true,//是否显示商品介绍
                pageIndex: 1, // 页码 默认从第一页开始查
                pageSize: 2, // 页容量，每页默认2条
                commentInfo: {}, // 评论信息


            }
        },
        created() {
            this.getGoodsInfoData()
            this.getCommentInfoData()
        },
        watch: {
            $route: function() {
                // 重新获取数据
                this.getGoodsInfoData()
                this.getCommentInfoData()
            }
        },
        updated() {// data发生了变化并且，视图已经渲染完毕了
            $('#magnifier1').imgzoon({magnifier: '#magnifier1'})
        },

        methods: {
            /*1*/
            getGoodsInfoData() {
                const url = `site/goods/getgoodsinfo/${this.$route.params.goodsid}`
                this.$axios.get(url).then(response => {
                    this.goodsData = response.data.message
                })
            },
            // 4获取评论数据
            getCommentInfoData() {
                const url = `site/comment/getbypage/goods/${
                    this.$route.params.goodsid
                    }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`

                this.$axios.get(url).then(response => {
                    this.commentInfo = response.data
                })
            },
            // 分页相关
            // 页容量改变
            handleSizeChange(pageSize) {
                this.pageSize = pageSize
                this.pageIndex = 1

                this.getCommentInfoData()
            },
            // 当前页码改变
            handleCurrentChange(pageIndex) {
                this.pageIndex = pageIndex

                this.getCommentInfoData()
            },
            //5提交评论
            postComment(){
                let textContent=this.$refs.txtContentRef
                if (textContent.value.trim().length==0){
                    //警告插件使用
                    this.$message({
                        message:'评论内容不能为空!',
                        type:'warning'
                    })
                    return
                }
                this.$axios.post(`site/validate/comment/post/goods/${this.$route.params.goodsid}`,
                    {commenttxt: textContent.value}).then(res=>{
                        if (res.data.status==0){
                            // 清空原先填写内容
                            textContent.value=''
                            //成功
                            this.$message({
                                message: '评论成功!',
                                type: 'success'
                            })
                            // 重新加载第一页数据
                            this.pageIndex = 1
                            this.getCommentInfoData()
                        }

                })
            }

        },


    }
</script>

