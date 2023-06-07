<!-- Vue3中并没有传统的"生命周期"的概念，而是采用了"组合式API"的概念，提供了一些以on为前缀的函数。这些函数可以在setup函数中被编写。以下是一些常见的组合式API"生命周期"函数:

onBeforeMount: 在组件挂载到DOM前触发。
onMounted: 在组件挂载到DOM后触发。
onBeforeUpdate: 在组件更新前触发。
onUpdated: 在组件更新后触发。
onBeforeUnmount: 在组件从DOM卸载前触发。
onUnmounted: 在组件从DOM卸载后触发。Vue3中并没有传统的"生命周期"的概念，而是采用了"组合式API"的概念，提供了一些以on为前缀的函数。这些函数可以在setup函数中被编写。以下是一些常见的组合式API"生命周期"函数:

onBeforeMount: 在组件挂载到DOM前触发。
onMounted: 在组件挂载到DOM后触发。
onBeforeUpdate: 在组件更新前触发。
onUpdated: 在组件更新后触发。
onBeforeUnmount: 在组件从DOM卸载前触发。
onUnmounted: 在组件从DOM卸载后触发。 -->
<template>
    <div class="content"> 
        <ul class="goodsList" >
            <li class="goods"  v-for="(goods,index) in goodsPage" @click="linkToGoods($router,goods)">
                <img class="image" :src="GoodsImage.image[index+(currentPage-1)*pageSize]" alt="">
                <div class="words">{{ Goods.title[index+(currentPage-1)*pageSize] }}</div>        
            </li>
        </ul>
        <pagination class="pagination"
        :total="Goods.id.length"
        :page-size=pageSize
        @page-change="(n) => currentPage = n"
        />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed,reactive } from 'vue'
  import Pagination from './Pagination.vue'
  import { inject } from 'vue'
//   const allPhotos = ref([])
    const ID= inject('ID')
    let Goods= inject('Goods')
    let GoodsImage=inject('GoodsImage')
    console.log(Goods)
    console.log(GoodsImage)
  const pageSize = 6
  const currentPage = ref(1)
  const linkToGoods=(router:any,key:number)=>{
        ID.value=key
      router.push({ name: 'goods' })
}
  const goodsPage = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize
    const endIndex = startIndex + pageSize
    return Goods.id.slice(startIndex, endIndex)
  })
//   console.log(goodsPage)
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
  border: 1px solid black;
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
  flex-basis: 250px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid black;
  background-image: linear-gradient(to right, #627996, #29303e);
}
.pagination{
  display: flex;
  margin-left: auto;
  margin-right: auto;
}
</style>
  