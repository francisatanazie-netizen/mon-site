import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GlobalBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    // Deep black fog to blend distance and create "void" depth
    scene.fog = new THREE.FogExp2(0x0B0B0C, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;
    camera.position.y = 10; // Slight elevation for architectural perspective

    // 2. Renderer Setup (High Performance)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 3. Generative Network Data
    const particleCount = 180; // Optimized density for premium look without clutter
    const group = new THREE.Group();
    scene.add(group);

    // Geometry for points
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    // Store initial data for algorithmic movement (The "Architectural Blueprint")
    const originalPositions = new Float32Array(particleCount * 3);
    const phases = new Float32Array(particleCount); 

    // Dimensions of the data cloud
    const rangeX = 160; 
    const rangeY = 60;
    const rangeZ = 160;
    
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * rangeX;
      const y = (Math.random() - 0.5) * rangeY; 
      const z = (Math.random() - 0.5) * rangeZ;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      phases[i] = Math.random() * Math.PI * 2; // Random phase for organic wave motion
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Custom Glow Texture Generator (Soft Gold Light)
    const getGlowTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const context = canvas.getContext('2d');
        if(context) {
            const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
            gradient.addColorStop(0, 'rgba(209, 169, 84, 1)');   // Core Gold #D1A954
            gradient.addColorStop(0.4, 'rgba(209, 169, 84, 0.3)'); // Soft Glow
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');         // Transparent Edge
            context.fillStyle = gradient;
            context.fillRect(0, 0, 32, 32);
        }
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    };

    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xD1A954,
      size: 1.8,
      map: getGlowTexture(),
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particlesMesh = new THREE.Points(geometry, pointsMaterial);
    group.add(particlesMesh);

    // 4. Connections (The Network Lines)
    const linesGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xD1A954,
      transparent: true,
      opacity: 0.12, // Subtle premium lines
      blending: THREE.AdditiveBlending
    });
    
    const linesMesh = new THREE.LineSegments(linesGeometry, lineMaterial);
    group.add(linesMesh);

    // 5. Animation Loop
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.002; // Slow, intentional speed (Computing Power)

      // Update Particle Positions (Generative Wave Motion)
      const posAttribute = particlesMesh.geometry.attributes.position;
      const posArray = posAttribute.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        // Algorithmic movement: Sine waves based on initial position and time
        // Creates a "breathing" architectural effect rather than random robotic noise
        posArray[iy] = originalPositions[iy] + Math.sin(time + phases[i]) * 6;
        posArray[ix] = originalPositions[ix] + Math.cos(time * 0.5 + phases[i]) * 2;
      }
      posAttribute.needsUpdate = true;

      // Update Network Connections dynamically
      const linePositions: number[] = [];
      const connectDistance = 25; // Threshold to form a secure connection

      // Check distances (O(N^2) but optimized for low N=180)
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < connectDistance * connectDistance) {
            linePositions.push(
              posArray[i * 3], posArray[i * 3 + 1], posArray[i * 3 + 2],
              posArray[j * 3], posArray[j * 3 + 1], posArray[j * 3 + 2]
            );
          }
        }
      }
      
      linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

      // Slow Global Rotation (Cinematic)
      group.rotation.y = time * 0.04; 

      // Subtle Interaction (Camera Tilt for Depth)
      const targetRotX = mouseY * 0.0003;
      const targetRotY = mouseX * 0.0003;
      
      group.rotation.x += (targetRotX - group.rotation.x) * 0.05;
      group.rotation.z += (targetRotY - group.rotation.z) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // 6. Event Handlers
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX - window.innerWidth / 2;
      mouseY = e.clientY - window.innerHeight / 2;
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      pointsMaterial.dispose();
      linesGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-[-1] bg-[#0B0B0C] pointer-events-none" />;
};

export default GlobalBackground;
