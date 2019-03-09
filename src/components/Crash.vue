<template>
  <div class="crash-container">
    <div class="crash" :style="{'clip-path': shape}"></div>
  </div>
</template>

<script>
export default {
  name: "Crash",
  data() {
    return {
      shape:
        "polygon(0 0, 100% 0, 100% 96%, 77% 4%, 70% 100%, 45% 10%, 20% 97%, 0 8%)"
    };
  },
  mounted() {
    const randomBetween = (min, max) => Math.random() * (max - min) + min;
    const wid = this.$el.clientWidth;
    const vertexNumber = Math.round(wid / 60);
    let buf = ["100% 0", "0 0"];
    for (let i = 0; i < vertexNumber + 1; i++) {
      const xmin = (i / vertexNumber) * 100;
      const xmax = ((i + 1) / vertexNumber) * 100;
      if (i % 2 === 0) {
        buf.push(`${randomBetween(xmin, xmax)}% ${randomBetween(90, 100)}%`);
      } else {
        buf.push(`${randomBetween(xmin, xmax)}% ${randomBetween(30, 40)}%`);
      }
    }
    this.shape = `polygon(${buf.join(",")})`;
  }
};
</script>

<style scoped>
.crash-container {
  width: 100%;
  filter: drop-shadow(0px 2px 1px rgba(0, 0, 0, 0.1));
}

.crash {
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  background: white;
  width: 100%;
  height: 2rem;
  cursor: pointer;
}
</style>
