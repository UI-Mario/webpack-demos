import React from 'react';
import ReactDOM from 'react-dom';

import './test.scss';

// const img_src = require("./assets/test_url_loader")

ReactDOM.render(
  <div>
    <div className="test"></div>
    <div>
      <img src="./assets/test_url_loader.png" alt="检查是否可以打包img" />
      <p>this is a paragraph??????</p>
    </div>
  </div>,
  document.querySelector('#root')
);
