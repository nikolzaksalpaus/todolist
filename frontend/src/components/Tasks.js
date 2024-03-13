import { useContext, useState } from 'react'
import { TasksContext } from '../App'
import axios from 'axios'

function Task ({task, deleteTask}) {
    const { tasks, setTasks } = useContext(TasksContext)

    const parsedTask = JSON.parse(task)
    const dateCreated = new Date(parsedTask.created)
    const formattedDateCreated = `${dateCreated.getFullYear()}.${("0" + dateCreated.getMonth()).slice(-2)}.${("0" + dateCreated.getDay()).slice(-2)} klo ${dateCreated.getHours()}.${("0" + dateCreated.getMinutes()).slice(-2)}`

    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState(parsedTask.value)

    return(
        <>
            <div>
                <div contentEditable={editMode} onInput={(e) => setValue(e.target.textContent)} onClick={(e) => {if(!editMode) {
                    setEditMode(true);
                    e.target.focus(); // wont work
                    }}}>{value}</div>, {formattedDateCreated}
                {editMode ? (
                    <>
                        <button onClick={() => {
                                setEditMode(false);
                                setValue(parsedTask.value);
                            }}>Cancel</button>
                        <button onClick={() => setEditMode(false)}>Confirm</button>
                    </>
                ) : (
                    <button onClick={() => {
                        setEditMode(false);
                        // add update request here and update the task in useEffect as well
                    }}>Edit</button>
                )}
                <button onClick={() => {
                    axios.delete("http://localhost:3005/", { params: { _id: parsedTask._id } })
                    setTasks((tasks) => tasks.filter(task => task._id !== parsedTask._id))
                }}>Delete</button>
            </div>
        </>
    )
}

export default function Tasks () {
    const { tasks, setTasks } = useContext(TasksContext)

    return(
        <>
            {
                tasks.map((task) => (
                        <Task task={JSON.stringify(task)} key={task._id} />
                    )
                )
            }
        </>
    )
}