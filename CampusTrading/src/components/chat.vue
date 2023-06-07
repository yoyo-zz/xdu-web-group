<template>
  <div class="container">
      <h2 style="color: #409eff;">消息</h2>
    <div >
      <div class="chatbox">
        <div class="message" v-for="message in messages" :key="message.id">
          <strong style="cursor: pointer;color: #1492d1;" @click="aim(message)">{{ message.username }}:</strong> <div style="color:#fff ;">{{ message.text }}</div>
        </div>
      </div>
      <form @submit.prevent="sendMessage">
        <input style="width:295px ;" v-model="text" type="text" placeholder="Type your message" />
        <button type="submit">Sendto</button><span style="color: #fff;">{{ sendPerson }}</span>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { io } from 'socket.io-client';
import axios from 'axios';
import { ref, computed, inject } from 'vue';

const props = defineProps({
    receiverName: {
      type: String,
      required: true
    }
  })

type MessageType = {
  username: string,
  text: string,
  receiver:string
};

const socket = io('http://localhost:3001');
console.log("hello")
const username=inject('userName')
const text = ref('');
const messages = ref<MessageType[]>([]);//
const joined = ref(false);
const sendPerson=ref()
axios.get('http://localhost:3000/mysql/messages/select',{params:{id:username.value}})
        .then(response => {     
          console.log(response.data)
          for(let i=0; i<response.data.length; i++){
            messages.value.push({ username: response.data[i].user, text: response.data[i].msg ,receiver:response.data[i].reciever});
          }
      })
      .catch(error => {
        console.log(error);
      });

const receiver =ref(props.receiverName)
console.log(receiver,"dsadsadasds")
const aim=(message)=>{
  receiver.value=message.username
  sendPerson.value=message.username
}

const join = () => {
  if (username.value) {
    socket.emit('join', {username:username.value,receiver:receiver.value});
    joined.value = true;
  }
};
join()
const sendMessage = () => {
  if (text.value) {
    socket.emit('message', { username: username.value, text: text.value ,receiver:receiver.value});
    messages.value.push({ username: username.value, text: text.value ,receiver:receiver.value});
    text.value = '';
  }
};

const usernameErrorMessage = computed(() => {
  if (username.value.trim().length === 0) {
    return 'Username cannot be empty';
  }
});

socket.on('message', (data: MessageType) => {
  messages.value.push(data);
  if(receiver.value==undefined){
    receiver.value=messages.value[0].username
  }
  socket.on('disconnect', () => {
  console.log('Socket disconnected');
  socket.emit('disconnect', { username: username.value});
  // TODO: 处理连接关闭的操作
});
});

</script>
<style>
.chatbox {
  width: 300px;
  height: 600px;
  background-color: rgba(161, 218, 202, 0.3);
  border: 2px solid black;
  overflow: auto;
}
</style>