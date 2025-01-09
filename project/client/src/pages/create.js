import { useState, useEffect } from "react"; // allows the variable value to change
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

export const Create = () => {
    const userID = useGetUserID(); // get the user's ID
    const [isSubmitting, setIsSubmitting] = useState(false); // tracks form submission state

    const [workout, setWorkout] = useState({
        name: "",
        imageUrl: "", 
        sets: "", 
        reps: "",
        equipment: [],
        muscleGroup: "",
        userOwner: userID, // setting this to 0 doesn't allow the workout to show in the database
    });

    const navigate = useNavigate();

    useEffect(() => {
        // update userOwner when userID changes
        setWorkout((prevWorkout) => ({ ...prevWorkout, userOwner: userID }));
    }, [userID]); // Ensure userID is in the dependency array

    // handle input changes for text fields
    const handleChange = (event) => {
        const { name, value } = event.target; // get name and value of the input, add name property to each input
        setWorkout({ ...workout, [name]: value });
    };

    // handle changes for equipment array
    const handleEquipmentChange = (event, idx) => {
        const { value } = event.target; // get value of the input
        const equipment = [...workout.equipment]; // make a copy of the equipment array
        equipment[idx] = value; // update value of specific equipment
        setWorkout({ ...workout, equipment });
        console.log(workout); // log the updated workout
    };

    // add an empty string to the equipment array
    const addEquipment = () => {
        setWorkout({ ...workout, equipment: [...workout.equipment, ""] }); // setting workout to be the same as before, after the comma is what is changing about the object
    };

    // handle form submission
    const onSubmit = async (event) => {
        event.preventDefault(); // prevents screen from refreshing when we press submit
        setIsSubmitting(true); // disable form while submitting
        try {
            // check if required fields are filled in
            if (!workout.name || !workout.imageUrl || !workout.sets || !workout.reps || !workout.muscleGroup) {
                alert("Please fill in all fields!");
                setIsSubmitting(false);
                return;
            }

            // Log the workout data before submitting
            console.log("Sending workout data:", workout);

            // send POST request to create a new workout
            const response = await axios.post("http://localhost:3001/workouts", workout);
            console.log('Response:', response.data); // Log the response from the backend
            alert("Workout Created!"); // notify user of success
            navigate("/"); // redirect to home page
        } catch (err) {
            console.error("Error creating workout:", err.response?.data || err.message); // log the error
            alert("There was an error creating the workout.");
        } finally {
            setIsSubmitting(false); // re-enable form
        }
    };

    return (
        <div className="create-workout">
            <h2>Create Workout</h2>
            <form onSubmit={onSubmit}>
                {/* Name Input */}
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={workout.name}
                    onChange={handleChange}
                    required
                />

                {/* Image URL Input */}
                <label htmlFor="imageUrl">Image URL:</label>
                <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={workout.imageUrl}
                    onChange={handleChange}
                    required
                />

                {/* Sets Input */}
                <label htmlFor="sets">Number of sets:</label>
                <input
                    type="text"
                    id="sets"
                    name="sets"
                    value={workout.sets}
                    onChange={handleChange}
                    required
                />

                {/* Reps Input */}
                <label htmlFor="reps">Number of reps:</label>
                <input
                    type="text"
                    id="reps"
                    name="reps"
                    value={workout.reps}
                    onChange={handleChange}
                    required
                />

                {/* Equipment Input */}
                <label>Equipment needed:</label>
                {workout.equipment.map((equipment, idx) => (
                    <div key={idx} style={{ marginBottom: "10px" }}>
                        <input
                            type="text"
                            name="equipment"
                            value={equipment}
                            onChange={(event) => handleEquipmentChange(event, idx)}
                            placeholder="Enter equipment"
                        />
                    </div>
                ))}
                <button type="button" onClick={addEquipment}>
                    Add Equipment
                </button>

                {/* Muscle Group Input */}
                <label htmlFor="muscleGroup">Muscle Group:</label>
                <input
                    type="text"
                    id="muscleGroup"
                    name="muscleGroup"
                    value={workout.muscleGroup}
                    onChange={handleChange}
                    required
                />

                {/* Submit Button */}
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Create Workout"}
                </button>
            </form>
        </div>
    );
};
