const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    date:{
        type:Date,
        default: Date.now()
    }
});

module.exports=mongoose.model("Task", taskSchema);