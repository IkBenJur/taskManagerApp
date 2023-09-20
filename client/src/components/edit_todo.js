import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

export default function EditTodo() {
    const [todoForm, setTodoForm] = useState({
        title: "",
        description: ""
      });

      const params = useParams();
      const navigate = useNavigate();

      useEffect(() => {
        async function fetchTodo () {
            const todoId = params.id.toString()
            const response = await fetch(`http://localhost:5000/todos/${todoId}`)

            if (!response.ok) {
                const error = `An error occured: ${response.statusText}`;
                window.alert(error);
                return;
            };

            const todo = await response.json();
            if (!todo) {
                window.alert(`Todo with ID ${todoId} not found`);
                navigate('/');
                return;
            };

            setTodoForm(todo);
        };

        fetchTodo();

        return;
      }, [params.id, navigate]);
     

    return (
        <div>
            Hello {params.id.toString()}
        </div>
    )
}