<script setup lang='ts'>
import axios from 'axios'
import {ref} from 'vue'
    // let formData
    // const imageSrc = ref('')
    // let reader:FileReader
    // const onFileSelected=(e:any)=> {
    //   let selectedFile =e.target.files[0]
    // //   formData = new FormData();
    // //   formData.append("image", selectedFile);
    //   // console.log(selectedFile)
    //   reader = new FileReader()
    //   reader.readAsDataURL(selectedFile)
    //   reader.onload = () => {
    //     imageSrc.value = reader.result
    //   }
    // }
    let id:string,password:string,temp:string
    const register=(router:any)=>{
        console.log(id,password)
      if(password==temp){
        axios.post('http://localhost:3000/mysql/users/register',{id:id,password:password})
        .then(response => {    
            router.push({name:'account'})   
        })
        .catch(error => {
            console.log(error);
        });
        }
      else{alert("两次密码输入不一致!")}
    }
</script>

<template>
    <div class="area">
      <div class="register">
        <div> 账号：<input type="text" class="input" v-model="id"></div>
        <div>密码：<input type="password" class="input"  v-model="password"></div>
        <div> 密码：<input type="password" class="input"  v-model="temp"></div>
        <button class="buttonRegister" style="width:60px ;margin: 0 180px;" @click ="register($router)">注册</button>
      </div>
    </div>
</template>

<style scoped>
.image{
    width: 65px;
    height: 65px;
}
.register{
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  margin: 10% auto;
  color:#409eff ;
  
}
.area{
  border: 1px solid black;
}
.input{
    width: 300px;
    height: 30px;
    margin: 20px;
}
</style>