const express=require('express');
const dotenv=require('dotenv');
const jwt=require('jsonwebtoken');
const cors=require('cors');
const mongoose=require("mongoose");

const app=express();
dotenv.config();
let PORT=process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is up and running on ${PORT} ...`);
})

mongoose.connect(process.env.DB_CONNECT,
    {useNewUrlParser:true, UseUnifiedTopology:true}, ()=>console.log("Conectd to db"));

const authroute=require('./auth');

app.use(express.json(), cors());

app.use("/", authroute);