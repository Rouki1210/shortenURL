import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./Pages/homePage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import HomeLogin from "./Pages/homeLogin";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/> } />
                <Route path="/Login" element={<Login/> } />
                <Route path="/Register" element={<Register />} />
                <Route path="/User" element={<HomeLogin />} />
            </Routes>
        </Router>
    );
}

export default App
