<template>
  <div class="article-page">
    <!-- 文章列表 -->
    <div v-if="!selectedArticle">
      <h1 class="article-title">📚 文章列表</h1>
      <div class="articles-container">
        <div v-for="article in articleList" :key="article.id" class="article-card" @click="selectArticle(article)">
          <div class="article-cover-wrapper">
            <img v-if="article.image" :src="article.image" alt="封面" class="article-cover">
          </div>
          <div class="article-info">
            <h2>{{ article.title }}</h2>
            <p>{{ article.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 文章详情 -->
    <div v-else class="article-content fade-in">
      <!-- 文章元数据 -->
      <div class="article-meta">
        <span class="data">发布时间: {{ selectedArticle.data }}</span>
        <span class="tags">
          <span v-for="tag in selectedArticle.tags" :key="tag" class="tag">{{ tag }}</span>
        </span>
      </div>
      <!-- 分割线 -->
      <el-divider><i class="el-icon-ship"></i></el-divider>
      <!-- 返回按钮 -->
      <button @click="selectedArticle = null" class="back-button">
        <i class="el-icon-back"></i> 返回列表
      </button>
      <!-- 文章标题 -->
      <h1>{{ selectedArticle.title }}</h1>
      <!-- 文章封面 -->
      <img  :src="selectedArticle.image" alt="文章封面">
      <!-- 文章内容 -->
      <div class="article-body">
        <p v-html="selectedArticle.content"></p>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'articleIndex',

  data () {
    return {
      selectedArticle: null,
      value: null,
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'], // 等同于 { 2: 'icon-rate-face-1', 4: { value: 'icon-rate-face-2', excluded: true }, 5: 'icon-rate-face-3' }
      articleList: [
        {
          id: 1,
          title: '"羁绊"',
          description: '探索火影忍者中友情的深刻意义。',
          data: '2025.1.30',
          tags: ['动漫', '友情', '成长'],
          content: `
              <h3>友情的力量</h3>
              <p>《火影忍者》是一部充满友情、奋斗与梦想的作品。在忍者世界中，羁绊被赋予了特殊的意义。</p>
              <p>从鸣人和佐助的对立与成长，到卡卡西与带土的遗憾，每一段关系都展现了深刻的羁绊。</p>
              <h3>精神的传承</h3>
              <p>这不仅仅是一场关于忍术的较量，更是一种精神的传承。正是这些羁绊，让故事变得更加真实和感人。</p>
              <p>例如，鸣人对佐助的执着追求，不仅是为了友情，更是为了证明自己的信念。</p>
              <h3>总结</h3>
              <p>通过这些故事，我们可以看到友情的力量，以及它如何影响角色的成长和命运。</p>
              `,
          image: require('@/assets/articleimages/naruto.jpg')
        },
        {
          id: 2,
          title: '王者荣耀(Dami定制版)！',
          description: '如何从一个小白变成超级小白',
          data: '2025.1.30',
          tags: ['思路', '手把手', '操作'],
          content: `
              <p>一个文章写不完全部,浓缩的才是精华。</p>
              <a href="/wzry.docx" download class="download-link">点我去探索</a>
              `,
          image: require('@/assets/articleimages/Dami.webp')
        },
        {
          id: 3,
          title: '学习VUE2心得',
          description: '全是弯路',
          data: '2025.3.2',
          tags: ['努力', '进步', '拼搏'],
          content: '很多时候都会问问自己 有没有学会 会不会用 怎么样才算是掌握 一定要多去实践',
          image: require('@/assets/articleimages/vueImage.webp')
        }
      ]
    }
  },
  methods: {
    selectArticle (article) {
      this.selectedArticle = article
    }
  }
}
</script>

<style scoped>
.article-page {
  position: relative;
  top: 0;
  width: 80vw;
  max-width: 900px;
  min-height: 80vh;
  background: rgba(251, 253, 253, 0.9);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin: 20px auto;
  font-family: 'Arial', sans-serif;
}
.article-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}
.article-page h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 15px;
}
.articles-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}
.article-card {
  background: linear-gradient(135deg, #ff9a9e, #fad0c4);
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.article-cover-wrapper {
  width: 100%;
  height: 180px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.article-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}
.article-card:hover .article-cover {
  transform: scale(1.1);
}
.article-info {
  padding: 15px;
  flex-grow: 1;
}
.article-card h2 {
  font-size: 1.4rem;
  color: #fff;
  margin-bottom: 10px;
}
.article-card:hover h2 {
  color: #007bff;
}
.article-card p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}
.article-content {
  max-width: 800px;
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  line-height: 1.8;
  margin: 40px auto;
  font-family: 'Georgia', serif;
}
.fade-in{
  animation: fadeIn 0.6s ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform:translateY(20px);
  }
  to {
    opacity: 1;
    transform:translateY(0px);
  }

}
.article-content h1 {
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
}
.article-content p {
  text-indent: 2em;
  margin-bottom: 20px;
  font-size: 18px;
  color: #444;
  line-height: 1.8;
}
.article-content img {
  display: block;
  max-width: 100%;
  margin: 30px auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}
.article-content img:hover {
  transform: scale(1.05);
}
.article-content button {
  display: block;
  width: 140px;
  padding: 12px;
  margin: 30px auto 0;
  font-size: 16px;
  color: white;
  background: #ff6600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease-in-out, transform 0.3s ease;
}
.article-content button:hover {
  transform: scale(1.1);
  background: #e65c00;
}
.article-content button:active {
  transform: scale(0.9);
}
.article-content .article-meta {
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  color: #777;
  margin-bottom: 20px;
}
.article-meta .data {
  display: flex;
  gap: 8px;
}
.article-meta .tag {
  background: #ff9800;
  color: white;
  padding: 3px 8px;
  border-radius: 5px;
  font-size: 15px;
  margin-left: 2px;
}
.el-rate {
  font-size: 10px;
  margin-top: 10px;
}
.rating-container {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

.article-body ::v-deep .download-link {
  display: block;
  width: fit-content;
  padding: 10px 20px;
  margin: 20px auto;
  font-size: 16px;
  color: white;
  background-color: #409EFF;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-indent: 0;
}

.article-body ::v-deep .download-link:hover {
  background-color: #66b1ff;
  transform: scale(1.05);
}

.article-body ::v-deep .download-link:active {
  transform: scale(0.95);
}
</style>
