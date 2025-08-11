import React, { useRef, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Smartphone } from "lucide-react";
import { getModelById } from "../data/models";
import { useAnimationControl } from "../hooks/useAnimationControl";
import "../styles/hotspot.css";

function ARViewer() {
  const { modelId } = useParams();
  const navigate = useNavigate();
  const modelViewerRef = useRef(null);
  const { activeAnimations, toggleAnimation, stopAllAnimations } = useAnimationControl();

  const model = getModelById(modelId);

  const handleBack = () => {
    navigate("/models");
  };

  const handleHotspotClick = useCallback(
    (animationName) => {
      if (!modelViewerRef.current) return;
      toggleAnimation(animationName, modelViewerRef.current);
    },
    [toggleAnimation]
  );

  // Set up hotspot event listeners
  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (!modelViewer || !model) return;

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
  }, [model, handleHotspotClick, stopAllAnimations]);

  // Redirect if model not found
  if (!model) {
    navigate("/models");
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-[#121212] border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center">
            <button
              onClick={handleBack}
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
            {Array.from(activeAnimations.values()).some(active => active) && (
              <div className="flex items-center gap-2 text-red-400">
                <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Animating...</span>
              </div>
            )}
          </div>
        </div>
      </div>

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

                {model.hotspots && model.hotspots.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Animation Controls
                    </h3>
                    <div className="space-y-2">
                      {model.hotspots.map((hotspot, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between gap-2 text-sm"
                        >
                          <div className="flex items-center gap-2 text-gray-300">
                            <div className={`w-3 h-3 rounded-full ${activeAnimations.get(hotspot.animation) ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}></div>
                            <span>{hotspot.title}</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${activeAnimations.get(hotspot.animation) ? 'bg-red-900 text-red-300' : 'bg-gray-700 text-gray-300'}`}>
                            {activeAnimations.get(hotspot.animation) ? 'Running' : 'Stopped'}
                          </span>
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
                    <p>Click blue hotspots to start animations, red to stop them</p>
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