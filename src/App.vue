<template>
  <div id="app">

    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
export default {

  name: 'app',
  data () {
    return {
      users: [],
      messages: []
    }
  },
  mounted () {
    // 获取用户数据
    axios.get('/users', {
      headers: {
        'Access-Control-Allow-Origin': '*' // 确保支持跨域
      }
    })
      .then(response => {
        this.users = response.data
        console.log('Fetched users:', this.users)
      })
      .catch(error => {
        console.error('Error fetching users:', error)
      })

    // 获取留言数据
    axios.get('/messages', {
      headers: {
        'Access-Control-Allow-Origin': '*' // 确保支持跨域
      }
    })
      .then(response => {
        this.messages = response.data
        console.log('Fetched messages:', this.messages)
      })
      .catch(error => {
        console.error('Error fetching messages:', error)
      })
  }

}
</script>

<style>
/* 可选样式 */
</style>
