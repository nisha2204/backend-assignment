//const express=require('express');
//const dotenv=require('dotenv');
const router=require("express").Router();
const jwt=require('jsonwebtoken');
const Task=require('./taskModel')


router.post("/authorize", (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    if(req.body.username=="nisha" && req.body.password==="abcdefgh"){
        let user = {
            email: "nisha@gmail.com",
            userId: 01,
        }
      
        jwt.sign({user}, 'jwtSecretKey', { expiresIn: '1h' },(err, token) => {
            if(err) { console.log(err) }    
            res.send(token);
        });
    }
    else{
        res.status(400);
        res.send("username and password does not match")
    }
});


const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}

router.post('/addTask', checkToken, (req, res)=>{
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    
      // Create a Tutorial
      const task = new Task({
        name: req.body.name
      });
    
      // Save Tutorial in the database
      task
        .save(task)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred ."
          });
        });
})

router.patch('/updateTask/:id',checkToken, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Task.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/delete/:id',checkToken, async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Task.findByIdAndDelete(id)
        res.send(`Document with "${data.name}" has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/getTasks',checkToken, async (req, res) => {
    try{
        const data = await Task.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/getOneTask/:id',checkToken, async (req, res) => {
    try{
        const data = await Task.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


module.exports=router;