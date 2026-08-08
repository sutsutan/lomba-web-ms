import { useEffect, useRef } from "react";
import createGlobe, { Globe } from "cobe";
import { useLanguage } from "@/contexts/LanguageContext";

interface Alumni {
    id: number;
    location: [number, number];
    name: string;
    image: string;
    position?: string;
    company?: string;
}

interface GlobeAlumniProps {
    targetId?: number | null;
    targetLocation?: [number, number] | null;
    alumniData: Alumni[];
}

// Konversi lat/lng (derajat) -> phi/theta sesuai konvensi resmi cobe
function locationToAngles(lat: number, lng: number): [number, number] {
    const phi = Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2);
    const theta = (lat * Math.PI) / 180;
    return [phi, theta];
}

const clampTheta = (t: number) => Math.max(-1.4, Math.min(1.4, t));

export default function GlobeAlumni({
    targetId,
    targetLocation,
    alumniData,
}: GlobeAlumniProps) {
    const { t } = useLanguage();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const globeRef = useRef<Globe | null>(null);

    const phi = useRef(0);
    const theta = useRef(0.35);

    const dragging = useRef(false);
    const lastX = useRef(0);

    // ==========================
    // Create Globe (mount only)
    // ==========================
    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        let destroyed = false;
        let frameId: number;
        let globe: Globe | null = null;
        let resizeObserver: ResizeObserver | null = null;

        const setup = (width: number) => {
            if (destroyed || width <= 0) return;

            globe = createGlobe(canvas, {
                devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
                width: width * 2,
                height: width * 2,
                phi: phi.current,
                theta: theta.current,
                dark: 0,
                diffuse: 1.3,
                mapSamples: 18000,
                mapBrightness: 6.5,
                baseColor: [1, 1, 1],
                markerColor: [18 / 255, 96 / 255, 106 / 255],
                glowColor: [0.85, 0.95, 0.93],
                markers: [],
            });

            globeRef.current = globe;

            const animate = () => {
                if (destroyed || !globe) return;
                if (!dragging.current) {
                    phi.current += 0.002;
                }
                try {
                    globe.update({
                        phi: phi.current,
                        theta: theta.current,
                    });
                } catch (err) {
                    console.error("cobe animate() update failed:", err);
                }
                frameId = requestAnimationFrame(animate);
            };

            frameId = requestAnimationFrame(animate);
        };

        const initialWidth = canvas.offsetWidth;
        if (initialWidth > 0) {
            setup(initialWidth);
        } else {
            resizeObserver = new ResizeObserver((entries) => {
                const w = entries[0]?.contentRect.width ?? 0;
                if (w > 0 && !globeRef.current) {
                    setup(w);
                }
            });
            resizeObserver.observe(canvas);
        }

        return () => {
            destroyed = true;
            if (frameId) cancelAnimationFrame(frameId);
            resizeObserver?.disconnect();
            try {
                globe?.destroy();
            } catch {
                // ignore
            }
            if (globeRef.current === globe) {
                globeRef.current = null;
            }
        };
    }, []);

    // ==========================
    // Update Markers
    // ==========================
    useEffect(() => {
        if (!globeRef.current) return;
        try {
            globeRef.current.update({
                markers: alumniData.map((a) => ({
                    location: a.location,
                    size: a.id === targetId ? 0.14 : 0.045,
                })),
            });
        } catch (err) {
            console.error("cobe marker update failed:", err);
        }
    }, [alumniData, targetId]);

    // ==========================
    // Focus Selected Alumni
    // ==========================
    useEffect(() => {
        if (!targetLocation || !globeRef.current) return;

        const [lat, lng] = targetLocation;
        const [nextPhi, nextTheta] = locationToAngles(lat, lng);

        phi.current = nextPhi;
        theta.current = clampTheta(nextTheta);

        try {
            globeRef.current.update({
                phi: phi.current,
                theta: theta.current,
            });
        } catch (err) {
            console.error("cobe focus update failed:", err);
        }
    }, [targetLocation]);

    // ==========================
    // Resize
    // ==========================
    useEffect(() => {
        if (!canvasRef.current) return;

        const resize = () => {
            if (!canvasRef.current || !globeRef.current) return;
            const w = canvasRef.current.offsetWidth;
            if (w <= 0) return;
            try {
                globeRef.current.update({
                    width: w * 2,
                    height: w * 2,
                });
            } catch (err) {
                console.error("cobe resize update failed:", err);
            }
        };

        resize();

        const ro = new ResizeObserver(resize);
        ro.observe(canvasRef.current);
        window.addEventListener("resize", resize);

        return () => {
            ro.disconnect();
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <div className="relative mx-auto flex aspect-square w-full max-w-[500px] items-center justify-center">

            {/* Ambient glow */}
            <div className="absolute h-64 w-64 rounded-full bg-[#12606A]/10 blur-[100px]" />

            {/* Decorative rotating rings */}
            <div className="absolute h-full w-full max-h-[420px] max-w-[420px] rounded-full border border-[#12606A]/5" />
            <div className="absolute h-full w-full max-h-[440px] max-w-[440px] animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-teal-300/20" />
            <div className="absolute h-full w-full max-h-[400px] max-w-[400px] animate-[spin_28s_linear_infinite_reverse] rounded-full border border-teal-200/10" />

            <canvas
                ref={canvasRef}
                className="relative z-10 h-full w-full cursor-grab"
                style={{ touchAction: "none" }}
                onPointerDown={(e) => {
                    dragging.current = true;
                    lastX.current = e.clientX;
                    e.currentTarget.style.cursor = "grabbing";
                }}
                onPointerMove={(e) => {
                    if (!dragging.current) return;
                    const delta = e.clientX - lastX.current;
                    phi.current += delta * 0.005;
                    try {
                        globeRef.current?.update({ phi: phi.current });
                    } catch (err) {
                        console.error("cobe drag update failed:", err);
                    }
                    lastX.current = e.clientX;
                }}
                onPointerUp={(e) => {
                    dragging.current = false;
                    e.currentTarget.style.cursor = "grab";
                }}
                onPointerLeave={(e) => {
                    dragging.current = false;
                    e.currentTarget.style.cursor = "grab";
                }}
            />

            <div className="absolute bottom-1 flex items-center gap-1.5 rounded-full bg-black/10 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-neutral-500 backdrop-blur-sm">
                <span className="h-1 w-1 rounded-full bg-teal-400" />
                {t("alumni.globe.hint")}
            </div>

        </div>
    );
}