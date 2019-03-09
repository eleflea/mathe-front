<template>
  <div class="question" v-if="imgs.length">
    <mu-flex class="question-container" direction="column" align-items="center">
      <mu-flex class="question-bar" direction="row" align-items="start">
        <mu-badge :content="`#${no}`" color="primary"></mu-badge>
        <mu-badge :content="diff" :color="diffColor"></mu-badge>
      </mu-flex>
      <DraggableImg
        v-for="(o, key) in imgs.slice(0,5)"
        :key="key"
        :src="o.src"
        :isAnswer="o.isAnswer"
        :imgScale="options.imgScale"
        :green="options.markAnswer && o.isAnswer === 1"
      />
      <DraggableImg
        class="no-divider"
        v-if="options.showAnswer"
        @click.native="toggleAnswer"
        :src="imgs.length && imgs[5].src"
        :isAnswer="-1"
        :imgScale="options.imgScale"
        :pointer="true"
      />
    </mu-flex>
    <Crash @click.native="toggleAnswer" v-show="!options.showAnswer"/>
  </div>
</template>

<script>
import axios from "axios";
import utils from "@/utils.js";
import DraggableImg from "@/components/DraggableImg.vue";
import Crash from "@/components/Crash.vue";

export default {
  name: "Question",
  components: {
    DraggableImg,
    Crash
  },
  props: ["name", "no"],
  data() {
    return {
      tk: "",
      diff: "",
      options: {
        showAnswer: false,
        markAnswer: false,
        imgScale: 1
      },
      imgs: []
    };
  },
  computed: {
    diffColor() {
      return {
        Averge: "orange",
        Easy: "green",
        Hard: "red"
      }[this.diff];
    }
  },
  watch: {
    name() {
      this.getQuestion();
      this.initOptions();
    },
    "this.$cookie"() {
      this.initOptions();
    }
  },
  methods: {
    initOptions() {
      const o = this.$cookie.get("options");
      if (o === null) {
        this.options = {
          showAnswer: false,
          markAnswer: false,
          imgScale: 1
        };
      } else {
        this.options = JSON.parse(o);
      }
    },
    toggleAnswer() {
      this.options.showAnswer = !this.options.showAnswer;
    },
    getQuestion() {
      this.imgs = [];
      axios
        .get("https://api.neumathe.xyz/api/question", {
          params: { name: this.name }
        })
        .then(resp => {
          const d = resp.data;
          if (d.code === 0) {
            for (const k of ["tk", "diff"]) {
              this[k] = d.data[k];
            }
            for (const i of [...Array(6).keys()]) {
              this.imgs.push({
                src: utils.b64toImgURL(d.data[`img${i}`]),
                isAnswer: 0
              });
            }
            this.imgs[0].isAnswer = -1;
            this.imgs[5].isAnswer = -1;
            this.imgs[d.data.answer].isAnswer = 1;
            return;
          }
          throw new Error(d.msg);
        })
        // eslint-disable-next-line
        .catch(e => console.warn("question:", e))
        .finally(() => this.$emit("fetch-over"));
    }
  },
  beforeMount() {
    this.getQuestion();
  },
  created() {
    this.initOptions();
  }
};
</script>

<style scoped>
.question {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
}

.question-container {
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  background-color: white;
  width: 100%;
}

.question-container > * {
  width: 100%;
  border-bottom: 1px dashed gray;
}

.question-bar {
  padding: 0.5rem;
}

.question-bar > div {
  margin-right: 0.5rem;
}

.no-divider {
  border-bottom: none;
}
</style>
