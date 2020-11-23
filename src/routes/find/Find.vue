<template>
  <div class="qf-find">
      <!-- <h1>Find</h1> -->
      <div class="left">
          <van-sidebar v-model="activeKey">
            <van-sidebar-item 
             v-for='item in cateArr'
             :key='item.id'

            :title="item.cate_zh" />
            
            
            </van-sidebar>
      </div>
      <div class="right">
        <van-grid :border="true" :column-num="3">
            <van-grid-item v-for="item in goodObj[activeKey] " :key="item._id">
              <div class='good-Item'>
                <img :src="$img.imgBaseUrl+item.img" />
                <div v-text='item.name'></div>
              </div>
            </van-grid-item>

        </van-grid>
      </div>
       <TabBar/>
  </div>
</template>

<script>
import { TabBar }from "@/components"
import { mapActions,mapState,mapMutations }from 'vuex'
import { 
  Sidebar, 
  SidebarItem ,
  Grid, 
  GridItem
} from 'vant';

export default {
  components:{
      TabBar,
      [Sidebar.name]:Sidebar,
      [SidebarItem.name]:SidebarItem,
      [Grid.name]:Grid,
      [GridItem.name]:GridItem
  },
  data() {
    return {
      activeKey:0,
      cateArr:[],
     

    }
  },
  computed: {
    ...mapState('good',['goodObj'])
  },
  watch: {
    //监听activekey变化
    //当侧边栏发生切换时，我们首先去判断goodObj有没有我想要的数据，如果有直接用，不必调接口
    //如果没有，再调接口，并缓存
   activeKey:function(){
       let arr=this.goodObj[this.activeKey]
       //表示没有缓存数据时
       if(!(arr&&arr.length>0)){
          let params={
              cate:this.cateArr[this.activeKey].cate,
              size:1000,
              index:this.activeKey
           }
           this.fetchList(params)
       }
    }
  },
  mounted(){
    //页面初始化
   this.init()
  },
  methods: {
    ...mapActions('good',['fetchList']),  //命名空间，方法
    ...mapMutations('good',['clearGoodObj']),
    async init(){
      //第一步，获取品类列表
      const res = await this.$api.fetchAllCates({})
      this.cateArr=res.list
      //第二步根据第一个品类，获取商品列表
        let params={
        cate:this.cateArr[0].cate,
        size:1000,
         index:this.activeKey
      }
     /*   this.$api.fetchGoodList(params).then(res=>{
        console.log('当前品类下的',res)
        this.goodArr=res.list
      }) */
      //触发actions
       this.fetchList(params)

    }
  },
  beforeDestroy() {
    //触发mutations方法，清除缓存
    this. clearGoodObj()
  },
}
</script>

<style lang='scss' scoped>
.qf-find{
  .left{
    position: absolute;
    top:0;
    bottom:1.333333rem;
    left:0;
    width:2.133333rem;
    overflow: auto;
    // background:red;
  }
  .right{
    position: absolute;
    top:0;
    bottom:1.333333rem;
    left:2.133333rem;
    
    right: 0;
    overflow: auto;
    // background:greenyellow;
    .good-Item{
      
        &>img{
          display:inline-block;
          width: 1.6rem;
          height:1.6rem;

        }
        &>div{
          font-size: 0.4rem;
        }
      
    }
  }
}
</style>