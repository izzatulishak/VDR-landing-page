import React, { useMemo } from 'react';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

// Custom shader material for atmospheric glow
class AtmosphereMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            uniforms: {
                c: { value: 0.6 },
                p: { value: 6.5 },
                glowColor: { value: new THREE.Color(0x88ccff) },
                viewVector: { value: new THREE.Vector3() }
            },
            vertexShader: `
        uniform vec3 viewVector;
        uniform float c;
        uniform float p;
        varying float intensity;
        
        void main() {
          vec3 vNormal = normalize(normalMatrix * normal);
          vec3 vNormel = normalize(normalMatrix * viewVector);
          intensity = pow(c - dot(vNormal, vNormel), p);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        
        void main() {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4(glow, intensity);
        }
      `,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            transparent: true
        });
    }
}

extend({ AtmosphereMaterial });

// Atmosphere Component
export const Atmosphere = ({ radius = 6.5, color = '#88ccff' }) => {
    const material = useMemo(() => new AtmosphereMaterial(), []);

    return (
        <mesh scale={[1.15, 1.15, 1.15]}>
            <sphereGeometry args={[radius, 64, 64]} />
            <primitive object={material} attach="material" />
        </mesh>
    );
};

export default Atmosphere;
