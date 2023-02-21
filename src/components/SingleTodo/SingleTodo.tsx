import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model'
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { MdDone } from "react-icons/md"
import "../styles.css"
import { Draggable } from 'react-beautiful-dnd'

type Props = {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    index: number
}

const SingleTodo = ({ todo, todos, setTodos, index }: Props) => {

    const [edit, setEdit] = useState<Boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)
    
    const inputRef = useRef<HTMLInputElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [edit])


    const handleDone = (id: number) => {
        let reuslt = todos.map((todo) => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)
        setTodos(reuslt)
        if (titleRef.current?.parentElement?.previousElementSibling?.innerHTML === "Completed tasks") {
            localStorage.setItem("completed", JSON.stringify(reuslt))
        } else {
            localStorage.setItem("todos", JSON.stringify(reuslt))
        }
    }

    const handleDelete = (id: number) => {
        let result = todos.filter((todo) => todo.id !== id)
        setTodos(result)
        console.log(titleRef.current?.parentElement?.previousElementSibling?.innerHTML, todos)
        if (titleRef.current?.parentElement?.previousElementSibling?.innerHTML === "Completed tasks") {
            localStorage.setItem("completed", JSON.stringify(result))
        } else {
            localStorage.setItem("todos", JSON.stringify(result))
        }
    } 

    const handleEdit = () => {
        if (!edit && !todo.isDone) {
            setEdit(!edit)
            
        }
    }

    const acceptEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault()
        setTodos(todos.map((todo) => (
            todo.id === id ? {...todo, todo: editTodo} : todo
        )))
        setEdit(false)
    }

    return (
        <Draggable draggableId={todo.id.toString()} index={index}> 
        {(provided, snapshot) => (
            <form className={`todos__single ${snapshot.isDragging ? "drag" : ""}`} 
            onSubmit={(e) => acceptEdit(e, todo.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}>

                {edit ? (
                    <input value={editTodo} 
                            onChange={(e) => setEditTodo(e.target.value)} 
                            className="todos__single--text"
                            ref={inputRef}/>
                ) : (
                    todo.isDone ? (
                        <s className='todos__single--text'>{todo.todo}</s>
                    ) : (
                        <span className='todos__single--text'>{todo.todo}</span>
                    )
                )}

                <div ref = {titleRef}>
                    <span className='icon'>
                        <AiFillEdit onClick={() => handleEdit()} />
                    </span>
                    <span className='icon'>
                        <AiFillDelete onClick={() => handleDelete(todo.id)} />
                    </span>
                    <span className='icon' onClick={() => handleDone(todo.id)}>
                        <MdDone />
                    </span>
                </div>
            </form>
        )}  
        </Draggable>
    )
}

export default SingleTodo
