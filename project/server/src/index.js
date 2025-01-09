import express from 'express';
import cors from 'cors' //communication between frontend and backend
import mongoose from 'mongoose' //communicate with database
//importing libraries 
//express is a framework to create api, serve frontend

import {userRouter} from './routes/users.js';
import { workoutsRouter } from './routes/workouts.js';


const app = express();

app.use(express.json()); //convert frontend requests to json, get data 
app.use(cors()); 

app.use("/auth", userRouter); //calling the authentication method from users.js
app.use("/workouts", workoutsRouter); //calling the workouts method from workouts.js


mongoose.connect("mongodb+srv://evarosati:Elephant1012@project1.j5ubz.mongodb.net/Project1?retryWrites=true&w=majority&appName=Project1")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection failed:", err));
    

app.listen(3001, () => console.log("SERVER STARTED!")); //tells api to start

app.get("/", (req, res) => {
    res.send("Backend is running!");
});


