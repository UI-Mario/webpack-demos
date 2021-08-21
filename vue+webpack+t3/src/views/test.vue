<template>
  <div class="container">
    <div
    v-for="(item, index) in list"
    :key="index"
    ref="itemsRef"
    @click.stop="onDraw(index)"
    class="item">
      {{ index }}
    </div>
  </div>
</template>

<script>
const LOOP_ORDER = [
  0, 1, 2, 5, 8, 7, 6, 3
]

export default {
  data() {
    return {
      list: new Array(9).fill(100)
    }
  },
  methods: {
    // 0 1 2
    // 3 4 5
    // 6 7 8
    onDraw(index) {
      if (index !== 4) return
      console.log('ref', this.$refs.itemsRef[0])
      // getItemKey
      // const itemKey = [1,3,5,7].pop()
      // animate
      const finalKey = Math.floor(Math.random() * 8)
      const loopArr = [...LOOP_ORDER, ...LOOP_ORDER, ...LOOP_ORDER.slice(0, finalKey)]
      console.log(loopArr, finalKey, LOOP_ORDER[finalKey])
      this.setItemActive(0, 300, loopArr)
    },
    // shartAnimate(itemKey) {
    //   let timer = null
    //   const initLoop = 3
    // },
    // element.classList.add("my-class");
    // element.classList.remove("my-class");
    setItemActive(index = 0, interval, loopArr) {
      if (index >= loopArr.length) return
      const itemKey = loopArr[index]
      this.$refs.itemsRef[itemKey].classList.add('active')
      setTimeout(() => {
        if (index === loopArr.length - 1) return
        this.$refs.itemsRef[itemKey].classList.remove('active')
        this.setItemActive(++index, interval, loopArr)
      }, interval)
    }
  }
}
</script>

<style scoped>
.container {
  width: 302px;
  height: 302px;
  background: #cdcdcd;
  margin: 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1px;
}
.item {
  width: 100px;
  height: 100px;
  background: lightblue;

  display: flex;
  align-items: center;
  justify-content: center;
}
.active {
  background: lightcoral;
}
</style>
