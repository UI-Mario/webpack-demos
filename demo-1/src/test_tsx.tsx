import React from 'react';
import ReactDOM from 'react-dom';

import './test.scss';
import test_img from './assets/images/awesome.png';
import { test_ts } from './test_ts';
// import test_overload from './try_fake_overload_in_ts';

test_ts();

ReactDOM.render(
  <div>
    <div className="test"></div>
    <div>
      {/* 很好，又一大坑
      在css里我写了background-image来引入图片，webpack可以正确识别并打包
      md这儿不行，ε＝ε＝ε＝(#>д<)ﾉ
      气的肝疼，缓一会 */}
      {/* emm，不写字符串写成require可以被打包，但是路径问题还要再转一下
      但是为什么呢
      写图片都得这么写吗，是我代码量太少？
      一定要改，这是什么丑陋的写法 */}
      {/* 写法1，丑 */}
      {/* <img src={require('./assets/images/awesome.png')} alt="检查是否可以打包img" /> */}
      {/* 写法2，丑，而且还要在.d.ts里declare一下 */}
      <img src={test_img} alt="检查是否可以打包img" />
      <p>this is a paragraph</p>
    </div>
  </div>,
  document.querySelector('#root')
);
