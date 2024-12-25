// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";

// BrowserRouter를 사용해 path="/" → HomePage, path="/todos" → TodoPage 로 매핑.
function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "0 1rem" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/todos" element={<TodoPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
