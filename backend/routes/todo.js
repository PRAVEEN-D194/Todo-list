const express = require("express");
const router = express.Router();
const {getlist, postlist, deletelist, updatelist} = require("../Controllers/todocontrollers");

router.get('/get', getlist);
router.post('/post', postlist);
router.delete('/delete/:id', deletelist);
router.put('/update/:id', updatelist);

module.exports=router;