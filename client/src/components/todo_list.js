import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Todo = (props) => (
    <li>
        <h2>{props.todo.title}</h2>
        <p>{props.todo.description}</p>
        <Link to={`/edit/${props.todo._id}`}>Edit</Link>
        <button onClick={ () => props.deleteTodo(props.todo._id)}>Delete</button>
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

    function todoList() {
        return todos.map((todo) => {
            return (
                <Todo 
                    todo={todo}
                    deleteTodo={() => deleteTodo(todo._id)}
                />
            )
        })
    }

    return (
        <div>
            <ul>
                {todoList()}
            </ul>
        </div>
    )
}