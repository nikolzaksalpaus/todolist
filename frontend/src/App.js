import './App.css';
import axios from 'axios';
import { useEffect, useState, createContext } from 'react'
import Tasks from './components/Tasks';
import NewTaskForm from './components/NewTaskForm';

export const TasksContext = createContext([])

function App() {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3005/")
            .then((response) => {
                setTasks(response.data)
            })
    }, [])
    
    return (
        <div className="App">
            <TasksContext.Provider value={{ tasks: tasks, setTasks: setTasks }}>
                <NewTaskForm />
                <Tasks tasks={JSON.stringify(tasks)} />
            </TasksContext.Provider>
        </div>
    );
}

export default App;
