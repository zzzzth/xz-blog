<template>
  <div class="login-page">
    <p class="go-home" @click="goHome"><i class="el-icon-wind-power">去首页</i></p>
    <div class="box">
      <div class="pre-box">
        <h1>WELCOME TO AHAO BLOG!</h1>
        <p>JOIN US!</p>
        <div class="img-box">
          <img ref="image" src="@/assets/鸣人.webp" alt="">
        </div>
      </div>
      <div class="register-form">
        <div class="title-box">
          <h1>注册</h1>
        </div>
        <div class="input-box">
          <input v-model="username" type="text" placeholder="用户名" autocomplete="off" name="custom-username" id="custom-username">
          <input v-model="registerEmail" type="email" placeholder="邮箱" autocomplete="off" name="custom-email" id="custom-email">
          <input v-model="registerPassword" type="password" placeholder="密码" autocomplete="off" name="custom-password" id="custom-password">
          <input v-model="confirmPassword" type="password" placeholder="确认密码" autocomplete="off" name="custom-confirm-password" id="custom-confirm-password">

        </div>
        <div class="btn-box">
          <button @click="register" >注册</button>
          <p @click="toggle">已有用户？去登陆</p>
        </div>
      </div>
      <div class="login-form">
        <div class="title-box">
          <h1>登录</h1>
        </div>
        <div class="input-box">
          <input v-model="loginEmail" type="text" placeholder="邮箱" autocomplete="off">
          <input v-model="loginPassword" type="password" placeholder="密码" autocomplete="off">
        </div>
        <div class="btn-box">
          <button @click="login">登录</button>
          <p @click="toggle">没有用户？去注册</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { loginApi } from '@/api/login'
import { registerApi, validUsername, vaildEmail, validatePassword } from '@/api/register'
import { Message } from 'element-ui'
import { mapActions } from 'vuex'

export default {
  name: 'LoginIndex',
  data () {
    return {
      username: '',
      loginPassword: '',
      registerPassword: '',
      confirmPassword: '',
      flag: true,
      userId: '',
      loginEmail: '',
      registerEmail: ''
    }
  },

  methods: {
    ...mapActions('user', ['loginUser']),

    async login () {
      if (!this.loginEmail || !this.loginPassword) {
        return Message.warning('输入不能为空')
      }
      try {
        const response = await loginApi(this.loginEmail, this.loginPassword)
        // console.log(response)
        const { email, username, id, avatar } = response
        if (email === this.loginEmail && id) {
          this.userId = id
          const user = { userId: id, username, email, avatar }
          await this.loginUser(user)
          Message.success('登录成功,欢迎来到AHAO BLOG')
          // console.log('邮箱:', email, '密码:', password, '用户id:', id)
          this.$router.push('/')
        } else {
          Message.error('邮箱或密码错误')
        }
      } catch {
        Message.error('邮箱或密码错误')
      }
    },

    async register () {
      // 校验必填项
      if (!this.username || !this.registerPassword || !this.registerEmail || !this.confirmPassword) {
        console.log('输入不能为空')
        return Message.warning('所有字段必须填写')
      }

      // 校验密码一致性
      if (this.registerPassword !== this.confirmPassword) {
        return Message.error('两次密码不一致')
      }
      // 密码格式规范
      const passwordCheck = await validatePassword(this.registerPassword)
      if (passwordCheck !== true) {
        return Message.error(passwordCheck)
      }
      // 校验用户名唯一性
      const usernameCheck = await validUsername(this.username)
      if (usernameCheck !== true) {
        return Message.error(usernameCheck) // 提示用户名已存在
      }
      // 验证邮箱可用性
      const emailCheck = await vaildEmail(this.registerEmail)
      if (emailCheck !== true) {
        return Message.error(emailCheck)
      }

      try {
        // 调用注册 API，传递正确的字段名
        const response = await registerApi(this.username, this.registerPassword, this.registerEmail)
        console.log('注册成功，返回的数据:', response)

        // 如果返回的数据正确，进行后续处理
        const { username, password, email, id } = response
        if (username === this.username && password === this.registerPassword && email === this.registerEmail) {
          Message.success('注册成功')
          console.log('用户名:', username, '密码:', password, 'email:', email, 'id:', id)
          this.toggle() // 假设 toggle 是你用来切换界面的函数
        }
      } catch (error) {
        // 捕获并打印错误
        Message.error('注册失败')
        console.log('失败', error)
      }
    },

    toggle () {
      const img = this.$refs.image
      if (this.flag) {
        $('.pre-box').css('transform', 'translateX(100%)')
        $('.pre-box').css('background-color', '#c9e0ed')
        img.src = require('@/assets/佐助.webp')
      } else {
        $('.pre-box').css('transform', 'translateX(0%)')
        $('.pre-box').css('background-color', '#edd4dc')
        img.src = require('@/assets/鸣人.webp')
      }
      this.flag = !this.flag
    },
    goHome () {
      this.$router.push('/')
    }

  }
}

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
input {
  outline: none;
}
html,
body {
  width: 100%;
  height: 100%;
}

.login-page {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right,rgb(247,209,215),rgb(191,227,241));
}
.box {
  display: flex;
  position: relative;
  width: 1050px;
  height: 600px;
  margin:auto;
  /* background-color: #fff; */
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0);
  box-shadow: 5px 4px 3px rgba(0,0,0,.1);

}
.pre-box {
  width: calc(1050px / 2);
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
  border-radius: 4px;
  box-shadow: 5px 4px 3px rgba(0,0,0,.1);
  background-color: rgb(247,209,215);
  transition: 1.2s;
}
.pre-box h1 {
  margin-top: 150px;
  font-size: 30px;
  text-align: center;
  text-shadow: 5px 4px 3px rgba(0,0,0,.1);
  letter-spacing: 2px;
}
.pre-box p {
  text-align: center;
  text-shadow: 5px 4px 3px rgba(0,0,0,.1);
  font-size: 20px;
  font-weight: bold;

}

.img-box  {
  width: 200px;
  height: 200px;
  border-radius:50% ;
  overflow: hidden;
  margin: 20px auto;
}
.img-box img {
  width: 100%;

}
.register-form,
.login-form {
  flex:1;
  height: 100%;
}
.title-box {
  height: 300px;
  line-height: 500px;
}
.title-box h1 {
  text-align: center;
  letter-spacing: 5px;
  text-shadow: 5px 4px 3px rgba(0,0,0,.1);
}
.input-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
input {
  border: 1px solid gray;
  border-radius: 4px;
  width: 60%;
  height: 40px;
  margin-bottom: 10px;
  text-indent: 5px;
}
input:focus {
  border: 2px solid #3498db; /* 当输入框获得焦点时，边框颜色变为蓝色 */
  background-color: #f0f8ff; /* 输入框的背景颜色变为淡蓝色 */
  outline: none; /* 去掉浏览器默认的焦点外边框 */
}
input:focus::placeholder {
  opacity: 0;
}
.btn-box {
  display: flex;
  justify-content: center;
}

button {
  border: none;
  border-radius: 4px;
  width: 100px;
  height: 30px;
  color:white;
  line-height: 30px;
  background-color: #3498db;
  border: 1px solid rgb(10, 152, 217);
  margin-right: 5px;
}
button:hover {
  cursor: pointer;
  opacity: 0.8;

}
.btn-box p {
  height: 30px;
  line-height: 30px;
}
.btn-box p:hover {
  cursor: pointer;
  color: white;
}
.go-home {
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
  color: #fff; /* 白色字体 */
  font-size: 16px;
  font-weight: bold;
  width: 120px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: linear-gradient(45deg, #3498db, #8e44ad); /* 渐变背景 */
  border-radius: 25px;
  transition: all 0.3s ease-in-out; /* 平滑过渡效果 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.go-home i {
  margin-right: 8px; /* 图标和文字间的间距 */
  font-size: 20px; /* 图标大小 */
}

.go-home:hover {
  background: linear-gradient(45deg, #2980b9, #9b59b6); /* 悬停时渐变颜色改变 */
  transform: translateY(-3px); /* 悬停时轻微上升 */
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

</style>
