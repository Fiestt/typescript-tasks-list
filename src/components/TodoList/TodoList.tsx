import React from 'react'
import { Todo } from '../model';
import "../styles.css"

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList = ({todos, setTodos}: Props ) => {
  return <div className="todos">
    {todos.map((todo, key) => (
        <li key={todo.id}>{todo.todo}</li>
    ))}
  </div>
}

export default TodoList