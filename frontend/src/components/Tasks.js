import { useContext, useState, useEffect } from 'react'
import { TasksContext } from '../App'
import axios from 'axios'
import { Button, Input, Typography, Box } from '@mui/material'

function Task ({task, deleteTask}) {
    const { tasks, setTasks } = useContext(TasksContext)

    const parsedTask = JSON.parse(task)
    const dateCreated = new Date(parsedTask.created)
    const formattedDateCreated = `${dateCreated.getFullYear()}.${("0" + dateCreated.getMonth()).slice(-2)}.${("0" + dateCreated.getDay()).slice(-2)} klo ${dateCreated.getHours()}.${("0" + dateCreated.getMinutes()).slice(-2)}`

    const [value, setValue] = useState(parsedTask.value)

    useEffect(() => {
        axios.post("http://localhost:3005/", null, { params: { _id: parsedTask._id, value: value } })
    }, [value])

    return(
        <>
            <Box component="section" sx={{ p: 2, border: '1px solid grey', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
                <Input value={value} onChange={(e) => {
                    setValue(e.target.value)
                }} />
                <Typography variant="body2">{formattedDateCreated}</Typography>
                <Button onClick={() => {
                    axios.delete("http://localhost:3005/", { params: { _id: parsedTask._id } })
                    setTasks((tasks) => tasks.filter(task => task._id !== parsedTask._id))
                }}>Delete</Button>
            </Box>
        </>
    )
}

export default function Tasks ({columnId}) {
    const { tasks, setTasks } = useContext(TasksContext)
    console.log(tasks)

    return(
        <>
            {
                tasks.filter(task => task.column_id === columnId).map((task) => (
                        <Task task={JSON.stringify(task)} key={task._id} />
                    )
                )
            }
        </>
    )
}