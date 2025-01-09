// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar";
import { Auth } from "./pages/auth";
import { Create } from "./pages/create";
import { Home } from "./pages/home";
import { SavedWorkouts } from "./pages/saved"; // updated import to match export

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/saved" element={<SavedWorkouts />} /> {/* updated to SavedWorkouts */}
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
