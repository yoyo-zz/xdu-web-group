<script setup lang='ts'>
    
    import axios from "axios"
    import { inject } from 'vue'
import router from "../router";

    router.push({name:'mygoodsShow'})
    const ifLogin= inject('ifLogin')
    let id:string='';
    let user=inject('userName')
    let password:string=''; 
    const showGoods=(router:any)=>{
        router.push({name:'mygoodsShow'})
    }
    const appendGoods=(router:any)=>{
        router.push({name:'addGoods'})
    }
    const login=(router:any)=>{
        console.log(id,password)
        axios.get('http://localhost:3000/mysql/users/select',{params:{id:id,password:password}})
        .then(response => { 
        let data=response.data.userData
        console.log(data)
        if (data){
          ifLogin.value=true;
          user.value=id
          router.push({name:'PhotoList'})
        }
        else{
          alert("用户名或密码错误")
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
    //register函数
    const register=(router:any)=>{
        router.push({name:'register'})
    }
</script>

<template>
  <div v-if="!ifLogin" class="loginPage">
    <div class="main">
        <div class="part"><span>账号:</span><input class="input" type="text" v-model="id"></div>     
        <div class="part"><span>密码:</span><input class="input" type="text" v-model="password"></div>
        <div class="part">
          <button @click ="login($router)">登录</button>
          <button @click ="register($router)">注册</button>
        </div>       
    </div>   
  </div>
  <div v-else class="area">
      <div class="form">
        <div class="unit" @click="appendGoods($router)">添加商品</div>
        <div class="unit" @click="showGoods($router)">自己的商品</div>
      </div>
      <div class="content">
        <router-view ></router-view>
      </div>
  </div>
</template>

<style scoped>
.part{
  margin: auto;
  color:#409eff;
}
.loginPage {
    height: 100%;
    width:100%;
    background-color:#2a3141;
    border: 2px solid black;
}
.main {
  width: 600px;
  height: 200px;
  display: flex;
  flex-direction: column;
  margin:10% auto;
}
.input{
    width: 300px;
    height: 30px;
    margin: 20px;
}
.area{
  display: flex;
  flex-direction: row;
  width: 1500px;
  height: 800px;
  margin: 50px auto;
  border: 1px solid black;
}
.form{
  width: 200px;
  height: 800px;
  display: flex;
  flex-direction: column;
  border: 1px solid;
}
.unit{
  width:200px ;
  height: 50px;
  background-color: antiquewhite;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  border:1px solid;
}
.content{
  width: 1300px;
  height: 800px;
  margin: 30px auto;
}
</style>
