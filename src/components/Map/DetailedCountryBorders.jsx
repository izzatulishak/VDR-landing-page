import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

const GOOGLE_MAPS_API_KEY = 'AIzaSyANOCzNgj67wJNkAlM2umNN6O5xekplZ2M';

const DetailedCountryBorders = ({ radius = 6.371 }) => {
    const [borderGeometries, setBorderGeometries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCountryBoundaries = async () => {
            console.log('🌍 Starting to fetch country boundaries...');
            try {
                // Countries in Southeast Asia and Oceania region
                const countries = [
                    'Indonesia', 'Malaysia', 'Singapore', 'Thailand', 'Vietnam',
                    'Philippines', 'Brunei', 'Myanmar', 'Cambodia', 'Laos',
                    'Australia', 'Papua New Guinea', 'Timor-Leste'
                ];

                const geometries = [];

                for (const country of countries) {
                    try {
                        console.log(`📍 Fetching boundary for: ${country}`);
                        // Use Google Geocoding API to get country boundaries
                        const response = await fetch(
                            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(country)}&key=${GOOGLE_MAPS_API_KEY}`
                        );

                        const data = await response.json();

                        if (data.status === 'OK' && data.results && data.results[0]) {
                            const bounds = data.results[0].geometry.bounds || data.results[0].geometry.viewport;

                            if (bounds) {
                                // Create a rectangle from bounds
                                const ne = bounds.northeast;
                                const sw = bounds.southwest;

                                const corners = [
                                    [ne.lat, ne.lng],
                                    [ne.lat, sw.lng],
                                    [sw.lat, sw.lng],
                                    [sw.lat, ne.lng],
                                    [ne.lat, ne.lng] // Close the loop
                                ];

                                const points = corners.map(([lat, lon]) => {
                                    const phi = (90 - lat) * (Math.PI / 180);
                                    const theta = (lon + 180) * (Math.PI / 180);
                                    const x = -(radius * 1.003) * Math.sin(phi) * Math.cos(theta);
                                    const z = (radius * 1.003) * Math.sin(phi) * Math.sin(theta);
                                    const y = (radius * 1.003) * Math.cos(phi);
                                    return new THREE.Vector3(x, y, z);
                                });

                                geometries.push({
                                    points,
                                    country
                                });
                                console.log(`✅ Successfully loaded boundary for: ${country}`);
                            }
                        } else {
                            console.warn(`⚠️ No boundary data for ${country}:`, data.status);
                        }

                        // Add delay to avoid rate limiting
                        await new Promise(resolve => setTimeout(resolve, 200));
                    } catch (countryError) {
                        console.error(`❌ Error fetching ${country}:`, countryError);
                    }
                }

                console.log(`🎉 Loaded ${geometries.length} country boundaries`);
                setBorderGeometries(geometries);
                setLoading(false);
            } catch (error) {
                console.error('❌ Error fetching country boundaries:', error);
                setLoading(false);
            }
        };

        fetchCountryBoundaries();
    }, [radius]);

    if (loading) {
        console.log('⏳ Country borders loading...');
    }

    return (
        <group>
            {borderGeometries.map(({ points, country }, index) => {
                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                return (
                    <line key={`${country}-${index}`} geometry={geometry}>
                        <lineBasicMaterial
                            color="#00ff88"
                            transparent
                            opacity={0.5}
                            linewidth={1.5}
                        />
                    </line>
                );
            })}
        </group>
    );
};

export default DetailedCountryBorders;
