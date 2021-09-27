<template>
  <div @click="inc">123: {{count}}</div>
</template>

<script setup lang="ts">
import { ref, defineComponent, reactive, toRefs } from "vue";
// 除了这种把setup写在script里面，还有另一种写法
// 相较起来我更青睐另一种
const count = ref(0)
const inc = () => count.value++
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
