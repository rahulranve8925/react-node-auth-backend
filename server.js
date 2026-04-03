const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");


const user = {
    email:"rahulranve4234@gmail.com",
    password:"123456",
};

const SECRET_KEY = "mysecretkey"

app.use(cors());
app.use(express.json());


app.post("/login",(req,res)=>{
    const {email,password} = req.body;

    if(email === user.email && password === user.password){

        const token = jwt.sign(
            {email:user.email},
            SECRET_KEY,
            {expiresIn:"1h"}
        )

        return res.json({message:"Login Successfull..!!",token:token})
    }
    res.status(401).json({message:"Invalid Credentials"})
})

app.get("/protected",(req,res)=>{
    const token = req.headers["authorization"];

    if(!token){
        return res.status(403).json({message:"No token"});
    }
    try{
        const decoded = jwt.verify(token,SECRET_KEY);
        res.json({
            message:"Protected data access granted",
            user:decoded
        })
    }catch(error){
        res.status(401).json({message:"Invalid token"})
    }


})

app.listen(5000,()=>{
    console.log("server running on 5000");
})