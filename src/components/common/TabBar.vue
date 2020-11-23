<template>
    <div class="qf-tabber" >
          <van-tabbar route active-color="#F30F05">
              <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
              <van-tabbar-item icon="search" to="/find" dot>分类</van-tabbar-item>
              <van-tabbar-item icon="friends-o" to="/cart" badge="20">购物车</van-tabbar-item>
              <van-tabbar-item 
                icon="setting-o" 
                :to='isLogin?"/user":"/login"'
                >
               {{isLogin?'我的':'登录'}}
                </van-tabbar-item>
          </van-tabbar>
       </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';

export default {
    components:{
    [Tabbar.name]:Tabbar,
    [ TabbarItem.name ]: TabbarItem 
  },
  computed: {
      isLogin:function(){
          return localStorage.getItem("token")  //如果登录，则有值，未登录undefined
      }
  },
}
</script>

<style>

</style>