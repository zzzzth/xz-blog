<template>
  <div class="maincage">
    <!-- 猫爪提示 -->
    <div v-show="showScrollHint" class="scroll-hint">
      <div class="hint-text">下滑探索更多~</div>
      <div class="paws-container">
        <div class="paw">🐾</div>
        <div class="paw delayed">🐾</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showScrollHint: true // 初始时显示提示
    }
  },
  mounted () {
    // 监听页面滚动
    window.addEventListener('scroll', this.handleScrollHint)
  },
  beforeDestroy () {
    // 清理事件监听器
    window.removeEventListener('scroll', this.handleScrollHint)
  },
  methods: {
    handleScrollHint () {
      // 超过100px滚动时，隐藏提示
      this.showScrollHint = window.scrollY < 100
    }
  }
}
</script>

<style scoped>
/* 猫爪提示样式 */
.scroll-hint {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 999;
  opacity: 0.9;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
}

.hint-text {
  font-family: 'Comic Sans MS', cursive;
  color: #deb6ff;
  font-size: 1.3em;
  margin-bottom: 8px;
  text-shadow: 1px 1px 2px rgba(255,126,185,0.3);
}

.paws-container {
  position: relative;
  height: 50px;
}

.paw {
  font-size: 2em;
  position: absolute;
  left: 50%;
  animation: pawBounce 1.5s infinite;
  opacity: 0;
  transform: translate(-50%, 0);
}

.paw.delayed {
  animation-delay: 0.3s;
}

@keyframes pawBounce {
  0% {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
  30% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  70% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -20px);
  }
}

/* 添加爪印轨迹效果 */
.paws-container::before {
  content: "";
  position: absolute;
  bottom: -15px;
  left: 50%;
  width: 4px;
  height: 30px;
  background: linear-gradient(
    to bottom,
    rgba(255,126,185,0.3) 0%,
    rgba(255,126,185,0) 100%
  );
  transform: translateX(-50%);
}

/* 手机端适配 */
@media (max-width: 768px) {
  .hint-text {
    font-size: 1.1em;
  }

  .paw {
    font-size: 1.5em;
  }
}
</style>
