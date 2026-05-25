const mongoose = require("mongoose");

const connection = async()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("DB connected")
    }catch(err){
        console.log(err);
    }
}

module.exports = connection;