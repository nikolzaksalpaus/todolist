import { Box, Button, Input } from "@mui/material";
import axios from "axios";
import { useState, useContext } from "react";
import { TasksContext } from "../App";

export default function NewColumnForm(){
    const { columns, setColumns } = useContext(TasksContext)
    const [value, setValue] = useState("")
    return(
        <>
            <Box>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    axios.put("http://localhost:3005/columns/", null, { params: { title: value } })
                        .then((response) => {
                            setColumns([...columns, response.data])
                        })
                    setValue("")
                }}>
                    <Input value={value} onChange={(e) => {
                        setValue(e.target.value)
                    }} />
                    <Button type="submit">New column</Button>
                </form>
            </Box>
        </>
    )
}