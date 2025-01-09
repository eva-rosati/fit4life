import express from 'express'; //framework
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

import {UserModel} from "../models/Users.js";


router.post("/register", async (req, res) => {
    const {username, password} = req.body; //defining an enpoint in the api, making sure we receive user and password in the body of the request

    const user = await UserModel.findOne({username}); 

    if (user) { //there is a user with this username
        return res.json({message: "User already exists!"});
    }

    const hashedPassword = await bcrypt.hash(password, 10); //bcrypt will change the password from string to hash, so users are less likely to get hacked

    const newUser = new UserModel({username, password: hashedPassword}); //new UserModel adds something to database
    await newUser.save(); //saves changes in database

    res.json({message: "User Registered Successfully"}); //sending back the user we found in findOne function
});
//req and res are two arguments of the asynchronous function
//asynchronous meaning the user may do other tasks; not waiting an immediate response
//req gets data from user who made api request and sends the data to router endpoint
//res sends response back to user


router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({ username }); 

    if (!user){
        return res.status(400).json({ message: "Username of password is incorrect!"});
    }


    const isPasswordValid = await bcrypt.compare(password, user.password); //seeing if saved password and the password entered are the same

    if (!isPasswordValid){
        return res.status(400).json({message: "Username or Password is Incorrect!"}); //400 means invalid request
    }

    const token = jwt.sign({id: user._id}, "secret"); //jwt is a token that proves who the user is and assigns their user id to the token
    res.json({token, userID: user._id});
    });



export {router as userRouter}; //direct requests to register/login to this code

export const verifyToken =(req, res,next) => {

    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, "secret", (err) => {
            if (err){
                return res.sendStatus(403); //403 forbidden request
            }
            next();
        });
    } else {
        res.sendStatus(401); //401 unauthorized request403
    }
};