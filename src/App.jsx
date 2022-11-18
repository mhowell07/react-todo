import { useState } from 'react'

// custom components
import CustomForm from './components/CustomForm'
import EditForm from './components/EditForm'
import TaskList from './components/TaskList'

function App() {
  const [tasks, setTasks] = useState([])
  const [previousFocusEl, setPreviousFocusEl] = useState([])
  const [editedTask, setEditedTask] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

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

  const updateTask = (task) => {
    setTasks(prevState => prevState.map(t => (
      t.id === task.id
        ? { ...t, name: task.name }
        : t
    )))
    closeEditMode();
  }

  const closeEditMode = () => {
    setIsEditing(false);
    previousFocusEl.focus();
  }

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
  }

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(t => t.id !== id))
  }

  return (
    <div className="container">
      <header>
        <h1>My Task List</h1>
      </header>
      {
        isEditing && (
          <EditForm 
            editedTask={editedTask}
            updateTask={updateTask}
            closeEditMode={closeEditMode}
          />
        )
      }
      <CustomForm addTask={addTask} />
      {tasks && (
        <TaskList 
          tasks={tasks} 
          deleteTask={deleteTask} 
          toggleTask={toggleTask} 
          enterEditMode={enterEditMode} 
        />
      )}
    </div>
  )
}

export default App
