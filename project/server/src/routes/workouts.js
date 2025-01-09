import express from 'express';
import mongoose from 'mongoose';
import { WorkoutModel } from "../models/WorkoutsModel.js";
import { UserModel } from '../models/Users.js';
import jwt from 'jsonwebtoken'; // assuming we're using jwt for token verification

const router = express.Router();

// verify token middleware (moved to the top)
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization; // get token from request headers
    if (token) {
        jwt.verify(token, "secret", (err) => {
            if (err) return res.sendStatus(403); // forbidden if token is invalid
            next(); // proceed if token is valid
        });
    } else {
        res.sendStatus(401); // unauthorized if no token
    }
};

// get all workouts
router.get("/savedWorkouts/ids/:userID", async (req, res) => {
    try {
        const response = await WorkoutModel.find({}); // get all workouts from db
        res.json(response); // send workouts as json
    } catch (err) {
        res.json(err); // send error if something goes wrong
    }
});

// create new workout
router.post("/", async (req, res) => {
    const workout = new WorkoutModel(req.body); // create workout with data from request body
    try {
        const response = await workout.save(); // save workout to db
        res.json(workout); // send saved workout back
    } catch (err) {
        res.json(err); // send error if something goes wrong
    }
});

// save workout to user's list
router.put("/", verifyToken, async (req, res) => {
    try {
        const workout = await WorkoutModel.findById(req.body.workoutId); // find workout by id
        const user = await UserModel.findById(req.body.userId); // find user by id
        user.savedWorkouts.push(workout); // add workout to user's saved list
        await user.save(); // save the user with updated saved list
        res.json({ savedWorkouts: user.savedWorkouts }); // send updated saved workouts
    } catch (err) {
        res.json(err); // send error if something goes wrong
    }
});

// get all saved workouts for a user
router.get("/savedWorkouts/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID); // find user by userID from params
        const savedWorkouts = await WorkoutModel.find({
            _id: { $in: user.savedWorkouts }, // find all workouts where id is in user's saved list
        });
        res.json({ savedWorkouts }); // send saved workouts
    } catch (err) {
        res.json(err); // send error if something goes wrong
    }
});

export { router as workoutsRouter };
