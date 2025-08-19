import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { ChevronLeft, Play, RotateCcw, ZoomIn, ZoomOut, Smartphone, Eye } from 'lucide-react';

// Sample 3D model data (in a real app, you'd load actual .gltf/.glb files)
const SAMPLE_MODELS = [
  {
    id: 1,
    name: "Cube",
    description: "A simple rotating cube with metallic material",
    thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNEY0NkU1Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjOEI1Q0Y2IiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K"
  },
  {
    id: 2,
    name: "Sphere",
    description: "An animated bouncing sphere with gradient material",
    thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNEY0NkU1Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjMwIiBmaWxsPSIjMTBCOTgxIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K"
  },
  {
    id: 3,
    name: "Torus",
    description: "A colorful torus with rotation animation",
    thumbnail: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNEY0NkU1Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjMwIiBmaWxsPSJub25lIiBzdHJva2U9IiNGNTlFMEIiIHN0cm9rZS13aWR0aD0iMTAiLz4KPC9zdmc+Cg=="
  }
];

// Welcome Component
const Welcome = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          AR Model Viewer
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto">
          Experience 3D models in augmented reality using WebXR technology
        </p>
        <button
          onClick={onStart}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <Play className="inline-block mr-2" size={24} />
          Start Experience
        </button>
      </div>
    </div>
  );
};

// Models List Component
const ModelsList = ({ onSelectModel, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="mr-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            3D Models
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_MODELS.map((model) => (
            <div
              key={model.id}
              onClick={() => onSelectModel(model)}
              className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 border border-gray-700 hover:border-purple-500"
            >
              <img
                src={model.thumbnail}
                alt={model.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
              <p className="text-gray-400">{model.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Three.js Viewer Component
const ThreeViewer = ({ model, containerRef, isAR = false, animationEnabled = true }) => {
  const sceneRef = useRef();
  const rendererRef = useRef();
  const cameraRef = useRef();
  const meshRef = useRef();
  const frameRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, isAR ? 0 : 1);
    
    if (isAR) {
      renderer.xr.enabled = true;
    }
    
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create model based on type
    let geometry, material, mesh;
    
    switch (model.name) {
      case 'Cube':
        geometry = new THREE.BoxGeometry(2, 2, 2);
        material = new THREE.MeshStandardMaterial({ 
          color: 0x8B5CF6,
          metalness: 0.7,
          roughness: 0.3
        });
        break;
      case 'Sphere':
        geometry = new THREE.SphereGeometry(1.5, 32, 32);
        material = new THREE.MeshStandardMaterial({ 
          color: 0x10B981,
          metalness: 0.4,
          roughness: 0.2
        });
        break;
      case 'Torus':
        geometry = new THREE.TorusGeometry(1.5, 0.5, 16, 100);
        material = new THREE.MeshStandardMaterial({ 
          color: 0xF59E0B,
          metalness: 0.5,
          roughness: 0.4
        });
        break;
      default:
        geometry = new THREE.BoxGeometry(1, 1, 1);
        material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    }
    
    mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;
    scene.add(mesh);

    // Position camera
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      if (animationEnabled && meshRef.current) {
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
        
        // Special animation for sphere (bouncing)
        if (model.name === 'Sphere') {
          meshRef.current.position.y = Math.sin(Date.now() * 0.003) * 0.5;
        }
      }
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      if (containerRef.current) {
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [model, isAR, animationEnabled]);

  return null;
};

// 3D Viewer Component
const ModelViewer = ({ model, onBack, onViewAR }) => {
  const containerRef = useRef();
  const [zoom, setZoom] = useState(5);

  const handleZoomIn = () => {
    setZoom(prev => Math.max(prev - 1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.min(prev + 1, 10));
  };

  const handleReset = () => {
    setZoom(5);
  };

  useEffect(() => {
    if (containerRef.current && zoom) {
      // Update camera position based on zoom
      // This would be handled in the ThreeViewer component in a real implementation
    }
  }, [zoom]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold">{model.name}</h1>
          </div>
          
          <button
            onClick={onViewAR}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center"
          >
            <Smartphone className="mr-2" size={20} />
            View in AR
          </button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* 3D Viewer */}
        <div className="flex-1 relative">
          <div ref={containerRef} className="w-full h-full min-h-96" />
          
          {/* Controls */}
          <div className="absolute bottom-4 left-4 flex flex-col space-y-2">
            <button
              onClick={handleZoomIn}
              className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
            >
              <ZoomIn size={20} />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
            >
              <ZoomOut size={20} />
            </button>
            <button
              onClick={handleReset}
              className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        {/* Model Details Panel */}
        <div className="w-80 bg-gray-800 p-6 border-l border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Model Details</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-300 mb-1">Name</h3>
              <p className="text-white">{model.name}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-300 mb-1">Description</h3>
              <p className="text-white">{model.description}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-300 mb-1">Format</h3>
              <p className="text-white">Three.js Geometry</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-300 mb-1">Features</h3>
              <ul className="text-white space-y-1">
                <li>• Interactive 3D viewing</li>
                <li>• WebXR AR compatible</li>
                <li>• Smooth animations</li>
                <li>• Mobile optimized</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <ThreeViewer model={model} containerRef={containerRef} />
    </div>
  );
};

// AR Viewer Component
const ARViewer = ({ model, onBack }) => {
  const containerRef = useRef();
  const sessionRef = useRef();
  const [isARActive, setIsARActive] = useState(false);
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [error, setError] = useState('');

  const startAR = async () => {
    try {
      if (!navigator.xr) {
        throw new Error('WebXR not supported');
      }

      const supported = await navigator.xr.isSessionSupported('immersive-ar');
      if (!supported) {
        throw new Error('AR not supported on this device');
      }

      const session = await navigator.xr.requestSession('immersive-ar', {
        requiredFeatures: ['hit-test'],
        optionalFeatures: ['dom-overlay'],
        domOverlay: { root: document.body }
      });

      sessionRef.current = session;
      setIsARActive(true);
      setError('');

      // Set up WebXR session with Three.js
      const renderer = rendererRef.current;
      if (renderer) {
        renderer.xr.setSession(session);
      }

      session.addEventListener('end', () => {
        setIsARActive(false);
        sessionRef.current = null;
      });

    } catch (err) {
      setError(err.message);
      console.error('AR Error:', err);
    }
  };

  const stopAR = () => {
    if (sessionRef.current) {
      sessionRef.current.end();
    }
  };

  const toggleAnimation = () => {
    setAnimationEnabled(!animationEnabled);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold">AR Viewer - {model.name}</h1>
          </div>
        </div>
      </div>

      {/* AR Container */}
      <div className="relative flex-1">
        <div ref={containerRef} className="w-full h-96 bg-black" />
        
        {/* AR Controls Overlay */}
        {isARActive && (
          <div className="absolute top-4 right-4 space-y-2">
            <button
              onClick={toggleAnimation}
              className={`p-3 rounded-full transition-colors ${
                animationEnabled 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              <Play size={20} />
            </button>
            <button
              onClick={stopAR}
              className="p-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors block"
            >
              <Eye size={20} />
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="absolute top-4 left-4 bg-red-600 text-white p-4 rounded-lg max-w-md">
            <h3 className="font-semibold mb-2">AR Error</h3>
            <p>{error}</p>
          </div>
        )}

        {/* AR Instructions */}
        {!isARActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90">
            <div className="text-center p-8">
              <Smartphone className="mx-auto mb-4 text-purple-400" size={64} />
              <h2 className="text-2xl font-bold mb-4">Ready for AR</h2>
              <p className="text-gray-300 mb-6 max-w-md">
                Make sure you're on an Android device with WebXR support. 
                Point your camera at a flat surface to place the 3D model.
              </p>
              <button
                onClick={startAR}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300"
              >
                Start AR Session
              </button>
            </div>
          </div>
        )}
      </div>

      <ThreeViewer 
        model={model} 
        containerRef={containerRef} 
        isAR={isARActive}
        animationEnabled={animationEnabled}
      />
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState('welcome');
  const [selectedModel, setSelectedModel] = useState(null);

  const handleStart = () => {
    setCurrentView('models');
  };

  const handleSelectModel = (model) => {
    setSelectedModel(model);
    setCurrentView('viewer');
  };

  const handleViewAR = () => {
    setCurrentView('ar');
  };

  const handleBack = () => {
    if (currentView === 'models') {
      setCurrentView('welcome');
    } else if (currentView === 'viewer') {
      setCurrentView('models');
      setSelectedModel(null);
    } else if (currentView === 'ar') {
      setCurrentView('viewer');
    }
  };

  return (
    <div className="App">
      {currentView === 'welcome' && (
        <Welcome onStart={handleStart} />
      )}
      
      {currentView === 'models' && (
        <ModelsList onSelectModel={handleSelectModel} onBack={handleBack} />
      )}
      
      {currentView === 'viewer' && selectedModel && (
        <ModelViewer 
          model={selectedModel} 
          onBack={handleBack}
          onViewAR={handleViewAR}
        />
      )}
      
      {currentView === 'ar' && selectedModel && (
        <ARViewer 
          model={selectedModel} 
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default App;