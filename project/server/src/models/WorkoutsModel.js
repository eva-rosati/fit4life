import mongoose from "mongoose";

//a schema or model describes aspects of the object that we need to retrieve from the user


const WorkoutSchema = new mongoose.Schema({ //object of what we want from user
    name: { 
        type: String, 
        required: true,
     }, 
    imageURL: { type: String, required: true }, 
    sets: { type: Number, required: true }, 
    reps: { type: Number, required: true},
    equipment: [{type: String, required: true}], //lets the system know that you are entering multiple inputs
    muscleGroup: {type: String, required: true
    },
});

//create a workout, post request bc creating something


export const WorkoutModel = mongoose.model("workouts", WorkoutSchema)
