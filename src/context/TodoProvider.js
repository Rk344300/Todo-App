import React,{createContext,useReducer} from 'react';
import {GET_TODOS,CREATE_TODO,DELETE_TODO,UPDATE_TODO,SET_TODO,COMPLETE_TODO}from './Constants'
 
export const TodoContext= createContext();

//Reducer
const todoReducer =(state,action) =>{
    switch(action.type){
        case CREATE_TODO:
            return{
                ...state,
                todos:[action.payload,...state.todos]
            }
            case UPDATE_TODO:
                return{
                    ...state,
                    todos:state.todos.map((todo)=>
                        todo.id==action.payload.id ? action.payload:todo
                    ),
                }
            case SET_TODO:
                return{
                    ...state,
                    currentTodo:action.payload
                }
           case DELETE_TODO:
               return{
                   ...state,
                   todos:state.todos.filter((todo) => todo.id!==action.payload)
               }
               case COMPLETE_TODO:
                   return{
                       ...state,
                       todos:state.todos.map((todo)=> todo.id==action.payload ? Object.assign(todo,{completed:true}):todo)
                   }
        default: 
        return state;
    }

};


const TodoProvider = (props) =>{
 const initialState={
     todos: [
        {
          "userId": 1,
          "id": 1,
          "title": "delectus aut autem",
          "completed": false
        },
        {
          "userId": 1,
          "id": 2,
          "title": "quis ut nam facilis et officia qui",
          "completed": false
        },
        {
          "userId": 1,
          "id": 3,
          "title": "fugiat veniam minus",
          "completed": false
        },
        {
          "userId": 1,
          "id": 4,
          "title": "et porro tempora",
          "completed": true
        },
        {
          "userId": 1,
          "id": 5,
          "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
          "completed": false
        },],
     currentTodo:null,
 };

const[state,dispatch]=useReducer(todoReducer,initialState)

//action
const CreateTodo= todo => {
    dispatch({
        type:CREATE_TODO,
        payload:todo
    })
}
const UpdateTodo = todo =>{
    dispatch({
        type:UPDATE_TODO,
        payload:todo
    })
}
const DeleteTodo =id =>{
    dispatch({
        type:DELETE_TODO,
        payload:id,
    })
}
const SetTodo = todo =>{
    dispatch({
      type:SET_TODO,
      payload:todo,  
    })
}
const CompleteTodo= id =>{
    dispatch({
        type:COMPLETE_TODO,
        payload:id
    })
}
return (
    <TodoContext.Provider value={{
        todos:state.todos,
        currentTodo:state.currentTodo,
        CreateTodo,
        UpdateTodo,
        DeleteTodo,
        SetTodo,
        CompleteTodo,
    }}>
        {props.children}
    </TodoContext.Provider>
)

}
export default TodoProvider;