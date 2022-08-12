import './App.css';
import Input from './components/Input';
import { useCallback, useState } from "react";
import Todo from './components/Todo';

function App() {

  const [text, setText] = useState("");
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || [],); 
  const [mode, setMode] = useState("all");

  const addTodo = useCallback(() => {
    console.log("text: ", text);
    const newTodos = [...todos, {text: text, id: new Date(), isCompleted: false }];
    setTodos(newTodos);
    
    localStorage.setItem('todos', JSON.stringify([...todos, { text: text, isCompleted: false }]));
    console.log(localStorage.getItem('todos'));
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setText("");
  }, [text, todos]);

  const onKeyDown = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      console.log(e.keyCode);
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
    console.log(localStorage.getItem('todos'));
  },[todos]);

  const allFilter = () => {
    setMode("all");
    console.log(mode);
  }

  const activeFilter = () => {
    setMode("active");
    console.log(mode);
  }

  const completedFilter = () => {
    setMode("completed");
    console.log(mode);
  }

  const clearCompleted = useCallback(() => {
    const newTodo = [...todos];
    const newListArray = newTodo.filter(item1 => !item1.isCompleted);
    console.log(newListArray);
    setTodos(newListArray);

    localStorage.setItem("todos", JSON.stringify(newListArray));
  },[todos])


  let listToMap = mode === "all" ? todos : mode === 'active' ? todos.filter(todo => !todo.isCompleted) : todos.filter(todo => todo.isCompleted);
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
        <button className='footer-btn' onClick={allFilter}>All</button>
        <button className='footer-btn' onClick={activeFilter}>Active</button>
        <button className='footer-btn' onClick={completedFilter}>Completed</button>
        <button className='clear-completed' onClick={clearCompleted}>Clear Completed</button>
      </div>
    </div>
  );
}

export default App;
