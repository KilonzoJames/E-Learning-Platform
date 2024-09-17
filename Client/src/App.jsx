import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Register from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/HomePage/Home";
import ResetPassword from "./Pages/Resetpassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        {/* {/* <Route path="/mod/:modId" element={ <ModuleDetails /> }/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
