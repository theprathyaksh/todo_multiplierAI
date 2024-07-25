const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://b182782:modi100@cluster0.dolx0xb.mongodb.net/todos')

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todos', todoSchema);

module.exports = {
    todo
}