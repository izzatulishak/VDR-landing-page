import React, { useMemo } from 'react';
import * as THREE from 'three';

// Convert lat/lon to 3D position on sphere
const latLonToVector3 = (lat, lon, radius, height = 0) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius + height) * Math.sin(phi) * Math.cos(theta);
    const z = (radius + height) * Math.sin(phi) * Math.sin(theta);
    const y = (radius + height) * Math.cos(phi);

    return new THREE.Vector3(x, y, z);
};

// Get centroid of polygon coordinates
const getPolygonCenter = (coordinates) => {
    if (!coordinates || coordinates.length === 0) return [0, 0];

    const coords = Array.isArray(coordinates[0][0][0])
        ? coordinates[0][0]  // MultiPolygon
        : coordinates[0];     // Polygon

    let sumLon = 0, sumLat = 0;
    coords.forEach(([lon, lat]) => {
        sumLon += lon;
        sumLat += lat;
    });

    return [sumLat / coords.length, sumLon / coords.length];
};

// Color palette matching existing theme
const statusColors = {
    EXPLORATION: '#A855F7',
    UPCOMING: '#D946EF',
    RUNNING: '#8B5CF6',
    PENDING: '#7C3AED',
    CONDITIONAL: '#6366F1',
    OPEN: '#06B6D4'
};

import { Html } from '@react-three/drei';
import { useState } from 'react';

const BlockMarker = ({ position, block, onClick, isSelected }) => {
    const color = statusColors[block.properties?.status] || statusColors.EXPLORATION;
    const [hovered, setHovered] = useState(false);

    return (
        <group position={position}>
            <mesh
                onClick={() => onClick(block)}
                onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
                onPointerOut={(e) => setHovered(false)}
            >
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={isSelected || hovered ? 1.5 : 0.8}
                    metalness={0.5}
                    roughness={0.2}
                />
            </mesh>

            {/* Pulsing ring effect */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <ringGeometry args={[0.06, 0.08, 32]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={isSelected || hovered ? 0.6 : 0.3}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Hover Tooltip */}
            {hovered && (
                <Html position={[0, 0.1, 0]} center distanceFactor={10} zIndexRange={[100, 0]}>
                    <div className="px-3 py-2 bg-black/80 backdrop-blur-md text-white rounded-lg border border-white/10 shadow-xl pointer-events-none min-w-[120px]">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-accent mb-0.5">
                            {block.properties?.status}
                        </div>
                        <div className="text-xs font-bold whitespace-nowrap">
                            {block.properties?.namobj}
                        </div>
                    </div>
                </Html>
            )}
        </group>
    );
};

const BlockMarkers = ({ blocks, earthRadius, onBlockSelect, selectedBlock }) => {
    const markers = useMemo(() => {
        return blocks.features.map((feature, index) => {
            const [lat, lon] = getPolygonCenter(feature.geometry.coordinates);
            const position = latLonToVector3(lat, lon, earthRadius, 0.1);
            const isSelected = selectedBlock?.namobj === feature.properties?.namobj;

            return (
                <BlockMarker
                    key={feature.id || index}
                    position={position}
                    block={feature}
                    onClick={(block) => onBlockSelect(block.properties)}
                    isSelected={isSelected}
                />
            );
        });
    }, [blocks, earthRadius, selectedBlock, onBlockSelect]);

    return <group>{markers}</group>;
};

export default BlockMarkers;
