<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input id="txtUserName" v-model="user_name" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input id="txtPassword" v-model="password" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input id="btnSubmit" @click="login" name="btnSubmit" type="submit" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  //非父子父子组件的传值  公用实例的导入   传的数据到app接受
  import {bus} from '../../common/common'
    export default {
        data(){
            return {
                user_name:'',
                password:''

            }
        },
        methods:{
            //登录操作
            login(){
                const url=`site/account/login`
                    this.$axios.post(url,{user_name:this.user_name,password:this.password}).then(response=>{
                        if (response.data.status==0){
                            this.$router.push({path:localStorage.getItem('lastVisitPath')})

                                //非父子父子组件的传值
                            bus.$emit('loginSuccess')
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>