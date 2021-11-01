<template>
  <div ref="screenEl" class="screen"></div>
  <input v-model="inputText" />
  <div @click="send()">send</div>
  <div @click="move()">move</div>
  <div @click="intervalSend()">模拟效果</div>
</template>

<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Bullet from "./bullet";
import Track from "./track";
import Plaform from "./platform";

import { ref, getCurrentInstance, reactive } from "vue";

import renderComponent from "./renderComponent";

const RANDOM_WORDS =
  "欧巴此外v额外IP v吧哦前辈【去v被称为哦i啊从不【阿布婆妈三年从欸吃饭欧巴从底部成为";

const getRandomWords = () => {
  var res = "";
  const textLen = 5 + Math.floor(Math.random() * 10);
  for (var i = 0; i < textLen; i++) {
    const wordIndex = Math.floor(Math.random() * RANDOM_WORDS.length);
    res += RANDOM_WORDS[wordIndex];
  }
  return res;
};

export default {
  setup(props, context) {
    const screenEl = ref(null);

    const platform = ref(null);

    const inputText = ref(null);

    const appContext = ref(null);

    return {
      screenEl,
      inputText,
      appContext,
      platform,
    };
  },
  mounted() {
    this.initPlatForm();
  },
  unmounted() {},
  methods: {
    send() {
      const bullet = new Bullet({ text: this.inputText, avatar: "123", id });
      this.platform.addBullet(bullet);
    },
    initPlatForm() {
      this.platform = new Plaform(this.screenEl);
      this.platform.initTracks(5);
    },
    intervalSend() {
      const addRandomBullet = () => {
        const text = getRandomWords();
        const RANDOM_STR = ["a", "b", "c", "h", "n", "r", "u"];
        const id = RANDOM_STR.reduce((acc, cur) => {
          const randomIndex = Math.floor(Math.random() * RANDOM_STR.length);
          return RANDOM_STR[randomIndex] + acc;
        }, "");
        const bullet = new Bullet({
          text,
          avatar: "",
          id,
        });
        this.platform.addBullet(bullet);
      };
      setInterval(addRandomBullet, 1000);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.screen {
  width: 500px;
  height: 400px;
  margin-left: 100px;
  background: lightgray;
  position: relative;
}
</style>
