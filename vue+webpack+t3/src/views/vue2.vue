<template>
  <div @click="test" class="ww" ref="test">ww</div>
</template>

<script>
export default {
  methods: {
    test() {
      console.log(this.$refs.test.className -= 'ww')
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
height: auto;}
</style>
