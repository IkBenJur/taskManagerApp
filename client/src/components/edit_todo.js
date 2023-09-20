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
    
    function updateTodoForm(newTodoForm) {
        return setTodoForm((prev) => {
            return { ...prev, ...newTodoForm }
        });
    };

    async function onSubmit(e) {
        e.preventDefault();

        const updatedTodo = { ...todoForm };

        const id = params.id.toString();
        const response = await fetch(`http://localhost:5000/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTodo),
        });

        console.log(await response.json())

        navigate('/');
    }

    return (
        <div>
            <h1>Update todo</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="title">Title</label>
                <input 
                    type="text"
                    id="title"
                    value={todoForm.title}
                    onChange={(e) => updateTodoForm({ title: e.target.value })}
                />
                <label htmlFor="description">Description</label>
                <textarea 
                    type="text"
                    id="description"
                    value={todoForm.description}
                    onChange={(e) => updateTodoForm({ description: e.target.value })}
                />
                <input 
                    type="submit"
                    value="Update Todo"
                />
            </form>
        </div>
    )
}