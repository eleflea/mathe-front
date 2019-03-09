<template>
  <div class="about">
    <Bar/>
    <div class="app-container shadow">
      <div class="about-container">
        <h2>关于 扶朕起来朕还能学</h2>
        <mu-divider></mu-divider>
        <p>
          扶朕起来朕还能学是一个浏览数学试题的网站。
          这里提供东北大学数学机试题库，包括高等数学、概率论与数理统计、线性代数以及复变函数。
          题目通过半自动更新以保持与官方一致。
        </p>
        <p>本网站采用前后端分离的建构。前端使用 Vue 实现，后端使用 Gin，由 Golang 编写。</p>
        <p>
          本项目由
          <a href="https://github.com/eleflea">eleflea</a> 开发，使用的开源项目有：
        </p>
        <ul>
          <li>
            <a href="https://cn.vuejs.org/index.html">Vue.js</a> - 前端框架
          </li>
          <li>
            <a href="https://github.com/gin-gonic/gin">Gin</a> - 后端框架
          </li>
          <li>
            <a href="https://muse-ui.org/">Muse-UI</a> - 前端组件库
          </li>
          <li>
            <a href="http://idangero.us/swiper/">Swiper</a> - 实现图片滑动
          </li>
        </ul>
        <p>
          背景图片：
          <a href="https://www.pixiv.net/member_illust.php?mode=medium&illust_id=66394619">
            <i>Twinkle Bell</i>
          </a>，作者
          <a href="https://www.pixiv.net/member.php?id=15956">@千歳坂すず</a>。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Bar from "@/components/Bar.vue";

export default {
  name: "About",
  components: {
    Bar
  }
};
</script>

<style scoped>
.about-container {
  padding: 0 3rem 1rem 3rem;
  text-align: left;
  font-size: 1.2rem;
}
@media only screen and (max-width: 600px) {
  .about-container {
    padding: 0 0.5rem 0.5rem 0.5rem;
  }
}
</style>
