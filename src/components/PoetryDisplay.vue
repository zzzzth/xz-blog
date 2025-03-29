<template>
  <div class="poetry-container">
    <p>📜 每日诗词</p>
    <p>{{ poetry }}</p>
  </div>
</template>

<script>
export default {
  name: 'PoetryDisplay',
  props: {
    poetry: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
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
</style>
