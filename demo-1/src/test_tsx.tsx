import React from 'react';
import ReactDOM from 'react-dom';

import './test.scss';

// const img_src = require("./assets/test_url_loader")

ReactDOM.render(
  <div>
    <div className="test"></div>
    <div>
      {/* 很好，又一大坑
      在css里我写了background-image来引入图片，webpack可以正确识别并打包
      md这儿不行，ε＝ε＝ε＝(#>д<)ﾉ
      气的肝疼，缓一会 */}
      <img src="./assets/awesome.png" alt="检查是否可以打包img" />
      <p>this is a paragraph</p>
    </div>
  </div>,
  document.querySelector('#root')
);
