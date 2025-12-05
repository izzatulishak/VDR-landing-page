import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

const CountryBorders = ({ radius = 6.371 }) => {
    const [borderLines, setBorderLines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCountryBorders = async () => {
            try {
                console.log('🌍 Fetching world country borders...');

                // Fetch GeoJSON data for all countries from Natural Earth
                const response = await fetch(
                    'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'
                );

                const geojson = await response.json();
                console.log(`📦 Loaded ${geojson.features.length} countries`);

                const lines = [];

                geojson.features.forEach((feature) => {
                    const countryName = feature.properties.ADMIN || feature.properties.name;
                    const geometry = feature.geometry;

                    if (!geometry) return;

                    const processCoordinates = (coords, depth = 0) => {
                        // Handle different geometry types
                        if (depth === 0 && Array.isArray(coords[0]) && Array.isArray(coords[0][0])) {
                            // MultiPolygon or Polygon with holes
                            coords.forEach(coord => processCoordinates(coord, depth + 1));
                        } else if (Array.isArray(coords[0]) && typeof coords[0][0] === 'number') {
                            // This is a line of coordinates
                            const points = coords.map(([lon, lat]) => {
                                const phi = (90 - lat) * (Math.PI / 180);
                                const theta = (lon + 180) * (Math.PI / 180);
                                const x = -(radius * 1.002) * Math.sin(phi) * Math.cos(theta);
                                const z = (radius * 1.002) * Math.sin(phi) * Math.sin(theta);
                                const y = (radius * 1.002) * Math.cos(phi);
                                return new THREE.Vector3(x, y, z);
                            });

                            if (points.length > 1) {
                                lines.push({
                                    points,
                                    country: countryName
                                });
                            }
                        } else if (Array.isArray(coords[0])) {
                            // Nested array, recurse
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

                console.log(`✅ Created ${lines.length} border lines`);
                setBorderLines(lines);
                setLoading(false);
            } catch (error) {
                console.error('❌ Error loading country borders:', error);
                setLoading(false);
            }
        };

        fetchCountryBorders();
    }, [radius]);

    if (loading) {
        return null;
    }

    return (
        <group>
            {borderLines.map((line, index) => {
                const geometry = new THREE.BufferGeometry().setFromPoints(line.points);

                return (
                    <line key={`border-${index}`} geometry={geometry}>
                        <lineBasicMaterial
                            color="#00ff88"
                            transparent
                            opacity={0.3}
                            linewidth={1}
                        />
                    </line>
                );
            })}
        </group>
    );
};

export default CountryBorders;
