import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Text3D, Center } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function GeometricShapes() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create randomized shapes
  const shapes = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.2,
      geometry: i % 2 === 0 ? "icosahedron" : "octahedron"
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.2;
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={2}>
          <mesh position={shape.position} rotation={shape.rotation} scale={shape.scale}>
            {shape.geometry === "icosahedron" ? (
              <icosahedronGeometry args={[1, 0]} />
            ) : (
              <octahedronGeometry args={[1, 0]} />
            )}
            <meshStandardMaterial
              color="#E6E6FA"
              roughness={0.1}
              metalness={0.8}
              wireframe
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[hsl(var(--background))]">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#E6E6FA" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#9333ea" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <GeometricShapes />
        <fog attach="fog" args={['hsl(210, 20%, 15%)', 5, 20]} />
      </Canvas>
    </div>
  );
}
