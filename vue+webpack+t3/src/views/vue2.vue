<template>
  <div class="container">
    <svg
      version="1.1"
      id="loader-1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="400px"
      height="400px"
      viewBox="0 0 400 400"
      enable-background="new 0 0 400 400"
      xml:space="preserve"
    >
      <g v-for="(item, index) in data.children" :key="index">
        <rect
          :x="item.x0"
          :y="item.y0"
          :width="item.x1 - item.x0"
          :height="item.y1 - item.y0"
        />
        <text :x="(item.x0 + item.x1) / 2" :y="(item.y0 + item.y1) / 2">
          {{ item.value }}
        </text>
      </g>
    </svg>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {
        name: 'root',
        children: [
          {
            name: '分类 1',
            value: 2
          },
          {
            name: '分类 2',
            value: 10
          },
          {
            name: '分类 3',
            value: 4
          },
          {
            name: '分类 4',
            value: 3
          },
          {
            name: '分类 5',
            value: 7
          },
          {
            name: '分类 6',
            value: 5
          },
          {
            name: '分类 7',
            value: 9
          },
          {
            name: '分类 8',
            value: 8
          },
          {
            name: '分类 9',
            value: 1
          },
          {
            name: '分类 10',
            value: 6
          }
        ]
      }
    }
  },
  methods: {
    binaryTree(parent, x0, y0, x1, y1) {
      var nodes = parent.children
      var i
      var n = nodes.length
      var sum
      var sums = new Array(n + 1)

      for (sums[0] = sum = i = 0; i < n; ++i) {
        sums[i + 1] = sum += nodes[i].value
      }

      partition(0, n, sum, x0, y0, x1, y1)

      function partition(i, j, value, x0, y0, x1, y1) {
        // 当i,j之间无法再划分矩形块，结束
        if (i >= j - 1) {
          var node = nodes[i]
          node.x0 = x0
          node.y0 = y0
          node.x1 = x1
          node.y1 = y1
          return
        }

        // 这俩是干啥的
        var valueOffset = sums[i]
        // ij区间value的一半，加上之前的
        var valueTarget = value / 2 + valueOffset
        var k = i + 1
        var hi = j - 1
        // 找边界-ans1
        while (k < hi) {
          // mad这个运算符真的是秀死我，一定得记一笔
          var mid = (k + hi) >>> 1
          // 挪移k，使之成为新的ij边界
          if (sums[mid] < valueTarget) k = mid + 1
          else hi = mid
        }

        // 这行代码是干啥的，会影响生成的矩形树图样式，但还是可以生成
        // if (valueTarget - sums[k - 1] < sums[k] - valueTarget && i + 1 < k) --k;
        console.log('break', sums[k], valueTarget, value)
        var valueLeft = sums[k] - valueOffset
        var valueRight = value - valueLeft

        if (x1 - x0 > y1 - y0) {
          var xk = (x0 * valueRight + x1 * valueLeft) / value
          partition(i, k, valueLeft, x0, y0, xk, y1)
          partition(k, j, valueRight, xk, y0, x1, y1)
        } else {
          var yk = (y0 * valueRight + y1 * valueLeft) / value
          partition(i, k, valueLeft, x0, y0, x1, yk)
          partition(k, j, valueRight, x0, yk, x1, y1)
        }
      }
    },
    squarified() {}
  },
  created() {
    this.binaryTree(this.data, 0, 0, 400, 400)
    console.log(this.data)
  }
}
</script>
<style scoped>
rect {
  fill: #7dc5eb;
  stroke: #fff;
  stroke-width: 3;
}
</style>
