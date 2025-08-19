// import React, { useState, useCallback, useEffect, useRef, useMemo } from "react";
// import {
//   ChevronLeft,
//   Play,
//   Square,
//   Box,
//   Smartphone,
// } from "lucide-react";

// // Mock 3D model data - replace with your actual model URLs
// const models = [
//   {
//     id: 1,
//     name: "Car",
//     thumbnail:
//       "https://plus.unsplash.com/premium_vector-1716902817657-f2f50b7b1efb?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     glbSrc: "/car_mini.glb",
//     usdzSrc: "/model.usdz",
//     description: "A Low Poly Car Model.",
//     hotspots: [
//       {
//         slot: "hotspot-seat",
//         position: "0 0.5 0",
//         normal: "0 1 0",
//         animation: "Car Engine",
//         title: "Car Engine",
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "Bot",
//     thumbnail:
//       "https://plus.unsplash.com/premium_vector-1736862699214-09a672d1db6c?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     glbSrc: "/bot.glb",
//     usdzSrc: "/bot_model.usdz",
//     description: "A Low Poly Inspection Bot.",
//     hotspots: [
//       {
//         slot: "hotspot-seat",
//         position: "0 0.5 0",
//         normal: "0 1 0",
//         animation: "Start Inspecting",
//         title: "Start Inspecting",
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "Alien",
//     thumbnail:
//       "https://plus.unsplash.com/premium_vector-1723830045164-ae4e5dea0f44?q=80&w=868&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     glbSrc: "/alien.glb",
//     usdzSrc: "/Alien_model.usdz",
//     description: "A Low Poly Alien Model.",
//     hotspots: [
//       {
//         slot: "hotspot-seat",
//         position: "0 0.5 0",
//         normal: "0 1 0",
//         animation: "Talk to Alien",
//         title: "Talk to Alien",
//       },
//     ],
//   },
//   {
//     id: 4,
//     name: "Bird",
//     thumbnail:
//       "https://plus.unsplash.com/premium_vector-1715632451165-87c3a13df4c1?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     glbSrc: "/Bird/bird.glb",
//     usdzSrc: "/Bird/bird_model.usdz",
//     description: "A Low Poly Bird Model.",
//     hotspots: [
//       {
//         slot: "hotspot-seat",
//         position: "0 0.5 0",
//         normal: "0 1 0",
//         animation: "Make Bird Fly",
//         title: "Make Bird Fly",
//       },
//     ],
//   },
//   {
//     id: 5,
//     name: "Saloon",
//     thumbnail:
//       "https://plus.unsplash.com/premium_vector-1744282417028-a42c3736a7e2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     glbSrc: "/Saloon/saloon.glb",
//     usdzSrc: "/Saloon/saloon_model.usdz",
//     description: "A Low Poly Saloon.",
//     hotspots: [
//       {
//         slot: "hotspot-seat",
//         position: "0 0.5 0",
//         normal: "0 1 0",
//         animation: "Open Gates.",
//         title: "Open Gates.",
//       },
//     ],
//   },
//   {
//     id: 6,
//     name: "Windmill",
//     thumbnail:
//       "https://plus.unsplash.com/premium_vector-1728553013177-07560e4011bd?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     glbSrc: "/windmill/windmill.glb",
//     usdzSrc: "/windmill/windmill_model.usdz",
//     description: "A Low Poly Windmill Model.",
//     hotspots: [
//       {
//         slot: "hotspot-seat",
//         position: "0.5 1.8 0",
//         normal: "0 1 0",
//         animation: "Blow Windmill.",
//         title: "Blow Windmill.",
//       },
//     ],
//   },
//   {
//     id: 7,
//     name: "Fan",
//     thumbnail:
//       "https://plus.unsplash.com/premium_vector-1711987870389-b8b9c678515a?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     glbSrc: "/fan/fan.glb",
//     usdzSrc: "/fan/fan_model.usdz",
//     description: "A Low Poly Fan Model.",
//     hotspots: [
//       {
//         slot: "hotspot-seat",
//         position: "0.5 1.8 0",
//         normal: "0 1 0",
//         animation: "Turn On Fan.",
//         title: "Turn On Fan.",
//       },
//     ],
//   },
//   {
//     id: 8,
//     name: "Clock",
//     thumbnail:
//       "https://plus.unsplash.com/premium_vector-1682299774024-134151442e05?q=80&w=1129&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     glbSrc: "/clock/clock.glb",
//     usdzSrc: "/clock/clock_model.usdz",
//     description: "A Low Poly Clock Model.",
//     hotspots: [
//       {
//         slot: "hotspot-seat",
//         position: "0 0 0",
//         normal: "0 1 0",
//         animation: "Flyby time.",
//         title: "Flyby time.",
//       },
//     ],
//   },
//   {
//     id: 9,
//     name: "Duck",
//     thumbnail:
//       "https://plus.unsplash.com/premium_vector-1715786847803-e1426befb30b?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     glbSrc: "/duck/duck.glb",
//     usdzSrc: "/duck/duck_model.usdz",
//     description: "A Low Poly duck Model.",
//     hotspots: [
//       {
//         slot: "hotspot-seat",
//         position: "0 0.5 0",
//         normal: "0 1 0",
//         animation: "Quack Duck.",
//         title: "Quack Duck.",
//       },
//     ],
//   },
//   {
//     id: 10,
//     name: "Disco",
//     thumbnail:
//       "https://plus.unsplash.com/premium_vector-1729110777717-f8ff4e9510e9?q=80&w=784&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     glbSrc: "/disco/disco.glb",
//     usdzSrc: "/disco/disco_model.usdz",
//     description: "A Low Poly disco Model.",
//     hotspots: [
//       {
//         slot: "hotspot-seat",
//         position: "0 5 0",
//         normal: "0 1 0",
//         animation: "Start Disco.",
//         title: "Start Disco.",
//       },
//     ],
//   },
// ];

// // Optimized Particles Component
// const Particles = React.memo(function Particles({
//   particleColors = ["#ffffff", "#ffffff"],
//   particleCount = 200,
//   particleSpread = 10,
//   speed = 0.1,
//   moveParticlesOnHover = true,
//   alphaParticles = false,
//   disableRotation = false,
// }) {
//   const [particles, setParticles] = useState([]);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const containerRef = useRef(null);
//   const animationFrameRef = useRef(null);

//   const initialParticles = useMemo(() => {
//     const newParticles = [];
//     for (let i = 0; i < particleCount; i++) {
//       newParticles.push({
//         id: i,
//         x: Math.random() * 100,
//         y: Math.random() * 100,
//         size: Math.random() * 3 + 1,
//         opacity: alphaParticles ? Math.random() * 0.8 + 0.2 : 1,
//         rotation: Math.random() * 360,
//         rotationSpeed: (Math.random() - 0.5) * 2,
//         moveX: (Math.random() - 0.5) * speed,
//         moveY: (Math.random() - 0.5) * speed,
//         color: particleColors[Math.floor(Math.random() * particleColors.length)],
//       });
//     }
//     return newParticles;
//   }, [particleCount, particleColors, speed, alphaParticles]);

//   useEffect(() => {
//     setParticles(initialParticles);
//   }, [initialParticles]);

//   const handleMouseMove = useCallback((e) => {
//     if (containerRef.current) {
//       const rect = containerRef.current.getBoundingClientRect();
//       setMousePosition({
//         x: ((e.clientX - rect.left) / rect.width) * 100,
//         y: ((e.clientY - rect.top) / rect.height) * 100,
//       });
//     }
//   }, []);

//   useEffect(() => {
//     if (moveParticlesOnHover) {
//       document.addEventListener("mousemove", handleMouseMove);
//       return () => document.removeEventListener("mousemove", handleMouseMove);
//     }
//   }, [moveParticlesOnHover, handleMouseMove]);

//   const animateParticles = useCallback(() => {
//     setParticles((prevParticles) =>
//       prevParticles.map((particle) => {
//         let newX = particle.x + particle.moveX;
//         let newY = particle.y + particle.moveY;

//         // Bounce off edges
//         if (newX < 0 || newX > 100) {
//           particle.moveX = -particle.moveX;
//           newX = particle.x + particle.moveX;
//         }
//         if (newY < 0 || newY > 100) {
//           particle.moveY = -particle.moveY;
//           newY = particle.y + particle.moveY;
//         }

//         // Mouse interaction
//         if (moveParticlesOnHover) {
//           const distanceX = mousePosition.x - particle.x;
//           const distanceY = mousePosition.y - particle.y;
//           const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

//           if (distance < particleSpread) {
//             const force = (particleSpread - distance) / particleSpread;
//             newX -= distanceX * force * 0.1;
//             newY -= distanceY * force * 0.1;
//           }
//         }

//         return {
//           ...particle,
//           x: newX,
//           y: newY,
//           rotation: disableRotation
//             ? particle.rotation
//             : particle.rotation + particle.rotationSpeed,
//         };
//       })
//     );

//     animationFrameRef.current = requestAnimationFrame(animateParticles);
//   }, [mousePosition, moveParticlesOnHover, particleSpread, disableRotation]);

//   useEffect(() => {
//     animationFrameRef.current = requestAnimationFrame(animateParticles);
//     return () => {
//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current);
//       }
//     };
//   }, [animateParticles]);

//   return (
//     <div
//       ref={containerRef}
//       className="absolute inset-0 overflow-hidden pointer-events-none"
//       style={{ width: "100%", height: "100%" }}
//     >
//       {particles.map((particle) => (
//         <div
//           key={particle.id}
//           className="absolute rounded-full"
//           style={{
//             left: `${particle.x}%`,
//             top: `${particle.y}%`,
//             width: `${particle.size}px`,
//             height: `${particle.size}px`,
//             backgroundColor: particle.color,
//             opacity: particle.opacity,
//             transform: `rotate(${particle.rotation}deg) translate(-50%, -50%)`,
//             transition: "all 0.1s ease-out",
//           }}
//         />
//       ))}
//     </div>
//   );
// });

// // Welcome Screen Component
// const WelcomeScreen = React.memo(function WelcomeScreen({ onStart }) {
//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center p-4 relative">
//       <div
//         style={{
//           width: "100%",
//           height: "100%",
//           position: "absolute",
//           top: 0,
//           left: 0,
//         }}
//       >
//         <Particles
//           particleColors={["#ffffff", "#f8fafc"]}
//           particleCount={100}
//           particleSpread={15}
//           speed={0.5}
//           moveParticlesOnHover={true}
//           alphaParticles={true}
//           disableRotation={false}
//         />
//       </div>

//       <div className="text-center max-w-sm sm:max-w-md md:max-w-lg mx-auto relative z-10 px-2">
//         <div className="mb-8 sm:mb-12">
//           <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl mb-4 sm:mb-6">
//             <Box className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
//           </div>
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight">
//             Web AR Viewer
//           </h1>
//           <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
//             View and visualize 3D models in your space using augmented reality
//             technology.
//           </p>
//         </div>

//         <button
//           onClick={onStart}
//           className="bg-white text-black px-8 sm:px-10 py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-white/10 flex items-center gap-3 mx-auto active:scale-95"
//         >
//           <Play className="w-5 h-5 sm:w-6 sm:h-6" />
//           Start Exploring
//         </button>
//       </div>
//     </div>
//   );
// });

// // Model Selection Screen Component
// const ModelSelectionScreen = React.memo(function ModelSelectionScreen({ onSelectModel, onBack }) {
//   return (
//     <div className="min-h-screen bg-black">
//       <div className="bg-[#121212] border-b border-gray-800 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
//           <div className="flex items-center">
//             <button
//               onClick={onBack}
//               className="mr-3 sm:mr-4 p-2 rounded-xl hover:bg-gray-800 transition-colors active:scale-95"
//             >
//               <ChevronLeft className="w-6 h-6 text-white" />
//             </button>
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-white">
//                 3D Collection
//               </h1>
//               <p className="text-gray-400 mt-1 text-sm sm:text-base">
//                 Choose a model to explore in AR
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto p-3 sm:p-6">
//         <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
//           {models.map((model) => (
//             <div
//               key={model.id}
//               onClick={() => onSelectModel(model)}
//               className="bg-[#121212] rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-[1.02] overflow-hidden group border border-gray-800 active:scale-95"
//             >
//               <div className="aspect-square overflow-hidden bg-gray-800">
//                 <img
//                   src={model.thumbnail}
//                   alt={model.name}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                   loading="lazy"
//                 />
//               </div>
//               <div className="p-3 sm:p-4 md:p-5">
//                 <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">
//                   {model.name}
//                 </h3>
//                 <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-2">
//                   {model.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// });

// // Animation Control Hook
// function useAnimationControl() {
//   const [activeAnimations, setActiveAnimations] = useState(new Map());
 
//   const toggleAnimation = useCallback((animationName, modelViewer) => {
//     if (!modelViewer) return;

//     setActiveAnimations(prev => {
//       const newMap = new Map(prev);
//       const isActive = newMap.get(animationName);

//       if (isActive) {
//         // Stop animation
//         modelViewer.pause();
//         modelViewer.animationName = null;
//         modelViewer.setAttribute("animation-loop", "false");
//         newMap.set(animationName, false);
//       } else {
//         // Start animation
//         modelViewer.animationName = animationName;
//         modelViewer.setAttribute("animation-loop", "true");
//         modelViewer.currentTime = 0;
//         modelViewer.play();
//         newMap.set(animationName, true);
//       }

//       return newMap;
//     });
//   }, []);

//   const stopAllAnimations = useCallback((modelViewer) => {
//     if (!modelViewer) return;
   
//     modelViewer.pause();
//     modelViewer.animationName = null;
//     setActiveAnimations(new Map());
//   }, []);

//   return { activeAnimations, toggleAnimation, stopAllAnimations };
// }

// // AR Viewer Component
// function ARViewer({ model, onBack }) {
//   const modelViewerRef = useRef(null);
//   const { activeAnimations, toggleAnimation, stopAllAnimations } = useAnimationControl();

//   const handleHotspotClick = useCallback(
//     (animationName) => {
//       if (!modelViewerRef.current) return;
//       toggleAnimation(animationName, modelViewerRef.current);
//     },
//     [toggleAnimation]
//   );

//   // Set up hotspot event listeners
//   useEffect(() => {
//     const modelViewer = modelViewerRef.current;
//     if (!modelViewer) return;

//     const handleLoad = () => {
//       model.hotspots?.forEach((hotspot) => {
//         const hotspotElement = modelViewer.querySelector(`[slot="${hotspot.slot}"]`);
//         if (hotspotElement) {
//           hotspotElement.addEventListener("click", () => {
//             handleHotspotClick(hotspot.animation);
//           });
//         }
//       });
//     };

//     modelViewer.addEventListener("load", handleLoad);

//     return () => {
//       modelViewer.removeEventListener("load", handleLoad);
//       stopAllAnimations(modelViewer);
//     };
//   }, [model, handleHotspotClick, stopAllAnimations]);

//   return (
//     <div className="min-h-screen bg-black">
//       <style>{`
//         .hotspot {
//           display: block;
//           width: 24px;
//           height: 24px;
//           border-radius: 50%;
//           border: 2px solid #ffffff;
//           background: linear-gradient(135deg, #3b82f6, #1d4ed8);
//           box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
//           cursor: pointer;
//           transition: all 0.3s ease;
//           position: relative;
//           animation: pulse 2s infinite;
//         }

//         .hotspot:hover {
//           transform: scale(1.2);
//           background: linear-gradient(135deg, #1d4ed8, #1e40af);
//           box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
//         }

//         .hotspot:active {
//           transform: scale(1.1);
//         }

//         .hotspot.active {
//           background: linear-gradient(135deg, #ef4444, #dc2626);
//           animation: pulse-red 1s infinite;
//         }

//         .hotspot::before {
//           content: '';
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           width: 8px;
//           height: 8px;
//           background: white;
//           border-radius: 50%;
//           transform: translate(-50%, -50%);
//         }

//         @keyframes pulse {
//           0% {
//             box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4), 0 0 0 0 rgba(59, 130, 246, 0.7);
//           }
//           70% {
//             box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4), 0 0 0 10px rgba(59, 130, 246, 0);
//           }
//           100% {
//             box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4), 0 0 0 0 rgba(59, 130, 246, 0);
//           }
//         }

//         @keyframes pulse-red {
//           0% {
//             box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4), 0 0 0 0 rgba(239, 68, 68, 0.7);
//           }
//           70% {
//             box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4), 0 0 0 10px rgba(239, 68, 68, 0);
//           }
//           100% {
//             box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4), 0 0 0 0 rgba(239, 68, 68, 0);
//           }
//         }

//         .annotation {
//           background: rgba(0, 0, 0, 0.8);
//           color: white;
//           position: absolute;
//           transform: translate(10px, 10px);
//           border-radius: 8px;
//           padding: 8px 12px;
//           font-size: 12px;
//           font-weight: 500;
//           white-space: nowrap;
//           pointer-events: none;
//           backdrop-filter: blur(4px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//         }

//         :not(:defined) > * {
//           display: none;
//         }
//       `}</style>

//       <div className="bg-[#121212] border-b border-gray-800 sticky top-0 z-10">
//         <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
//           <div className="flex items-center">
//             <button
//               onClick={onBack}
//               className="mr-3 sm:mr-4 p-2 rounded-xl hover:bg-gray-800 transition-colors active:scale-95"
//             >
//               <ChevronLeft className="w-6 h-6 text-white" />
//             </button>
//             <div className="flex-1 min-w-0">
//               <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white truncate">
//                 {model.name}
//               </h1>
//               <p className="text-gray-400 mt-1 text-sm sm:text-base line-clamp-1">
//                 {model.description}
//               </p>
//             </div>
//             {Array.from(activeAnimations.values()).some(active => active) && (
//               <div className="flex items-center gap-2 text-red-400">
//                 <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
//                 <span className="text-sm">Animating...</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto p-3 sm:p-6">
//         <div className="bg-[#3c3c3c] rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden border border-gray-800">
//           <div style={{ height: "60vh" }} className="bg-[#121212] relative">
//             <model-viewer
//               ref={modelViewerRef}
//               src={model.glbSrc}
//               ar
//               ar-modes="scene-viewer quick-look webxr"
//               ios-src={model.usdzSrc}
//               auto-rotate
//               camera-controls
//               animation-loop="false"
//               alt={model.name}
//               style={{ width: "100%", height: "100%" }}
//               className="rounded-t-2xl sm:rounded-t-3xl bg-[#242424]"
//             >
//               {model.hotspots?.map((hotspot, index) => (
//                 <button
//                   key={index}
//                   className={`hotspot ${activeAnimations.get(hotspot.animation) ? 'active' : ''}`}
//                   slot={hotspot.slot}
//                   data-position={hotspot.position}
//                   data-normal={hotspot.normal}
//                   title={hotspot.title}
//                 >
//                   <div className="annotation">
//                     {activeAnimations.get(hotspot.animation)
//                       ? `Stop ${hotspot.title}`
//                       : `Start ${hotspot.title}`
//                     }
//                   </div>
//                 </button>
//               ))}

//               <button
//                 slot="ar-button"
//                 className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg flex items-center gap-2 sm:gap-3 group active:scale-95"
//               >
//                 <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
//                 View in My Room
//               </button>
//             </model-viewer>
//           </div>

//           <div className="p-4 sm:p-6 md:p-8">
//             <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
//               <div>
//                 <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
//                   About this model
//                 </h2>
//                 <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
//                   {model.description}
//                 </p>

//                 {model.hotspots && model.hotspots.length > 0 && (
//                   <div className="mt-4">
//                     <h3 className="text-lg font-semibold text-white mb-2">
//                       Animation Controls
//                     </h3>
//                     <div className="space-y-2">
//                       {model.hotspots.map((hotspot, index) => (
//                         <div
//                           key={index}
//                           className="flex items-center justify-between gap-2 text-sm"
//                         >
//                           <div className="flex items-center gap-2 text-gray-300">
//                             <div className={`w-3 h-3 rounded-full ${activeAnimations.get(hotspot.animation) ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`}></div>
//                             <span>{hotspot.title}</span>
//                           </div>
//                           <span className={`text-xs px-2 py-1 rounded ${activeAnimations.get(hotspot.animation) ? 'bg-red-900 text-red-300' : 'bg-gray-700 text-gray-300'}`}>
//                             {activeAnimations.get(hotspot.animation) ? 'Running' : 'Stopped'}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="bg-[#242424] rounded-xl sm:rounded-2xl p-4 sm:p-6">
//                 <h3 className="text-lg font-semibold text-white mb-3 sm:mb-4">
//                   How to use
//                 </h3>
//                 <div className="space-y-3 text-sm text-gray-300">
//                   <div className="flex items-start gap-3">
//                     <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                       <span className="text-white text-xs">1</span>
//                     </div>
//                     <p>Drag to rotate and pinch to zoom the 3D model</p>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                       <span className="text-white text-xs">2</span>
//                     </div>
//                     <p>Click blue hotspots to start animations, red to stop them</p>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                       <span className="text-white text-xs">3</span>
//                     </div>
//                     <p>Tap "View in My Room" for augmented reality</p>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                       <span className="text-white text-xs">4</span>
//                     </div>
//                     <p>Point your camera at a flat surface for best AR results</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Main App Component
// export default function App() {
//   const [currentScreen, setCurrentScreen] = useState("welcome");
//   const [selectedModel, setSelectedModel] = useState(null);

//   const handleStart = useCallback(() => {
//     setCurrentScreen("selection");
//   }, []);

//   const handleSelectModel = useCallback((model) => {
//     setSelectedModel(model);
//     setCurrentScreen("viewer");
//   }, []);

//   const handleBackToSelection = useCallback(() => {
//     setCurrentScreen("selection");
//     setSelectedModel(null);
//   }, []);

//   const handleBackToWelcome = useCallback(() => {
//     setCurrentScreen("welcome");
//     setSelectedModel(null);
//   }, []);

//   // Load model-viewer script
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.type = "module";
//     script.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
//     document.head.appendChild(script);

//     return () => {
//       if (document.head.contains(script)) {
//         document.head.removeChild(script);
//       }
//     };
//   }, []);

//   return (
//     <div className="App">
//       {currentScreen === "welcome" && <WelcomeScreen onStart={handleStart} />}

//       {currentScreen === "selection" && (
//         <ModelSelectionScreen
//           onSelectModel={handleSelectModel}
//           onBack={handleBackToWelcome}
//         />
//       )}

//       {currentScreen === "viewer" && selectedModel && (
//         <ARViewer model={selectedModel} onBack={handleBackToSelection} />
//       )}
//     </div>
//   );
// }