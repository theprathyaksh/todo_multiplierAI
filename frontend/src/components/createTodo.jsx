import { useState, useEffect } from "react";
import axios from "axios";

export function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);

    
    useEffect(() => {
        axios.get("http://localhost:3000/todos")
            .then(res => {
                setTodos(res.data.todos);
            });
    }, []);

    
    const addTodo = () => {
        axios.post("http://localhost:3000/todo", { title, description })
            .then(res => {
                alert("Todo Added");

                
                axios.get("http://localhost:3000/todos")
                    .then(res => {
                        setTodos(res.data.todos);
                    });
            });
    };

    
    const deleteTodo = (id) => {
        axios.delete(`http://localhost:3000/todos/${id}`)
            .then(res => {
                alert("Todo Deleted");

                
                axios.get("http://localhost:3000/todos")
                    .then(res => {
                        setTodos(res.data.todos);
                    });
            });
    };

    return (
        <div>
            <input 
                id="title"
                style={{ padding: 10, margin: 10 }}
                type="text"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
            /><br />
            <input 
                id="description"
                style={{ padding: 10, margin: 10 }}
                type="text"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
            /><br /> 
            <button 
                style={{ padding: 10, margin: 10 }}
                onClick={addTodo}
            >
                Add Todo
            </button>
            <div>
                <h2>Todo List</h2>
                {todos.map(todo => (
                    <div key={todo._id} style={{ border: "1px solid black", padding: 10, margin: 10 }}>
                        <h3>{todo.title}</h3>
                        <p>{todo.description}</p>
                        <button onClick={() => deleteTodo(todo._id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
