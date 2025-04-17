<template>
  <div class="remark">
    <div class="header">
      <h1>心愿墙</h1>
      <input type="text" placeholder="留下点什么啦~" class="dreamBoard" @click="showButton" v-model="content">
      <button class="pushRemark" v-if="isShowButton" @click="submitbarrage" :disabled="isSubmitting">{{ isSubmitting ? '发射中...' : '发射' }}</button>
    </div>
    <!-- 留言板部分 -->
    <div class="messages-list">
      <div class="messages-item" v-for="message in messages" :key="message.id">
        <div class="message-header">
          <span class="username">{{ message.username }}</span>
          <span class="timestamp">发布时间:{{ message.createdAt }}</span>
        </div>
        <div class="message-text">{{ message.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// import Barrage from '@/components/Barrage.vue'
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'
import Swal from 'sweetalert2'
import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'
// import axios from 'axios'
// import { loginApi } from '@/api/login'
export default {
  name: 'remarkIndex',
  data () {
    return {
      content: '',
      isSubmitting: false,
      isShowButton: false,
      messages: [],
      user: null,
      moment: moment().format('YYYY-MM-DD HH:mm:ss')

    }
  },
  components: {
    // Barrage
  },
  methods: {
    async submitbarrage () {
      try {
        if (!this.islogin) {
          Swal.fire({
            title: '哎呀~',
            text: '你还没登录呢，笨蛋~ 🥺',
            icon: 'warning',
            confirmButtonText: '马上去登录 💖',
            background: '#fff0f6', // 可爱粉色
            customClass: {
              popup: 'cute-popup'
            },
            preConfirm: () => {
              this.$router.push({ path: '/login' }) // 跳转到登录页面
            }
          })
          return
        }
        if (!this.content.trim()) {
          return Message.warning('没东西还发🤨')
        }
        if (this.isSubmitting) return
        this.isSubmitting = true

        const newMessage = {
          username: this.user.username,
          text: this.content,
          createdAt: this.moment
        }

        const response = await axios.post('https://67e68b326530dbd311106be9.mockapi.io/messages', newMessage)
        this.messages.unshift(response.data)

        this.content = ''
        setTimeout(() => {
          this.isSubmitting = false
        }, 1000)
      } catch (error) {
        console.error('提交留言失败', error)
        Message.error('提交失败，请重试')
      }
    },
    async fetchMessages () {
      try {
        const response = await axios.get('https://67e68b326530dbd311106be9.mockapi.io/messages?_sort=createdAt&_order=desc')
        this.messages = response.data
      } catch (error) {
        console.error('获取留言失败', error)
      }
    },
    showButton: _.debounce(function () {
      this.isShowButton = true
    }, 300)
  },
  async created () {
    await this.fetchMessages()
    this.user = JSON.parse(localStorage.getItem('userinfo'))
  },
  async mounted () {
    const response = await axios.get('https://67e68b326530dbd311106be9.mockapi.io/messages')
    this.messages = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },
  computed: {
    ...mapGetters('user', ['getUserInfo']),
    islogin () {
      console.log('Vuex 里的 getUserInfo:', this.getUserInfo)
      return !!(this.getUserInfo && this.getUserInfo.userId)
    }
  }
}
</script>

<style scoped>
/* 确保 remark 部分的样式不受全局布局影响 */
.remark {
  position: relative; /* 使其脱离常规流 */
  z-index: 10; /* 保证它在其他内容上方 */
  padding: 20px;
  width: 100%;
  max-width: 1000px; /* 限制最大宽度 */
  margin: 20px auto; /* 居中显示 */
  background: transparent;
  border-radius: 16px;
}
.remark .header {
  text-align: center;
}
.remark h1 {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  color: white;
  margin-bottom: 20px;
}

.remark .dreamBoard {
  width: 200px;
  height: 30px;
  border-radius: 15px;
  box-shadow: 10px white;
  background-color: transparent;
  color: white;
  /* border: 1px solid #f48fb1; */
  padding: 0 10px;
  font-size: 14px;
}

.dreamBoard::placeholder {
  text-indent: 10px;
  color: white;
  opacity: 0.8;
}

.pushRemark {
  width: 80px;
  height: 30px;
  color: white;
  border-radius: 15px;
  cursor: pointer;
  background-color: transparent;
  margin-left: 5px;
  border: 1px solid #f48fb1;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: transform 0.3s ease, background-color 0.3s ease;
  display: inline-block;
}

.pushRemark:hover {
  background-color: #f48fb1;
}

.pushRemark:active {
  transform: scale(0.95);
}

.messages-list {
  margin-top: 20px;
  padding: 20px;
  max-width: 1000px; /* 宽度最大为1000px */
  width: 100%;
  margin: 0 auto; /* 居中对齐 */
  background: linear-gradient(135deg, #f9e3ea, #fad0dc); /* 轻柔渐变色 */
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08); /* 轻微阴影 */
  border: 1px solid #f48fb1;
  overflow-y: auto; /* 防止内容溢出 */
  max-height: 400px; /* 限制最大高度，防止过长 */
}

.messages-item {
  font-size: 16px;
  color: #4a4a4a;
  background: #fff5f8; /* 消息背景色 */
  padding: 16px;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
}

.messages-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
}

.message-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  color: #ff4081; /* 粉色字体 */
}

.username {
  font-size: 18px;
  color: #333;
}

.timestamp {
  font-size: 12px;
  color: #999;
}

.message-text {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
}
</style>
