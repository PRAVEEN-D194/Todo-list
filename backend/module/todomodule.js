const mongoose = require("mongoose");

const Todolist = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    description:{
        type: String,
        required:true,
    }
},{timestamps:true})

module.exports = mongoose.model("Todolist",Todolist);