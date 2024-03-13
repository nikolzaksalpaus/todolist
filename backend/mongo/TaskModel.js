import mongoose from "./Connection.js"

const taskSchema = new mongoose.Schema({
    value: String,
    created: { type: Date, default: Date.now }
})

const TaskModel = mongoose.model('task', taskSchema)

export default TaskModel