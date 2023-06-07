<template>
    <div class="content"> 
        <ul class="goodsList" >
            <li class="goods"  v-for=" (goods,index) in goodsPage" @click="linkToGoods($router,goods.id)">
                <div><img class="image" :src="GoodsImage.image[index+(currentPage-1)*pageSize]" alt=""></div>
                <div class="words">{{ goods.title }}</div>              
            </li>
        </ul>
        <pagination class="pagination"
        :total="Goods.data.length"
        :page-size=pageSize
        @page-change="(n) => currentPage = n"
        />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed,reactive } from 'vue'
  import axios from 'axios'
  import Pagination from './Pagination.vue'
  import { inject } from 'vue'
//   const allPhotos = ref([])
    const ID= inject('ID')
  const pageSize = 6
  const currentPage = ref(1)
  const linkToGoods=(router:any,key:number)=>{
        ID.value=key
      router.push({ name: 'goods' })
}
  const goodsPage = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize
    const endIndex = startIndex + pageSize
    return Goods.data.slice(startIndex, endIndex)
  })
    const Goods = reactive({ data: [] })
    const GoodsImage = reactive({ id:[],image:[] })
    axios.get('http://localhost:3000/mysql/goods/show')
        .then(response => { 
        Goods.data = response.data
      })
      .catch(error => {
        console.log(error);
      });
    axios.get('http://localhost:3000/mysql/goods/imageShow')
        .then(response => {     
        GoodsImage.id=response.data.image.id;
        GoodsImage.image=response.data.image.image
        // console.log(GoodsImage.image)
        for(let i in GoodsImage.image){
          GoodsImage.image[i]=`data:image/jepg;base64,${GoodsImage.image[i]}`
          // console.log(GoodsImage.image[i])
        }
        // console.log(31243432534234,GoodsImage.image[0],typeof(GoodsImage.image[0]))
      })
      .catch(error => {
        console.log(error);
      });
  </script>

<style scoped>
.image{
  width: 250px;
  height: 220px;
  border-radius: 10px;
}
.content{
  display: flex;
  flex-direction: column;
  border: 3px solid black;
  /* width: 1500px;
  height: 800px; */
}
.words{
  width: 250px;
  height: 30px;
  text-align: center;
  color: azure;
  line-height: 30px;
}
.goodsList{
  width: 900px;
  height: 700px;
  display:flex;
  align-items: center;
  justify-content:space-between;
  flex-shrink: 0;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
}
.goods{
  display: flex;
  flex-wrap: wrap;
  flex-basis: 250px;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 10px;
  /* background-color: #5f7996; */
  background-image: linear-gradient(to right, #627996, #29303e);
}
.pagination{
  display: flex;
  margin-left: auto;
  margin-right: auto;
}
</style>
  