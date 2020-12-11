// 在尝试以js、ts为入口时的文件
const { show } = require('./module');
import { test_ts } from './test_ts';
show('learn webpack');
console.log('kkkkkkk World');
test_ts();
const img = require('./assets/images/test_url_loader.png');
