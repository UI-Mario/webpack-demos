#!/usr/bin/env node

var program = require('commander')
var pkg = require('./package.json')
var chalk = require('chalk')
var path = require('path')
var fs = require('fs-extra')
var css = require('css')

console.log(chalk.green.bold('[Success]: ') + 'Livio')

var pxRegExp = /\b(\d+(\.\d+)?)px\b/

var cssText = fs.readFileSync('./test.css', { encoding: 'utf8' })
var astObj = css.parse(cssText)
console.log(cssText)
fs.createFileSync('./debug.css')

fs.writeFileSync('./debug.css', 'html{}', { encoding: 'utf8' })
console.log(chalk.green.bold('[Success]: '))
