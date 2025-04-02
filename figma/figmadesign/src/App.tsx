import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { XR, ARButton } from '@react-three/xr';
import { CurvedPlane } from './components/CurvedPlane';
import { Controls } from './components/Controls';
import { useSceneStore } from './store/sceneStore';

function Scene() {
  const { gridVisible, ambientLight } = useSceneStore();

  return (
    <>
      <OrbitControls />
      {gridVisible && <Grid infiniteGrid cellColor="#444" sectionColor="#444" fadeDistance={50} fadeStrength={5} />}
      {ambientLight && <ambientLight intensity={0.5} />}
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <CurvedPlane />
    </>
  );
}

function App() {
  return (
    <div className="w-full h-screen bg-black relative">
      <div className="absolute top-0 left-0 z-10 p-4 text-white/70">
        SpatialOS XR Bridge
      </div>
      <Canvas>
        <color attach="background" args={['#000000']} />
        <XR>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </XR>
      </Canvas>
      <Controls />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <ARButton className="px-8 py-2 bg-transparent border border-white/20 text-white rounded hover:bg-white/10 transition-colors" />
        <div className="text-white/50 text-sm mt-2">
          AR Button – Plays design in AR mode when pressed
        </div>
      </div>
    </div>
  );
}

export default App;