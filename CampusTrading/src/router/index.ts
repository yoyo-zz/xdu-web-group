import { createRouter, createWebHistory,RouteRecordRaw } from 'vue-router'
import accountCenterVue from './../components/accountCenter.vue'
import AppVue from '../App.vue'
import goodsUiVue from '../components/goodsUi.vue'
import goodsVue from '../components/goods.vue' 
import PhotoListVue from '../components/PhotoList.vue'
import infoVue from '../components/info.vue'
import registerVue from '../components/register.vue'
import searchVue from '../components/search.vue'
import addGoodsVue from '../components/addGoods.vue'
import mygoodsShowVue from '../components/mygoodsShow.vue'
const routes:Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/PhotoList',
  },
  {
    path: '/account',
    name: 'account',
    component:accountCenterVue,
    children: [
      {
        path: '/addGoods',
        name: 'addGoods',
        component: addGoodsVue
      },
      {
        path: '/mygoodsShow',
        name: 'mygoodsShow',
        component: mygoodsShowVue
      },
    ]
  },
  {
    path: '/',
    name: 'index',
    component:AppVue
  },
  {
    path: '/goodsUi',
    name: 'goodsUi', 
    component:goodsUiVue
  },
  {
    path: '/goods',
    name: 'goods',  
    component:goodsVue
  },
  {
    path: '/PhotoList',
    name: 'PhotoList',  
    component:PhotoListVue 
  },
  {
    path: '/register',
    name: 'register',  
    component:registerVue
  },
  {
    path: '/search',
    name: 'search',   
    component:searchVue
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
