import { useState } from "react"
import { CreateTodo } from "./components/createTodo"
import { Todos } from "./components/Todos"
function App() {
  const [todos, setTodos] = useState([]);
  
  return (
      <div>
        <CreateTodo/>
        <Todos todos= {todos}/>
      </div>
  )
}

export default App
