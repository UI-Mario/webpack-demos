<template>
  <div @click="test" class="ww" ref="test">
    <div>tt</div>
    <div v-if="user">
      <user :user="user"></user>
    </div>
    <test />
    <div class="example"></div>
    <div id="marquee"></div>
    <button style="margin-top: 50px" @click="additem">button</button>
  </div>
</template>

<script>
import { ref, defineAsyncComponent } from 'vue'
import test from './views/test.vue'
// import User from './user.vue'

var originList = new Array(3).fill(1).map((item, index) => index + '.' + Math.random())
var newList = []

const TOP = -100
const BOTTOM = 100

export default {
  components: {
    test,
    User: defineAsyncComponent(() => import('./user.vue'))
  },
  data() {
    return {
      user: null,
      error: null,
      top: TOP
    }
  },
  methods: {
    test() {
      console.log(123)
    },
    init() {
      // fetch('https://test.com').then(res => {
      //   console.log(res)
      // }).catch(e => {
      //   console.log(e)
      // })
      // try {
      //   setTimeout(() => {
      //     this.user = '123'
      //   }, 5000)
      // } catch (e) {
      //   this.error = e
      // }
    },
    additem() {
      newList = [
        'bob',
        'rose'
      ]
    },
    initMarquee() {
      // requestAnimationFrame(() => {})
      const marquee = document.querySelector('#marquee')
      const item = document.createElement('div')
      item.setAttribute('id', 'marquee-item')
      marquee.appendChild(item)
      this.initStyle()

      // scroll 和add应该是两个动作
      this.scrollList(originList)
    },
    initStyle() {
      const item = document.querySelector('#marquee-item')
      item.style.width = '80%'
      item.style.height = '100%'
      // item.style.backgroundColor = 'red'
      item.style['position'] = 'absolute'
      item.style['left'] = '10px'
    },
    scrollOneItem() {
      return new Promise((resolve, reject) => {
        const scrollAnimation = (index = 0) => {
          if (this.top > BOTTOM) {
            resolve()
            return
          }
          if (this.top === 10) {
            ++index
            if (index > 60) {
              this.top++
              document.querySelector('#marquee-item').style['top'] = this.top + '%'
            }
          } else {
            this.top++
            document.querySelector('#marquee-item').style['top'] = this.top + '%'
          }
          requestAnimationFrame(() => {
            scrollAnimation(index)
          })
        }
        scrollAnimation()
      })
    },
    async scrollList(list) {
      for (const item of list) {
        document.querySelector('#marquee-item').innerText = item
        await this.scrollOneItem()
        this.top = TOP
        console.log('done')
      }
      if (!newList.length) {
        this.scrollList(list)
      } else {
        originList = newList
        newList = []
        this.scrollList(originList)
      }
    }
  },
  mounted() {
    this.init()
    console.log(this.$test)
    this.initMarquee()
  }
}
</script>

<style scoped>

@import './index.css'

</style>
