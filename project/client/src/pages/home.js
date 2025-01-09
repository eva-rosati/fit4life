import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [workouts, setWorkouts] = useState([]);
  const [savedWorkouts, setSavedWorkouts] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/workouts");
        setWorkouts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedWorkouts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/workouts/savedWorkouts/ids/${userID}`
        );
        setSavedWorkouts(response.data.savedWorkouts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchWorkouts();
    fetchSavedWorkouts();
  }, [userID]); // Added userID as a dependency

  const saveWorkout = async (workoutID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        workoutID,
        userID,
      });
      setSavedWorkouts(response.data.savedWorkouts);
    } catch (err) {
      console.log(err);
    }
  };

  const isWorkoutSaved = (id) => savedWorkouts.includes(id);

  return (
    <div>
      <h1>Workouts</h1>
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>
            <div>
              <h2>{workout.name}</h2>
              <button
                onClick={() => saveWorkout(workout._id)}
                disabled={isWorkoutSaved(workout._id)}
              >
                {isWorkoutSaved(workout._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div className="instructions">
              <p>{workout.instructions}</p>
            </div>
            <img src={workout.imageUrl} alt={workout.name} />
            <p>Cooking Time: {workout.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
