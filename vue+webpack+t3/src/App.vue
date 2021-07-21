<template>
  <div @click="test" class="ww" ref="test">
    <div>tt</div>
    <div v-if="user">
      <user :user="user"></user>
    </div>
  </div>
</template>

<script>
import { ref, defineAsyncComponent } from 'vue'
// import User from './user.vue'
export default {
  components: {
    User: defineAsyncComponent(() => import('./user.vue'))
  },
  data() {
    return {
      user: null,
      error: null
    }
  },
  methods: {
    test() {
      console.log(123)
    },
    init() {
      fetch('https://test.com').then(res => {
        console.log(res)
      }).catch(e => {
        console.log(e)
      })
      try {
        setTimeout(() => {
          this.user = '123'
        }, 5000)
      } catch (e) {
        this.error = e
      }
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>
.ww {
  width: 100px;
  height: 100px;
  background-color: yellowgreen;
}
.mm {
  height: auto;
}
</style>
