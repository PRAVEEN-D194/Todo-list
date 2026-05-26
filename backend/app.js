const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connection = require("./config/db");
const router = require('./routes/todo');
const cors = require('cors');
require("./Controllers/scheduler"); 
dotenv.config({path:'./.env'})

const app=express();
app.use(cors());
app.use(express.json())
connection();

app.use('/', router);
const PORT = process.env.PORT || 8000
app.listen(PORT, ()=>{
    console.log("server is running");
})