<template>
<div class="qf-good-item" @touchstart='skipToDetail'>
    <img :src="$img.imgBaseUrl+good.img" alt="good.name" />
    <div class="desc" v-text="good.desc">
       
    </div>
    <div>
        ￥<span v-text="good.price">99</span>
    </div>
</div>
  
</template>

<script>
export default {
   props:{
       good:{
           type:Object,
           required:false,
           default:function(){
             return {}
           }
       }
   },
   methods: {
       //跳转到商品详情页
       skipToDetail(){
          
           this.$router.push('/good/detail/'+this.good._id)
       }
   },
}
</script>

<style lang='scss' scoped>
// .qf-good-item{
//     background: white;
//     display:inline-block;
//    width:47%;
//     // background-color: white;
//     margin-right:0.2rem;
//     padding-left:0.066667rem;
//     img{
//         display: block;
//          width:3.333333rem;
//         height:3.333333rem;
      
//     }
// }
.qf-good-item{
    background:white;
    display: inline-block;
    width:47%;
    // height: 6.853333rem;
    margin:0 0.1333rem;
        img{
        display: block;
        width:3.3333rem;
        height: 3.333rem;
        margin: 0 auto;
    }
    div{
        text-align: center;
        height: 1.333333rem;
        overflow:hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        // white-space:nowrap;
    }
}

</style>