import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Satellite = ({ position, scale, rotation, onClick }) => {
    const groupRef = useRef();
    const [hovered, setHovered] = useState(false);

    // Load the ISS GLB model
    const { scene } = useGLTF(`${import.meta.env.BASE_URL}models/ISS_stationary.glb`);

    // Clone the scene to avoid issues with multiple instances
    const clonedScene = scene.clone();

    // Apply environment map intensity to all materials in the model
    clonedScene.traverse((child) => {
        if (child.isMesh) {
            if (child.material) {
                child.material.envMapIntensity = 1.5;
                child.material.needsUpdate = true;
            }
        }
    });

    useFrame(({ clock }) => {
        if (groupRef.current) {
            // Gentle floating animation
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
            <primitive object={clonedScene} />

            {/* Add subtle glow when hovered */}
            {hovered && (
                <pointLight
                    position={[0, 0, 0]}
                    intensity={2}
                    distance={5}
                    color="#3A6FF8"
                />
            )}
        </group>
    );
};

// Preload the model
useGLTF.preload(`${import.meta.env.BASE_URL}models/ISS_stationary.glb`);

export default Satellite;
