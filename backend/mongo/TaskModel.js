import mongoose from "./Connection.js"
import { Schema } from "mongoose"

const taskSchema = new mongoose.Schema({
    value: String,
    created: { type: Date, default: Date.now },
    column_id: Schema.Types.ObjectId
})

const TaskModel = mongoose.model('task', taskSchema)

export default TaskModel