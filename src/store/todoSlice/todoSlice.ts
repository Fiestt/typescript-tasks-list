import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Todo } from "../../components/model"

interface TodosState {
    activeTodos: Todo[]
    comletedTodos: Todo[]
}

interface acceptEditActiveTodoProps {
    id: number;
    editTodo: string
}

const initialState: TodosState = {
    activeTodos: [],
    comletedTodos: []
}

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        getCurrentActiveTodos(state, action) {
            state.activeTodos = action.payload
        },

        getCurrentCompletedTodos(state, action) {
            state.comletedTodos = action.payload
        },

        addTodo(state, action: PayloadAction<string>) {
           state.activeTodos.push({ id: Date.now(), todo: action.payload, isDone: false })
        },

        getNewTodos(state, action: PayloadAction<Todo[]>) {
            state.activeTodos = action.payload
        },

        getNewCompletedTodos(state, action: PayloadAction<Todo[]>) {
            state.comletedTodos = action.payload
        },

        handleDoneActive(state, action: PayloadAction<number>) {
            state.activeTodos = state.activeTodos.map(todo => todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo)
        },

        handleDoneCompleted(state, action: PayloadAction<number>) {
            state.comletedTodos = state.comletedTodos.map(todo => todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo)
        },

        handleDeleteActive(state, action: PayloadAction<number>) {
            state.activeTodos = state.activeTodos.filter((todo) => todo.id !== action.payload)
        },

        handleDeleteCompleted(state, action: PayloadAction<number>) {
            state.comletedTodos = state.comletedTodos.filter((todo) => todo.id !== action.payload)
        },

        acceptEditActiveTodo(state, action: PayloadAction<acceptEditActiveTodoProps>) {
            state.activeTodos = state.activeTodos.map((todo) => (
                todo.id === action.payload.id ? {...todo, todo: action.payload.editTodo} : todo
            ))
        },
        
        acceptEditCompletedTodo(state, action: PayloadAction<acceptEditActiveTodoProps>) {
            state.comletedTodos = state.comletedTodos.map((todo) => (
                todo.id === action.payload.id ? {...todo, todo: action.payload.editTodo} : todo
            ))
        }
    }
})

export const { getCurrentActiveTodos, getCurrentCompletedTodos, addTodo, getNewTodos, getNewCompletedTodos, handleDoneActive, handleDoneCompleted, handleDeleteActive, handleDeleteCompleted, acceptEditActiveTodo, acceptEditCompletedTodo} = todoSlice.actions

export default todoSlice.reducer