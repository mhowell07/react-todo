import { useState } from 'react'

// custom components
import CustomForm from './components/CustomForm'
import TaskList from './components/TaskList'

function App() {
  const [tasks, setTasks] = useState([])

  const addTask = (task) => {
    setTasks(prevState => [...prevState, task])
  }

  const toggleTask = (id) => {
    setTasks(prevState => prevState.map(t => (
      t.id === id
        ? { ...t, checked: !t.checked }
        : t
    )))
  }

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(t => t.id !== id))
  }

  return (
    <div className="container">
      <header>
        <h1>My Task List</h1>
      </header>
      <CustomForm addTask={addTask} />
      {tasks && (
        <TaskList 
          tasks={tasks} 
          deleteTask={deleteTask} 
          toggleTask={toggleTask} 
        />
      )}
    </div>
  )
}

export default App
