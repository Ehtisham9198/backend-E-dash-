require('./db_connect');
const User = require('./Schema');
const express = require('express');
const app = express(); 
const cors = require('cors');

app.use(cors());
app.use(express.json());


app.post('/signup',async(req,res)=>{
    let Myuser = new User(req.body);
    let result = await Myuser.save();
    result=result.toObject();
    delete result.password;
    res.send(result)
});

app.post('/login',async(req,res)=>{
    if(req.body.password && req.body.email){
    let user = await User.findOne(req.body).select("-password");
    if(user)
    {
        res.send(user);
    }
    else
    {
        res.send({result:'No user Found'});
    }}
    else
    {
        res.send({result:'No user Found'});
    }

   
});
app.listen(3000);
