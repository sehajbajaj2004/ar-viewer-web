// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Particles from "../components/Particles";
import { Play, Box } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative">
      <Particles particleColors={["#fff", "#ccc"]} />
      <div className="z-10 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl mb-6">
          <Box className="w-10 h-10 text-black" />
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">Web AR Viewer</h1>
        <p className="text-gray-300 mb-6">View and explore 3D models in AR.</p>
        <button
          onClick={() => navigate("/models")}
          className="bg-white text-black px-8 py-3 rounded-2xl font-semibold flex items-center gap-3"
        >
          <Play /> Start Exploring
        </button>
      </div>
    </div>
  );
}
