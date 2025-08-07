import React, { useState } from 'react';
import { ChevronLeft, Eye, Play } from 'lucide-react';

// Mock 3D model data - replace with your actual model URLs
const models = [
  {
    id: 1,
    name: "Modern Chair",
    thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
    glbSrc: "https://whimsical-pie-821307.netlify.app/car_mini.glb",
    usdzSrc: "https://whimsical-pie-821307.netlify.app/model.usdz",
    description: "A sleek modern chair perfect for any room"
  },
  {
    id: 2,
    name: "Coffee Table",
    thumbnail: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop",
    glbSrc: "https://whimsical-pie-821307.netlify.app/car_mini.glb",
    usdzSrc: "https://whimsical-pie-821307.netlify.app/model.usdz",
    description: "Elegant coffee table for your living space"
  },
  {
    id: 3,
    name: "Floor Lamp",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
    glbSrc: "https://whimsical-pie-821307.netlify.app/car_mini.glb",
    usdzSrc: "https://whimsical-pie-821307.netlify.app/model.usdz",
    description: "Contemporary floor lamp with warm lighting"
  },
  {
    id: 4,
    name: "Bookshelf",
    thumbnail: "https://images.unsplash.com/photo-1562113530-57ba4cea77b0?w=300&h=200&fit=crop",
    glbSrc: "https://whimsical-pie-821307.netlify.app/car_mini.glb",
    usdzSrc: "https://whimsical-pie-821307.netlify.app/model.usdz",
    description: "Spacious bookshelf for your collection"
  },
  {
    id: 5,
    name: "Dining Table",
    thumbnail: "https://images.unsplash.com/photo-1549497538-303791108f95?w=300&h=200&fit=crop",
    glbSrc: "https://whimsical-pie-821307.netlify.app/car_mini.glb",
    usdzSrc: "https://whimsical-pie-821307.netlify.app/model.usdz",
    description: "Beautiful dining table for family meals"
  },
  {
    id: 6,
    name: "Sofa",
    thumbnail: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop",
    glbSrc: "https://whimsical-pie-821307.netlify.app/car_mini.glb",
    usdzSrc: "https://whimsical-pie-821307.netlify.app/model.usdz",
    description: "Comfortable sofa for relaxation"
  },
  {
    id: 7,
    name: "Desk",
    thumbnail: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=300&h=200&fit=crop",
    glbSrc: "https://whimsical-pie-821307.netlify.app/car_mini.glb",
    usdzSrc: "https://whimsical-pie-821307.netlify.app/model.usdz",
    description: "Modern desk for your workspace"
  },
  {
    id: 8,
    name: "Wardrobe",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
    glbSrc: "https://whimsical-pie-821307.netlify.app/car_mini.glb",
    usdzSrc: "https://whimsical-pie-821307.netlify.app/model.usdz",
    description: "Spacious wardrobe for your clothes"
  },
  {
    id: 9,
    name: "Side Table",
    thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
    glbSrc: "https://whimsical-pie-821307.netlify.app/car_mini.glb",
    usdzSrc: "https://whimsical-pie-821307.netlify.app/model.usdz",
    description: "Compact side table for small spaces"
  },
  {
    id: 10,
    name: "Mirror",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
    glbSrc: "https://whimsical-pie-821307.netlify.app/car_mini.glb",
    usdzSrc: "https://whimsical-pie-821307.netlify.app/model.usdz",
    description: "Elegant mirror for your room"
  }
];

// Welcome Screen Component
function WelcomeScreen({ onStart }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-4">
      <div className="text-center text-white">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4 animate-pulse">AR Furniture</h1>
          <p className="text-xl opacity-90 max-w-md mx-auto">
            Explore amazing 3D models and see them in your space with augmented reality
          </p>
        </div>
        
        <button
          onClick={onStart}
          className="bg-white text-purple-600 px-8 py-4 rounded-full text-xl font-semibold hover:bg-purple-50 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-3 mx-auto"
        >
          <Play className="w-6 h-6" />
          Start Exploring
        </button>
        
        <div className="mt-12 opacity-75">
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Eye className="w-6 h-6" />
              </div>
              <p className="text-sm">View 3D Models</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">📱</span>
              </div>
              <p className="text-sm">AR Experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Model Selection Screen Component
function ModelSelectionScreen({ onSelectModel, onBack }) {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8 pt-4">
          <button
            onClick={onBack}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Choose a 3D Model</h1>
        </div>
        
        {/* Models Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {models.map((model) => (
            <div
              key={model.id}
              onClick={() => onSelectModel(model)}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={model.thumbnail}
                  alt={model.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1">{model.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{model.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// AR Viewer Component (Modified from your original)
function ARViewer({ model, onBack }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center max-w-6xl mx-auto">
          <button
            onClick={onBack}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{model.name}</h1>
            <p className="text-gray-600">{model.description}</p>
          </div>
        </div>
      </div>
      
      {/* 3D Model Viewer */}
      <div className="p-4 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div style={{ height: '70vh' }}>
            <model-viewer
              src={model.glbSrc}
              ar
              ar-modes="scene-viewer quick-look webxr"
              ios-src={model.usdzSrc}
              auto-rotate
              camera-controls
              alt={model.name}
              style={{ width: '100%', height: '100%' }}
              className="rounded-t-xl"
            >
              <button 
                slot="ar-button"
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors shadow-lg flex items-center gap-2"
              >
                <span>👁️</span>
                See in My Room
              </button>
            </model-viewer>
          </div>
          
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">About this model</h2>
            <p className="text-gray-600 mb-4">{model.description}</p>
            
            <div className="text-sm text-gray-500">
              <p>• Rotate and zoom to explore the 3D model</p>
              <p>• Tap "See in My Room" to view in augmented reality</p>
              <p>• Compatible with AR-enabled devices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome'); // 'welcome', 'selection', 'viewer'
  const [selectedModel, setSelectedModel] = useState(null);

  const handleStart = () => {
    setCurrentScreen('selection');
  };

  const handleSelectModel = (model) => {
    setSelectedModel(model);
    setCurrentScreen('viewer');
  };

  const handleBackToSelection = () => {
    setCurrentScreen('selection');
    setSelectedModel(null);
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
    setSelectedModel(null);
  };

  // Load model-viewer script
  React.useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="App">
      {currentScreen === 'welcome' && (
        <WelcomeScreen onStart={handleStart} />
      )}
      
      {currentScreen === 'selection' && (
        <ModelSelectionScreen 
          onSelectModel={handleSelectModel}
          onBack={handleBackToWelcome}
        />
      )}
      
      {currentScreen === 'viewer' && selectedModel && (
        <ARViewer 
          model={selectedModel}
          onBack={handleBackToSelection}
        />
      )}
    </div>
  );
}