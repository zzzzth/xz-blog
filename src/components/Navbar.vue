<template>
    <div class="nav-bar">
        <nav>
        <ul>
          <li><router-link to="/">🏡 <span class="menu-text">首页</span></router-link></li>
          <li><router-link to="/article">📚 <span class="menu-text">文章</span></router-link></li>
          <li><router-link to="/remark">💌 <span class="menu-text">留言板</span></router-link></li>
          <li><router-link to="/user">🎤 <span class="menu-text">关于主播</span></router-link></li>
        </ul>
    </nav>
    </div>
</template>
<script>
export default {
  name: 'NavbarIndex'

}
</script>

<style scoped>
.nav-bar {

  padding: 10px;
  display: flex;
  justify-content: center;

}

.nav-bar ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.nav-bar li {
  margin: 0 50px; /* 综合后取中间值，保证美观 */
}

.nav-bar a {
  text-decoration: none;
  padding: 10px 15px;
  color: rgb(24, 127, 244);
  border-radius: 5px; /* 让选中的链接有圆角 */
  transition: all 0.3s ease-in-out; /* 平滑过渡 */
}

/* 优化菜单文本和 emoji */
.menu-text {
  margin-left: 8px; /* 给文字和emoji之间加点空间 */
  font-weight: bold;
  color: #555; /* 使文字稍微暗一些 */
  font-size: 1.2em;
}

/* 当鼠标悬停时，菜单项颜色和动画效果 */
li:hover {
  background-color: #f0f0f0;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  transform: scale(1.1);
}

/* 提高整体清晰度和对比度 */
a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  color: #ff6f61; /* 鼠标悬停时的颜色 */
}
</style>
