import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function CreateTodo() {
    const [todoForm, setTodoForm] = useState({
        title: "",
        description: "",
    });
    const navigate = useNavigate();

    function updateTodoForm(value) {
        return setTodoForm((prev) => {
            return { ...prev, ...value };
        });
    };

    async function onSubmit(e) {
        e.preventDefault();

        const newTodo = { ...todoForm };

        await fetch("http://localhost:5000/todos/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTodo)
        })
        .catch( err => {
            window.alert(err);
            return;
        });

        setTodoForm({
            title: "",
            description: "",
        });
        navigate("/");
    }

    return (
        <div>
            <h1>Create new Todo</h1>
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
                    id="description"
                    value={todoForm.description}
                    onChange={(e) => updateTodoForm({ description: e.target.value })}
                />
                <input 
                    type="submit"
                    value="Create Todo"
                />
            </form>
        </div>
    )
}