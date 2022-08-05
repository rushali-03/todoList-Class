import React, {Component} from 'react';
import '../App.css'

function Input(props){
    return <input placeholder='What needs to be done?' className='todoInput' value={props.value} onChange={props.onChange} onKeyDown={props.onKeyDown} />;
}

export default Input