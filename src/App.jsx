// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ModelsPage from "./pages/ModelsPage";
import ARViewer from "./pages/ARViewer";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/models" element={<ModelsPage />} />
        <Route path="/viewer/:id" element={<ARViewer />} />
      </Routes>
    </Router>
  );
}
