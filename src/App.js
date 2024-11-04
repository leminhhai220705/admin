import "./app.styles.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Header from "./component/Header/Header";
import Dashboard from "./Pages/Dashboard/Dashboard";
import CreateRoom from "./Pages/CreateRoom";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rooms/create" element={<CreateRoom />} /> {/* Thêm route này */}
      </Routes>
    </Router>
  );
};

export default App;