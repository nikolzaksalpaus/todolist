import { useState, useContext } from 'react'
import { TasksContext } from '../App'
import axios from 'axios'

export default function NewTaskForm () {

    const { tasks, setTasks } = useContext(TasksContext)

    const [value, setValue] = useState("")

    const create = (value) => {
        axios.put("http://localhost:3005/", null, { params: { value: value } })
            .then((response) => {
                setTasks([...tasks, response.data])
            })
    }

    return(
        <>
            <form onSubmit={(e) => {
                e.preventDefault()
                create(value)
                setValue("")
            }}>
                <input type="text" name="value" value={value} onChange={(e) => setValue(e.target.value)} />
                <button type="submit">Create</button>
            </form>
        </>
    )
}