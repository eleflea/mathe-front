<template>
  <div class="drag-img" @click="setColor" :style="{cursor: pointer ? 'pointer' : 'unset'}">
    <div class="swiper-container" :style="{zoom: imgScale}">
      <div class="swiper-wrapper" :class="color">
        <img :src="src" @load="draggable" class="swiper-slide">
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name: "DraggableImg",
  props: ["src", "isAnswer", "pointer", "imgScale", "green"],
  data() {
    return {
      status: -1
    };
  },
  computed: {
    color: function() {
      return {
        "green-active": this.status === 1,
        "red-active": this.status === 0,
        green: this.green
      };
    }
  },
  methods: {
    draggable(e) {
      // init swiper
      const ele = e.target.parentNode.parentNode;
      // initing swiper only when it is visible
      // ref: https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
      if (e.target.offsetParent !== null) {
        new Swiper(ele, {
          slidesPerView: "auto",
          freeMode: true
        });
      }
    },
    setColor() {
      if (this.isAnswer === -1) {
        return;
      }
      this.status = this.isAnswer;
      setTimeout(() => (this.status = -1), 500);
    }
  }
};
</script>

<style scoped>
@keyframes jump-green {
  0% {
    background: lightgreen;
  }
  100% {
    background: unset;
  }
}

@keyframes jump-red {
  0% {
    background: lightcoral;
  }
  100% {
    background: unset;
  }
}

.green-active {
  animation: jump-green 0.5s;
}

.red-active {
  animation: jump-red 0.5s;
}

.green {
  background: lightgreen;
}

.swiper-wrapper {
  min-height: 56px;
}

@supports (align-items: center) {
  .swiper-wrapper {
    display: flex;
    align-items: center;
  }
}

img {
  width: initial;
  height: initial;
  mix-blend-mode: multiply;
  margin: 0 auto;
}

.swiper-container {
  overflow: hidden;
}
</style>
