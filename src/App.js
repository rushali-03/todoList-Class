import { useCallback, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import './App.css';
import Button from "./components/Button";
import Input from './components/Input';
import Todo from './components/Todo';
import { setMode, addTodo, deleteTodo, clearCompleted } from "./redux/actions/todoActions";

function App() {
  const [text, setText] = useState("");
  const mode = useSelector((state) => state.mode);
  const todos = useSelector((state) => state.todos) || [];
  const dispatch = useDispatch();

  const addTodoHandler = useCallback(() => {
    dispatch(addTodo(text));
    setText("");
  }, [text,dispatch]);

  const onKeyDown = useCallback((e) => {
    if (e.keyCode === 13) {
      addTodoHandler();
    }
  },[addTodoHandler]);

  const deleteTodoHandler = useCallback((item) => { //send id as payload
    dispatch(deleteTodo(item.id));
  },[dispatch]);

  const clearCompletedHandler = useCallback(() => {
    dispatch(clearCompleted());
  },[dispatch])

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
        return <Todo todo={todo} key={todo.id} deleteTodo={deleteTodoHandler} />;
      })}
      <div className='Footer'>
        <p>Total Items: {todos.length}</p>
        <Button 
          className="footer-btn"
          onClick={() => dispatch(setMode('all'))}
          label='All'
        />
        <Button 
          className="footer-btn"
          onClick={() => dispatch(setMode('active'))}
          label='Active'
        />
        <Button 
          className="footer-btn"
          onClick={() => dispatch(setMode('completed'))}
          label='Completed'
        />
        <Button 
          className="clear-completed"
          onClick={clearCompletedHandler}
          label='Clear Completed'
        />
      </div>
    </div>
  );
}

export default App;
