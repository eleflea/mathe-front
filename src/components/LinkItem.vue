<template>
  <div class="link-item">
    <mu-list-item button :to="to" :value="value">
      <mu-list-item-action v-if="!!icon === true">
        <mu-icon :value="icon"></mu-icon>
      </mu-list-item-action>
      <mu-list-item-title>{{ title }}</mu-list-item-title>
    </mu-list-item>
  </div>
</template>

<script>
export default {
  name: "LinkItem",
  props: ["to", "icon", "title", "value"]
};
</script>

<style scoped>
</style>
