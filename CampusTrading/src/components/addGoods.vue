<script setup lang='ts'>
    import {ref,inject} from 'vue'
    import axios from "axios"
    let formData
    const imageSrc = ref('')
    let reader:FileReader
    const onFileSelected=(e:any)=> {
      let selectedFile =e.target.files[0]
      formData = new FormData();
      formData.append("image", selectedFile);
      // console.log(selectedFile)
      reader = new FileReader()
      reader.readAsDataURL(selectedFile)
      reader.onload = () => {
        imageSrc.value = reader.result
      }
    }
    
    let goodsTitle:string=''
    let goodsDescription:string=''
    let goodsTag:string=''
    let goodsPrice:number
    let goodsNum:number
    let names=inject('userName')

    const goodsAdd=()=>{
      axios.post('http://localhost:3000/mysql/goods/imageUpload',
        formData)
        .then(response => { 
        console.log(response); 
      })
      .catch(error => {
        console.log(error);
      });
      console.log("kkk")
      axios.post('http://localhost:3000/mysql/goods/infoAdd',
      {title:goodsTitle,name:names.value,description:goodsDescription,tag:goodsTag,price:goodsPrice,num:goodsNum})
        .then(response => { 
        console.log(response); 
        alert("增加商品成功")
        window.history.back()
      })
      .catch(error => {
        console.log(error);
      });
    }
    
</script>

<template>
  <div class="add">
    <div style="display: flex;flex-direction: column;margin: 30px auto;">
      <input class="input" type="text" v-model="goodsTitle" placeholder="请输入商品的标题">
      <input class="input" type="text" v-model="goodsTag" placeholder="请输入商品的标签">
      <input class="input" type="text" v-model="goodsDescription" placeholder="请输入商品的描述信息">
      <input class="input" type="text" v-model="goodsPrice" placeholder="请输入商品的价格">
      <input class="input" type="text" v-model="goodsNum" placeholder="请输入商品的数量">
      <input type="file"  @change="onFileSelected">
    </div>
    <div style="margin: auto;">
      <img class="image" :src="imageSrc" alt="图片">
    </div>
    <button class="push" @click="goodsAdd">添加商品</button>
  </div>
</template>

<style scoped>
.input{
  width: 300px;
  height: 30px;
  margin-bottom: 20px;
}
.input ::placeholder{
  color: rgba(ff,ff,ff,0.8);
}
.image{
 width: 250px;
 height: 220px;
}
.add{
  width: 1300px;
  height: 300px;
  display: flex;
  flex-direction: column;
}
.push{
  width: 70px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  margin:auto;
}
</style>