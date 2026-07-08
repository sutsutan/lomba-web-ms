import { useEffect, useRef, useMemo } from "react";
import createGlobe from "cobe";
import { useSpring } from "framer-motion";
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

const GlobeAlumni = ({ targetLocation, alumniData }: GlobeAlumniProps) => {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const globeRef = useRef<any>(null);

    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef(0);
    const phi = useRef(0);

    const rPhi = useSpring(0, { stiffness: 60, damping: 20, mass: 1 });
    const rTheta = useSpring(0, { stiffness: 60, damping: 20, mass: 1 });

    const activeAlumni = useMemo(() => {
        return alumniData.find(a => 
            targetLocation && 
            a.location[0] === targetLocation[0] && 
            a.location[1] === targetLocation[1]
        );
    }, [alumniData, targetLocation]);

    useEffect(() => {
        if (!canvasRef.current) return;

        globeRef.current = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 1000,
            height: 1000,
            phi: 0,
            theta: 0.4,
            dark: 0,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [1, 1, 1],
            markerColor: [18 / 255, 96 / 255, 106 / 255],
            glowColor: [0.92, 0.95, 0.95],
            markers: alumniData.map((a) => ({
                location: a.location,
                size: targetLocation && targetLocation[0] === a.location[0] ? 0.1 : 0.04,
            })),
        });

        // Loop animasi utama
        let width = 0;
        const animate = () => {
            if (!globeRef.current) return;
            
            // Menggabungkan rotasi manual + spring dari target location
            const currentPhi = phi.current + pointerInteractionMovement.current;
            const currentTheta = rTheta.get();
            
            globeRef.current.set({
                phi: currentPhi,
                theta: currentTheta,
            });
            
            requestAnimationFrame(animate);
        };
        animate();

        return () => globeRef.current?.destroy();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    // Update markers saat data atau target berubah
    useEffect(() => {
        if (globeRef.current) {
            globeRef.current.set({
                markers: alumniData.map((a) => ({
                    location: a.location,
                    size: targetLocation && targetLocation[0] === a.location[0] ? 0.1 : 0.04,
                })),
            });
        }
    }, [alumniData, targetLocation]);

    // Sinkronisasi target lokasi ke Spring
    useEffect(() => {
        if (targetLocation) {
            const [lat, lng] = targetLocation;
            rPhi.set((lng * Math.PI) / 180 * -1 + 1.57);
            rTheta.set((lat * Math.PI) / 180 * -1);
            
            // Update phi.current agar drag setelah auto-rotate tidak loncat
            const syncPhi = () => {
                phi.current = rPhi.get();
                pointerInteractionMovement.current = 0;
            };
            syncPhi();
        }
    }, [targetLocation, rPhi, rTheta]);

    return (
        <div className="relative mx-auto flex aspect-square w-full max-w-[500px] items-center justify-center">
            <div className="absolute h-64 w-64 md:h-80 md:w-80 rounded-full bg-[#12606A]/10 blur-[100px]" />
            <div className="absolute h-full w-full max-h-[420px] max-w-[420px] rounded-full border border-[#12606A]/5 pointer-events-none" />

            {activeAlumni && (
                <div className="absolute z-30 flex flex-col items-center pointer-events-none -translate-y-4">
                    <div className="relative">
                        <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-white shadow-[0_10px_30px_rgba(18,96,106,0.3)] scale-110">
                            <img src={activeAlumni.image} className="h-full w-full object-cover" alt={activeAlumni.name} />
                        </div>
                        <div className="absolute inset-0 h-20 w-20 animate-ping rounded-full bg-[#12606A]/10" />
                    </div>
                    <div className="mt-3 rounded-full bg-[#12606A]/80 backdrop-blur-md border border-[#12606A]/10 px-4 py-1.5 shadow-sm">
                        <p className="whitespace-nowrap text-xs font-bold text-white">{activeAlumni.name}</p>
                    </div>
                    <div className="h-10 w-[1.5px] bg-gradient-to-b from-[#12606A] to-transparent opacity-40" />
                </div>
            )}

            <canvas
                ref={canvasRef}
                onPointerDown={(e) => {
                    pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
                    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
                }}
                onPointerUp={() => {
                    pointerInteracting.current = null;
                    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
                }}
                onPointerMove={(e) => {
                    if (pointerInteracting.current !== null) {
                        const delta = e.clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta / 200;
                    }
                }}
                onPointerOut={() => {
                    pointerInteracting.current = null;
                    if(canvasRef.current) canvasRef.current.style.cursor = 'grab';
                }}
                className="relative z-10 h-full w-full cursor-grab"
                style={{ touchAction: 'none' }}
            />

            <div className="absolute bottom-2 text-[9px] font-medium uppercase tracking-[0.2em] text-neutral-50 opacity-60">
                {t('alumni.globe.hint')}
            </div>
        </div>
    );
};

export default GlobeAlumni;