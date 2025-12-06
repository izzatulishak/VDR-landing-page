import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Environment } from '@react-three/drei';
import * as THREE from 'three';
import Earth from './Earth';
import BlockMarkers from './BlockMarkers';
import Satellite from './Satellite';
import blockData from '../../data/exploration-blocks.json';
import { RotateCw, Play, Pause } from 'lucide-react';

// Atmosphere Shader for better glow effect
const AtmosphereShader = {
    vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform vec3 glowColor;
        uniform float intensity;
        void main() {
            float brightness = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            gl_FragColor = vec4(glowColor, 1.0) * brightness * intensity;
        }
    `
};

// Atmosphere Glow Component
const AtmosphereGlow = ({ radius = 6.371 }) => {
    return (
        <mesh scale={[1.15, 1.15, 1.15]}>
            <sphereGeometry args={[radius, 64, 64]} />
            <shaderMaterial
                vertexShader={AtmosphereShader.vertexShader}
                fragmentShader={AtmosphereShader.fragmentShader}
                uniforms={{
                    glowColor: { value: new THREE.Color(0.5, 0.7, 1.0) },
                    intensity: { value: 1.2 }
                }}
                side={THREE.BackSide}
                blending={THREE.AdditiveBlending}
                transparent={true}
                depthWrite={false}
            />
        </mesh>
    );
};

// Enhanced Sun Light with Animation
const SunLight = () => {
    const lightRef = useRef();

    useFrame(({ clock }) => {
        if (lightRef.current) {
            const time = clock.getElapsedTime() * 0.05;
            lightRef.current.position.x = Math.cos(time) * 25;
            lightRef.current.position.z = Math.sin(time) * 25;
            lightRef.current.position.y = 15;
        }
    });

    return (
        <directionalLight
            ref={lightRef}
            intensity={2.5}
            color="#ffffff"
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={100}
            shadow-camera-left={-15}
            shadow-camera-right={15}
            shadow-camera-top={15}
            shadow-camera-bottom={-15}
        />
    );
};

// Scene Content
const GlobeScene = ({ onBlockSelect, selectedBlock, onSatelliteFocus, isFocused, isAutoRotating, theme, onSatelliteClick }) => {
    const earthRadius = 6.371;
    const controlsRef = useRef();
    const { camera } = useThree();
    const satelliteGroupRef = useRef();

    // Calculate satellite position relative to camera
    const [satellitePosition, setSatellitePosition] = useState([0, 0, 0]);

    const groupRef = useRef();

    useFrame((state, delta) => {
        if (isFocused && controlsRef.current) {
            // Smoothly move camera to focus on Indonesia
            camera.position.lerp(new THREE.Vector3(10, 5, 10), 0.05);
            controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.05);
        }

        // Update satellite position to follow camera
        // Update satellite position: Hybrid "Physical + HUD" behavior
        // 1. Distance changes with zoom (Physical behavior) -> User sees it get bigger
        // 2. orientation relative to screen is locked (HUD behavior) -> User sees it at bottom
        if (camera) {
            const cameraDir = new THREE.Vector3();
            camera.getWorldDirection(cameraDir);
            const camDist = camera.position.length();

            // Place it roughly at Earth's "atmosphere" level relative to camera
            // If camera is at 20, obj at ~11.5. If cam at 10, obj at ~1.5.
            const targetFromCenter = 8.5; // Radius where "Garuda" orbits
            const hudDistance = Math.max(camDist - targetFromCenter, 2.0); // Clamp min distance

            const basePosition = camera.position.clone().add(cameraDir.multiplyScalar(hudDistance));

            // Camera Space Vectors
            const camUp = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion);
            const camRight = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);

            // Offsets
            // Proportional to distance to maintain relative screen position (bottom 30%)
            const verticalOffset = hudDistance * -0.32;

            // Horizontal Sway
            const time = state.clock.getElapsedTime();
            const swayAmount = Math.sin(time * 0.5) * (hudDistance * 0.05); // Sway scales with distance too
            const horizontalOffset = swayAmount;

            // Apply offsets
            const posWithVertical = basePosition.add(camUp.multiplyScalar(verticalOffset));
            const finalPosition = posWithVertical.add(camRight.multiplyScalar(horizontalOffset));

            setSatellitePosition([finalPosition.x, finalPosition.y, finalPosition.z]);
        }

        // Rotate the entire group (Earth + Blocks) together
        if (groupRef.current && isAutoRotating && !isFocused) {
            groupRef.current.rotation.y += 0.0002;
        }
    });

    return (
        <>
            {/* Enhanced Lighting */}
            <ambientLight intensity={1.5} color="#b0c4de" />
            <SunLight />
            <pointLight position={[-15, -10, -15]} intensity={1.5} color="#6699ff" />
            <pointLight position={[15, 10, 15]} intensity={1.2} color="#88aaff" />

            {/* Stars Background */}
            <Stars
                radius={300}
                depth={60}
                count={3000} // Reduced for better performance
                factor={7}
                saturation={0}
                fade
                speed={1}
            />

            {/* Atmosphere Glow */}
            <AtmosphereGlow radius={earthRadius} />

            <group ref={groupRef} rotation={[0, -2.1, 0.41]}> {/* Initial rotation to show Indonesia + Earth Tilt */}
                <Earth />

                {/* Exploration Block Markers */}
                <React.Suspense fallback={null}>
                    <BlockMarkers
                        blocks={blockData}
                        earthRadius={earthRadius}
                        onBlockSelect={onBlockSelect}
                        selectedBlock={selectedBlock}
                    />
                </React.Suspense>
            </group>

            {/* Satellite positioned to follow camera */}
            <Satellite
                key="garuda-model-v9"
                position={satellitePosition}
                scale={[0.575, 0.575, 0.575]}
                rotation={[0.1, 3.4, 0]}
                onClick={onSatelliteClick}
            />

            {/* Environment Map for realistic reflections */}
            <Environment preset="sunset" />

            <OrbitControls
                ref={controlsRef}
                enableZoom={true}
                enablePan={false}
                enableRotate={true}
                zoomSpeed={0.6}
                rotateSpeed={0.5}
                minDistance={7}
                maxDistance={25}
                autoRotate={isAutoRotating}
                autoRotateSpeed={0.2}
            />
        </>
    );
};

const Globe3D = ({ onBlockSelect, selectedBlock, theme, onSatelliteClick }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isAutoRotating, setIsAutoRotating] = useState(true);

    return (
        <div className="w-full h-full bg-black relative">
            <Canvas
                camera={{
                    position: [10, 3.5, 10.5], // Zoomed in closer, Indonesia on left side
                    fov: 50
                }}
                gl={{
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    outputColorSpace: THREE.SRGBColorSpace,
                    powerPreference: "high-performance",
                    alpha: false,
                    stencil: false,
                    depth: true
                }}
                shadows
                dpr={[1, 2]} // Adaptive pixel ratio for performance
                performance={{ min: 0.5 }} // Adaptive performance
                onCreated={({ gl }) => {
                    gl.setClearColor('#000000', 1);
                }}
            >
                <React.Suspense fallback={
                    <Html center>
                        <div className="text-white text-lg">Loading Globe...</div>
                    </Html>
                }>
                    <GlobeScene
                        onBlockSelect={onBlockSelect}
                        selectedBlock={selectedBlock}
                        onSatelliteFocus={() => setIsFocused(true)}
                        isFocused={isFocused}
                        isAutoRotating={isAutoRotating}
                        theme={theme}
                        onSatelliteClick={onSatelliteClick}
                    />
                </React.Suspense>
            </Canvas>

            {/* Play/Pause Control (Bottom Right) */}
            <div className="absolute bottom-8 right-8 z-20">
                <button
                    onClick={() => setIsAutoRotating(!isAutoRotating)}
                    className="p-3 rounded-full glass hover:bg-white/10 text-white transition-all shadow-lg border border-white/10"
                    title={isAutoRotating ? "Pause Rotation" : "Resume Rotation"}
                >
                    {isAutoRotating ? (
                        <Pause className="w-5 h-5 fill-current" />
                    ) : (
                        <Play className="w-5 h-5 fill-current" />
                    )}
                </button>
            </div>

            {/* Back to Global View CTA */}
            {isFocused && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
                    <button
                        onClick={() => setIsFocused(false)}
                        className="px-6 py-3 bg-accent text-white rounded-full font-bold shadow-lg hover:bg-accent-hover transition-all flex items-center gap-2"
                    >
                        <RotateCw className="w-4 h-4" />
                        Back to Global View
                    </button>
                </div>
            )}

            {/* Attribution - Removed as requested */}
            {/* <div className="absolute bottom-4 right-4 text-xs text-text-secondary glass-panel px-3 py-2 rounded-lg">
                🌍 Interactive Globe View | Data: SKK Migas
            </div> */}
        </div>
    );
};

export default Globe3D;
