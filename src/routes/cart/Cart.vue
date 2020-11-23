<template>
  <div class="qf-cart">
    <van-nav-bar title="购物车" left-text="返回" left-arrow fixed @click-left="back">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
      <!-- <h1>购物车</h1> -->
    <!-- 对swipe-cell进行循环 -->
    <div v-show='list.length===0'>你还没有添加商品哦!</div>
    <van-swipe-cell v-for="item in list " :key="item._id">
        <van-row type="flex" align="center">
          <!-- 第一列 -->
          <van-col span="4" >
            <van-checkbox v-model=" item.checked" @click='rowChange'></van-checkbox>
          </van-col>
          <!-- 第二列 -->
          <van-col span="20">
            <van-card
              :num="item.num"
              :price="item.good.price"
              :desc="item.good.desc"
              :title="item.good.name"
              class="goods-card"
              :thumb="$img.imgBaseUrl+item.good.img"
            >
                 <template #footer>
                  <van-button size="mini" @touchstart='change(item,"sub")'>-</van-button>
                  <van-button size="mini" @touchstart="change(item)">+</van-button>
                </template>
            </van-card>
          </van-col>
        </van-row>
        <template #right>
            <van-button @touchstart='remove(item)' square text="删除" type="danger" class="delete-button" />
        </template>
          
     </van-swipe-cell>
      <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit">
          <van-checkbox v-model="fullChecked" @click='fullChange' >全选</van-checkbox>
          <template #tip>
            你的收货地址不支持同城送, <span @click="skipToAdd">修改地址</span>
          </template>
      </van-submit-bar>
      
  </div>
</template>

<script>
// import { TabBar }from "@/components"
import { 
  Card ,
  SwipeCell,
  Col, 
  Row,
  Checkbox, 
  CheckboxGroup,
  Button,
   SubmitBar,
    NavBar,
    Icon,
    Dialog ,
    Toast


} from 'vant';
export default {
  name:"cart",
  components:{
      
      [Card.name]:Card,
      [SwipeCell.name]:SwipeCell,
      [Col.name]:Col,
      [Row.name]:Row,
      [Checkbox.name]:Checkbox,
      [ CheckboxGroup.name]: CheckboxGroup,
      [Button.name]:Button,
      [ SubmitBar.name]: SubmitBar,
      [ NavBar.name]: NavBar,
      [Icon.name]:Icon,

  },
  data() {
    return {
      rowCheck:true,
      fullChecked:false,
      list:[],
         timer:null
      
    }
  },
  computed: {
    total:function(){
      let t=0
      //累加，计算被勾选的价格
      this.list.map(ele=>{
        if(ele.checked){
           t +=(ele.num*ele.good.price)*100
        }
      })
      return t
    }
  },
  methods: {
    init(){
      this.$api.fetchCart({}).then(res=>{
      // console.log('购物车列表',res)
      this.list=res
      if(this.list.length===0){
        this.fullChecked=false
      }
      
    }) 
    },
    back(){
      this.$router.back()
    },
    skipToAdd(){
      console.log("修改地址")
    },
    onSubmit(){   //提交购物车
      console.log('提交购物车')
      let goods= ''
      this.list.map(ele=>{
        if(ele.checked){
           goods +=';'+ele._id
        }
      })
      this.$api.fetchSubmitCart({goods}).then(()=>{
        Toast('下单成功')
        this.timer =setTimeout(()=>{
               this.init()
        },500)
        //  console.log('提交购物车成功')
      
      })
    },
    remove(item){
        Dialog.confirm({
          title: '警告',
          message: `你确定要删除${item.good.name}这个商品吗？`,
        }) .then(() => {
          this.$api . fetchDelCart({id:item._id}).then(()=>{
              // console.log('删除成功')
              this.init()
           
          }) 
        })
    },
     change(item,flag){
        let data={
          id:item._id,
          num:flag?item.num-1:item.num+1
        }
        if(data.num<1){
          return Toast('商品不能少于1')
        }
        this.$api.fetchUpdataCart(data).then(()=>{
          // this.init()
          // console.log('数量修改成功')
         this.list.map((ele,idx,arr)=>{
            if(ele._id===item._id){
                arr[idx].num=data.num
               }
           })
        })
    },
     //全选按钮发生变化时
     fullChange(){
        // console.log('full change',bol)
        this.list.map((ele,idex,arr)=>{   //arr:this.list
          arr[idex].checked=this.fullChecked
        })
        this.list=JSON.parse(JSON.stringify(this.list))
        //强制执行diff运算，强制update页面
        // this.$forceUpdate()

    },
    //每一行是否勾选的变化
    rowChange(bol){
      console.log('row change',bol)
      //每次发生行的变换时，都要判断是否已经全选，该怎么判断？
      //思路：遍历this.list，查询被勾选的行的数量，是不是等于this.list.length
      //小bug：全部勾选后，全选按钮为true，但一旦取消勾选某一个，同样会触发全选按钮为false,会触发 fullChange事件，全部都取消了

      let arr=this.list.filter(ele=>ele.checked)
      if(arr && arr.length===this.list.length){
        this.fullChecked=true
      }else{
        this.fullChecked=false
      }
    }
  },
  mounted() {
     this.init()
  },
  beforeDestory(){
    clearTimeout(this.timer)
  }
}
</script>

<style lang='scss' scoped>
.qf-cart{
  padding-bottom: 1.4rem;
  padding-top:1.333333rem;
.delete-button{
width:100%;
height:100%;


}
.van-button {
  padding: 0.266667rem;
}
.van-swipe-cell{
  background: white ;
  border-bottom: 1px solid #eee;
}
.van-card{
  padding-left:0
}
}
</style>