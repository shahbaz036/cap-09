import React from 'react';
import { useSceneStore } from '../store/sceneStore';

export const Controls: React.FC = () => {
  const {
    curve,
    distance,
    height,
    gridVisible,
    ambientLight,
    setCurve,
    setDistance,
    setHeight,
    setGridVisible,
    setAmbientLight,
  } = useSceneStore();

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent text-white/70 p-4 rounded-lg w-48 space-y-4">
      <div>
        <label className="block text-sm mb-1">Curve</label>
        <div className="flex items-center justify-between">
          <input
            type="range"
            min="0"
            max="50"
            value={curve}
            onChange={(e) => setCurve(Number(e.target.value))}
            className="w-32"
          />
          <span className="text-sm">{curve}</span>
        </div>
      </div>
      <div>
        <label className="block text-sm mb-1">Distance</label>
        <div className="flex items-center justify-between">
          <input
            type="range"
            min="0"
            max="20"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-32"
          />
          <span className="text-sm">{distance}</span>
        </div>
      </div>
      <div>
        <label className="block text-sm mb-1">Y Height</label>
        <div className="flex items-center justify-between">
          <input
            type="range"
            min="-10"
            max="10"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-32"
          />
          <span className="text-sm">{height}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">Grid</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={gridVisible}
            onChange={(e) => setGridVisible(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">Ambient Light</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={ambientLight}
            onChange={(e) => setAmbientLight(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );
};