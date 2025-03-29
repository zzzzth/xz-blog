<template>
  <div class="theme fixed top-4 right-4 z-50">
    <button @click="toggleTheme" class="p-2 bg-gray-200 dark:bg-gray-800 rounded">
      {{ isDark ? '🌙 深色模式' : '☀️ 亮色模式' }}
    </button>
  </div>
</template>

<script>

export default {
  name: 'ThemeIndex',
  data () {
    return {
      isDark: localStorage.getItem('theme') === 'dark'
    }
  },
  mounted () {
    console.log('当前主题:', this.isDark ? '深色' : '亮色')
    this.applyTheme()
  },
  methods: {
    toggleTheme () {
      this.isDark = !this.isDark
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
      this.applyTheme()
    },
    applyTheme () {
      if (this.isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }
}
</script>

<style>
/* 默认模式 */
body {
  background-color: #ffffff;
  color: #333;
}

/* 深色模式 */
.dark body {
  background-color: #1e1e1e;
  color: #fff;
}
</style>
