<template>
  <div class="maincage" :style="{backgroundImage : `url(${currentWallpaper})`}">
    <rainEffect></rainEffect>
    <!-- 头部导航 -->
    <header>
      <div :class="['head', { 'scrolled': isScrolled }]">
        <Video></Video>
        <Navbar></Navbar>
        <Avater></Avater>
      </div>
    </header>
    <!-- 诗词部分 (仅首页显示) -->
    <PoetryDisplay v-if="ifHomePage" :poetry="poetry" />

    <!-- 页面内容区 -->
    <main class="content-container">
      <DownTips v-show="!isHomepage" ></DownTips>
      <router-view :key="$route.fullPath"></router-view>
    </main>

    <footer  class="footer">
      <el-container>
        <el-footer>
          <p class="poem">赌书消得泼茶香，当时只道是寻常.</p>
          <p>© 2025 AHAO BLOG | All Rights Reserved.</p>
          <p>Designed with ❤️ by 邹同学</p>
        </el-footer>
      </el-container>

    </footer>
  </div>
</template>

<script>

import rainEffect from '@/components/rainEffect.vue'
import Navbar from '@/components/Navbar.vue'
import DownTips from '@/components/DownTips.vue'
import { getTalk } from '@/api/getTalk'
import Avater from '@/components/Avater.vue'
import Video from '@/components/Video.vue'
import PoetryDisplay from '@/components/PoetryDisplay.vue'
export default {
  name: 'LayoutIndex',
  components: {
    rainEffect,
    Navbar,
    DownTips,
    Avater,
    Video,
    PoetryDisplay
  },
  data () {
    return {
      isVideoPlaying: false,
      isScrolled: false,
      poetry: '加载中......',
      currentWallpaper: '',
      wallpapers: [
        require('@/assets/wallpaper/4kwallpaper-1.webp'),
        require('@/assets/wallpaper/4kwallpaper-2.webp'),
        require('@/assets/wallpaper/4kwallpaper-3.webp'),
        require('@/assets/wallpaper/4kwallpaper-4.webp'),
        require('@/assets/wallpaper/4kwallpaper-6.webp'),
        require('@/assets/wallpaper/4kwallpaper-7.webp'),
        require('@/assets/wallpaper/4kwallpaper-8.webp'),
        require('@/assets/wallpaper/4kwallpaper-9.webp')

      ]
    }
  },
  computed: {

    ifHomePage () {
      return this.$route.path === '/'
    },
    isHomepage () {
      return this.$route.path === '/'
    }

  },
  mounted () {
    this.currentWallpaper = this.getRandomImage()
    this.preloadImages()
    window.addEventListener('scroll', this.handleScroll)
    getTalk(poetry => {
      this.poetry = poetry
    })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      this.isScrolled = window.scrollY > 100
    },

    getRandomImage () {
      const lastIndex = localStorage.getItem('wallpaperIndex')
      let randomIndex
      do {
        randomIndex = Math.floor(Math.random() * this.wallpapers.length)
      } while (lastIndex === randomIndex)
      localStorage.setItem('wallpaperIndex', randomIndex)
      return this.wallpapers[randomIndex]
    },
    preloadImages () {
      this.wallpapers.forEach(url => {
        const img = new Image()
        img.src = url
        img.onload = () => {
          console.log(`${url}预加载完成`)
        }
      })
    }

  }
}
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.maincage {
  position: relative;
  background:  no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

}

.head {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.content-container {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 让内容左对齐 */
  padding-bottom: 50px;
  padding-top: 100px; /* 增加顶部间距避免被固定头部遮挡 */
  overflow-y: auto;
}

.head.scrolled {
  background-color: #75608fab;
  opacity: 0.9;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* 诗词固定在首页中间 */
.poetry-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 600px;
  padding: 20px;
  border-radius: 12px;
  background: linear-gradient(135deg, #55c4decc, #acc3f9);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  font-family: "KaiTi", "STKaiti", serif;
  color: #4a4a4a;
  opacity: 0.9;
  z-index: 5;
  transition: opacity 0.5s ease;
}

/* 让首页内容隐藏，而其它页面正常显示 */
.home-page {
  display: none;
}
.footer {
  width: 100%; /* 让 footer 占满屏幕 */
  min-height: 150px; /* 设置一个合适的高度 */
  text-align: center;
  padding: 20px 10px;
  font-size: 14px;
  border-radius:40px 40px 0px;
  /* 背景图片相关 */
  background-image: url("~@/assets/wallpaper/4kwallpaper-11.png");
  background-size: cover;
  background-position:50% 23%;;
  background-repeat: no-repeat;

  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}
.footer p {
  margin: 5px 0; /* 避免文字间距过大 */
  font-size: 20px;
  opacity: 0.8; /* 让文字稍微透明，提升质感 */
  font-family: 'Comic Sans MS', cursive;
}
/* 让 el-container 也占满 */
.el-container {
  width: 100%;
}

/* 文字样式优化 */
.footer p {
  margin: 5px 0;
}
.footer .poem {
  color: yellow;
}
</style>
