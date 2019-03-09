<template>
  <div class="lesson">
    <Bar/>
    <div class="app-container shadow">
      <div class="hint">选择章节</div>
      <mu-divider></mu-divider>
      <SelectList/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Bar from "@/components/Bar.vue";
import SelectList from "@/components/SelectList.vue";

export default {
  name: "lesson",
  components: {
    Bar,
    SelectList
  }
};
</script>

<style scoped>
.hint {
  color: purple;
  font-size: 1.5rem;
  padding: 1rem 1rem 0.25rem 1rem;
  text-align: left;
}
</style>
