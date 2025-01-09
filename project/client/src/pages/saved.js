import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

export const SavedWorkouts = () => {
    const [savedWorkouts, setSavedWorkouts] = useState([]); // state for saved workouts
    const userID = useGetUserID(); // get the user ID from your custom hook

    // fetch saved workouts from the backend
    useEffect(() => {
        const fetchSavedWorkouts = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/workouts/savedWorkouts/ids/${userID}`);
                setSavedWorkouts(response.data.savedWorkouts || []); // ensure it's an array even if undefined
                console.log("Fetched saved workouts:", response.data.savedWorkouts);
            } catch (err) {
                console.error("Error fetching saved workouts:", err);
            }
        };

        if (userID) fetchSavedWorkouts(); // fetch saved workouts only if userID exists
    }, [userID]); // run this effect whenever userID changes

    // check if the workout is already saved
    const isWorkoutSaved = (workoutId) => {
        return savedWorkouts.some((workout) => workout._id === workoutId); // checks if workout is in saved list
    };

    // save workout by sending a request to the backend
    const saveWorkout = async (workoutId) => {
        try {
            const response = await axios.put("http://localhost:3001/workouts", {
                workoutId,
                userId: userID,
            });
            console.log("Saved workout response:", response.data);
            setSavedWorkouts((prevState) => [...prevState, { _id: workoutId }]); // add the workout to the saved list
        } catch (err) {
            console.error("Error saving workout:", err);
        }
    };

    return (
        <div>
            <h1>Saved Workouts</h1>
            <ul>
                {savedWorkouts && savedWorkouts.length > 0 ? (
                    savedWorkouts.map((workout) => (
                        <li key={workout._id}>
                            {isWorkoutSaved(workout._id) && <h3>ALREADY SAVED</h3>}
                            <div>
                                <h2>{workout.name}</h2>
                                <button
                                    onClick={() => saveWorkout(workout._id)} // call saveWorkout when clicked
                                    disabled={isWorkoutSaved(workout._id)} // disable if already saved
                                >
                                    {isWorkoutSaved(workout._id) ? "Saved" : "Save"}
                                </button>
                            </div>
                            <div className="reps">
                                <p>{workout.imageUrl}</p>
                            </div>
                            <img src={workout.imageUrl} alt={workout.name} />
                            <p>Reps: {workout.reps} (per set)</p>
                        </li>
                    ))
                ) : (
                    <p>No saved workouts found.</p>
                )}
            </ul>
        </div>
    );
};
