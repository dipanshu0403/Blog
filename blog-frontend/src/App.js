import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav style={{ padding: 10 }}>
          <Link to="/">Home</Link> | 
          <Link to="/login"> Login</Link> | 
          <Link to="/register"> Register</Link> | 
          <Link to="/create"> Create Post</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;