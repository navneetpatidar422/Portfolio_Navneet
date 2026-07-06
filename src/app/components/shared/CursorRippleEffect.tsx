import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

export const CursorRippleEffect = () => {
  const location = useLocation();
  const isProjectPage = location.pathname.startsWith("/work/");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simulationRef = useRef<{
    cols: number;
    rows: number;
    size: number;
    current: Float32Array;
    previous: Float32Array;
    shadingCanvas: HTMLCanvasElement;
    shadingCtx: CanvasRenderingContext2D;
    shadingImageData: ImageData;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Simulation settings (low resolution for high performance)
    const cols = 120;
    const rows = 90;
    const size = cols * rows;
    const damping = 0.97;

    const current = new Float32Array(size);
    const previous = new Float32Array(size);

    // Create an offscreen low-res canvas to build the normal-map shadow image
    const shadingCanvas = document.createElement("canvas");
    shadingCanvas.width = cols;
    shadingCanvas.height = rows;
    const shadingCtx = shadingCanvas.getContext("2d")!;
    const shadingImageData = shadingCtx.createImageData(cols, rows);

    simulationRef.current = {
      cols,
      rows,
      size,
      current,
      previous,
      shadingCanvas,
      shadingCtx,
      shadingImageData
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Trigger ripple at coordinate
    const triggerRipple = (screenX: number, screenY: number, strength = 384) => {
      const sim = simulationRef.current;
      if (!sim) return;

      const gx = Math.floor((screenX / window.innerWidth) * sim.cols);
      const gy = Math.floor((screenY / window.innerHeight) * sim.rows);

      // Check boundaries
      if (gx > 1 && gx < sim.cols - 2 && gy > 1 && gy < sim.rows - 2) {
        const idx = gy * sim.cols + gx;
        // Inject energy into a small 3x3 circle
        sim.current[idx] += strength;
        sim.current[idx - 1] += strength * 0.7;
        sim.current[idx + 1] += strength * 0.7;
        sim.current[idx - sim.cols] += strength * 0.7;
        sim.current[idx + sim.cols] += strength * 0.7;
      }
    };

    // Listeners
    let lastMouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastMouse.x;
      const dy = e.clientY - lastMouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 15) {
        triggerRipple(e.clientX, e.clientY, 192);
        lastMouse = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Powerful splash on click
      triggerRipple(e.clientX, e.clientY, 800);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);

    let animationFrameId: number;

    const stepSimulation = () => {
      const sim = simulationRef.current;
      if (!sim) return;

      const c = sim.current;
      const p = sim.previous;
      const w = sim.cols;
      const h = sim.rows;

      // Wave propagation height-map calculation
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const i = y * w + x;
          // Calculate neighboring averages minus previous energy
          p[i] = (
            c[i - 1] +
            c[i + 1] +
            c[i - w] +
            c[i + w]
          ) / 2 - p[i];
          p[i] *= damping;
        }
      }

      // Swap buffers
      const temp = sim.current;
      sim.current = sim.previous;
      sim.previous = temp;

      // Generate Shaded Normal Specular Map
      const imgData = sim.shadingImageData;
      const data = imgData.data;
      const curr = sim.current;

      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const i = y * w + x;
          const pixelIdx = i * 4;

          // Compute horizontal and vertical slope (gradient)
          const dx = curr[i + 1] - curr[i - 1];
          const dy = curr[i + w] - curr[i - w];

          // Specular highlights: simulate light source from top-left (1.2, 1.2)
          const specular = (dx * 1.2 + dy * 1.2) * 12;
          const shading = Math.min(255, Math.max(-255, specular));

          if (shading > 0) {
            // White highlight (light reflection)
            data[pixelIdx] = 255;
            data[pixelIdx + 1] = 254;
            data[pixelIdx + 2] = 248; // warm light tone
            data[pixelIdx + 3] = Math.min(100, shading * 0.4); // soft opacity
          } else {
            // Soft shadow
            data[pixelIdx] = 17;
            data[pixelIdx + 1] = 17;
            data[pixelIdx + 2] = 17;
            data[pixelIdx + 3] = Math.min(45, -shading * 0.25);
          }
        }
      }

      // Draw the shading image to our low-res offscreen canvas
      sim.shadingCtx.putImageData(imgData, 0, 0);

      // Render the low-res canvas scaled up to our screen canvas with bilinear filtering
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(sim.shadingCanvas, 0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(stepSimulation);
    };

    stepSimulation();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[2] w-screen h-screen transition-opacity duration-500 ${
        isProjectPage ? "opacity-[0.05]" : "opacity-75"
      }`}
    />
  );
};
