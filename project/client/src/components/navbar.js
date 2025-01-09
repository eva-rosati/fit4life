import {Link} from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const [cookies, setCookie] = useCookies(["access_token"])
    const navigate =useNavigate();

const logout = () => {
        setCookie("access_token", "");
        window.localStorage.removeItem("userID"); //remove user info
        navigate("/auth"); //go back to login/registration page after logging out
    }

    return (
        <div className="navbar">
          <Link to="/">Home</Link>
          <Link to="/create">Create Workout</Link>
          <Link to="/saved">Saved Workouts</Link>
          {!cookies.access_token ? (
            <Link to="/auth">Login/Register</Link>
          ) : (
            <button onClick={logout}> Logout </button>
          )}
        </div>
      );
    };