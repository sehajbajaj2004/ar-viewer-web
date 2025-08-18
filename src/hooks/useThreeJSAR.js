import { useState, useEffect, useRef, useCallback } from 'react';

export function useThreeJSAR() {
  const [isARSupported, setIsARSupported] = useState(false);
  const [isARActive, setIsARActive] = useState(false);
  const [scene, setScene] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [camera, setCamera] = useState(null);
  const [mixer, setMixer] = useState(null);
  const [model, setModel] = useState(null);
  const [animationActions, setAnimationActions] = useState({});
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Check AR support
  useEffect(() => {
    if ('xr' in navigator) {
      navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
        setIsARSupported(supported);
      }).catch(() => {
        setIsARSupported(false);
      });
    }
  }, []);

  // Initialize Three.js scene
  const initializeScene = useCallback(async (modelPath) => {
    if (!containerRef.current) return;

    // Dynamically import Three.js modules
    const THREE = await import('three');
    const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
    const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');

    const container = containerRef.current;
    
    // Scene setup
    const newScene = new THREE.Scene();
    newScene.background = new THREE.Color(0x111111);
    setScene(newScene);

    // Camera setup
    const newCamera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    newCamera.position.set(0, 1, 3);
    setCamera(newCamera);

    // Renderer setup
    const newRenderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    newRenderer.setSize(container.clientWidth, container.clientHeight);
    newRenderer.setPixelRatio(window.devicePixelRatio);
    newRenderer.shadowMap.enabled = true;
    newRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    newRenderer.xr.enabled = true;
    container.appendChild(newRenderer.domElement);
    setRenderer(newRenderer);

    // Controls
    const controls = new OrbitControls(newCamera, newRenderer.domElement);
    controls.target.set(0, 1, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    newScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 0.5).normalize();
    directionalLight.castShadow = true;
    newScene.add(directionalLight);

    // Load model
    const loader = new GLTFLoader();
    try {
      const gltf = await new Promise((resolve, reject) => {
        loader.load(modelPath, resolve, undefined, reject);
      });

      const loadedModel = gltf.scene;
      newScene.add(loadedModel);
      setModel(loadedModel);

      // Setup animations
      if (gltf.animations && gltf.animations.length > 0) {
        const newMixer = new THREE.AnimationMixer(loadedModel);
        setMixer(newMixer);

        const actions = {};
        gltf.animations.forEach((clip) => {
          const action = newMixer.clipAction(clip);
          actions[clip.name] = action;
        });
        setAnimationActions(actions);
      }
    } catch (error) {
      console.error('Error loading model:', error);
    }

    // Animation loop
    function animate() {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      if (mixer) {
        mixer.update(0.016);
      }
      
      controls.update();
      newRenderer.render(newScene, newCamera);
    }
    animate();

  }, []);

  // Start AR session
  const startAR = useCallback(async () => {
    if (!isARSupported || !renderer) return;

    try {
      const session = await navigator.xr.requestSession('immersive-ar', {
        requiredFeatures: ['hit-test'],
        optionalFeatures: ['dom-overlay', 'dom-overlay-for-handheld-ar'],
        domOverlay: { root: document.body }
      });

      await renderer.xr.setSession(session);
      setIsARActive(true);

      session.addEventListener('end', () => {
        setIsARActive(false);
      });
    } catch (error) {
      console.error('Error starting AR session:', error);
    }
  }, [isARSupported, renderer]);

  // Control animations
  const toggleAnimation = useCallback((animationName) => {
    if (!animationActions[animationName]) return;

    const action = animationActions[animationName];
    if (action.isRunning()) {
      action.stop();
    } else {
      // Stop other animations
      Object.values(animationActions).forEach(otherAction => {
        if (otherAction !== action && otherAction.isRunning()) {
          otherAction.stop();
        }
      });
      
      action.reset();
      action.play();
    }
  }, [animationActions]);

  // Cleanup
  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (renderer) {
      renderer.dispose();
    }
  }, [renderer]);

  return {
    containerRef,
    isARSupported,
    isARActive,
    initializeScene,
    startAR,
    toggleAnimation,
    cleanup,
    animationActions
  };
}