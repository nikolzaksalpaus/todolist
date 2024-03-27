import express from 'express'
import TaskModel from './mongo/TaskModel.js'
import cors from 'cors'
import ColumnModel from './mongo/ColumnModel.js'
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

app.get('/columns/', async (req, res) => {

    try{
        const result = await ColumnModel.find()
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
            value: req.query.value,
            column_id: req.query.columnId
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

app.put('/columns/', async (req, res) => {

    try{
        const data = {
            title: req.query.title
        }
        const newTask = await ColumnModel.create(data)
        return res.status(200).json(newTask)
    } catch (e) {
        const result = {
            error: e
        }
        return res.status(500).json(result)
    }
    
})

app.post('/columns/', async (req, res) => {

    try{
        const data = {
            _id: req.query._id,
            title: req.query.title
        }
        const editedColumn = await ColumnModel.findOneAndUpdate( { _id: data._id }, { title: data.title } )
        return res.status(200).json(editedColumn)
    } catch (e) {
        const result = {
            error: e
        }
        return res.status(500).json(result)
    }

})

app.post('/', async (req, res) => {

    try{
        const data = {
            _id: req.query._id,
            value: req.query.value
        }
        const editedTask = await TaskModel.findOneAndUpdate( { _id: data._id }, { value: data.value } )
        return res.status(200).json(editedTask)
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

app.delete('/columns/', async (req, res) => {
    try{
        const result = {
            message: "Column and its tasks deleted"
        }
        await TaskModel.deleteMany({ column_id: req.query._id })
        await ColumnModel.findByIdAndDelete(req.query._id)
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