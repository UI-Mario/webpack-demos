const fs = require('fs');
const { resolve } = require('path');

const nodeEnv = process.env.NODE_ENV || 'production';
// 有啥意思的是不用resolve解析路径的话，在webpack里运行会报错，直接node正常
const envContent = fs.readFileSync(resolve(__dirname, `.env.${nodeEnv}`), 'utf-8');
const sptEnvCont = envContent.split('\r\n');

const env = {};

for (const value of sptEnvCont) {
  try {
    const sptValue = value.split('=');
    env[sptValue[0]] = sptValue[1];
  } catch (error) {
    console.error(error);
  }
}
module.exports = env;
