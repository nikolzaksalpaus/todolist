import mongoose from "./Connection.js"

const columnSchema = new mongoose.Schema({
    title: String
})

const ColumnModel = mongoose.model('column', columnSchema)

export default ColumnModel