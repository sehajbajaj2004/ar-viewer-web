// src/pages/ARViewer.jsx
import React, { useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { models } from "../data/models";
import { useAnimationControl } from "../hooks/useAnimationControl";
import ModelDetails from "../components/ModelDetails";
import { ChevronLeft } from "lucide-react";

export default function ARViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const model = models.find((m) => m.id === parseInt(id));
  const modelViewerRef = useRef(null);
  const { toggleAnimation, stopAllAnimations } = useAnimationControl();

  const handleHotspotClick = useCallback(
    (animationName) => {
      toggleAnimation(animationName, modelViewerRef.current);
    },
    [toggleAnimation]
  );

  useEffect(() => {
    const mv = modelViewerRef.current;
    if (!mv || !model) return;
    const handleLoad = () => {
      model.hotspots?.forEach((h) => {
        const el = mv.querySelector(`[slot="${h.slot}"]`);
        if (el) {
          el.addEventListener("click", () => handleHotspotClick(h.animation));
        }
      });
    };
    mv.addEventListener("load", handleLoad);
    return () => {
      mv.removeEventListener("load", handleLoad);
      stopAllAnimations(mv);
    };
  }, [model, handleHotspotClick, stopAllAnimations]);

  if (!model) return <div className="text-white p-4">Model not found</div>;

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#121212] p-4 flex items-center">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ChevronLeft className="text-white" />
        </button>
        <h1 className="text-white text-2xl">{model.name}</h1>
      </div>
      <model-viewer
        ref={modelViewerRef}
        src={model.glbSrc}
        ios-src={model.usdzSrc}
        ar
        camera-controls
        auto-rotate
        style={{ width: "100%", height: "70vh" }}
      >
        {model.hotspots?.map((h, idx) => (
          <button key={idx} slot={h.slot} className="hotspot"></button>
        ))}
      </model-viewer>
      <ModelDetails model={model} />
    </div>
  );
}
