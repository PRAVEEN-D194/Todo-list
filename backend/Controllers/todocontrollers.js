const Todolist = require('../module/todomodule.js');

const getlist = async (req, res)=>{
    try{
        const list = await Todolist.find({});
        console.log(list);
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
        const value = req.body;
        console.log(value);
        await Todolist.create(value);
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
        const id = req.params.id;
        const value = req.body;
        const list = await Todolist.findOneAndUpdate({_id:id},{$set:value},{new:true});
        res.status(201).json({
            success:true,
            list:list
        }) 
    }catch(err){
         res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

module.exports = {getlist:getlist, postlist:postlist, deletelist:deletelist, updatelist:updatelist};