<template>
  <div id="bar" v-show="showBar">
    <mu-appbar color="purple" z-depth="1">
      <mu-button icon slot="left" @click="open = !open">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      <mu-button icon slot="left" @click="$router.go(-1)">
        <mu-icon value="undo"></mu-icon>
      </mu-button>
      {{ title }}
    </mu-appbar>
    <mu-drawer :open.sync="open" :docked="false">
      <mu-list toggle-nested :value="activeItem">
        <slot>
          <LinkItem to="/" icon="home" title="主页" value="/"/>
          <mu-divider></mu-divider>
          <LinkItem
            v-for="lesson in trees"
            :to="'/lesson/' + lesson.name"
            :key="lesson.name"
            icon="book"
            :title="lesson.name"
            :value="'/lesson/' + lesson.name"
          />
          <mu-divider></mu-divider>
        </slot>
        <LinkItem to="/settings" icon="settings" title="设置" value="/settings"/>
        <LinkItem to="/about" icon="info" title="关于" value="/about"/>
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
import store from "@/store.js";
import LinkItem from "@/components/LinkItem.vue";

function url2Name(route) {
  if (route.name === "page") {
    return route.params.tid;
  } else {
    return route.path;
  }
}

async function url2title(route) {
  const base = "扶朕起来朕还能学";
  let l = [];
  switch (route.name) {
    case "home":
      l = ["主页", base];
      break;
    case "page":
      l = [
        await store.getSegName(route.params.tk, route.params.tid),
        route.params.tk,
        base
      ];
      break;
    case "lesson":
      l = [route.params.lessonName, base];
      break;
    case "settings":
      l = ["设置", base];
      break;
    case "about":
      l = ["关于", base];
      break;

    default:
      break;
  }
  return l.join(" - ");
}

let lastScrollPosition = 0;

export default {
  name: "Bar",
  components: {
    LinkItem
  },
  data() {
    return {
      title: "扶朕起来朕还能学",
      showBar: true,
      open: false,
      activeItem: "/",
      trees: []
    };
  },
  watch: {
    $route(to) {
      this.onRouteChange(to);
      this.open = false;
    }
  },
  methods: {
    handleScroll() {
      const p = window.scrollY;
      if (p < 200) {
        this.showBar = true;
        return;
      }
      const delta = p - lastScrollPosition;
      if (delta > 10) {
        this.showBar = false;
      } else if (delta < -10) {
        this.showBar = true;
      }
      lastScrollPosition = p;
    },
    onRouteChange(route) {
      url2title(route).then(r => {
        this.title = r;
        document.title = r;
      });
      this.activeItem = url2Name(route);
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    store.data.trees.then(t => (this.trees = t));
    this.onRouteChange(this.$route);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style scoped>
header {
  width: 100%;
  position: fixed;
  text-align: left;
}
</style>
