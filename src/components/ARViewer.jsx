import React, { useRef, useEffect, useCallback, useState } from "react";
import { ChevronLeft, Smartphone, Play, Square } from "lucide-react";
import { useAnimationControl } from "../hooks/useAnimationControl";
import { useThreeJSAR } from "../hooks/useThreeJSAR";

function ARViewer({ model, onBack }) {
  const modelViewerRef = useRef(null);
  const { activeAnimations, toggleAnimation, stopAllAnimations } = useAnimationControl();
  const {
    containerRef,
    isARSupported,
    isARActive,
    initializeScene,
    startAR,
    toggleAnimation: toggleThreeAnimation,
    cleanup,
    animationActions
  } = useThreeJSAR();

  const [viewMode, setViewMode] = useState('model-viewer'); // 'model-viewer' or 'threejs-ar'
  const [isLoading, setIsLoading] = useState(false);

  // Handle hotspot click for model-viewer mode
  const handleHotspotClick = useCallback(
    (animationName) => {
      if (!modelViewerRef.current) return;
      toggleAnimation(animationName, modelViewerRef.current);
    },
    [toggleAnimation]
  );

  // Handle animation toggle for Three.js AR mode
  const handleThreeJSAnimation = useCallback(
    (animationName) => {
      toggleThreeAnimation(animationName);
    },
    [toggleThreeAnimation]
  );

  // Switch to Three.js AR mode
  const switchToThreeJSAR = useCallback(async () => {
    setIsLoading(true);
    setViewMode('threejs-ar');
    try {
      await initializeScene(model.glbSrc);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to initialize Three.js scene:', error);
      setIsLoading(false);
      setViewMode('model-viewer'); // Fallback to model-viewer
    }
  }, [model.glbSrc, initializeScene]);

  // Start AR session
  const handleStartAR = useCallback(async () => {
    if (viewMode === 'threejs-ar' && isARSupported) {
      await startAR();
    } else {
      // Fallback to switching to Three.js mode first
      await switchToThreeJSAR();
      setTimeout(() => startAR(), 1000);
    }
  }, [viewMode, isARSupported, startAR, switchToThreeJSAR]);

  // Set up model-viewer hotspot event listeners
  useEffect(() => {
    if (viewMode !== 'model-viewer') return;
    
    const modelViewer = modelViewerRef.current;
    if (!modelViewer) return;

    const handleLoad = () => {
      model.hotspots?.forEach((hotspot) => {
        const hotspotElement = modelViewer.querySelector(`[slot="${hotspot.slot}"]`);
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
      stopAllAnimations(modelViewer);
    };
  }, [model, handleHotspotClick, stopAllAnimations, viewMode]);

  // Cleanup Three.js on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return (
    <div className="min-h-screen bg-black">
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

        .hotspot.active {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          animation: pulse-red 1s infinite;
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

        @keyframes pulse-red {
          0% {
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4), 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          70% {
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4), 0 0 0 10px rgba(239, 68, 68, 0);
          }
          100% {
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4), 0 0 0 0 rgba(239, 68, 68, 0);
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

        .three-container {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 10;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #333;
          border-top: 4px solid #fff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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
            
            {/* Mode indicator */}
            <div className="flex items-center gap-2">
              {(Array.from(activeAnimations.values()).some(active => active) || 
                Object.values(animationActions).some(action => action.isRunning?.())) && (
                <div className="flex items-center gap-2 text-red-400">
                  <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Animating...</span>
                </div>
              )}
              
              <div className="text-xs bg-gray-800 px-2 py-1 rounded">
                {viewMode === 'threejs-ar' ? 'Three.js AR' : 'Model Viewer'}
                {isARActive && ' (AR Active)'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Viewer Container */}
      <div className="max-w-6xl mx-auto p-3 sm:p-6">
        <div className="bg-[#3c3c3c] rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden border border-gray-800">
          <div style={{ height: "60vh" }} className="bg-[#121212] relative">
            
            {/* Loading Overlay */}
            {isLoading && (
              <div className="loading-overlay">
                <div className="spinner"></div>
                <p className="text-white mt-4">Loading AR Viewer...</p>
              </div>
            )}

            {/* Model Viewer Mode */}
            {viewMode === 'model-viewer' && (
              <model-viewer
                ref={modelViewerRef}
                src={model.glbSrc}
                ar
                ar-modes="scene-viewer quick-look webxr"
                ios-src={model.usdzSrc}
                auto-rotate
                camera-controls
                animation-loop="false"
                alt={model.name}
                style={{ width: "100%", height: "100%" }}
                className="rounded-t-2xl sm:rounded-t-3xl bg-[#242424]"
              >
                {model.hotspots?.map((hotspot, index) => (
                  <button
                    key={index}
                    className={`hotspot ${activeAnimations.get(hotspot.animation) ? 'active' : ''}`}
                    slot={hotspot.slot}
                    data-position={hotspot.position}
                    data-normal={hotspot.normal}
                    title={hotspot.title}
                  >
                    <div className="annotation">
                      {activeAnimations.get(hotspot.animation)
                        ? `Stop ${hotspot.title}`
                        : `Start ${hotspot.title}`
                      }
                    </div>
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
            )}

            {/* Three.js AR Mode */}
            {viewMode === 'threejs-ar' && (
              <div className="three-container">
                <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
                
                {/* AR Controls for Three.js mode */}
                {isARSupported && (
                  <button
                    onClick={handleStartAR}
                    disabled={isARActive}
                    className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg flex items-center gap-2 sm:gap-3 group active:scale-95 disabled:opacity-50"
                  >
                    <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                    {isARActive ? 'AR Active' : 'Start AR'}
                  </button>
                )}
              </div>
            )}

            {/* Mode Switch Button */}
            <button
              onClick={() => {
                if (viewMode === 'model-viewer') {
                  switchToThreeJSAR();
                } else {
                  setViewMode('model-viewer');
                }
              }}
              className="absolute top-4 right-4 bg-black bg-opacity-50 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm hover:bg-opacity-70 transition-all"
            >
              {viewMode === 'model-viewer' ? 'Switch to AR Mode' : 'Switch to Model Viewer'}
            </button>
          </div>

          {/* Model Information and Controls */}
          <div className="p-4 sm:p-6 md:p-8">
            <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
                  About this model
                </h2>
                <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {model.description}
                </p>

                {/* Animation Controls */}
                {model.hotspots && model.hotspots.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Animation Controls
                    </h3>
                    
                    {/* Direct Animation Buttons */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {model.animations?.map((animationName, index) => {
                        const isActive = viewMode === 'model-viewer' 
                          ? activeAnimations.get(animationName)
                          : animationActions[animationName]?.isRunning?.();
                        
                        return (
                          <button
                            key={index}
                            onClick={() => {
                              if (viewMode === 'model-viewer') {
                                handleHotspotClick(animationName);
                              } else {
                                handleThreeJSAnimation(animationName);
                              }
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              isActive
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            {isActive ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            {isActive ? 'Stop' : 'Play'} {animationName}
                          </button>
                        );
                      })}
                    </div>

                    {/* Status Indicators */}
                    <div className="space-y-2">
                      {model.hotspots.map((hotspot, index) => {
                        const isActive = viewMode === 'model-viewer' 
                          ? activeAnimations.get(hotspot.animation)
                          : animationActions[hotspot.animation]?.isRunning?.();
                        
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between gap-2 text-sm"
                          >
                            <div className="flex items-center gap-2 text-gray-300">
                              <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}></div>
                              <span>{hotspot.title}</span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${isActive ? 'bg-red-900 text-red-300' : 'bg-gray-700 text-gray-300'}`}>
                              {isActive ? 'Running' : 'Stopped'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Instructions */}
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
                    <p>Use animation buttons to control model animations</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">3</span>
                    </div>
                    <p>Switch to AR Mode for enhanced AR experience with Three.js</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">4</span>
                    </div>
                    <p>Point your camera at a flat surface for best AR results</p>
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

export default ARViewer;