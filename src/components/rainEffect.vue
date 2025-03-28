<template>
  <div class="content">
    <div id="Rain"></div> <!-- 雨滴容器 -->
  </div>
</template>

<script>
export default {
  name: 'rainIndex',
  mounted () {
    this.initRainEffect()
  },
  methods: {
    initRainEffect () {
      const box = document.getElementById('Rain')
      let boxHeight = box.clientHeight
      let boxWidth = box.clientWidth
      window.onresize = function () {
        boxHeight = box.clientHeight
        boxWidth = box.clientWidth
      }

      setInterval(() => {
        const rain = document.createElement('div')
        rain.classList.add('rain')
        rain.style.top = '0px' // 初始化为 0px，确保是数字
        rain.style.left = Math.random() * boxWidth + 'px'
        rain.style.opacity = Math.random()
        box.appendChild(rain)

        const race = 10// 控制下落速度的值
        let currentTop = 0 // 跟踪雨滴的当前位置

        const timer = setInterval(() => {
        // 每次增加一定的像素值，让雨滴不断向下掉
          currentTop += race // 逐步增加

          if (currentTop > boxHeight) {
            clearInterval(timer) // 超过容器高度后，清除雨滴
            box.removeChild(rain)
          }

          rain.style.top = currentTop + 'px' // 更新位置
        }, 20)
      }, 100)
    }
  }
}
</script>

<style>
.content {
  position: relative;
  width: 100vw;
  height: 100vh;

  overflow: hidden;
}

#Rain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  /* z-index: 1; */
  overflow: hidden;
}

.rain {
  position: absolute;
  width: 2px;
  height: 50px;
  background: linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.6));
  opacity: 0.7;
}
</style>
