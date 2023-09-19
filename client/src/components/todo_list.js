import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

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

    function todoList() {
        return todos.map((todo) => {
            return (
                <li key={todo._id}>{todo.title}</li>
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