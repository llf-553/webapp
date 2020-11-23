# vue-webapp

## 安装
 1. 下载webapp
```
vue-create-webapp
```
+ 注意：选择第二版
 2. package.json中设置开启命令
```
 "start": "npm run serve"
```
3. router安装
```
cnpm install vue-router -S
```
 + 在根目录下新建router.js
 ```js
   import Vue from 'vue'
    import VueRouter from 'vue-router'
    Vue.use(VueRouter)

    export default new VueRouter({
        mode: 'hash',
        routes: []
})
 ```
  + 在main.js中挂载
  ```js
   import router from './router'

    new Vue({
        router,
        render: h => h(App),
    }).$mount('#app')
  ```
 4. vuex 安装
 ```
 cnpm install vuex -S
 ```
 + 新建store文件夹：index.js 、moudules文件夹：test.js
   + index.js
   ```js
    import Vue from 'vue'
    import Vuex from 'vuex'
    Vue.use(Vuex)

    import test from './modules/test'
    export default new Vuex.Store({
        modules: {
            test
        }
    })
   ```
   + test.js
   ```js
        export default {
        namespaced: true,
        state: {
            msg: "hello webapp"
        }
    }
   ````
   + 在main.js中挂载  
   ```js
   import store from './store/'
   new Vue({

    render: h => h(App),
    router,
    store
   }).$mount('#app')
   ```
5. sass安装
```
cnpm install sass-loader -D
cnpm install node-sass -D
````
6. 页面routes文件夹(与pages作用一样的)
   + home文件夹
     + home.vue (首页)
      ```
        <template>
        <div class="qf-home">
            <h1 v-text="msg"></h1>
        </div>
        </template>
        <script>
        import {mapState} from 'vuex' //状态管理中映射进来，引入状态管理中map*系列
        export default {
        computed:{
            ...mapState('test',['msg'])  //将状态管理中sate映射进来
        }
        }
        </script>

        <style lang="scss" scoped>

        </style>
      ```
    + 在router.js中配置home的路由
      + 引入、配置
      ```js
       const Home = () => import ('@/routes/home/Home.vue')
         routes: [
        { path: '/', component: Home },
        { path: '/*', redirect: '/' } //重定向
       ]
      ```
 7. App.vue中加椅子让它显示
      ```
        <router-view > </router-view>
      ```
      > 移动端尺寸单位：rem。 PC端尺寸单位：px。vscode插件:css rem \ps to rem ;需要配置改比例：75(ui稿是750px，10倍rem,1个rem等于75px)
      8. 将祖传的rem.js放到public中，在public/index.js用script引入(10倍)
      > REM布局怎么搞的？（将根字体设置为屏幕的1/10（引入rem.js文件），在编辑器中安装 cssrem 插件，并设置转化尺寸为 75。）
## vant框架
### 安装
```
cnpm install vant -S
```
### 按需加载
+ 要什么组件引入什么组件
+ 性能优化
+ 安装引入组件的插件
  ```
  npm i babel-plugin-import -D
  ```
  + 在.babel.config.js 中添加配置
  > 配置文件配置后要重启项目
  ```
     "plugins": [
        ["import", {
            "libraryName": "vant",
            "libraryDirectory": "es",
            "style": true
        }]
    ]

  ````
  + 在页面组件的引入，哪个页面页面需要哪个就引入哪个
    + import { Button } from 'vant';
    + 在components中：'van-button':Button  /[Button.name]:Button
> 网站地址前面加 m 表示移动端，不加表示PC端。
> 外页：页面切换时还能看的见。如底部导航栏；  内页：页面切换后没有的。如商品详情页

## 配置路由
  + 由于页面就只有2-5个左右，不需要抽象出来,没必要。直接在router中导入
  + 将routes中的.vue页面引入到router中，配置
  ```js
   const Home = () => import ('@/routes/home/Home.vue')
    const Find = () =>  import ('@/routes/find/Find.vue')
    const Cart = () => import ("@/routes/cart/Cart.vue")
    const User = () =>import ("@/routes/user/User.vue")

    routes: [
        { path: '/', component: Home },
        { path: '/find', component: Find },
        { path: '/cart', component: Cart },
        { path: '/user', component: User },
        { path: '/*', redirect: '/' }
    ]

  ```

## 底部导航栏
### Tabbar组件
+ 引入   import { Tabbar, TabbarItem } from 'vant';  -->components中： [Tabbar.name]:Tabbar,[ TabbarItem.name ]: TabbarItem 
+ 找到合适的代码粘贴
+ 看懂每一行代码后按需求更改
   + route : 开启路由模式  -->在van-tabbar标签身上添加
   + to: 	点击后跳转的目标路由对象 -->在van-tabbar-item 标签中添加路由 (如to="/user")
   + active-color: 选中标签的颜色
+ 封装 ：由于它在外页使用，所以将它进行封装
  + components/common/TabBar.vue :将代码放在这里 (局部组件放在components中)
  + componets/index.js :引入，抛出
  + 哪个页面需要使用，就在哪个页面引入，当做局部组件，做标签使用
+ 根据用户是否登录，按钮显示不同。如果登录显示'我的',未登录显示'登录'，路由更改
  + computed: 中写方法,获取localstorage中的数据
    ```
       computed: {
          isLogin:function(){
           return localStorage.getItem("token")  //如果登录，则有值，未登录undefined
        }
      }
    ```
  + 标签内判断并更改路由  :to='isLogin?"/user":"/login"'
  + 显示： {{isLogin?'我的':'登录'}} > 注意：在这里不能用v-text语法显示

## 一、首页布局
### 1. 通知栏---NoticeBar 通知栏组件
+ 在home.vue中引入 ，添加到局部组件中
+ 找到合适的代码粘贴
+ 自定义显示的字； :text="msg" -->data中定义msg
+  mode="closeable"  :删除按钮
### 2.搜索框--Search 搜索组件
+ 在home.vue中引入 ，添加到局部组件中
+ 首页的搜索框只是摆设，添加禁用属性  disabled
+ 搜索框旁边加登录按钮 添加显示按钮属性   show-action 
  + 找到插槽代码复制进去
  + 使用touchstart事件， @touchstart="skipToLogin"
  +  methods中添加skipToLogin方法，跳页
    ```
     methods:{
      skipToLogin(){
           this.$router.push('/login')
      }
  }
    ```
> 移动端建议使用touchstart/touchend/touchmove事件，尽量不要用click事件。因为click事件在移动端有300ms的延迟
  + placeholder内容每次刷新更改(先造假数据)
    +   :placeholder="placeText"
    +  在data中定义hotGood数组，里面放一个个对象，对象中包含id，name："显示的字"
    +  在 computed中写placeText方法
      ```js
        computed:{
            placeText:function(){
                return this.hotGoods[Math.floor(Math.random()*this.hotGoods.length)].name
            }
        }
      ```
### 3.轮播图--Swipe 轮播
+  在home.vue中引入 ，添加到局部组件中
+ 在data中定义 images 数组 用于标签中显示
```
    images:[
              {id:1,src:"//m.360buyimg.com/mobilecms/s700x280_jfs/t1/146814/29/8060/65919/5f5a010aEdf14b123/bfc0fcc4c9b01383.jpg!q70.jpg.dpg"},
              {id:2,src:"//imgcps.jd.com/ling4/4961761/5LyR6Zey6Zu26aOf5q2j5ZOB6LSn/562J552A5L2g5p2l5oyR/p-5c1224c882acdd181d1230ab/111ee683/cr_1125x445_0_171/s1125x690/q70.jpg"},
              {id:3,src:"//m.360buyimg.com/mobilecms/s700x280_jfs/t1/138691/31/2751/168533/5f09bea0E0832eed3/cea6526f75bee965.jpg!cr_1125x445_0_171!q70.jpg.dpg"}
          
          ]
```
+ 图片懒加载：直接在main.js中引入即可
```
import { Lazyload } from 'vant';
Vue.use(Lazyload);
```
+ 调大小

### 4.商品列表提示图-- Image 图片组件
+ 直接复制粘贴引入，调样式即可

### 5.下拉刷新--List列表、PullRefresh下拉刷新、Cell单元格组件
+ 分别引入List、PullRefresh、Cell组件
+ 复制List列表组件中关于下拉刷新的代码粘贴
+ List：在data中添加以下：
   + loading：false不加载，true表示加载状态
   +  finished：false没有到底，true已经到底了
   +  goodArr：自己定义的，给它一个数字。用于在van-cell中去遍历列表(假数据)
   > 数字也可以通过v-for遍历
+ refreshing：下拉刷新时为true，默认false
+  @refresh="onRefresh"：下拉刷新时执行的函数，onRefresh在methods中定义：
  ```js
    onRefresh(){
        console.log('下拉刷新')
        setTimeout(()=>{
          this.refreshing=false  //刷新2s后 refreshing为false，不刷新
          this.finished=false
        },2000)
      }
  ```
+  @load="onLoad":触底时执行的函数，onLoad在methods中定义：
  ```js
      onLoad(){
      if(this.goodArr<100){
        setTimeout(()=>{
          this.goodArr+=10
          this.loading=false
          //判断数据库中还有没有数据
          if(this.goodArr>=100){
              this.finished=true
          }
        },1000)
      }
      }
  ```
+ 若要刷新整个页面，则将van-pull-refresh标签包裹住整个页面的代码
### 6.商品列表
+ 封装(商品列表内容有点多，让它封装在commpnent/good/goodItem.vue)
+ commponents/index.js中将它抛出
+ Home.vue中当做局部组件引用
+ 为了使它左右两列显示，在van-cell标签中放两个GoodItem的单闭合标签
+ .qf-good-item,设置width小于等于50%即可
## 商品分类界面
### 1.左侧--Sidebar 侧边导航组件
+ 在Find.vue界面中引入，粘贴
+ activeKey:点击是高亮，数组缩影；在data中定义activeKey:0；
+ 品类列表：先造假数据：在data中定义cateArr数组
+ van-sidebar-item:遍历cateArr
### 2. 右侧--Grid宫格组件
+ 在Find.vue界面中引入，粘贴
+ 将复制过来的关于img的标签改成img，便于后期调样式
+ 在里面再加一个div显示商品名称
+ 先用假数据遍历
+ :column-num="3" 表示一行显示几列
+ :border="true" :边框
> 移动端字体默认28-32px之间(转rem)

## 购物车
### 1. 中间购物商品列--组合组件
+ checkbox勾选、Layout布局、Button按钮、Card商品卡片组件、SwipeCell滑动组件

+ Layout栅格系统，分两列:1.勾选框、2.卡片
+ 第一列套van-checkbox标签
+ 第二列套van-swipe-cell标签标签(组件内有card组件，记得引入)
+ 第二列底部再套一个+ -按钮van-button标签
+ 删除按钮的父元素是van-swipe-cell，这样才能滑动
+ van-swipe-cell标签包裹全部，循环遍历(先用假数据)
+ 注意样式：栅格系统垂直居中：type='flex',algin='center',不能左右居中，需要自己加margin调
+ 注意样式：要使checkbox真正居中，卡片中自带padding，要去padding
> 热区：区域太小，用户点不到。可以给该区域加padding变大
### 2.底部提交订单组件---van-submit-bar
### 3.
--Nav Bav
+ fixed：固定
+  @click-left="back"
```js
  methods: {
    back(){
      this.$router.back()
    },
  }
```
## 接口联调
### 封装接口
+ 安装axios :cnpm install axios -S
+ src/utils/fetch.js(与axios文件一样，看心情取名)：将之前的axios代码复制进来
+ src/utils/api.js:封装调商品列表的方法，抛出两次
```js
import fetch from './fetch'

export function fetchGoodList(params) {
    return fetch({
        url: '/api/v1/jd/good/list',
        method: 'GET',
        params
    })
}

export default {
    fetchGoodList
}

```
+ 在全局挂载：main.js
```js
import api from './utils/api'
Vue.prototype.$api = api
```
+ 跨域处理：根目录下创建vue.config.js
  + 在vue.js官网-->vue CLI-->配置参考-->devServer.proxy中复制代码
    + 更改target路径
    + port:改端口
    + open: 自动打开浏览器
+ 注意： 改成了8090端口，在fetch中baseURL内也要更改
+ 重启项目
### 封装图片
+ utils/img:引入服务器地址，抛出
+ 在原型链上挂载，main.js中
+ 这样就可以在全局使用：$img.imgBaseUrl
### 一、页面接口联调
### 二、发现界面接口联调
1. 封装api：//获取品类 fetchAllCates接口;获取商品列表与首页获取商品列表共用一个接口：fetchGoodList
2. Find.vue中调接口
   + 先获取品类才根据品类获取商品列表(涉及同异步)
   > 工作中不建议用嵌套的方法写接口，用ES6语法
    + 在methods中封装调接口
     ```js
      methods: {
        async init(){
          //第一步，获取品类列表
          const res = await this.$api.fetchAllCates({})
          this.cateArr=res.list
          //第二步根据第一个品类，获取商品列表
            let params={
            cate:this.cateArr[0].cate,
            size:1000
          }
          this.$api.fetchGoodList(params).then(res=>{
            console.log('当前品类下的',res)
            this.goodArr=res.list
          })

      }
      },
     }
     ```
     + mouted中调接口,页面初始化
     ```js
       mounted(){
          //页面初始化
        this.init()
        }
     ```
     + 将获取到的后端数据渲染到页面中
     + 通过watch监听activekey变化，当侧边栏发生品类切换时吧，调接口获取当前品类下的商品列表
    ```js
      activeKey:function(){
   
      let params={
        cate:this.cateArr[this.activeKey].cate,
        size:1000
      }
       this.$api.fetchGoodList(params).then(res=>{
        // console.log('当前品类下的',res)
        this.goodArr=res.list
      })
      }
    }
    ```
  3. *商品列表做缓存，
  + 用户可能会多次点击同一个品类，如果每次点击都要调接口，影响性能。可以通过状态管理做缓存
  > 状态管理
  + store/module/good.js: 里面引入调商品列表的接口并写方法
      ```js
       import { fetchGoodList } from '@/utils/api'
       export default {
          namespaced: true,
          state: {
          goodObj: {}  //定义goodObjd对象  ，后面由mutations进行更新
       },
        mutations: {
        updateGoodObj(state, payload) {    //payload是接收actions传来的数据
            state.goodObj[payload.k] = payload.v  //将数据以对象的形式添加更新到state中
          }
        },
          actions: {
        fetchList(store, params) { //params来于页面，页面中触发了actions并传参
            fetchGoodList(params).then(res => { //用这个参数去调后端接口
                console.log('当前品类下的列表', res)
                let payload = {    //定义一个对象
                    k: params.index,  //页面中获取到的activeKey，页面中点击了那个品类就对应哪个key，用于判断做缓存
                    v: res.list  //后端返回的商品列表
                }
                store.commit('updateGoodObj', payload) //触发mutations中的updataGoodObj方法并将处理好的对象传给它
            })
          }
        }
       }
      ````
  + 放在store/index.js中
  + Find.vue页面中将其映射进来
    ```js
      import { mapActions,mapState}from 'vuex'
    ```
  + Find.vue页面:在methods中使用映射mapActions方法，触发actions,调商品列表接口
    ```js
      methods: {
      ...mapActions('good',['fetchList']),  //命名空间，方法
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
        //触发actions
        this.fetchList(params)

      }
    },
    ```
  + Find.vue页面:computed中映射mapState,映射完成后，页面中就有了goodObj这个对象的值了
    ```js
      computed: {
      ...mapState('good',['goodObj'])
    }
    ````
 > 缓存：通过状态管理，获取到的数据都放在状态管理中
 + activekey：van-sidebar组件自带的属性，每个品类对应一个值0 1 2....，点击时会变
 +  在wacth中监听activekey 变化
 + 当侧边栏发生切换时，我们首先去判断goodObj有没有我想要的数据，如果有直接用，不必调接口
 + 如果没有，再调接口，并缓存
  ```js
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
  }
  ```
+ 小bug,页面初次点击品类状态管理中有数据但页面没有显示:通过深复制解决
> 深复制：对象层级过深，无法自动更新，需要用深复制。就是把变量粉粹再组装。原理：对象的地址在栈里，内容在堆里。直接复制只是复制地址，但指向的是同一个堆。深复制不仅复制地址还复制堆。
  ```
   state.goodObj = JSON.parse(JSON.stringify(state.goodObj))
  ```
+ *清缓存：beforeDestroy 离开Find页面时，状态管理中的数据要清除，否则下次再进来里面的数据有些不会更新
   + good.js:mutations方法中定义一个清缓存方法
   ```js
   clearGoodObj(state) {
            state.goodObj = {}
        }
   ```
   + Find页面，在页面销毁前清缓存beforeDestroy中
     + 将mutaions方法映射到Find中
     ```js
        beforeDestroy() {
          //触发mutations方法，清除缓存
          this. clearGoodObj()
        }
     ```  
## 商品详情页
 1. routes/home/GoodDetail.vue
 2. 封装调商品详情接口fetchGoodInfo,并放在router.js中
 3.  goodItem.vue中给qf-good-item添加点击事件，点击跳转到GoodDetail页面，同时传id
   ```
     this.$router.push('/good/detail/'+this.good._id)
   ```
4. 商品详情页接收id并将id用于调接口获取列表，然后渲染页面
  ```
    mounted() {
     let id=this.$route.params.id
    //  console.log('_id',id)
     //调接口获取商品详情
     this.$api. fetchGoodInfo({id}).then(res=>{
        //  console.log(res)
         this.info=res
     })
   },
  ```
  5.商品导航栏---GoodsAction 商品导航组件
   + 引入 复制粘贴组件
   + 封装添加购物车的接口
   + 立即购买添加点击事件(不能有touchstart，用click)
   + @click="buy"
   + 在buy方法中传参调接口
   + fetch.js中响应拦截，当token无效时跳到登录页
## 登录页---Form 表单组件
  + 引入组件，复制粘贴
  + 提交事件： @submit="login"
  + 封装登录的接口
  + 点击提交，调接口，登录成功后将token传到 localStorage,返回
## 商品详情页
  + 只有登录成功， localStorage中有token，点击 @click="buy"方法才可以将商品加入购物车
  + 加入购物车成功后详情页弹出加入购物车成功的消息
  +  Toast消息组件
  + 设置定时器，弹出加入购物车成功的消息后间隔1s再跳到购物车页面
  + 用完定时器，要在beforeDestroy中销毁
## 购物车
+ 封装添加购物车的接口
+ Cart页面调接口
+ 渲染页面
  + 注意：这个接口获取到的后端回传的数据有双层嵌套，渲染时需要先打印出来看看再决定怎么渲染
## 注册页
  + 直接复制登录页面改造
  + 封装注册的接口
  + 修改注册页面
## 购物车
### 购物车---删除
+ 封装删除商品列表接口
+ 删除按钮标签上添加@touchstart='remove(item)'
> 注意：事件处理函数不要写delete,换成remove
+ 在remove(item)中传id调删除接口
+ 引入Dialog弹框，用于删除时弹出
+ 删除完成后要自动刷新页面，封装获取商品列表的方法，删除成功后调这个方法。页面一开始时也调这个方法。
### 购物车--添加减少数量
+ 封装修改购物车数量接口
+ 给加减按钮绑定点击事件：@touchstart='change(item,"sub")' @touchstart="change(item)"
  用一个函数控制。如果数量小于1弹出提示框
  ```js
     change(item,flag){
        let data={
          id:item._id,
          num:flag?item.num-1:item.num+1
        }
        if(data.num<1){
          return Toast('商品不能少于1')
        }
        this.$api.fetchUpdataCart(data).then(()=>{
          this.init()
          // console.log('数量修改成功')
        })
     }
  },
  ```
+ 在函数内调接口，成功后调接口刷新页面
### 购物车---勾选按钮--正着来
+ 列表的切换勾选时，要给每一个添加布尔值。用v-model双向绑定
  ```
     <van-checkbox v-model=" item.checked"></van-checkbox>
  ```
  + van-checkbox组件标签自带的属性，本来没有状态管理内没有的但是添加v-model后一旦点击就有了
+ 全选按钮：点击全选，全选按钮绑定change事件
+ 遍历所有列表，将它们的状态根全选按钮状态一致。(小bug：状态管理中的状态改变了，但页面没有更新。用深复制)
> 深复制
    ```js
       fullChange(bol){
        console.log('full change',bol)
        this.list.map((ele,idex,arr)=>{   //arr:this.list
          arr[idex].checked=bol
        })
     
        this.list=JSON.parse(JSON.stringify(this.list))
        //强制执行diff运算，强制update页面
        // this.$forceUpdate()
      }
    ```
+ 勾选不勾选的弯弯绕绕太复杂了，不一一分析
  ```
    <van-checkbox v-model=" item.checked" @click='rowChange'></van-checkbox>
    <van-checkbox v-model="fullChecked" @click='fullChange' >全选</van-checkbox>
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
  ```
### 购物车---计算订单
+ 需求：点击勾选按钮，下方显示总金额
+ computed属性里面：遍历list中，选出所有被勾选的元素计算总金额.渲染标签
  ```js
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
   }
+ 小bug；点击+ -时，会初始化页面。东西都没了，怎么办呢？这可怎么办呢？
  + 点击+ -不用初始化页面就行啦。只要让变化的那条数据更改即可
  + 解决：map遍历list，当某个元素的id等于更改的那条id时，将data.num赋值给它
  ```js
     this.list.map((ele,idx,arr)=>{
          if(ele._id===item._id){
            arr[idx].num=data.num
          }
      })
  ```
### 购物车---提交订单
+ 封装提交订单的接口；后端要求：{good:String 用户已勾选的订单_id，连接而成的字符串}
+ 做法：提交时，遍历出list中已勾选的元素，拼接它们的id.传给后端。
+ 下单成功可以弹出一个Toast框提示用户已下单成功。然后初始化页面
+ 还有一个小bug，自己去解决哦~~(init()，初始化页面时如果list.length=0,全选状态为false)
  
> 路由守卫(导航守卫)
  + 它的作用：阻止未登录用户进入需要权限的界面
  + router.beforeEach((to,from,next)=>{}) 
  + to:去哪个页面,from：从哪个页面，next：下一步
  ```js
        router.beforeEach((to, from, next) => {
        let token = localStorage.getItem('token')
            //第一层判断，判断哪些页面需要被守卫（保卫）
        if (to.path === '/cart' || to.path === '/user') {
            //第二重判断，用token表示用户是否登录，如果已登录，可以访问私密页面，如果为登录，不让访问
            if (token) {
                next()
            } else {
                next("/login")
            }
        } else {
            next()
        }
    }) 

  ```
> 埋点：是网站分析的一种常用的数据采集方法.比如用户访问了某个界面，系统会根据用户访问的那些界面去分析数据
> keep-alive:将失活的组件缓存。
  + 当我们访问某些页面，访问到一定位置时点击跳到了另一个页面。从另一个页面中再返回时，若想回到原先的位置，可以使用keep-alive标签包裹
  + 写两个router-view,不需要被缓存的界面，用default容器显示。需要被缓存的界面使用视图命名来解决。就可以实现不需要缓存的界面 和 需要缓存的界面
  ``` 
  APP.vue

    <div class="app">
    <!-- 需要被缓存的界面，建议使用视图命名来解决 -->
    <keep-alive>
         <router-view name="alive"></router-view>
    </keep-alive>
      <!-- 不需要被缓存的界面，用default容器来显示 -->
     <router-view></router-view> 
   </div>
   
  ```
  ```
   router.js
      { path: '/', components: { alive: Home } },
  ```
