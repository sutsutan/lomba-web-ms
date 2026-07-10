import { useEffect, useMemo, useRef } from "react";
import createGlobe, { Globe } from "cobe";
import { useLanguage } from "@/contexts/LanguageContext";

interface Alumni {
    location: [number, number];
    name: string;
    image: string;
}

interface GlobeAlumniProps {
    targetLocation?: [number, number] | null;
    alumniData: Alumni[];
}

export default function GlobeAlumni({
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

    const animation = useRef<number | null>(null);

    const activeAlumni = useMemo(() => {
        if (!targetLocation) return null;

        return alumniData.find(
            (a) =>
                a.location[0] === targetLocation[0] &&
                a.location[1] === targetLocation[1]
        );
    }, [targetLocation, alumniData]);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;

        const width = canvas.offsetWidth;

        const globe = createGlobe(canvas, {
            devicePixelRatio: Math.min(window.devicePixelRatio, 2),

            width: width * 2,
            height: width * 2,

            phi: phi.current,
            theta: theta.current,

            dark: 0,

            diffuse: 1.2,

            mapSamples: 16000,
            mapBrightness: 6,

            baseColor: [1, 1, 1],
            markerColor: [18 / 255, 96 / 255, 106 / 255],
            glowColor: [0.92, 0.95, 0.95],

            markers: [],
        });

        globeRef.current = globe;

        const animate = () => {
            if (!dragging.current) {
                phi.current += 0.002;
            }

            globe.update({
                phi: phi.current,
                theta: theta.current,
            });

            animation.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animation.current!);
            globe.destroy();
        };
    }, []);

    // ==========================
    // Update Markers
    // ==========================

    useEffect(() => {
        if (!globeRef.current) return;

        globeRef.current.update({
            markers: alumniData.map((a) => ({
                location: a.location,
                size:
                    targetLocation &&
                    targetLocation[0] === a.location[0] &&
                    targetLocation[1] === a.location[1]
                        ? 0.12
                        : 0.05,
            })),
        });
    }, [alumniData, targetLocation]);

    // ==========================
    // Focus Selected Alumni
    // ==========================

    useEffect(() => {
        if (!targetLocation || !globeRef.current) return;

        const [lat, lng] = targetLocation;

        phi.current = (-lng * Math.PI) / 180 + Math.PI / 2;
        theta.current = (-lat * Math.PI) / 180;

        globeRef.current.update({
            phi: phi.current,
            theta: theta.current,
        });
    }, [targetLocation]);

    // ==========================
    // Resize
    // ==========================

    useEffect(() => {
        const resize = () => {
            if (!canvasRef.current || !globeRef.current) return;

            const w = canvasRef.current.offsetWidth;

            globeRef.current.update({
                width: w * 2,
                height: w * 2,
            });
        };

        resize();

        window.addEventListener("resize", resize);

        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        <div className="relative mx-auto flex aspect-square w-full max-w-[500px] items-center justify-center">

            <div className="absolute h-64 w-64 rounded-full bg-[#12606A]/10 blur-[100px]" />

            <div className="absolute h-full w-full max-h-[420px] max-w-[420px] rounded-full border border-[#12606A]/5" />

            {activeAlumni && (
                <div className="absolute z-20 flex flex-col items-center -translate-y-4 pointer-events-none">

                    <div className="relative">

                        <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl">

                            <img
                                src={activeAlumni.image}
                                alt={activeAlumni.name}
                                className="h-full w-full object-cover"
                            />

                        </div>

                        <div className="absolute inset-0 rounded-full bg-[#12606A]/10 animate-ping" />

                    </div>

                    <div className="mt-3 rounded-full bg-[#12606A]/80 px-4 py-1.5 backdrop-blur">

                        <p className="text-xs font-bold text-white whitespace-nowrap">
                            {activeAlumni.name}
                        </p>

                    </div>

                </div>
            )}

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

                    globeRef.current?.update({
                        phi: phi.current,
                    });

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

            <div className="absolute bottom-2 text-[9px] uppercase tracking-[0.2em] text-neutral-500">
                {t("alumni.globe.hint")}
            </div>

        </div>
    );
}