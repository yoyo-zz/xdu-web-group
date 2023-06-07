<script setup lang='ts'>
    import axios from "axios"
    import { inject ,ref, reactive} from 'vue'
    import chat from "./chat.vue";
    const ID=inject("ID")
    const goods=ref()
    const goodsImage=ref()
    const receiver=ref()
    const is=ref(false)
    const isShopkeeper=ref(false)
    let user=inject('userName')
    const delGoods=()=>{
      axios.post('http://localhost:3000/mysql/goods/infoDel',{id:ID.value})
      .then(response => {     
      })
      .catch(error => {
        console.log(error);
      });
      axios.post('http://localhost:3000/mysql/image/infoDel',{id:ID.value})
      .then(response => {     
        alert("删除成功")
        window.history.back()
      })
      .catch(error => {
        console.log(error);
      });
    }
    axios.get('http://localhost:3000/mysql/goods/select',{params:{id:ID.value}})
        .then(response => {     
          goods.value=response.data
          receiver.value=goods.value.shopkeeper
          if(user.value==goods.value.shopkeeper){
            isShopkeeper.value=true
            console.log(isShopkeeper.value)
          }
      })
      .catch(error => {
        console.log(error);
      });
    axios.get('http://localhost:3000/mysql/goods/imageSelect',{params:{id:ID.value}})
        .then(response => {     
          console.log(response.data)
          // goodsImage.value = response.data.toString('base64');
          goodsImage.value=`data:image/jpeg;base64,${response.data}`;
      })
      .catch(error => {
        console.log(error);
      });
    const chatView=()=>{
      is.value=!is.value
    }
</script>

<template> 
    <div class="page">    
        <div class="image-container"><img class="image" :src="goodsImage" alt=""></div>
        <div class="cotent" >
          <div class="words shopkeeper des">商家:{{ goods.shopkeeper }}</div>
          <div class="words title des">商品:{{ goods.title }}</div>      
          <div class="words price des">价格:{{ goods.price}}</div>
          <div class="words num des">数量:{{ goods.num}}</div>
          <div class="words num des">描述:{{ goods.description}}</div>
          <button @click="chatView()" class="des">私聊</button>
          <button v-show="isShopkeeper" @click="delGoods" class="des">删除</button>
        </div>
    </div>
    <div v-show="is" class="chat">
        <chat :receiver-name="receiver"></chat>
    </div>
    <div class="comments">

    </div>
</template>

<style scoped>
.image{
  width: 300px;
  height: 300px;
  border-radius: 10px;
}
.image-container{
  margin: 100px 0 0 300px;
}
.words{
  text-align: center;
  color:#409eff;
}
.page{
  width: 1500px;
  height: 800px;
  display:flex;
  align-items: center;
  justify-content:space-between;
  flex-shrink: 0;
  flex-wrap: wrap;
  margin: auto;
  border: 1px solid;
}
.cotent{
  display: flex;
  flex-direction: column;  
  margin: 100px 500px 0 0;
}
.des{
  margin: 10px;
}
.shopkeeper{
  font-size: 30px;
}
.chat{
  position:absolute ;
  top:10%;
  right:10%;
}
</style>