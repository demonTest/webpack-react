import React from "react";
import dogs from '@/scss/dogs.scss'

export default function CetItem(props) {


    return <div className={`${dogs.title} ${dogs.dog} ${dogs.box}` }>{props.id}--{props.name}--{props.age} </div>
}