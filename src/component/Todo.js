import React,{useContext} from 'react'
import {TodoContext} from '../context/TodoProvider'

const Todo = (props) => {
    const todoContext=useContext(TodoContext);
    const{DeleteTodo,SetTodo,CompleteTodo} =todoContext;
    return (
        <div>
             <li>
             {
                 props.todo.completed ? (<span></span>):
                 <span className="material-icons"onClick={()=> SetTodo(props.todo)}>create</span>

             }
            <span className={`${props.todo.completed ? `completed`: null}`}
            onClick={() => CompleteTodo(props.todo.id)}
            >{props.todo.title}</span>
        <span className="material-icons" onClick={() =>DeleteTodo(props.todo.id)}>delete</span></li>
        </div>
    )
}

export default Todo;
