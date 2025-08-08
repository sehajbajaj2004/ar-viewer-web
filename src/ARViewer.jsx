import React, { useState } from "react";
import {
  ChevronLeft,
  Eye,
  Play,
  Sparkles,
  Box,
  Smartphone,
} from "lucide-react";

// Mock 3D model data - replace with your actual model URLs
const models = [
  {
    id: 1,
    name: "Car",
    thumbnail:
      "https://plus.unsplash.com/premium_vector-1716902817657-f2f50b7b1efb?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    glbSrc: "/car_mini.glb",
    usdzSrc: "/model.usdz",
    description: "A Low Poly Car Model.",
    hotspots: [
      {
        slot: "hotspot-seat",
        position: "0 0.5 0",
        normal: "0 1 0",
        animation: "Car Engine",
        title: "Car Engine",
      },
    ],
  },
  {
    id: 2,
    name: "Bot",
    thumbnail:
      "https://plus.unsplash.com/premium_vector-1736862699214-09a672d1db6c?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    glbSrc: "/bot.glb",
    usdzSrc: "/bot_model.usdz",
    description: "A Low Poly Inspection Bot.",
    hotspots: [
      {
        slot: "hotspot-seat",
        position: "0 0.5 0",
        normal: "0 1 0",
        animation: "Start Inspecting",
        title: "Start Inspecting",
      },
    ],
  },
];

// Custom Particles Component
function Particles({
  particleColors = ["#ffffff", "#ffffff"],
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleBaseSize = 100,
  moveParticlesOnHover = true,
  alphaParticles = false,
  disableRotation = false,
}) {
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const createParticles = () => {
      const newParticles = [];
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: alphaParticles ? Math.random() * 0.8 + 0.2 : 1,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2,
          moveX: (Math.random() - 0.5) * speed,
          moveY: (Math.random() - 0.5) * speed,
          color:
            particleColors[Math.floor(Math.random() * particleColors.length)],
        });
      }
      setParticles(newParticles);
    };

    createParticles();
  }, [particleCount, particleColors, speed, alphaParticles]);

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    if (moveParticlesOnHover) {
      document.addEventListener("mousemove", handleMouseMove);
      return () => document.removeEventListener("mousemove", handleMouseMove);
    }
  }, [moveParticlesOnHover]);

  React.useEffect(() => {
    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let newX = particle.x + particle.moveX;
          let newY = particle.y + particle.moveY;

          // Bounce off edges
          if (newX < 0 || newX > 100) {
            particle.moveX = -particle.moveX;
            newX = particle.x + particle.moveX;
          }
          if (newY < 0 || newY > 100) {
            particle.moveY = -particle.moveY;
            newY = particle.y + particle.moveY;
          }

          // Mouse interaction
          if (moveParticlesOnHover) {
            const distanceX = mousePosition.x - particle.x;
            const distanceY = mousePosition.y - particle.y;
            const distance = Math.sqrt(
              distanceX * distanceX + distanceY * distanceY
            );

            if (distance < particleSpread) {
              const force = (particleSpread - distance) / particleSpread;
              newX -= distanceX * force * 0.1;
              newY -= distanceY * force * 0.1;
            }
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            rotation: disableRotation
              ? particle.rotation
              : particle.rotation + particle.rotationSpeed,
          };
        })
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, [mousePosition, moveParticlesOnHover, particleSpread, disableRotation]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: `rotate(${particle.rotation}deg) translate(-50%, -50%)`,
            transition: "all 0.1s ease-out",
          }}
        />
      ))}
    </div>
  );
}

// Welcome Screen Component
function WelcomeScreen({ onStart }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative">
      {/* Particles Background */}
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
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      <div className="text-center max-w-sm sm:max-w-md md:max-w-lg mx-auto relative z-10 px-2">
        {/* Hero Section */}
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

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="bg-white text-black px-8 sm:px-10 py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-white/10 flex items-center gap-3 mx-auto active:scale-95"
        >
          <Play className="w-5 h-5 sm:w-6 sm:h-6" />
          Start Exploring
        </button>
      </div>
    </div>
  );
}

// Model Selection Screen Component
function ModelSelectionScreen({ onSelectModel, onBack }) {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-[#121212] border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-3 sm:mr-4 p-2 rounded-xl hover:bg-gray-800 transition-colors active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                3D Collection
              </h1>
              <p className="text-gray-400 mt-1 text-sm sm:text-base">
                Choose a model to explore in AR
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Models Grid */}
      <div className="max-w-7xl mx-auto p-3 sm:p-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {models.map((model) => (
            <div
              key={model.id}
              onClick={() => onSelectModel(model)}
              className="bg-[#121212] rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-[1.02] overflow-hidden group border border-gray-800 active:scale-95"
            >
              <div className="aspect-square overflow-hidden bg-gray-800">
                <img
                  src={model.thumbnail}
                  alt={model.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 sm:p-4 md:p-5">
                <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">
                  {model.name}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-2">
                  {model.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// AR Viewer Component
function ARViewer({ model, onBack }) {
  const modelViewerRef = React.useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle hotspot clicks
  const handleHotspotClick = React.useCallback(
    async (animationName) => {
      if (!modelViewerRef.current || isAnimating) return;

      setIsAnimating(true);
      const modelViewer = modelViewerRef.current;

      try {
        modelViewer.pause();
        modelViewer.animationName = animationName;
        modelViewer.setAttribute("animation-loop", "false"); // prevent infinite loop

        for (let i = 0; i < 2; i++) {
          modelViewer.currentTime = 0;
          modelViewer.play();

          await new Promise((resolve) => {
            const onFinished = () => {
              modelViewer.removeEventListener("finished", onFinished);
              resolve();
            };
            modelViewer.addEventListener("finished", onFinished);
          });
        }

        modelViewer.pause();
        modelViewer.animationName = null;
      } catch (error) {
        console.error("Animation error:", error);
      } finally {
        setIsAnimating(false);
      }
    },
    [isAnimating]
  );

  // Set up hotspot event listeners
  React.useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (!modelViewer) return;

    const handleLoad = () => {
      // Add event listeners to all hotspots
      model.hotspots?.forEach((hotspot) => {
        const hotspotElement = modelViewer.querySelector(
          `[slot="${hotspot.slot}"]`
        );
        if (hotspotElement) {
          hotspotElement.addEventListener("click", () => {
            handleHotspotClick(hotspot.animation);
          });
        }
      });
    };

    modelViewer.addEventListener("load", handleLoad);

    return () => {
      modelViewer.removeEventListener("load", handleLoad);
    };
  }, [model, handleHotspotClick]);

  return (
    <div className="min-h-screen bg-black">
      {/* Custom Styles for Hotspots */}
      <style>{`
        .hotspot {
          display: block;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid #ffffff;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          animation: pulse 2s infinite;
        }

        .hotspot:hover {
          transform: scale(1.2);
          background: linear-gradient(135deg, #1d4ed8, #1e40af);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
        }

        .hotspot:active {
          transform: scale(1.1);
        }

        .hotspot::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4), 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          70% {
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4), 0 0 0 10px rgba(59, 130, 246, 0);
          }
          100% {
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4), 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }

        .annotation {
          background: rgba(0, 0, 0, 0.8);
          color: white;
          position: absolute;
          transform: translate(10px, 10px);
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
          pointer-events: none;
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        :not(:defined) > * {
          display: none;
        }
      `}</style>

      {/* Header */}
      <div className="bg-[#121212] border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-3 sm:mr-4 p-2 rounded-xl hover:bg-gray-800 transition-colors active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white truncate">
                {model.name}
              </h1>
              <p className="text-gray-400 mt-1 text-sm sm:text-base line-clamp-1">
                {model.description}
              </p>
            </div>
            {isAnimating && (
              <div className="flex items-center gap-2 text-blue-400">
                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Playing...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3D Model Viewer */}
      <div className="max-w-6xl mx-auto p-3 sm:p-6">
        <div className="bg-[#3c3c3c] rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden border border-gray-800">
          <div style={{ height: "60vh" }} className="bg-[#121212] relative">
            <model-viewer
              ref={modelViewerRef}
              src={model.glbSrc}
              ar
              ar-modes="scene-viewer quick-look webxr"
              ios-src={model.usdzSrc}
              auto-rotate
              camera-controls
              animation-loop="false" // ensure finished event fires
              alt={model.name}
              style={{ width: "100%", height: "100%" }}
              className="rounded-t-2xl sm:rounded-t-3xl bg-[#242424]"
            >
              {/* Render hotspots */}
              {model.hotspots?.map((hotspot, index) => (
                <button
                  key={index}
                  className="hotspot"
                  slot={hotspot.slot}
                  data-position={hotspot.position}
                  data-normal={hotspot.normal}
                  title={hotspot.title}
                >
                  <div className="annotation">{hotspot.title}</div>
                </button>
              ))}

              <button
                slot="ar-button"
                className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg flex items-center gap-2 sm:gap-3 group active:scale-95"
              >
                <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                View in My Room
              </button>
            </model-viewer>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
                  About this model
                </h2>
                <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {model.description}
                </p>

                {/* Interactive Hotspots Info */}
                {model.hotspots && model.hotspots.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Interactive Hotspots
                    </h3>
                    <div className="space-y-2">
                      {model.hotspots.map((hotspot, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-gray-300"
                        >
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span>{hotspot.title} - Click to animate</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-[#242424] rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-white mb-3 sm:mb-4">
                  How to use
                </h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">1</span>
                    </div>
                    <p>Drag to rotate and pinch to zoom the 3D model</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">2</span>
                    </div>
                    <p>Click the blue hotspots to trigger animations</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">3</span>
                    </div>
                    <p>Tap "View in My Room" for augmented reality</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">4</span>
                    </div>
                    <p>
                      Point your camera at a flat surface for best AR results
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  const [currentScreen, setCurrentScreen] = useState("welcome"); // 'welcome', 'selection', 'viewer'
  const [selectedModel, setSelectedModel] = useState(null);

  const handleStart = () => {
    setCurrentScreen("selection");
  };

  const handleSelectModel = (model) => {
    setSelectedModel(model);
    setCurrentScreen("viewer");
  };

  const handleBackToSelection = () => {
    setCurrentScreen("selection");
    setSelectedModel(null);
  };

  const handleBackToWelcome = () => {
    setCurrentScreen("welcome");
    setSelectedModel(null);
  };

  // Load model-viewer script
  React.useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="App">
      {currentScreen === "welcome" && <WelcomeScreen onStart={handleStart} />}

      {currentScreen === "selection" && (
        <ModelSelectionScreen
          onSelectModel={handleSelectModel}
          onBack={handleBackToWelcome}
        />
      )}

      {currentScreen === "viewer" && selectedModel && (
        <ARViewer model={selectedModel} onBack={handleBackToSelection} />
      )}
    </div>
  );
}
