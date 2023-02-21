import React, { useRef } from 'react'
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../model';
import SingleTodo from '../SingleTodo/SingleTodo';
import "../styles.css"

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList = ({ todos, setTodos, completedTodos, setCompletedTodos }: Props) => {
  


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
          {todos.map((todo, i) => (
            <SingleTodo key={todo.id} 
                        todo={todo} todos={todos} 
                        setTodos={setTodos} 
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
          {completedTodos.map((todo, i ) => (
            <SingleTodo key={todo.id} 
              todo={todo} 
              todos={completedTodos} 
              setTodos={setCompletedTodos}
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