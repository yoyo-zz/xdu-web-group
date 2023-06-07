<script setup lang='ts'>
    import { baseCompile } from '@vue/compiler-core';
    import { computed } from '@vue/reactivity';
    import axios from 'axios'
    import {reactive,ref} from 'vue'

    const Goods = reactive({ data: [] })
    const GoodsImage = reactive({ id:[],image:[] })
    let num
    axios.get('http://localhost:3000/mysql/goods/show')
        .then(response => { 
        console.log(response.data); 
        Goods.data = response.data
        num=Goods.data[0].id
        // const imageBase64 = imageBuffer.toString('base64')
      })
      .catch(error => {
        console.log(error);
      });
    axios.get('http://localhost:3000/mysql/goods/imageShow')
        .then(response => {     
        GoodsImage.id=response.data.image.id;
        GoodsImage.image=response.data.image.image
        console.log(GoodsImage);
        for(let i in GoodsImage.image){
          GoodsImage.image[i]=`data:image/jepg;base64,${GoodsImage.image[i]}`
        }
        // image.value=`data:image/jepg;base64,${response.data.image}`
        // console.log(image);
        // GoodsImage.data = response.data
        // for(let i in GoodsImage.data){
        //   GoodsImage.data[i].image=GoodsImage.data[i].image.toString('base64')
        // }
        // // const imageBase64 = imageBuffer.toString('base64')
        // console.log(GoodsImage.data);
      })
      .catch(error => {
        console.log(error);
      });
    const linkToGoods=(router:any,key:number)=>{
      router.push({ name: 'goods', params: { id: key } })
    }
</script>

<template>
  <div>
    <ul style="display:flex;flex-wrap: nowrap;">
        <li class="goodsList" v-for="goods in Goods.data" :key="goods.id" @click="linkToGoods($router,goods.id)">
         <img class="image" :src="GoodsImage.image[goods.id-num]" alt=""><br>{{ goods.title }},{{ goods.price }}        
        </li>
        <!-- <li v-for="image in GoodsImage.image"><img class="image" :src="image" alt=""></li> -->
    </ul>
  </div>
</template>

<style scoped>
.image{
  width: 240px;
  height: 220px;
}
.goodsList{
  width: 240px;
  height: 325px;
  margin: 10px;
  cursor: pointer;
}
.goods{
 text-decoration-line: none;
}
</style>