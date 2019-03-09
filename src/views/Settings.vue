<template>
  <div class="settings">
    <Bar/>
    <div class="app-container shadow">
      <div class="settings-container">
        <mu-form :model="options" label-position="left">
          <mu-form-item prop="switch" label="默认显示答案">
            <mu-switch v-model="options.showAnswer"></mu-switch>
          </mu-form-item>
          <mu-form-item prop="switch" label="默认标记答案">
            <mu-switch v-model="options.markAnswer"></mu-switch>
          </mu-form-item>
          <mu-form-item prop="slider" :label="`图片大小缩放：${options.imgScale}x`">
            <mu-slider v-model="options.imgScale" :min="0.5" :max="2"></mu-slider>
          </mu-form-item>
        </mu-form>
        <mu-divider></mu-divider>
        <mu-button class="bt" flat color="secondary" @click="reinit">重置所有设置</mu-button>
      </div>
    </div>
  </div>
</template>

<script>
import Bar from "@/components/Bar.vue";

const default_options = {
  showAnswer: false,
  markAnswer: false,
  imgScale: 1
};

export default {
  name: "Settings",
  components: {
    Bar
  },
  data() {
    return {
      options: default_options
    };
  },
  watch: {
    options: {
      handler(to) {
        this.$cookie.set("options", JSON.stringify(to), 180);
      },
      deep: true
    }
  },
  methods: {
    reinit() {
      this.options = default_options;
    },
    initOptions() {
      const c = this.$cookie;
      if (c.get("options") === null) {
        c.set("options", JSON.stringify(default_options), 180);
      }
      return JSON.parse(c.get("options"));
    }
  },
  created() {
    this.options = this.initOptions();
  }
};
</script>

<style scoped>
.settings-container {
  padding: 1rem 3rem;
  text-align: left;
}
@media only screen and (max-width: 600px) {
  .settings-container {
    padding: 1rem;
  }
}

.bt {
  margin-top: 1rem;
}
</style>
