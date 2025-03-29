<template>
    <header>
        <div class="logo" @click="playVideo">
          <img src="@/assets/佐助.webp" alt="">
          AHAO BLOG
    </div>
    <!-- 全屏视频 -->
    <div v-if="isVideoPlaying" class="video-container">
        <video ref="video" autoplay>
          <source src="@/assets/佐助.mp4" type="video/mp4">
          您的浏览器不支持视频播放。
        </video>
        <button @click="isVideoPlaying = false" class="close-btn">关闭</button>
      </div>
    </header>

</template>

<script>
export default {
  name: 'videoIndex',
  data () {
    return {
      isVideoPlaying: false

    }
  },
  mounted () {
    console.log('Video component mounted')
  },
  methods: {
    playVideo () {
      this.isVideoPlaying = true
      const video = this.$refs.video
      if (video) {
        if (video.requestFullscreen) {
          video.requestFullscreen()
        } else if (video.mozRequestFullScreen) {
          video.mozRequestFullScreen()
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen()
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen()
        }
      }
    }
  }
}
</script>

<style scoped>
.video-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: 0.8;
}

.video-container video {
  max-width: 90%;
  max-height: 90%;

}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.7);
  color: black;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.8);
}
.logo {
  font-size: 28px;
  font-family: 'Comic Sans MS', cursive;
  color: rgb(253, 13, 81);
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logo img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
}

.logo:hover {
  color: rgb(13, 31, 228);
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  background: rgb(14, 195, 236);
  border-radius: 10px;
}

</style>
