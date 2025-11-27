import React, { useEffect, useRef } from 'react';

// Interface pour le typage TypeScript (à mettre hors de la fonction du composant)
interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    update: () => void;
    draw: () => void;
}

const InteractiveBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let animationFrameId: number;

        // Configuration
        const particleColor = 'rgba(255, 255, 255, 0.5)';
        const activeColor = 'rgba(209, 169, 84, 0.8)'; // Brand Gold #D1A954
        const particleCount = Math.min(Math.floor((width * height) / 12000), 150); // Responsive density
        const mouseDistance = 250;
        const connectionDistance = 140;

        let mouse = { x: -1000, y: -1000 };
        const particles: Particle[] = [];

        class Particle implements Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = -(Math.random() * 0.5 + 0.2); // Upward drift
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Loop from bottom if off screen
                if (this.y < -10) {
                    this.y = height + 10;
                    this.x = Math.random() * width;
                }
                if (this.x < -10) this.x = width + 10;
                if (this.x > width + 10) this.x = -10;

                // Mouse interaction (Magnetic Impulse)
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDistance - distance) / mouseDistance;
                    
                    const speed = force * 1.5;
                    this.x += forceDirectionX * speed;
                    this.y += forceDirectionY * speed;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

                // Highlight if close to mouse
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseDistance) {
                    ctx.fillStyle = activeColor;
                } else {
                    ctx.fillStyle = particleColor;
                }

                ctx.fill();
            }
        }

        const init = () => {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            // Fading trail effect
            ctx.fillStyle = 'rgba(11, 11, 12, 0.2)'; // Faint trail of the background color
            ctx.fillRect(0, 0, width, height);

            // Draw connections
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        const opacity = 1 - (distance / connectionDistance);

                        let strokeColor = `rgba(255, 255, 255, ${opacity * 0.08})`;
                        let lineWidth = 0.5;

                        // Mouse Interaction
                        const mouseDx = mouse.x - particles[a].x;
                        const mouseDy = mouse.y - particles[a].y;
                        const mouseDist = Math.sqrt(mouseDx*mouseDx + mouseDy*mouseDy);

                        if (mouseDist < mouseDistance) {
                            strokeColor = `rgba(209, 169, 84, ${opacity * 0.5})`;
                            lineWidth = 1;
                        }

                        ctx.strokeStyle = strokeColor;
                        ctx.lineWidth = lineWidth;
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
                particles[a].update();
                particles[a].draw();
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        
        const handleClick = () => {
            particles.forEach(p => {
                p.vy -= Math.random() * 5; 
            })
        }

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleClick);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleClick);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // z-index: 0 pour s'assurer qu'il est sous le contenu z-10
    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40 mix-blend-screen"
            style={{ zIndex: 0 }}
        />
    );
};

export default InteractiveBackground;
