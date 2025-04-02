import { create } from 'zustand';

interface SceneState {
  curve: number;
  distance: number;
  height: number;
  gridVisible: boolean;
  ambientLight: boolean;
  setCurve: (curve: number) => void;
  setDistance: (distance: number) => void;
  setHeight: (height: number) => void;
  setGridVisible: (visible: boolean) => void;
  setAmbientLight: (on: boolean) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  curve: 14,
  distance: 8,
  height: 0,
  gridVisible: true,
  ambientLight: true,
  setCurve: (curve) => set((state) => ({ ...state, curve })),
  setDistance: (distance) => set((state) => ({ ...state, distance })),
  setHeight: (height) => set((state) => ({ ...state, height })),
  setGridVisible: (visible) => set((state) => ({ ...state, gridVisible: visible })),
  setAmbientLight: (on) => set((state) => ({ ...state, ambientLight: on })),
}));