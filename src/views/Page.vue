<template>
  <div class="page">
    <Bar>
      <mu-list-item button nested :open="false">
        <mu-list-item-action>
          <mu-icon value="star"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>题库</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon class="toggle-icon" size="24" value="keyboard_arrow_down"></mu-icon>
        </mu-list-item-action>
        <LinkItem
          v-for="lesson in trees"
          :to="'/lesson/' + lesson.name"
          :key="lesson.name"
          icon="book"
          :title="lesson.name"
          :value="'/lesson/' + lesson.name"
          slot="nested"
        />
      </mu-list-item>
      <mu-divider></mu-divider>
      <LinkItem
        v-for="seg in segList"
        :to="`/page/${$route.params.tk}/${seg.id}/1`"
        :key="seg.id"
        :title="seg.text"
        :value="seg.id"
      />
      <mu-divider></mu-divider>
      <LinkItem to="/" icon="home" title="主页" value="/"/>
    </Bar>
    <div class="app-container">
      <Question
        class="question"
        v-for="(tid, key) in list"
        :key="key"
        :name="tid"
        :no="(current - 1) * 5 + key + 1"
        @fetch-over="onFetchOver"
      />
      <mu-flex direction="column" justify-content="center" align-items="center">
        <mu-pagination :page-size="5" :total="total" :current.sync="current" @change="onChangePage"></mu-pagination>
        <mu-flex direction="row" justify-content="center">
          <mu-button
            class="seg-jump"
            flat
            :disabled="!preNext[0]"
            :to="preNext[0] ? `/page/${$route.params.tk}/${preNext[0].id}/1` : null"
          >
            <mu-icon left value="keyboard_arrow_left"></mu-icon>
            {{ preNext[0] ? preNext[0].text : '没有上一节了' }}
          </mu-button>
          <mu-button
            class="seg-jump"
            flat
            :disabled="!preNext[1]"
            :to="preNext[1] ? `/page/${$route.params.tk}/${preNext[1].id}/1` : null"
          >
            {{ preNext[1] ? preNext[1].text : '没有下一节了' }}
            <mu-icon right value="keyboard_arrow_right"></mu-icon>
          </mu-button>
        </mu-flex>
      </mu-flex>
    </div>
  </div>
</template>

<script>
import store from "@/store.js";
import Bar from "@/components/Bar.vue";
import Question from "@/components/Question.vue";
import LinkItem from "@/components/LinkItem.vue";
import axios from "axios";

export default {
  name: "Page",
  components: {
    Bar,
    Question,
    LinkItem
  },
  data() {
    return {
      trees: [],
      total: 0,
      list: [],
      current: 1,
      segList: [],
      preNext: [null, null],
      fetchCount: 0
    };
  },
  methods: {
    fetchQuestions() {
      this.$progress.start();
      const tkMap = {
        高等数学: "gs",
        概率统计: "gl",
        复变函数: "fb",
        线性代数: "xd"
      };
      const { tk, tid, page } = this.$route.params;
      this.current = isNaN(parseInt(page)) ? 1 : parseInt(page);
      axios
        .get("https://api.neumathe.xyz/api/qlist", {
          params: { tk: tkMap[tk], tid, page: this.current, per: 5 }
        })
        .then(resp => {
          const d = resp.data;
          if (d.code === 0) {
            this.total = d.data.total;
            this.list = d.data.list;
          } else {
            throw new Error(d.msg);
          }
        })
        // eslint-disable-next-line
        .catch(e => console.warn("qlist:", e));
    },
    onChangePage() {
      let old = this.$route.params;
      old.page = `${this.current}`;
      this.$router.push({ name: "page", params: old });
    },
    onFetchOver() {
      this.fetchCount++;
      if (this.fetchCount === 5) {
        this.$progress.done();
      }
    },
    fetchData() {
      this.fetchQuestions();
      const { tk, tid } = this.$route.params;
      store.getSegs(tk, tid).then(r => (this.segList = r));
      store.getSiblingSegs(tk, tid).then(r => (this.preNext = r));
      this.fetchCount = 0;
    }
  },
  watch: {
    "$route.params": function() {
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
    store.data.trees.then(t => (this.trees = t));
  }
};
</script>

<style scoped>
.question {
  margin: 0 auto 0.75rem auto;
}
@media only screen and (max-width: 600px) {
  .question {
    margin-bottom: 7px;
  }
}

.seg-jump {
  max-width: 50vw;
  min-height: 2rem;
  height: initial;
  line-height: 1.2rem;
  display: flex;
  align-items: center;
}
</style>
