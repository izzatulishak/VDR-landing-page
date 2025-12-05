import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const Satellite = ({ onFocus }) => {
    const groupRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);

    // Initial position above Indonesia (approx)
    const initialPosition = new THREE.Vector3(12, 8, 15).normalize().multiplyScalar(10);

    useFrame(({ clock }) => {
        if (groupRef.current && !clicked) {
            // Gentle floating animation
            const t = clock.getElapsedTime();
            groupRef.current.position.y = initialPosition.y + Math.sin(t * 0.5) * 0.2;
            groupRef.current.rotation.y += 0.002; // Very slow rotation
            groupRef.current.rotation.z = Math.sin(t * 0.1) * 0.05;
        }
    });

    const handleClick = () => {
        setClicked(true);
        if (onFocus) onFocus();
    };

    const metalMaterial = new THREE.MeshStandardMaterial({
        color: "#e2e8f0",
        metalness: 0.8,
        roughness: 0.3
    });

    const solarMaterial = new THREE.MeshStandardMaterial({
        color: "#1e293b", // Dark blue-black
        metalness: 0.9,
        roughness: 0.1,
        emissive: "#0f172a",
        emissiveIntensity: 0.2
    });

    const highlightMaterial = new THREE.MeshStandardMaterial({
        color: "#a855f7", // Purple
        metalness: 0.8,
        roughness: 0.2,
        emissive: "#a855f7",
        emissiveIntensity: 0.5
    });

    return (
        <group
            ref={groupRef}
            position={initialPosition}
            onClick={handleClick}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* --- Main Truss Structure (Gold Foil Effect) --- */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[8, 0.5, 0.5]} />
                <meshStandardMaterial
                    color="#d4af37" // Gold
                    metalness={1.0}
                    roughness={0.2}
                    envMapIntensity={1.5}
                />
            </mesh>

            {/* --- Solar Arrays (Detailed) --- */}
            {/* Left Wing */}
            <group position={[-4.5, 0, 0]} rotation={[0, 0, 0]}>
                <mesh position={[0, 0, 2]}>
                    <boxGeometry args={[1.5, 0.05, 8]} />
                    <meshStandardMaterial
                        color="#101820"
                        metalness={0.5}
                        roughness={0.1}
                        emissive="#000040"
                        emissiveIntensity={0.2}
                    />
                </mesh>
                <mesh position={[0, 0, -2]}>
                    <boxGeometry args={[1.5, 0.05, 8]} />
                    <meshStandardMaterial
                        color="#101820"
                        metalness={0.5}
                        roughness={0.1}
                        emissive="#000040"
                        emissiveIntensity={0.2}
                    />
                </mesh>
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 4, 8]} rotation={[0, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
                </mesh>
            </group>

            {/* Right Wing */}
            <group position={[4.5, 0, 0]} rotation={[0, 0, 0]}>
                <mesh position={[0, 0, 2]}>
                    <boxGeometry args={[1.5, 0.05, 8]} />
                    <meshStandardMaterial
                        color="#101820"
                        metalness={0.5}
                        roughness={0.1}
                        emissive="#000040"
                        emissiveIntensity={0.2}
                    />
                </mesh>
                <mesh position={[0, 0, -2]}>
                    <boxGeometry args={[1.5, 0.05, 8]} />
                    <meshStandardMaterial
                        color="#101820"
                        metalness={0.5}
                        roughness={0.1}
                        emissive="#000040"
                        emissiveIntensity={0.2}
                    />
                </mesh>
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 4, 8]} rotation={[0, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
                </mesh>
            </group>

            {/* --- Pressurized Modules (Detailed) --- */}
            <group position={[0, -1, 0]}>
                <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.6, 0.6, 4, 16]} />
                    <meshStandardMaterial color="#e0e0e0" metalness={0.6} roughness={0.4} />
                </mesh>
                <mesh position={[1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.5, 0.5, 2, 16]} />
                    <meshStandardMaterial color="#c0c0c0" metalness={0.7} roughness={0.3} />
                </mesh>
                <mesh position={[-1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.5, 0.5, 2, 16]} />
                    <meshStandardMaterial color="#c0c0c0" metalness={0.7} roughness={0.3} />
                </mesh>
            </group>

            {/* --- Radiators (White Panels) --- */}
            <mesh position={[-1.5, 0.5, -2]} rotation={[0.5, 0, 0]}>
                <boxGeometry args={[1, 0.05, 3]} />
                <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.9} />
            </mesh>
            <mesh position={[1.5, 0.5, -2]} rotation={[0.5, 0, 0]}>
                <boxGeometry args={[1, 0.05, 3]} />
                <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.9} />
            </mesh>

            {/* --- Communications Dish --- */}
            <group position={[0, 1, 0]} rotation={[0.5, 0, 0]}>
                <mesh position={[0, 0.5, 0]}>
                    <sphereGeometry args={[0.8, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#eeeeee" side={THREE.DoubleSide} metalness={0.3} roughness={0.6} />
                </mesh>
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.5]} />
                    <meshStandardMaterial color="#444444" />
                </mesh>
            </group>
        </group>
    );
};

export default Satellite;
