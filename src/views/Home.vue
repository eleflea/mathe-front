<template>
  <div class="home">
    <Bar/>
    <div class="app-container shadow">
      <div class="home-container">
        <h1>扶朕起来朕还能学</h1>
        <mu-divider></mu-divider>
        <p>
          欢迎使用！这里提供东北大学数学机试的题库。最后更新于
          <span
            style="color: darkorange"
          >{{ new Date(update).toLocaleString() }}</span>。
          <br>如有任何BUG或建议，请反馈给我的邮箱：
          <a href="mailto:dmzitnzc@gmail.com">dmzitnzc@gmail.com</a>。
          <br>友情链接：
          <a href="https://neu.haizs.net/mathe/">NEU-Mathe</a>。
        </p>
        <mu-divider></mu-divider>
        <p style="margin-bottom: 0.5rem">使用说明：</p>
        <ul style="margin-top: 0.5rem">
          <li>点击左上角的
            <mu-icon value="menu"></mu-icon>选择题库
          </li>
          <li>可以通过左右拖拽查看过长的图片</li>
          <li>直接点击选项图片可以得知其是否正确</li>
          <li>点击题目下方的破碎处展开解析</li>
        </ul>
        <p>
          推荐使用
          <a href="https://www.google.com/chrome/">Chrome</a>访问本站。
        </p>
        <mu-divider></mu-divider>
        <p>祝大家学有所成，来点个赞吧~
          <br>
        </p>
        <mu-flex justify-content="center">
          <mu-badge class="star" :content="`${star}`" color="secondary">
            <mu-tooltip content="star!!" placement="top">
              <mu-button icon @click="postStar">
                <mu-icon value="star"></mu-icon>
              </mu-button>
            </mu-tooltip>
          </mu-badge>
        </mu-flex>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Bar from "@/components/Bar.vue";
import store from "@/store.js";
import axios from "axios";

export default {
  name: "home",
  components: {
    Bar
  },
  data() {
    return {
      update: 0,
      star: 0
    };
  },
  methods: {
    postStar() {
      axios({
        method: "post",
        url: "https://api.neumathe.xyz/api/star",
        data: "_=" + Date.now()
      })
        .then(resp => {
          const d = resp.data;
          if (d.code === 0) {
            this.star = d.data;
          } else {
            throw new Error(d.msg);
          }
        })
        // eslint-disable-next-line
        .catch(e => console.warn("post star:", e));
    }
  },
  created() {
    store.data.update.then(t => (this.update = t));
    axios
      .get("https://api.neumathe.xyz/api/star")
      .then(resp => {
        const d = resp.data;
        if (d.code === 0) {
          this.star = d.data;
        } else {
          throw new Error(d.msg);
        }
      })
      // eslint-disable-next-line
      .catch(e => console.warn("get star:", e));
  }
};
</script>

<style scoped>
.home-container {
  padding: 0 3rem 1rem 3rem;
  text-align: left;
  font-size: 1.2rem;
}
@media only screen and (max-width: 600px) {
  .home-container {
    padding: 0 0.5rem 0.5rem 0.5rem;
  }
}
</style>
