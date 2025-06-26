<!--
 * @Author: 静ming 
 * @Date: 2025-06-26 22:45:09
 * @LastEditors: 静ming
 * @LastEditTime: 2025-06-26 22:47:45
 * @FilePath: \xiaoyi1255.github.io\docs\guide\vue\interview\vue.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="app">{{ msg }}</div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      msg: 'hello 小易',
    };
  },
  mounted() {
    console.log(this.msg);
  },
  render() {
    return h('div', {class: 'app'}, this.msg);
  }
};
</script>
