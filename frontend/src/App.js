import './App.css';
import axios from 'axios';
import { useEffect, useState, createContext } from 'react'
import Tasks from './components/Tasks';
import NewTaskForm from './components/NewTaskForm';
import { Box, Button } from '@mui/material';
import TasksColumn from './components/TasksColumn';
import NewColumnForm from './components/NewColumnForm';

export const TasksContext = createContext([])

function App() {
    const [tasks, setTasks] = useState([])
    const [columns, setColumns] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3005/")
            .then((response) => {
                setTasks(response.data)
            })
        axios.get("http://localhost:3005/columns/")
            .then((response) => {
                setColumns(response.data)
            })
    }, [])
    
    return (
        <div className="App">
            <TasksContext.Provider value={{ tasks: tasks, setTasks: setTasks, columns: columns, setColumns: setColumns }}>
                <NewColumnForm />
                <Box sx={{ display: "flex" }}>
                    {columns.map((column) => (
                        <TasksColumn column={JSON.stringify(column)} key={column._id} />
                    ))}
                </Box>
            </TasksContext.Provider>
        </div>
    );
}

export default App;
