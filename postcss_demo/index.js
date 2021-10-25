const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const postcssNested = require('postcss-nested')
const fs = require('fs')

const entryFile = 'app.css'
const outFile = 'bundle.css'

// fs.writeFile(outFile, '', () => true)

fs.readFile(entryFile, (err, css) => {
  postcss([autoprefixer, postcssNested])
    .process(css, { from: entryFile, to: outFile })
    .then(result => {
      // 这控制台真要命，看个object要吐了   
      console.log(result.root.nodes)
      fs.writeFile(outFile, result.css, () => true)
    })
})
