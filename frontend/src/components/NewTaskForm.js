import { useState, useContext } from 'react'
import { TasksContext } from '../App'
import axios from 'axios'
import { Box, Button, Input } from '@mui/material'

export default function NewTaskForm ({columnId}) {

    const { tasks, setTasks } = useContext(TasksContext)

    const [value, setValue] = useState("")

    const create = (value) => {
        axios.put("http://localhost:3005/", null, { params: { value: value, columnId: columnId } })
            .then((response) => {
                setTasks([...tasks, response.data])
            })
    }

    return(
        <Box sx={{ p: 2, border: '1px solid grey', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
            <form onSubmit={(e) => {
                e.preventDefault()
                create(value)
                setValue("")
            }}>
                <Input type="text" name="value" value={value} onChange={(e) => setValue(e.target.value)} />
                <Button type="submit">Create</Button>
            </form>
        </Box>
    )
}