import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div>
    hello jsx
    <p>
      在尝试着使用webpack配置react的时候，目前仅尝试使用@babel/preset-env，@babel/preset-react，babel-loader，@babel/core，可以解读jsx文件
    </p>
  </div>,
  document.querySelector('#root')
);
