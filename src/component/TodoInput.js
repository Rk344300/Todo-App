import React,{useState,useContext,useEffect,useRef} from 'react'
import shortid from 'shortid';
import {TodoContext} from '../context/TodoProvider'
import { UPDATE_TODO } from '../context/Constants';

const TodoInput = (props) => {
    const inputRef =useRef();
    const[title,setTitle]=useState("");
    const todoContext= useContext(TodoContext);
    const{CreateTodo,currentTodo,UpdateTodo} = todoContext;

useEffect(() => {
    if(currentTodo!=null)
    setTitle(currentTodo.title)
    inputRef.current.focus();

},[currentTodo])

    const onSubmit =(e) =>{

        e.preventDefault();
        if(currentTodo!=null){
            const update_todo={
                id:currentTodo.id,
                title,
                completed:currentTodo.completed,
            };
            UpdateTodo(update_todo);
           
        
        }else{
        const new_todo={
            id:shortid.generate(),
            title,
            completed:false,
        };
        CreateTodo(new_todo);
    }
        setTitle("");
        inputRef.current.blur();
    }
    return (
        <div>
            <form onSubmit={(e) =>onSubmit(e)}>
            <input type="text" 
            className={`todo-input ${currentTodo != null? `update`:null}`}
            placeholder="Enter your todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            ref={inputRef} />
        </form>
        </div>
    )
}

export default TodoInput
