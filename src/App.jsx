import React, { useState, useCallback, useEffect } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import ModelSelectionScreen from "./components/ModelSelectionScreen";
import ARViewer from "./components/ARViewer";

// Main App Component
export default function App() {
  const [currentScreen, setCurrentScreen] = useState("welcome");
  const [selectedModel, setSelectedModel] = useState(null);

  const handleStart = useCallback(() => {
    setCurrentScreen("selection");
  }, []);

  const handleSelectModel = useCallback((model) => {
    setSelectedModel(model);
    setCurrentScreen("viewer");
  }, []);

  const handleBackToSelection = useCallback(() => {
    setCurrentScreen("selection");
    setSelectedModel(null);
  }, []);

  const handleBackToWelcome = useCallback(() => {
    setCurrentScreen("welcome");
    setSelectedModel(null);
  }, []);

  // Load model-viewer script for fallback mode
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
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