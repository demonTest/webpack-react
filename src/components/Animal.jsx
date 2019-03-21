import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import CetItem from '@/components/CetItem';

import bootcss from 'bootstrap/dist/css/bootstrap.css'

class Animal {
    static info = 'ddd';

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    Person() {

    }

    static ter() {

    }
}

class Chiams extends Animal {

    constructor(name, age, phone) {
        super(name, age);
        this.phone = phone;
    }

    sayHello() {

    }
}


const al = new Chiams('呵呵', 2, '2313434');
console.log(al);
al.sayHello();
const sts = {color: 'red', margin: '10px'};
const sys = {fontSize: '20px'};
const sty = {
    sts: sts, sys: sys
};

class Movie extends Component {
    constructor() {
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

    render() {
        return <div>
            这是Movie组件--{this.props.name}--{this.props.age}--{this.props.gender}
            <div style={sty.sts}>列表1</div>{/*Object.assign(sty.sts, sty.sys)*/}
            <div>{this.state.dogs.map((item,key) => <CetItem key={key} {...item}/>)}</div>
            <button className="btn btn-primary" onClick={(e)=>this.cilckHandler('413',e)}>测试1</button>
            <span>{ this.state.msg}</span>
            <input type="text" style={{width:'300px'}} value={this.state.msg} onChange={(e)=>this.txtChange(e)} ref="txt"/>
        </div>
    }

    cilckHandler =(arg,el)=>{
         console.log('ok',arg);
        this.setState({msg: '再次修改'});
    };
    txtChange = (e)=>{
      /*  console.log(this.refs.txt.value,e.target.value)*/
        const newVal = this.refs.txt.value;
        this.setState({msg: newVal});
    }

}

export default Movie;