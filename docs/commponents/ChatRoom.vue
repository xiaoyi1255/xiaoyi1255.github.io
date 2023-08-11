<template>
    <div class="chat-room">
      <div class="message-list">
        <div v-for="message in messages" :key="message.id" class="message">
          {{ message.text }}
        </div>
      </div>
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="输入消息..." />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newMessage: "",
        messages: [],
        socket: null,
      };
    },
    mounted() {
      this.socket = new WebSocket("ws://localhost:3000"); // 请替换为您的服务器地址
      console.log(this.socket, 'sokect')
      this.socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log(event)
        this.messages.push(message);
      };
    },
    methods: {
      sendMessage() {
        if (this.newMessage.trim() === "") return;
        const message = {
          text: this.newMessage,
          id: Date.now(),
        };
        // this.messages.push(message);
        this.socket.send(JSON.stringify(message));
        this.newMessage = "";
      },
    },
  };
  </script>
  
  <style scoped>
  .chat-room {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  }
  
  .message-list {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
  }
  
  .message {
    margin-bottom: 10px;
    padding: 5px 10px;
    border: 1px solid #eee;
    border-radius: 5px;
    background-color: #f8f8f8;
  }
  
  .username {
    font-weight: bold;
    color: #007bff;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  