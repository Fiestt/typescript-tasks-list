import React, { useEffect, useState } from 'react';
import './App.css';
import InputField from './components/Input/InputField';
import TodoList from './components/TodoList/TodoList';
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { useAppDispatch, useAppSelector } from './store/hooks/hooks';
import { getCurrentActiveTodos, getCurrentCompletedTodos, addTodo, getNewCompletedTodos, getNewTodos } from './store/todoSlice/todoSlice';

const App: React.FC = () => {

  const localTodos = JSON.parse(localStorage.getItem("todos") || "[]")
  const localCompletedTodos = JSON.parse(localStorage.getItem("completed") || "[]") 
  const [todo, setTodo] = useState<string>("")

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getCurrentActiveTodos(localTodos))
    dispatch(getCurrentCompletedTodos(localCompletedTodos))
  }, [])

  const todos = useAppSelector(state => state.todos.activeTodos)
  const completedTodos = useAppSelector(state => state.todos.comletedTodos)

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
    localStorage.setItem("completed", JSON.stringify(completedTodos))
  }, [todos, completedTodos])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (todo) {
      dispatch(addTodo(todo))
      setTodo("")
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination} = result
    console.log(result)
    if (!destination) return

    if (destination.droppableId === source.droppableId && 
      destination.index === source.index) return

      let add
      let active = [...todos]
      let complete = [...completedTodos]

      if (source.droppableId === "TodosList") {
        add = active[source.index];
        console.log(add, "SSS")
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

      dispatch(getNewCompletedTodos(complete))
      localStorage.setItem("completed", JSON.stringify(complete))
      dispatch(getNewTodos(active))
      localStorage.setItem("todos", JSON.stringify(active))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <span className='heading'>Tasks-List</span>

        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

        <TodoList/>
      </div>
    </DragDropContext>
  );
}

export default App;
