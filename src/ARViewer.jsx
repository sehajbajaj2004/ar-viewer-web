import '@google/model-viewer';

export default function ARViewer() {
  return (
    <model-viewer 
    src="car_mini.glb" 
    ar 
    ar-modes="scene-viewer quick-look webxr"
    ios-src="model.usdz"
    auto-rotate 
    camera-controls
    alt="3D model"
  >
    <button slot="ar-button" style="position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); padding: 12px 20px;">
      View in your space
    </button>
  </model-viewer>
  );
}
