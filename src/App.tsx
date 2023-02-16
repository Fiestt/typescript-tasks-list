import React, { useState } from 'react';
import './App.css';
import InputField from './components/Input/InputField';
import { Todo } from './components/model';
import TodoList from './components/TodoList/TodoList';

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])
      setTodo("")
    }
  }

  return (
    <div className="app">
      <span className='heading'>Tasks-List</span>

      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

      <TodoList todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;
