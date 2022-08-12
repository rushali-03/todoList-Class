import React, { useCallback } from 'react';

import '../App.css';

function Todo({ todo, key, deleteTodo }) {
  const handleOnChange = useCallback(() => {
    todo.isCompleted = !todo.isCompleted;
    
    const todos = JSON.parse(localStorage.getItem('todos'));
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === key) {
        todos[i].isCompleted = !todos[i].isCompleted;
      }
    }
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todo, key])

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
        onClick={() => { deleteTodo(todo) }}
      >X
      </button>
    </div>
  );
}

export default Todo;