import React,{Component} from 'react';
import ReactDOM from 'react-dom'

class Animal {
    static info = 'ddd';
    constructor(name,age){
       this.name = name;
       this.age = age;
    }
    Person(){

    }
    static ter(){

    }
}
class Chiams extends Animal{

    constructor(name,age,phone){
        super(name,age);
        this.phone = phone;
    }
    sayHello(){

    }
}

const al = new Chiams('呵呵',2,'2313434');
console.log(al);
al.sayHello();

class Movie extends Component{
    constructor(){
        super();
        this.state = {
            msg: '测试',
            dogs: [
                {
                    id: 0,
                    name: '大黄',
                    age: 3,
                    gender: '谁'
                },
                {
                    id: 1,
                    name: '小强',
                    age: 3,
                    gender: '谁'
                },
                {
                    id: 2,
                    name: '小狸',
                    age: 3,
                    gender: '谁'
                }
            ]
        }
    }

    render(){
        this.state .msg ='修改';
        return <div>
            这是Movie组件--{this.props.name}--{this.props.age}--{this.props.gender}---{this.state.msg}
            <h1>列表</h1>
            <div>{this.state.dogs.map(item=> <div>{item.name}</div>)}</div>
        </div>
    }
}
export default Movie;