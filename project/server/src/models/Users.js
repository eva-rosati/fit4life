//describes the format of how users enter data
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({ //object of what we want from user
    username: { type: String, required: true, unique: true}, //describing the object, what we are getting from the user
    password: { type: String, required: true},
    savedWorkouts: [{type: mongoose.Schema.Types.ObjectId, ref: "workouts"}],
});

export const UserModel = mongoose.model("users", UserSchema)


