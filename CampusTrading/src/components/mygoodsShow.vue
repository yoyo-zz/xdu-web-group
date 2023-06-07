<template>
    <div class="content"> 
        <ul class="goodsList" >
            <li class="goods"  v-for="(goods,index) in goodsPage" @click="linkToGoods($router,goods)">
                <div><img class="image" :src="GoodsImage.image[index+(currentPage-1)*pageSize]" alt=""></div>
                <div class="words">{{ Goods.title[index+(currentPage-1)*pageSize] }}</div>     
            </li>
        </ul>
        <br>
        <pagination class="pagination"
        :total="Goods.id.length"
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
  let Goods = reactive({ id:[],price:[],title:[] })
  let GoodsImage = reactive({ image:[] })
    const ID= inject('ID')
    let names=inject('userName')
  const pageSize = 6
  const currentPage = ref(1)
  const linkToGoods=(router:any,key:number)=>{
        ID.value=key
      router.push({ name: 'goods' })
}
  let goodsPage = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize
    const endIndex = startIndex + pageSize
    return Goods.id.slice(startIndex, endIndex)
  })
  axios.get('http://localhost:3000/mysql/mygoods/search',{params:{name:names.value}})
        .then(response => { 
          console.log(response.data.length)
        for(let i=0; i<response.data.length; i++){   
          console.log(response.data[i])
            axios.get('http://localhost:3000/mysql/goods/imageSelect',{params:{id:response.data[i].id}})
            .then(response => {     
              GoodsImage.image[i]=response.data
              GoodsImage.image[i]=`data:image/jepg;base64,${GoodsImage.image[i]}`
              console.log(GoodsImage,12231)
            })
            .catch(error => {
                console.log(error);
            });
            axios.get('http://localhost:3000/mysql/goods/select',{params:{id:response.data[i].id}})
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
  width: 900px;
  height: 700px;
  display: flex;
  flex-direction: column;
}
.goodsList{
  display:flex;
  align-items: center;
  justify-content:space-between;
  flex-shrink: 0;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
}
.words{
  width: 250px;
  height: 30px;
  text-align: center;
  color: azure;
  line-height: 30px;
}
.goods{
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  flex-basis: 250px;
  border-radius: 10px;
  cursor: pointer;
  background-image: linear-gradient(to right, #627996, #29303e);
}
.pagination{
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  /* margin-bottom: auto; */
}
</style>
  