const mongoose = require("mongoose");

const Todolist = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    description:{
        type: String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    messagetime:{
        type:String,
    },
    completed:{
        type:Boolean,
        default:false,
    }
    
},{timestamps:true})



module.exports = mongoose.model("Todolist",Todolist);