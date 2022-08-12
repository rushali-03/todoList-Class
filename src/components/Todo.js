import React, { Component, useCallback } from 'react';
import { useState } from "react";
import '../App.css';
function Todo({todo, key, deleteTodo}) {

  const handleOnChange = useCallback(() => {
    todo.isCompleted = !todo.isCompleted;
    console.log(todo.isCompleted);

    let todos = JSON.parse(localStorage.getItem('todos'));
    for(let i=0; i<todos.length; i++){
      if(todos[i].id === key){
        console.log('todos: ', todos[i]);
        console.log("todos before:", todos[i].isCompleted);
        todos[i].isCompleted = !todos[i].isCompleted;
        console.log("todos after:", todos[i].isCompleted);
      }
    }
    localStorage.setItem('todos', JSON.stringify(todos));
  })

  return (
    <div className='task-div'>
      <input
        type="checkbox"
        id="task"
        onChange={handleOnChange}
      />
      <label for="task"
        className={todo.isCompleted ? 'label-complete' : 'label-incomplete'}
      >
        {todo.text}
      </label>
      <button
        className='close'
        onClick = {() =>{deleteTodo(todo)}}
      >X
      </button>
    </div>
  );
}

export default Todo;