import express from 'express'
import TaskModel from './mongo/TaskModel.js'
import cors from 'cors'
const app = express()
const port = 3005

app.use(cors())

app.get('/', async (req, res) => {

    try{
        const result = await TaskModel.find()
        return res.status(200).json(result)
    } catch (e) {
        const result = {
            error: e
        }
        return res.status(500).json(result)
    }
    
})

app.put('/', async (req, res) => {

    try{
        const data = {
            value: req.query.value
        }
        const newTask = await TaskModel.create(data)
        return res.status(200).json(newTask)
    } catch (e) {
        const result = {
            error: e
        }
        return res.status(500).json(result)
    }
    
})

app.delete('/', async (req, res) => {
    try{
        const result = {
            message: "Task deleted"
        }
        await TaskModel.findByIdAndDelete(req.query._id)
        return res.status(200).json(result)
    } catch (e) {
        const result = {
            error: e
        }
        return res.status(500).json(result)
    }
})

app.listen(port, () => {
    console.log(`Backend listening on port ${port}`)
})