import React, { useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';

const CountryBorders = ({ radius = 6.371 }) => {
    const [borderLines, setBorderLines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountryBorders = async () => {
            try {
                console.log('🌍 Fetching world country borders...');

                // Use a simpler, smaller GeoJSON source for better performance
                const response = await fetch(
                    'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const geojson = await response.json();
                console.log(`📦 Loaded ${geojson.features.length} countries`);

                const lines = [];
                let totalPoints = 0;
                const maxPointsPerLine = 500; // Limit points per line for performance

                geojson.features.forEach((feature) => {
                    const geometry = feature.geometry;
                    if (!geometry) return;

                    const processCoordinates = (coords, depth = 0) => {
                        // Handle different geometry types
                        if (depth === 0 && Array.isArray(coords[0]) && Array.isArray(coords[0][0])) {
                            coords.forEach(coord => processCoordinates(coord, depth + 1));
                        } else if (Array.isArray(coords[0]) && typeof coords[0][0] === 'number') {
                            // Simplify line by sampling points if too many
                            let sampledCoords = coords;
                            if (coords.length > maxPointsPerLine) {
                                const step = Math.ceil(coords.length / maxPointsPerLine);
                                sampledCoords = coords.filter((_, i) => i % step === 0);
                            }

                            const points = sampledCoords.map(([lon, lat]) => {
                                const phi = (90 - lat) * (Math.PI / 180);
                                const theta = (lon + 180) * (Math.PI / 180);
                                const x = -(radius * 1.002) * Math.sin(phi) * Math.cos(theta);
                                const z = (radius * 1.002) * Math.sin(phi) * Math.sin(theta);
                                const y = (radius * 1.002) * Math.cos(phi);
                                return new THREE.Vector3(x, y, z);
                            });

                            if (points.length > 1) {
                                lines.push(points);
                                totalPoints += points.length;
                            }
                        } else if (Array.isArray(coords[0])) {
                            coords.forEach(coord => processCoordinates(coord, depth + 1));
                        }
                    };

                    if (geometry.type === 'Polygon') {
                        processCoordinates(geometry.coordinates);
                    } else if (geometry.type === 'MultiPolygon') {
                        geometry.coordinates.forEach(polygon => {
                            processCoordinates(polygon);
                        });
                    }
                });

                console.log(`✅ Created ${lines.length} border lines with ${totalPoints} total points`);
                setBorderLines(lines);
                setLoading(false);
            } catch (err) {
                console.error('❌ Error loading country borders:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCountryBorders();
    }, [radius]);

    // Memoize the geometry creation to avoid recreating on every render
    const borderGeometries = useMemo(() => {
        return borderLines.map((points) => {
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            return geometry;
        });
    }, [borderLines]);

    if (loading || error) {
        return null;
    }

    return (
        <group>
            {borderGeometries.map((geometry, index) => (
                <line key={`border-${index}`} geometry={geometry}>
                    <lineBasicMaterial
                        color="#00ff88"
                        transparent
                        opacity={0.25}
                        linewidth={1}
                    />
                </line>
            ))}
        </group>
    );
};

export default CountryBorders;
