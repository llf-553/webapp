<template>
  <div class='qf-good-detail'>
     <div class='name' v-text="info.name"></div>
     <div class='img'>
         <img :src='$img.imgBaseUrl+info.img' alt="">

     </div>
     <div class='pr'>￥<span v-text='info.price'></span></div>

     <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
        <van-goods-action-icon icon="cart-o" text="购物车" />
        <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
        <van-goods-action-button type="warning" text="加入购物车" />
        <van-goods-action-button type="danger" text="立即购买" @click="buy" />
     </van-goods-action>
  </div>
</template>

<script>
import {
     GoodsAction,
     GoodsActionIcon, 
     GoodsActionButton ,
     Toast
     } from 'vant';
export default {
    components:{
     [ GoodsAction.name]: GoodsAction,
     [ GoodsActionIcon.name]: GoodsActionIcon,
     [ GoodsActionButton.name]: GoodsActionButton 
    },
    data:function(){
     return{
         info:{},
         timer:null
     }
    },
 mounted() {
     let id=this.$route.params.id
    //  console.log('_id',id)
     //调接口获取商品详情
     this.$api. fetchGoodInfo({id}).then(res=>{
        //  console.log(res)
         this.info=res
     })
 },
 methods:{
     buy(){
         let data={
           good_id:this.info._id,
           num:1
         }
         this.$api.fetchAddCart(data).then(()=>{
            // console.log('加入购物车',res)
             Toast.success('加入购物车成功')
            this.timer=setTimeout(()=>{
               this.$router.replace('/cart')
            },1000)
             
              
         })
     }
 },
 beforeDestroy() {
     clearTimeout(this.timer) 
 },
}
</script>

<style lang='scss' scoped>
.name{
    font-size: 0.533333rem;
    text-align: center;
}
.img{
    &>img{
        display:block;
        width:50%;
       height:3.2rem;
       margin:0.266667rem auto
         
    }
   
}
 .pr{
        text-align: center;
    }
</style>