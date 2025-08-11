// src/hooks/useAnimationControl.js
import { useState, useCallback } from "react";

export function useAnimationControl() {
  const [activeAnimations, setActiveAnimations] = useState(new Map());

  const toggleAnimation = useCallback((animationName, modelViewer) => {
    if (!modelViewer) return;
    setActiveAnimations((prev) => {
      const newMap = new Map(prev);
      const isActive = newMap.get(animationName);
      if (isActive) {
        modelViewer.pause();
        modelViewer.animationName = null;
        modelViewer.setAttribute("animation-loop", "false");
        newMap.set(animationName, false);
      } else {
        modelViewer.animationName = animationName;
        modelViewer.setAttribute("animation-loop", "true");
        modelViewer.currentTime = 0;
        modelViewer.play();
        newMap.set(animationName, true);
      }
      return newMap;
    });
  }, []);

  const stopAllAnimations = useCallback((modelViewer) => {
    if (!modelViewer) return;
    modelViewer.pause();
    modelViewer.animationName = null;
    setActiveAnimations(new Map());
  }, []);

  return { activeAnimations, toggleAnimation, stopAllAnimations };
}
