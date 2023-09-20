import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Todo = (props) => (
    <li>
        <div style={props.todo.is_completed ? {"text-decoration": "line-through"} : null}> 
            <h2>{props.todo.title}</h2>
            <p>{props.todo.description}</p>
        </div>
        <div>    
            <Link to={`/edit/${props.todo._id}`}>Edit</Link>
            <button onClick={ () => props.completeTodo(props.todo._id)}>Complete</button>
            <button onClick={ () => props.deleteTodo(props.todo._id, props.todo.is_completed)}>Delete</button>
        </div>
    </li>
)

export default function ShowTodos() {
    const [ todos, setTodos ] = useState([]);

    useEffect(() => {
        async function getTodos() {
            const response = await fetch('http://localhost:5000/todos/');

            if (!response.ok) {
                const error = `An error occured: ${response.statusText}`;
                window.alert(error);
                return;
            };

            const todos = await response.json();
            setTodos(todos);
        };

        getTodos();

        return;
    }, [todos.length]);

    async function deleteTodo(id) {
        await fetch(`http://localhost:5000/todos/${id}`, {
            method: 'DELETE'
        });

        const newTodos = todos.filter(el => el._id !== id);
        setTodos(newTodos);
    };

    async function completeTodo(id, current_value) {
        await fetch(`http://localhost:5000/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                is_completed: !current_value
            })
        });

        const newTodos = todos.map(todo => {
            if (todo._id === id ){
                return {
                    ...todo,
                    is_completed: !current_value
                };
            };
            return todo;
        });

        setTodos(newTodos)
    };

    function todoList() {
        return todos.map((todo) => {
            return (
                <Todo 
                    key = {todo._id}
                    todo={todo}
                    deleteTodo={() => deleteTodo(todo._id)}
                    completeTodo={() => completeTodo(todo._id, todo.is_completed)}
                />
            )
        })
    }

    return (
        <div>
            <Link to={`/create`}>Create New Todo</Link>
            <ul>
                {todoList()}
            </ul>
        </div>
    )
}