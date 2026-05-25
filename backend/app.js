const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connection = require("./config/db");
const router = require('./routes/todo');
const cors = require('cors');

dotenv.config({path:'./.env'})

const app=express();
app.use(cors());
app.use(express.json())
connection();

app.use('/', router);

app.listen(8000, ()=>{
    console.log("server is running");
})