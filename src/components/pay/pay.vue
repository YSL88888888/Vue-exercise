<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderInfo.area}} {{orderInfo.address}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderInfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                            <dd>{{orderInfo.message}}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                //跳转路径,跟图片生成地址
                                <dzh-qrcode :url="url"
                                            img_url="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537089780044&di=4f82cdb9959e1af51a36c5d53ec06d07&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201605%2F23%2F20160523141239_BJAnW.thumb.700_0.jpeg"></dzh-qrcode>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    //二维码插件
  import Vue from 'vue'
  // import {DZHQRCode} from 'dzh-qrcode'

  // Vue.component('dzh-qrcode',DZHQRCode)

  import DZHQRCode from 'dzh-qrcode'
  Vue.use(DZHQRCode)
  export default {
    data() {
      return {
        orderInfo: {},
        url: '',
        interval:-1
      }
    },
    created() {
      this.getOrderInfo()
      this.getOrderStatus()
    },
    beforeDestroy(){
      clearInterval(this.interval)
    },
    methods: {
      //发送请求 把数据渲染到页面
      getOrderInfo() {
        const url = `site/validate/order/getorder/${this.$route.query.orderid}`

        this.$axios.get(url).then(response => {
          if (response.data.message[0].status === 2) {
            this.$router.push({ path: '/paySuccess' })
          } else {
            //渲染页面数据...
            this.orderInfo = response.data.message[0]
            console.log(this.orderInfo)
            this.url = `http://47.106.148.205:8899/site/validate/pay/alipay/${
                this.$route.query.orderid
                }`
          }
        })
      },
      // 轮询订单状态
      getOrderStatus() {
        this.interval = setInterval(() => {
          const url = `site/validate/order/getorder/${this.$route.query.orderid}`

          this.$axios.get(url).then(response => {
            if (response.data.message[0].status === 2) {
              this.$router.push({ path: '/paySuccess' })
            }
          })
        }, 3000)
      }
    }
  }

</script>

<style scoped>

</style>