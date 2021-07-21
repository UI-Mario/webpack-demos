<template>
  <div>this is test component</div>
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
</style>
