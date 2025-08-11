import React from "react";
import { useNavigate } from "react-router-dom";
import { Play, Box } from "lucide-react";
import Particles from "./ui/Particles";

const WelcomeScreen = React.memo(function WelcomeScreen() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/models");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative">
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Particles
          particleColors={["#ffffff", "#f8fafc"]}
          particleCount={100}
          particleSpread={15}
          speed={0.5}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      <div className="text-center max-w-sm sm:max-w-md md:max-w-lg mx-auto relative z-10 px-2">
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl mb-4 sm:mb-6">
            <Box className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight">
            Web AR Viewer
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
            View and visualize 3D models in your space using augmented reality
            technology.
          </p>
        </div>

        <button
          onClick={handleStart}
          className="bg-white text-black px-8 sm:px-10 py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-white/10 flex items-center gap-3 mx-auto active:scale-95"
        >
          <Play className="w-5 h-5 sm:w-6 sm:h-6" />
          Start Exploring
        </button>
      </div>
    </div>
  );
});

export default WelcomeScreen;