import { useState, useEffect } from "react";

export function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);

    
    useEffect(() => {
        fetch("http://localhost:3000/todos")
            .then(res => res.json())
            .then(data => {
                setTodos(data.todos);
            });
    }, []);

   
    const addTodo = () => {
        fetch("http://localhost:3000/todo", {
            method: "POST",
            body: JSON.stringify({ title, description }),
            headers: { "Content-Type": "application/json" }
        })
            .then(async res => {
                const json = await res.json();
                alert("Todo Added");

                
                fetch("http://localhost:3000/todos")
                    .then(res => res.json())
                    .then(data => {
                        setTodos(data.todos);
                    });
            });
    };

    
    const deleteTodo = (id) => {
        fetch(`http://localhost:3000/todos/${id}`, {
            method: "DELETE"
        })
            .then(async res => {
                const json = await res.json();
                alert("Todo Deleted");

                // Fetch the updated list of todos
                fetch("http://localhost:3000/todos")
                    .then(res => res.json())
                    .then(data => {
                        setTodos(data.todos);
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
