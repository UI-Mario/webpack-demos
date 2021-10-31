<template>
  <div ref="screenEl" class="screen"></div>
  <input v-model="inputText">
  <div @click="send()">send</div>
  <div @click="move()">move</div>
</template>

<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Bullet from './bullet'

import {ref, getCurrentInstance, reactive} from 'vue'

import renderComponent from './renderComponent' 

export default {
  setup(props, context) {
    const screenEl = ref(null)

    const inputText = ref(null)

    const appContext = ref(null)

    const bullet = ref(null)
    return {
      screenEl,
      inputText,
      appContext,
      bullet
    }
  },
  mounted() {
  },
  unmounted() {},
  methods: {
    send() {
      this.bullet = new Bullet({text:this.inputText, avatar:'123', id: Math.random().toFixed(2).toString()})
      const position = {
        left: 400,
        top: 40,
        unit: 'px'
      }
      this.bullet.mount(this.$refs['screenEl'] as HTMLElement, position, 'px')
    },
    move() {
      this.bullet.move()
    }
  }
}

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
  background: lightgray;
  position: relative;
}
</style>
