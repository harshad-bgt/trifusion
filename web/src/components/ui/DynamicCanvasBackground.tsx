'use client';

import { useEffect, useRef } from 'react';

export function DynamicCanvasBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        // Nodes for mesh animation
        const nodeCount = Math.min(Math.floor(width / 35), 45);
        const nodes = Array.from({ length: nodeCount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 2 + 1,
            hue: Math.random() > 0.5 ? 210 : 225, // Soft vibrant blue hues
        }));

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw connecting web lines
            for (let i = 0; i < nodes.length; i++) {
                const nodeA = nodes[i];
                nodeA.x += nodeA.vx;
                nodeA.y += nodeA.vy;

                if (nodeA.x < 0 || nodeA.x > width) nodeA.vx *= -1;
                if (nodeA.y < 0 || nodeA.y > height) nodeA.vy *= -1;

                for (let j = i + 1; j < nodes.length; j++) {
                    const nodeB = nodes[j];
                    const dx = nodeA.x - nodeB.x;
                    const dy = nodeA.y - nodeB.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 180) {
                        const alpha = (1 - dist / 180) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(nodeA.x, nodeA.y);
                        ctx.lineTo(nodeB.x, nodeB.y);
                        ctx.strokeStyle = `hsla(${nodeA.hue}, 85%, 60%, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }

                // Node glow point
                ctx.beginPath();
                ctx.arc(nodeA.x, nodeA.y, nodeA.radius, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${nodeA.hue}, 90%, 60%, 0.4)`;
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 z-0 opacity-60"
        />
    );
}
