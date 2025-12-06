import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';

const Satellite = ({ position, scale, rotation, onClick }) => {
    const groupRef = useRef();
    const [hovered, setHovered] = useState(false);

    // Load the Garuda GLTF model
    const { scene } = useGLTF(`${import.meta.env.BASE_URL}models/garuda/scene.gltf`);
    const clonedScene = scene.clone();

    // Apply environment map
    clonedScene.traverse((child) => {
        if (child.isMesh) {
            if (child.material) {
                child.material.envMapIntensity = 2.0;
                child.material.needsUpdate = true;
            }
        }
    });

    useFrame(({ clock }) => {
        if (groupRef.current) {
            const t = clock.getElapsedTime();
            groupRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.1;
        }
    });

    return (
        <group
            ref={groupRef}
            position={position}
            scale={scale}
            rotation={rotation}
            onClick={onClick}
            onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(true);
                document.body.style.cursor = 'pointer';
            }}
            onPointerOut={(e) => {
                e.stopPropagation();
                setHovered(false);
                document.body.style.cursor = 'auto';
            }}
        >
            {/* Invisible Hit Box for easier Interaction */}
            <mesh visible={false}>
                <boxGeometry args={[3, 3, 3]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            <primitive object={clonedScene} />

            {/* Floating Tooltip */}
            <Html
                position={[0, 1.8, 0]} // Slightly higher for better clearance
                center
                distanceFactor={10} // Increased from 5 to ensure visibility on all devices
                style={{
                    pointerEvents: 'none',
                    opacity: hovered ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out',
                    whiteSpace: 'nowrap'
                }}
            >
                <div className="flex flex-col items-center gap-0.5 transform-gpu origin-bottom">
                    <div className="px-2 py-0.5 rounded bg-black/50 backdrop-blur-[2px] border border-white/10 flex flex-col items-center text-center">
                        <span className="text-[5px] font-medium uppercase tracking-widest text-[#FFD700] opacity-80 mb-px">Republic of Indonesia</span>
                        <span className="text-[7px] font-medium text-white whitespace-nowrap opacity-90">Official Licensing Authority</span>
                    </div>
                    {/* Arrow/Line pointing down */}
                    <div className="w-[0.5px] h-2 bg-gradient-to-b from-white/10 to-transparent" />
                </div>
            </Html>

            {/* Add subtle glow when hovered */}
            {hovered && (
                <pointLight
                    position={[0, 0, 0]}
                    intensity={2}
                    distance={5}
                    color="#FFD700" // Golden glow for Garuda
                />
            )}
        </group>
    );
};

// Preload the model
useGLTF.preload(`${import.meta.env.BASE_URL}models/garuda/scene.gltf`);

export default Satellite;
