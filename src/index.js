// 1. 导入包
import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './components/Hello'
import Movie from './components/Animal'


const dog = {
    name: '大黄',
    age: 3,
    gender: '谁'
};
const dogs = [
    {
        id: 0,
        name: '大黄',
        age: 3,
        gender: '谁'
    },
    {
        id: 1,
        name: '大黄',
        age: 3,
        gender: '谁'
    },
    {
        id: 2,
        name: '大黄',
        age: 3,
        gender: '谁'
    }
];



const mydiv = <div id="mydiv" title="div aaa">
    这是一个div元素
    <h1>这是一个大大的H1</h1>
    <Hello {...dog} />
    <Movie {...dog} />
</div>;


ReactDOM.render(mydiv, document.getElementById('app'));