import React from 'react';
import ReactDOM from 'react-dom';

import { Num1SVG } from './components/num1SVG';
import { TestModulePackComponent } from './components/test_module_pack';

import './test.scss';
import test_img from './assets/images/awesome.png';
import { test_ts } from './test_ts';
// import test_overload from './try_fake_overload_in_ts';

test_ts();

const myThrottle = (fn: () => void, time: number): any => {
  let isRunning = false;
  return () => {
    if (!isRunning) {
      isRunning = true;
      setTimeout(() => {
        fn();
        isRunning = false;
      }, time);
    }
  };
};

const myDebounce = (fn: () => void, time: number): any => {
  let timer: any = null;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, time);
  };
};

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
      <Num1SVG />
      {/* <TestModulePackComponent /> */}
      <p>一段时间后才能继续响应</p>
      <button
        type="button"
        onClick={myThrottle(() => {
          console.log('you click');
        }, 3000)}
      >
        throttle(节流)
      </button>
      <p>防抖函数指的是某个函数在某段时间内，无论触发了多少次回调，都只执行最后一次</p>
      <button
        type="button"
        onClick={myDebounce(() => {
          console.log('you click');
        }, 3000)}
      >
        debounce(防抖)
      </button>
      <br />
      <TestModulePackComponent />
    </div>
  </div>,
  document.querySelector('#root')
);
