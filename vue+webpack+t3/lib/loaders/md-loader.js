var MarkdownIt = require('markdown-it')
const md = new MarkdownIt()

module.exports = function(source) {
  const content = md.render(source)
  // 就已经把md转成html了
  const code = `module.exports = ${JSON.stringify(content)}`
  // 转成vue可以直接用的
  // const code = `
  //   <template>
  //     <section class="demo-container">
  //       ${content}
  //     </section>
  //   </template>
  //       <script>
  //           export default {}
  //       </script>
  // `;
  return code
}
