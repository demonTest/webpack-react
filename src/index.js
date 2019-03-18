// 1. 导入包
import React from 'react';
import ReactDOM from 'react-dom';

import Hello from './components/Hello'


const mydiv = <div id="mydiv" title="div aaa">
    这是一个div元素
    <h1>这是一个大大的H1</h1>
    <Hello/>
</div>

// 3. 调用 render 函数渲染   jsx  XML 比 HTML 严格多了
ReactDOM.render(mydiv, document.getElementById('app'));