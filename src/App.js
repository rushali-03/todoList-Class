import { useCallback, useMemo, useState } from "react";

import './App.css';
import Button from "./components/Button";
import Input from './components/Input';
import Todo from './components/Todo';

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []); 
  const [mode, setMode] = useState("all");

  const addTodo = useCallback(() => {
    const newTodos = [...todos, {text: text, id: new Date(), isCompleted: false }];
    setTodos(newTodos);
    
    localStorage.setItem('todos', JSON.stringify([...todos, { text: text, isCompleted: false }]));
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setText("");
  }, [text, todos]);

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      addTodo();
    }
  };

  const deleteTodo = useCallback((item) => {
    const newTodo = [...todos];
    const newListArray = newTodo.filter((item1) => {
      return item.id !== item1.id;
    });
    setTodos(newListArray);

    localStorage.setItem('todos', JSON.stringify(newListArray));
  },[todos]);

  const allFilter = useCallback(() => {
    setMode("all");
  },[])

  const activeFilter = useCallback(() => {
    setMode("active");
  },[])

  const completedFilter = useCallback(() => {
    setMode("completed");
  },[])

  const clearCompleted = useCallback(() => {
    const newTodo = [...todos];
    const newListArray = newTodo.filter(item1 => !item1.isCompleted);
    setTodos(newListArray);

    localStorage.setItem("todos", JSON.stringify(newListArray));
  },[todos])


  const listToMap = useMemo(() => mode === "all" ? todos : mode === 'active' ? todos.filter(todo => !todo.isCompleted) : todos.filter(todo => todo.isCompleted),[mode,todos ]);
  return (
    <div className="App">
      <p className="header-1">todos</p>
      <div className='input-row'>
        <Input
          value={text}
          setText = {setText}
          onKeyDown={onKeyDown}
        />
      </div>
      {listToMap.map((todo) => {
        return <Todo todo={todo} key={todo.id} deleteTodo={deleteTodo} />;
      })}
      <div className='Footer'>
        <p>Total Items: {todos.length}</p>
        {/* <button className='footer-btn' onClick={allFilter}>All</button> */}
        <Button 
          className="footer-btn"
          onClick={allFilter}
          label='All'
        />
        <Button 
          className="footer-btn"
          onClick={activeFilter}
          label='Active'
        />
        <Button 
          className="footer-btn"
          onClick={completedFilter}
          label='Completed'
        />
        <Button 
          className="clear-completed"
          onClick={clearCompleted}
          label='Clear Completed'
        />
      </div>
    </div>
  );
}

export default App;
