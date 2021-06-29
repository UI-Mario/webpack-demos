<template>
  <div>
    <header>view1</header>
    <Users></Users>
    <!-- <canvas id="three" ref="three"></canvas> -->
  </div>
</template>

<script>
import * as THREE from 'three'
import Users from './Users.vue'
// import { defineAsyncComponent } from 'vue'
// const Users = defineAsyncComponent(() => import('./Users.vue'))
export default {
  components: { Users },
  data() {
    return {}
  },
  methods: {
    init() {
      // this.createBaseThree()
    },
    createBaseThree() {
      // 三大要素：scene, camera, render
      // 给人的感觉threejs用起来就是个脚本，还是回去乖乖用html写吧
      const scene = new THREE.Scene()
      scene.background = new THREE.Color('#eee')
      const canvas = this.$refs.three
      // const canvas = document.querySelector('#three')
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
      const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      camera.position.z = 10

      var boxGeometry = new THREE.BoxGeometry(1, 1, 1)
      var basicMaterial = new THREE.MeshBasicMaterial({ color: 0x0095dd })
      var cube = new THREE.Mesh(boxGeometry, basicMaterial)
      scene.add(cube)
      cube.rotation.set(0.4, 0.2, 0)

      function animate() {
        renderer.render(scene, camera)
        requestAnimationFrame(animate)
      }
      animate()
    }
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {
    this.init()
  },
  updated() {}
}
</script>
<style scoped>
#three {
  width: 500px;
  height: 500px;
}
</style>
