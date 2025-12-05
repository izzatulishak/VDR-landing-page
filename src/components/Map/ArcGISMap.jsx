import React, { useEffect, useRef, useState } from 'react';
import SceneView from '@arcgis/core/views/SceneView';
import Map from '@arcgis/core/Map';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import blockData from '../../data/exploration-blocks.json';
import '@arcgis/core/assets/esri/themes/dark/main.css';
import { RotateCw, Pause, Activity, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import config from '@arcgis/core/config';

// Set assets path to local public/assets
config.assetsPath = import.meta.env.BASE_URL + "assets";

// Helper to convert hex to [r, g, b]
const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : [255, 255, 255];
};

const ArcGISMap = ({ onBlockHover, onBlockLeave, onBlockSelect, filter, theme, selectedBlock, resetViewTrigger, activeLayers }) => {
    const mapDiv = useRef(null);
    const viewRef = useRef(null);
    const layerRef = useRef(null);
    const activeLayerRef = useRef(null);
    const hoverLayerRef = useRef(null);
    const hoverAnimationRef = useRef(null);
    const activeAnimationRef = useRef(null);
    const [isRotating, setIsRotating] = useState(false);

    const [mapReady, setMapReady] = useState(false);

    console.log("ArcGISMap rendering...");

    // Tooltip State
    const [tooltip, setTooltip] = useState(null);

    // Neon Palette (Consistent with new theme)
    const neonColors = {
        upcoming: "#D946EF", // Fuchsia 500
        running: "#A855F7",  // Purple 500
        pending: "#8B5CF6",  // Violet 500
        conditional: "#7C3AED", // Violet 600
        open: "#6366F1"      // Indigo 500
    };

    const generateDummyData = (attributes) => {
        // ... (Keep existing dummy data logic if needed, or simplify)
        return attributes;
    };

    useEffect(() => {
        console.log("ArcGISMap useEffect running. mapDiv:", mapDiv.current);
        if (!mapDiv.current) return;

        let view;

        try {
            console.log("Initializing Map and SceneView...");
            const map = new Map({
                basemap: theme === 'dark' ? "dark-gray-vector" : "gray-vector",
                ground: "world-elevation"
            });

            const blob = new Blob([JSON.stringify(blockData)], { type: "application/json" });
            const url = URL.createObjectURL(blob);

            const renderer = {
                type: "unique-value",
                field: "status",
                defaultSymbol: {
                    type: "polygon-3d",
                    symbolLayers: [{
                        type: "extrude",
                        size: 5000,
                        material: { color: [168, 85, 247, 0.3] },
                        edges: { type: "solid", color: [255, 255, 255, 0.8], size: 1 }
                    }]
                },
                uniqueValueInfos: Object.entries(neonColors).map(([status, color]) => ({
                    value: status,
                    symbol: {
                        type: "polygon-3d",
                        symbolLayers: [{
                            type: "extrude",
                            size: status === 'upcoming' || status === 'running' ? 15000 : 10000,
                            material: { color: [...hexToRgb(color), 0.3] },
                            edges: { type: "solid", color: [...hexToRgb(color), 1], size: 1.5 }
                        }]
                    }
                }))
            };

            const geojsonLayer = new GeoJSONLayer({
                url: url,
                renderer: renderer,
                outFields: ["*"],
                popupEnabled: false // We use our own panel
            });

            map.add(geojsonLayer);

            const activeLayer = new GraphicsLayer({ elevationInfo: { mode: "relative-to-ground" } });
            map.add(activeLayer);
            activeLayerRef.current = activeLayer;

            const hoverLayer = new GraphicsLayer({ elevationInfo: { mode: "relative-to-ground" } });
            map.add(hoverLayer);
            hoverLayerRef.current = hoverLayer;

            view = new SceneView({
                container: mapDiv.current,
                map: map,
                viewingMode: "local",
                camera: {
                    position: { x: 118.0, y: -20.0, z: 3000000 },
                    tilt: 35,
                    heading: 0
                },
                environment: {
                    background: {
                        type: "color",
                        color: [0, 0, 0, 0] // Transparent
                    },
                    starsEnabled: false,
                    atmosphereEnabled: false
                },
                ui: { components: [] }, // Hide default UI
                constraints: {
                    altitude: { min: 100000, max: 5000000 },
                    tilt: { max: 60 }
                }
            });

            // Interaction Handlers
            view.on("pointer-move", (event) => {
                view.hitTest(event).then((response) => {
                    const hitResult = response.results.find(result => result.graphic.layer === geojsonLayer);

                    if (hitResult && hitResult.graphic) {
                        document.body.style.cursor = 'pointer';
                        const graphic = hitResult.graphic;

                        // Hover Logic
                        hoverLayerRef.current.removeAll();
                        const hoverGraphic = graphic.clone();
                        hoverGraphic.symbol = {
                            type: "polygon-3d",
                            symbolLayers: [{
                                type: "extrude",
                                size: 5050, // Slightly taller
                                material: { color: [255, 255, 255, 0.1] }, // White tint
                                edges: { type: "solid", color: [255, 255, 255, 1], size: 2 }
                            }]
                        };
                        hoverLayerRef.current.add(hoverGraphic);

                        // Update Tooltip
                        setTooltip({
                            x: event.x,
                            y: event.y,
                            data: graphic.attributes
                        });

                    } else {
                        document.body.style.cursor = 'auto';
                        hoverLayerRef.current.removeAll();
                        setTooltip(null);
                    }
                });
            });

            view.on("click", (event) => {
                view.hitTest(event).then((response) => {
                    const graphic = response.results.find(result => result.graphic.layer === geojsonLayer)?.graphic;
                    if (graphic) {
                        onBlockSelect(graphic.attributes);
                    } else {
                        // Optional: Deselect on background click
                        // onBlockSelect(null);
                    }
                });
            });

            // Stop rotation on interaction
            view.on("drag", () => setIsRotating(false));
            view.on("mouse-wheel", () => setIsRotating(false));

            viewRef.current = view;
            layerRef.current = geojsonLayer;

            // Mark map as ready when view is ready
            view.when(() => {
                console.log("SceneView is ready!");
                setMapReady(true);
            });

            return () => {
                if (view) view.destroy();
                URL.revokeObjectURL(url);
            };

        } catch (error) {
            console.error("ArcGIS Map Initialization Error:", error);
        }
    }, []); // Run once on mount

    // Rotation Effect
    useEffect(() => {
        if (!viewRef.current) return;
        let animationFrameId;
        const rotate = () => {
            if (isRotating && viewRef.current) {
                const camera = viewRef.current.camera.clone();
                camera.heading += 0.05;
                viewRef.current.camera = camera;
                animationFrameId = requestAnimationFrame(rotate);
            }
        };
        if (isRotating) rotate();
        return () => cancelAnimationFrame(animationFrameId);
    }, [isRotating]);

    // Theme Update
    useEffect(() => {
        if (viewRef.current) {
            const map = viewRef.current.map;
            map.basemap = theme === 'dark' ? "dark-gray-vector" : "gray-vector";
        }
    }, [theme]);

    // Filter Update
    useEffect(() => {
        if (layerRef.current) {
            layerRef.current.definitionExpression = filter === 'all' ? null : `status = '${filter.toUpperCase()}'`;
        }
    }, [filter]);

    // Zoom to Selected Block
    useEffect(() => {
        console.log("Zoom Effect Triggered. selectedBlock:", selectedBlock, "mapReady:", mapReady);
        if (selectedBlock && mapReady && viewRef.current && layerRef.current) {
            console.log("Attempting to zoom to block:", selectedBlock.namobj);
            const query = layerRef.current.createQuery();
            query.where = `namobj = '${selectedBlock.namobj}'`;
            layerRef.current.queryFeatures(query).then((response) => {
                if (response.features.length > 0) {
                    const feature = response.features[0];
                    console.log("Feature found, zooming...", feature);
                    viewRef.current.goTo({
                        target: feature.geometry,
                        tilt: 45,
                        zoom: 9 // Adjust zoom level as needed
                    }, { duration: 1000 });
                } else {
                    console.warn("No feature found for block:", selectedBlock.namobj);
                }
            }).catch(err => console.error("Query failed:", err));
        }
    }, [selectedBlock, mapReady]);

    return (
        <div className="w-full h-full relative group" ref={mapDiv} style={{ width: '100%', height: '100%', position: 'relative' }}>
            {/* Rotation Control */}
            <button
                onClick={() => setIsRotating(!isRotating)}
                className="absolute bottom-8 right-8 z-10 w-12 h-12 rounded-full glass text-text-primary hover:bg-surface/50 hover:scale-105 transition-all shadow-lg flex items-center justify-center group"
                title={isRotating ? "Pause Rotation" : "Start Rotation"}
            >
                {isRotating ? (
                    <Pause className="w-5 h-5 fill-current" />
                ) : (
                    <div className="pl-1">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M5 3l14 9-14 9V3z" />
                        </svg>
                    </div>
                )}
            </button>

            {/* Hover Tooltip */}
            <AnimatePresence>
                {tooltip && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        style={{
                            position: 'absolute',
                            left: tooltip.x + 20,
                            top: tooltip.y - 20,
                            pointerEvents: 'none'
                        }}
                        className="z-50 w-64 glass-panel rounded-xl p-4 border border-white/10 shadow-2xl backdrop-blur-xl"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-sm font-bold text-text-primary">{tooltip.data.namobj}</h3>
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/20">
                                {tooltip.data.status}
                            </span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-text-secondary">Operator</span>
                                <span className="text-text-primary font-medium">{tooltip.data.operator || 'TBD'}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-text-secondary">Region</span>
                                <span className="text-text-primary font-medium">Indonesia</span>
                            </div>
                            <div className="h-px bg-white/10 my-2" />
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-white/5 rounded-lg p-2">
                                    <div className="text-[10px] text-text-secondary mb-0.5">2P Reserves</div>
                                    <div className="text-xs font-bold text-text-primary">46 TCF</div>
                                </div>
                                <div className="bg-white/5 rounded-lg p-2">
                                    <div className="text-[10px] text-text-secondary mb-0.5">NPV10</div>
                                    <div className="text-xs font-bold text-text-primary">$2.4B</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-3/4" />
                                </div>
                                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-1/2" />
                                </div>
                                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-yellow-500 w-2/3" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ArcGISMap;
