<template>
  <div @click="test" class="ww" ref="test">
    <div>tt</div>
    <div v-if="error">{{ error }}</div>
    <div v-else>users:{{ user }}</div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  async setup() {
    const error = ref(null)
    const user = ref(null)
    try {
      setTimeout(() => {
        user.value = '123'
      }, 5000)
    } catch (e) {
      error.value = e
    }
    return { user, error }
  },
  methods: {
    test() {
      console.log(123)
    }
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
