import { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";
import { useSpring } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";


interface GlobeAlumniProps {
    targetLocation?: [number, number] | null;
    alumniData: any[];
}

const GlobeAlumni = ({ targetLocation, alumniData }: GlobeAlumniProps) => {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef(0);
    
    // Spring dengan konfigurasi lebih smooth untuk kesan premium
    const rPhi = useSpring(0, { stiffness: 60, damping: 20, mass: 1 });
    const rTheta = useSpring(0, { stiffness: 60, damping: 20, mass: 1 });

    const updateGlobe = useCallback(() => {
        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 1000,
            height: 1000,
            phi: 0,
            theta: 0.4, // Sedikit miring untuk tampilan 3D yang lebih baik
            dark: 0,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [1, 1, 1], // Putih bersih
            markerColor: [18 / 255, 96 / 255, 106 / 255], // Teal #12606A
            glowColor: [0.92, 0.95, 0.95], // Glow tipis warna teal sangat muda
            markers: alumniData.map((a) => ({
                location: a.location,
                size: targetLocation && targetLocation[0] === a.location[0] ? 0.1 : 0.04,
            })),
            onRender: (state) => {
                // Phi adalah rotasi horizontal, Theta adalah vertikal
                state.phi = rPhi.get() + pointerInteractionMovement.current;
                state.theta = rTheta.get();
            },
        });

        return globe;
    }, [alumniData, targetLocation, rPhi, rTheta]);

    useEffect(() => {
        const globe = updateGlobe();
        return () => globe?.destroy();
    }, [updateGlobe]);

    // Sinkronisasi pergerakan ke target lokasi
    useEffect(() => {
        if (targetLocation) {
            pointerInteractionMovement.current = 0; 
            const [lat, lng] = targetLocation;
            
            // Konversi derajat ke radian + offset agar posisi tepat di tengah depan
            // 1.57 adalah offset pi/2 agar menghadap kamera
            const phi = (lng * Math.PI) / 180 * -1 + 1.57;
            const theta = (lat * Math.PI) / 180 * -1;

            rPhi.set(phi);
            rTheta.set(theta);
        }
    }, [targetLocation, rPhi, rTheta]);

    // Cari data alumni yang sedang aktif untuk overlay
    const activeAlumni = alumniData.find(a => 
        targetLocation && a.location[0] === targetLocation[0] && a.location[1] === targetLocation[1]
    );

    return (
        <div className="relative mx-auto flex h-[500px] w-full max-w-[500px] items-center justify-center">
            {/* Layer 1: Ambient Teal Glow di belakang globe */}
            <div className="absolute h-80 w-80 rounded-full bg-[#12606A]/10 blur-[100px]" />
            
            {/* Layer 2: Ring Dekoratif (Opsional, untuk kesan clean) */}
            <div className="absolute h-[420px] w-[420px] rounded-full border border-[#12606A]/5 pointer-events-none" />

            {/* Layer 3: Overlay Foto Profil saat Aktif */}
            {activeAlumni && (
                <div className="absolute z-30 flex flex-col items-center pointer-events-none -translate-y-4">
                    <div className="relative">
                        {/* Frame Foto Premium */}
                        <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-white shadow-[0_10px_30px_rgba(18,96,106,0.3)] transition-transform duration-500 scale-110">
                            <img 
                                src={activeAlumni.image} 
                                className="h-full w-full object-cover"
                                alt={activeAlumni.name}
                            />
                        </div>
                        {/* Animasi Radar Teal */}
                        <div className="absolute inset-0 h-20 w-20 animate-ping rounded-full bg-[#12606A]/10" />
                    </div>
                    
                    {/* Badge Nama Minimalis */}
                    <div className="mt-3 rounded-full bg-[#12606A]/80 backdrop-blur-md border border-[#12606A]/10 px-4 py-1.5 shadow-sm">
                        <p className="whitespace-nowrap text-xs font-bold text-white">
                            {activeAlumni.name}
                        </p>
                    </div>

                    {/* Garis Penunjuk ke Titik Koordinat */}
                    <div className="h-10 w-[1.5px] bg-gradient-to-b from-[#12606A] to-transparent opacity-40" />
                </div>
            )}

            {/* Layer 4: Globe Canvas */}
            <canvas
                ref={canvasRef}
                onPointerDown={(e) => {
                    pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
                    canvasRef.current!.style.cursor = 'grabbing';
                }}
                onPointerUp={() => {
                    pointerInteracting.current = null;
                    canvasRef.current!.style.cursor = 'grab';
                }}
                onMouseMove={(e) => {
                    if (pointerInteracting.current !== null) {
                        const delta = e.clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta / 100;
                    }
                }}
                className="relative z-10 h-full w-full cursor-grab opacity-0 transition-opacity duration-1000 ease-in-out"
                style={{ opacity: 1 }}
                onMouseEnter={() => { if(!pointerInteracting.current) canvasRef.current!.style.cursor = 'grab' }}
            />

            {/* Petunjuk Interaksi */}
            <div className="absolute bottom-2 text-[9px] font-medium uppercase tracking-[0.2em] text-neutral-50 opacity-60">
                {t('alumni.globe.hint')}
            </div>

        </div>
    );
};

export default GlobeAlumni;