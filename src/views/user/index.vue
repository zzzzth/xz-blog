<template>
  <div class="user-container">
    <div class="aboutMe">
      <div class="avatar-container">
        <img src="@/assets/带土.jpg"  class="avatar" />
    </div>
    <div class="tags">
      <span class="tag">二次元爱好者</span>
      <span class="tag">摆烂小子</span>
      <span class="tag">infp</span>
      <span class="tag">王者荣耀</span>
    </div>
  </div>
  <div class="card-wrapper">
    <div class="card-container">
        <el-card class="box-card left-card">
          <p>很高兴你能看到我的博客</p>
          <h1>我是小邹同学</h1>
          <p>待补充</p>
          <Icon icon="mdi:heart" ></Icon>
        </el-card>
        <el-card class="box-card right-card">
          <h1 style="color: #fff;">关于本站</h1>
          <p>本站正在建设中</p>
        </el-card>
    </div>

  </div>

</div>

</template>

<script>
import { Icon } from '@iconify/vue'
export default {
  name: 'UserIndex',
  components: {
    Icon
  }
}
</script>

<style scoped>
.user-container {
  width: 1200px;
  height: 100%;
  background-color: #f0f2f5e3;
  margin: 0 auto;
}
.aboutMe {
  position: relative;
  margin: 20px auto;
  max-width: 800px;
  padding: 30px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  font-family: 'Arial', sans-serif;
}

.avatar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.avatar:hover {
  transform: rotate(180deg);
}
.tags {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.tag {

  color: #fff;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 20px;
  font-size: 0.9em;
  transition: background-color 0.3s ease;
}
.tag:nth-child(1) {
  background-color: #ff8a80;
}
.tag:nth-child(2) {
  background-color: #94a084;
}
.tag:nth-child(3) {
  background-color: #12e72b;
}
.tag:nth-child(4) {
  background-color: #a30be4;
}

@media (max-width: 600px) {
  .aboutMe {
    padding: 20px;
  }

  .avatar {
    width: 100px;
    height: 100px;
  }

  .tag {
    font-size: 0.8em;
  }
}

.card-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;

}
.card-wrapper {
  padding: 0 40px;
}
.box-card {
  width: calc(50% - 10px); /* 每个卡片宽度为50%减去一半的gap */
  height: 200px;

  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.left-card {
  background-color: rgba(72, 143, 255);
}
.right-card {
  background-color: #0cfab3e3;
}
.right-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}
</style>
