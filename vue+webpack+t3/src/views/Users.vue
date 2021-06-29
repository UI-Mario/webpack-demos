<template>
<div>Users</div>
  <!-- <div v-if="error">{{ error }}</div>
  <div v-else>users:{{ user }}</div> -->
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
  }
}
</script>
<style scoped></style>
