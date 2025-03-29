<template>
    <div class="self">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <img v-if="userinfo.userId" :src="userinfo.avatar || require('@/assets/带土.jpg')" alt="User Avatar" class="avatar">
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>{{ userinfo.username }}</el-dropdown-item>
              <el-dropdown-item v-if="userinfo.userId">
                <router-link to="/profile" class="custom-router-link">
                  <el-button>个人资料</el-button>
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item v-if="userinfo.userId">
                <el-popconfirm title="确定退出登录吗?" @confirm="logout" placement="top">
                  <template #reference>
                    <el-button>退出登录</el-button>
                  </template>
                </el-popconfirm>
              </el-dropdown-item>
              <el-dropdown-item v-else>
                <router-link to="/login">登录</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <router-link v-if="!userinfo.userId" to="/login" class="login-link">登录</router-link>
        </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'avaterIndex',
  methods: {
    ...mapActions('user', ['logoutUser']),
    logout () {
      this.logoutUser()
    }
  },
  computed: {
    ...mapState('user', ['userinfo'])
  }
}
</script>

<style>
:root {
  --avatar-size: 40px;
  --button-bg-color: #409EFF;
  --button-hover-bg-color: #66b1ff;
  --login-link-bg-color: rgb(24, 127, 244);
  --login-link-hover-bg-color: rgb(13, 31, 228);
}

.self {
  display: flex;
  align-items: center;
  gap: 15px;
}

.avatar {
  width: var(--avatar-size);
  height: var(--avatar-size);
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.avatar:hover {
  transform: scale(1.1);
}
.el-dropdown {
  position: relative;
  display: inline-block;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.el-dropdown-menu {
  width: 180px;
  padding: 0;
  margin-top: 8px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.el-dropdown-item {
  padding: 10px;
  font-size: 14px;
  color: #333;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
}
.el-dropdown-item:hover {
  background-color: #f5f5f5;
}
.el-button {
  padding: 5px 12px;
  font-size: 14px;
  border-radius: 5px;
  background-color: #409EFF;
  color: white;
  transition: background-color 0.2s ease;
}
.el-button:hover {
  background-color: #66b1ff;
}
.custom-router-link {
  text-decoration: none;
}
.login-link {
  padding: 10px 15px;
  background: rgb(24, 127, 244);
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;
  transition: background 0.3s ease;
}

.login-link:hover {
  background: rgb(13, 31, 228);
}
</style>
