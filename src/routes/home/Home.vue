<template>
  <div class="qf-home">
     <!-- 让整个页面都可以下拉刷新 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
     <!-- 通知栏 -->
     <div class="qf-bar">
         <van-notice-bar
            left-icon="volume-o"
            :text="msg"
             mode="closeable"
           
        />
     </div>
      <!-- 搜索框 -->
      <div class="qf-seach">
          <van-search
            shape="round"
            background="#F30F50"
            :placeholder="placeText"
            show-action
            disabled
         >
           <template #action>
              <div class="login" @touchstart="skipToLogin">登录</div>
           </template>
        </van-search>
      </div>
       <!-- 轮播图 -->
         <van-swipe :autoplay="3000">
            <van-swipe-item v-for="item in images" :key="item.id">
                <img v-lazy="item.src " />
            </van-swipe-item>
        </van-swipe>
        <!-- 商品列表提示图 -->
        <div class="good-ligood-st-tip">
             <van-image src="//m.360buyimg.com/mobilecms/s750x80_jfs/t1/124338/21/18183/24646/5fac0045Ed3481758/7aa12fb11ff8cb86.png!q70.jpg.dpg" />
        </div>
        <!-- 商品列表 -->
        <div>
          <van-list
              v-model="loading"
              :finished="finished"
              finished-text="商品没有更多了"
              @load="onLoad"
              :immediate-check="false"
              offset="80"
            >
              <van-cell v-for='item in length' :key="item"  >
                  <GoodItem :good='goodArr[2*item-2]'/>
                  <GoodItem :good='goodArr[2*item-1]'/>
              </van-cell>
            </van-list>
       
         
      </div>
    </van-pull-refresh>
     <TabBar/>
  </div>
</template>

<script>
// import {mapState} from 'vuex' //状态管理中映射进来，引入状态管理中map*系列

import { TabBar,GoodItem}from "@/components"
// import { NoticeBar,Search,Swipe, SwipeItem,Image,List,PullRefresh,Cell} from 'vant'

import {
   NoticeBar ,
   Search,
   Swipe, 
   SwipeItem ,
   Image,
   List,
   PullRefresh ,
   Cell,
   

}from 'vant'

export default {
    name: 'Home',
  components:{
      GoodItem,
      TabBar,
      [NoticeBar.name]:NoticeBar ,
      [Search.name]:Search,
      [Swipe.name]:Swipe,
      [ SwipeItem .name]: SwipeItem ,
      [Image.name]:Image,
      [List.name]:List,
      [PullRefresh.name]:PullRefresh ,
      [ Cell.name]: Cell
  },
  data() {
      return {
          msg:"京东双十二，全场1折,大额红包雨等你来呦！ 京东双十二，全场1折,大额红包雨等你来呦！",
          hotGoods:[
              {id:1,name:"针式打印机"},
              {id:2,name:"超火口红"},
              {id:3,name:"美妆护肤"},
              {id:4,name:"行车记录仪"},
              {id:5,name:"炸鸡可乐啤酒"}
          ],
          images:[
              {id:1,src:"//m.360buyimg.com/mobilecms/s700x280_jfs/t1/146814/29/8060/65919/5f5a010aEdf14b123/bfc0fcc4c9b01383.jpg!q70.jpg.dpg"},
              {id:2,src:"//imgcps.jd.com/ling4/4961761/5LyR6Zey6Zu26aOf5q2j5ZOB6LSn/562J552A5L2g5p2l5oyR/p-5c1224c882acdd181d1230ab/111ee683/cr_1125x445_0_171/s1125x690/q70.jpg"},
              {id:3,src:"//m.360buyimg.com/mobilecms/s700x280_jfs/t1/138691/31/2751/168533/5f09bea0E0832eed3/cea6526f75bee965.jpg!cr_1125x445_0_171!q70.jpg.dpg"}
          
          ],
          refreshing:false,   // 控制下拉刷新
           loading: false,   // 每次触底加载后，都要重置为false
           finished: false,  // 这个只用表示数据库已经没有数据了
           goodArr:[],
           page:1,
           total:0
        
     }
  },
  computed:{
    placeText:function(){
        return this.hotGoods[Math.floor(Math.random()*this.hotGoods.length)].name
    },
    length:function(){
      return Math.floor(this.goodArr.length/2)
    }
  },
  mounted() {
   this.getList()
  },
  methods:{
    getList(){
       let params={
         size:10,
        page:this.page,
        hot:true
     }
      this.$api.fetchGoodList(params).then(res=>{
        // console.log('商品列表首页',res) 
        this.total=res.total
        
         //下拉刷新是重置
         if(params.page===1){
            this.goodArr=res.list
            //重置完成后停止掉下拉刷新的状态
            this.refreshing=false
            //重置完成后，恢复list的触底功能
           this.fininshed=false
           this.loading=false
         }else{
            // 触底分页是追加数据
        this.goodArr=[...this.goodArr,...res.list]
        //每次触底分页调接口完成后，停止掉loading事件
         this.loading=false //触底了loading为false，它才能接着加载数据
         
         }
      })
    },
      skipToLogin(){
           this.$router.push('/login')
      },
      onRefresh(){
        console.log('下拉刷新')
        // setTimeout(()=>{
        //   this.refreshing=false
        //    this.fininshed=false
        // },2000)
        this.page=1;
        this.getList()

      },
      onLoad(){
        console.log('触底加载')
        // 只有当数据库还有数据时，才调接口
      if(this.goodArr.length<this.total){
         this.page++
         this.getList()
      }else{
        //当后端数据库没有数据时，一定finished=true，否则List组件持续发酵，触发load事件
          //让List触底加载功能失效
          this.finished=true
      }

      // if(this.goodArr<100){
        // setTimeout(()=>{
        //   this.goodArr+=10
        //   this.loading=false
        //   //判断数据库中还有没有数据
        //   if(this.goodArr>=100){
        //       this.finished=true
        //   }
        // },1000)
        
      // }
     
      }

  }

}
</script>

<style lang="scss" scoped>
.qf-home{
    background-color: rgba(247,247,247,1);
    .qf-seach{
      .login{
          color:#fff

      }
    }
    .van-swipe{
     height:3.866667rem;
     img {
       display: block;
       height:100%;
       width:100%;

     }
    }
    .good-list-tip{
      padding-top:0.333333rem;
         img{
           display: block;
           width:100%;
           height:0.933333rem
         }
    }
    .van-pull-refresh{
      padding-bottom: 1.666667rem
    }
    .van-list{
      background-color: rgba(247,247,247,1);
        .van-cell{
         background-color: rgba(247,247,247,1);
     
     }
    }
   
}
</style>