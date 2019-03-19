import React from "react";
import dogs from '@/css/dogs.css'

export default function CetItem(props) {
    return <div className={`${dogs.title} ${dogs.dog}`} > {props.id}--{props.name}--{props.age}</div>
}