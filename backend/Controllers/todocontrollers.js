const Todolist = require('../module/todomodule.js');

const getlist = async (req, res)=>{

    try{
        
        const list = await Todolist.find().sort({timenumber:1});
        res.status(201).json({
            success:true,
            list:list,
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

const postlist = async (req, res)=>{
    try{
         const convertTimetoNumber = (timestr)=>{
        let [time, modifier] = timestr.split(" "); 
        let [hour, minute] = time.split(":");

        let hours = parseInt(hour)
        let minutes = parseInt(minute)

        if(modifier=="AM" && hours === 12){
            hours = 0;
        }
        else if(modifier=="PM" && hours !== 12){
            hours = hours + 12;
        }
        return hours*100 + minutes;

    }

        const value = req.body;
         const newTodo = {
        ...value,
        timenumber: convertTimetoNumber(value.time)
        };
        await Todolist.create(newTodo);
        res.status(201).json({
            success:true,
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

const deletelist = async (req, res)=>{
    try{
        const id = req.params.id;
        await Todolist.findOneAndDelete({_id:id});
        res.status(201).json({
            success:true,
        }) 
    }catch(err){
         res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}


const updatelist = async (req, res)=>{
    try{
           const convertTimetoNumber = (timestr)=>{
        let [time, modifier] = timestr.split(" "); 
        let [hour, minute] = time.split(":");

        let hours = parseInt(hour)
        let minutes = parseInt(minute)

        if(modifier=="AM" && hours === 12){
            hours = 0;
        }
        else if(modifier=="PM" && hours !== 12){
            hours = hours + 12;
        }
        return hours*100 + minutes;

    }

        const value = req.body;
         const newTodo = {
        ...value,
        timenumber: convertTimetoNumber(value.time)
        };
        const id = req.params.id;

        const list = await Todolist.findOneAndUpdate({_id:id},{$set:newTodo},{returnDocument:'after'});
        res.status(201).json({
            success:true,
            list:list,
        }) 
    }catch(err){
         res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

const updatecompleted = async(req,res)=>{
    try{
        const id = req.params.id;
        const list = await Todolist.findById({_id:id});
        list.completed = req.body.completed;
        await list.save();
        res.status(201).json({
            success:true
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

module.exports = {getlist:getlist, postlist:postlist, deletelist:deletelist,updatecompleted:updatecompleted, updatelist:updatelist};