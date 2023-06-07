<script setup lang='ts'>
  import { inject ,ref,reactive,provide} from 'vue'
  import axios from 'axios';
  import Avatar from './components/Avatar.vue'
  import chat from './components/chat.vue';
  const ifLogin = inject('ifLogin')
  console.log(ifLogin)
  let Goods = reactive({ id:[],price:[],title:[] })
  let GoodsImage = reactive({ image:[] })
  provide("Goods",Goods)
  provide("GoodsImage",GoodsImage)
  const name=reactive({})
  provide('userName',name)
  const msgIs=ref(false)
  const search=ref()
  const check=(router:any)=>{
    router.push({name:'account'})
  }
  const check1=(router:any)=>{  
      router.push({name:'PhotoList'})
  }
  const messageShow=()=>{
    msgIs.value=!msgIs.value
  }
  const searchFor=(router:any)=>{
    Goods.id=[]
    axios.get('http://localhost:3000/mysql/goods/search',{params:{search:search.value}})
    .then(response => {     
          console.log(response.data)
          for(let i=0; i<response.data.length; i++){           
            axios.get('http://localhost:3000/mysql/goods/imageSelect',{params:{id:response.data[i]}})
            .then(response => {     
              GoodsImage.image[i]=response.data
              GoodsImage.image[i]=`data:image/jepg;base64,${GoodsImage.image[i]}`
              console.log(GoodsImage,12231)
            })
            .catch(error => {
                console.log(error);
            });
            axios.get('http://localhost:3000/mysql/goods/select',{params:{id:response.data[i]}})
            .then(response => {
              Goods.id[i]=response.data.id
              Goods.title[i]=response.data.title
              Goods.price[i]=response.data.price
              console.log(Goods,56566)
            })
            .catch(error => {
                console.log(error);
            });
          }
          router.push({name:'search'})
      })
    .catch(error => {
        console.log(error);
      });
  }
</script>
<template>
  <div class="mainPage" >
    <header class="head"> 
      <div style="display: flex; align-items: center;">
        <div style="cursor:pointer ;margin: 0 10px;color: #409eff;" @click ="check1($router)">主页</div> 
      </div>
      <div>
          <input type="text" v-model="search" placeholder="输入商品信息">
          <button style="color:#409eff ;" @click="searchFor($router)">搜索</button>
        </div>
      <div class="accountCenter" @click ="check($router)">
         <Avatar></Avatar>
      <div style="color:#409eff ;">{{name.value}}</div>
      </div>
      <div class="msg" @click="messageShow">聊天</div>
    </header>
    <div class="aside" v-show="msgIs" v-if="name.value">
      <chat></chat>
    </div>
    <router-view class="m"></router-view>
  </div>
</template>

<style scoped>
.mainPage {
  position:absolute;
  background-color:#2a3141;
  height:100%;
  width: 100%;
  overflow: hidden;
}
.m{
  background-color:#2a3141;
}
.head{
  background-color: black;
  display: flex;
  align-items: center;
  justify-content:space-around;
  flex-shrink: 0;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
}
.accountCenter{
  display: flex;
  align-items: center;
  /* justify-content:space-around; */
  cursor: pointer;
}
.msg{
  cursor: pointer;
  color:#409eff ;
}
.aside{
  position: fixed;
  width: 200px;
  height: 500px;
}
</style>