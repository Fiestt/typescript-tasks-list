import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model'
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { MdDone } from "react-icons/md"
import "../styles.css"
import { Draggable } from 'react-beautiful-dnd'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { handleDoneActive, handleDoneCompleted, handleDeleteActive, handleDeleteCompleted, acceptEditActiveTodo, acceptEditCompletedTodo } from '../../store/todoSlice/todoSlice'

type Props = {
    todo: Todo;
    index: number
}

const SingleTodo = ({ todo, index }: Props) => {

    const todos = useAppSelector(state => state.todos.activeTodos)
    const dispatch = useAppDispatch()

    const [edit, setEdit] = useState<Boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)
    
    const inputRef = useRef<HTMLInputElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [edit])


    const handleDone = (id: number) => {
        console.log(todos)
        let res = todos.find(todo => todo.id === id)
        if (typeof res !== "undefined") {
            dispatch(handleDoneActive(id))
        } else {
            dispatch(handleDoneCompleted(id))
        }
    }

    const handleDelete = (id: number) => {
        let res = todos.find(todo => todo.id === id)
        if (typeof res !== "undefined") {
            dispatch(handleDeleteActive(id))
        } else {
            dispatch(handleDeleteCompleted(id))
        }
    } 

    const handleEdit = () => {
        if (!edit && !todo.isDone) {
            setEdit(!edit)
            
        }
    }

    const acceptEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault()
        let res = todos.find(todo => todo.id === id)
        if (typeof res !== "undefined") {
            dispatch(acceptEditActiveTodo({id, editTodo}))
        } else {
            dispatch(acceptEditCompletedTodo({id, editTodo}))
        }
        dispatch(acceptEditActiveTodo({id, editTodo}))
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
