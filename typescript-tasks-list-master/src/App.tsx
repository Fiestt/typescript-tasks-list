import React, { useEffect, useState } from 'react';
import './App.css';
import InputField from './components/Input/InputField';
import { Todo } from './components/model';
import TodoList from './components/TodoList/TodoList';
import { DragDropContext, DropResult } from "react-beautiful-dnd"

const App: React.FC = () => {

  const localTodos = JSON.parse(localStorage.getItem("todos") || "")
  const localCompletedTodos = JSON.parse(localStorage.getItem("completed") || "")
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([...localTodos])

  const [completedTodos, setCompletedTodos] = useState<Todo[]>([...localCompletedTodos])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])
      setTodo("")
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination} = result
    console.log(todos)
    if (!destination) return

    if (destination.droppableId === source.droppableId && 
      destination.index === source.index) return

      let add
      let active = todos
      let complete = completedTodos

      if (source.droppableId === "TodosList") {
        add = active[source.index];
        active.splice(source.index, 1)
      } else {
        add = complete[source.index];
        complete.splice(source.index, 1)
      }

      if (destination.droppableId === "TodosList") {
        active.splice(destination.index, 0, add)
      } else {
        complete.splice(destination.index, 0, add)
      }

      setCompletedTodos(complete)
      localStorage.setItem("completed", JSON.stringify(complete))
      setTodos(active)
      localStorage.setItem("todos", JSON.stringify(active))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <span className='heading'>Tasks-List</span>

        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

        <TodoList todos={todos} 
                  setTodos={setTodos} 
                  completedTodos={completedTodos}
                  setCompletedTodos={setCompletedTodos}/>
      </div>
    </DragDropContext>
  );
}

export default App;
