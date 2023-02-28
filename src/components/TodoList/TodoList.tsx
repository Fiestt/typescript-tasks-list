import React from 'react'
import { Droppable } from 'react-beautiful-dnd';
import { useAppSelector } from '../../store/hooks/hooks';
import SingleTodo from '../SingleTodo/SingleTodo';
import "../styles.css"

const TodoList = () => {
  
const activeTodos = useAppSelector(state => state.todos.activeTodos)
const comletedTodos = useAppSelector(state => state.todos.comletedTodos)

  return <div className="container">
    <Droppable droppableId='TodosList'>

      {(provided, snapshot) => (
        <div 
        className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`} 
        ref={provided.innerRef} 
        {...provided.droppableProps}>
          <span className="todos__heading" >
            Active tasks
          </span>
          {activeTodos.map((todo, i) => (
            <SingleTodo key={todo.id} 
                        todo={todo}  
                        index={i}
                        />
          ))}
          {provided.placeholder}
        </div>
      )
      }
    </Droppable>

    <Droppable droppableId='TodosRemove'>

      {(provided, snapshot) => (
        <div 
        className={`todos remove ${snapshot.isDraggingOver ? "dragcomplete" : ""}`} 
        ref={provided.innerRef} 
        {...provided.droppableProps}>
          <span className="todos__heading" >
            Completed tasks
          </span>
          {comletedTodos.map((todo, i ) => (
            <SingleTodo key={todo.id} 
              todo={todo} 
              index={i} 
              />
          ))}
          {provided.placeholder}
        </div>
      )
      }
    </Droppable>
  </div>
}

export default TodoList