import NewTaskForm from "./NewTaskForm";
import Tasks from "./Tasks";
import { useContext, useState, useEffect } from "react";
import { TasksContext } from "../App";
import { Box, Typography, Input, Button } from "@mui/material";
import axios from "axios";

export default function TasksColumn({column}){
    const parsedColumn = JSON.parse(column)
    const { tasks, setTasks, columns, setColumns } = useContext(TasksContext)
    const [columnTitle, setColumnTitle] = useState(parsedColumn.title)

    useEffect(() => {
        axios.post("http://localhost:3005/columns/", null, { params: { _id: parsedColumn._id, title: columnTitle } })
    }, [columnTitle])
    return(
        <Box>
            <Box sx={{ p: 2, border: '1px solid grey', borderRadius: '20px' }}>
                <Input value={columnTitle} onChange={(e) => {
                    setColumnTitle(e.target.value)
                }} />
                <Button onClick={() => {
                    axios.delete("http://localhost:3005/columns/", { params: { _id: parsedColumn._id } })
                    setTasks(tasks => tasks.filter(task => task.column_id !== parsedColumn._id))
                    setColumns(columns => columns.filter(column => column._id !== parsedColumn._id))
                }}>Delete</Button>
            </Box>
            <Tasks columnId={parsedColumn._id} />
            <NewTaskForm columnId={parsedColumn._id} />
        </Box>
    )
}