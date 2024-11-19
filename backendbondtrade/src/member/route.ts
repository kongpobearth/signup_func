import express,{Request, Response} from "express";
import mongoose from "mongoose";
export const member = express.Router ();
import bcrypt from "bcrypt";

member.post("/signupAccount", async (req: Request, res: Response) => {
    mongoose.connect('mongodb://admin:1234@localhost:27017/AccDB?authSource=AccDB')
    const {username, password, firstname, lastname, NationalID, Email, PhoneNum} = req.body;
    console.log("received data",
        {username, 
        password, 
        firstname, 
        lastname, 
        NationalID, 
        Email, 
        PhoneNum});
    
    const accountSchemas = new mongoose.Schema({
        username: {type : String , required : true}, 
        password : {type : String , required : true}, 
        firstname : {type : String , required : true}, 
        lastname : {type : String , required : true}, 
        NationalID : {type : String , required : true}, 
        Email :{type : String , required : true}, 
        PhoneNum : {type : String , required : true}
    })

    const accounts = mongoose.model('accounts', accountSchemas);
    const dbResponse = accounts.create({
        username : req.body.username,
        password : req.body.password,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        NationalID : req.body.NationalID,  
        Email : req.body.Email,
        PhoneNum : req.body.PhoneNum
    });
    mongoose
        .connect('mongodb://admin:1234@localhost:27017/AccDB?authSource=AccDB')
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error(err));
        res.status(200).json({Message : "success",data : req.body});
   
    });

export default member;