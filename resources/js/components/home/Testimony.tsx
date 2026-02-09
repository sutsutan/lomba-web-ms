'use client';

import videoSource from '@/assets/0712_XFrfipW4.mp4';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Quote } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Framer Motion Variants untuk animasi masuk
const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

interface TestimonialItem {
    id: number;
    name: string;
    role: string;
    videoUrl: string;
    description: string;
}

const testimonialData: Record<string, TestimonialItem[]> = {
    student: [
        {
            id: 1,
            name: 'Andini Julianti',
            role: 'Student - IT & Software',
            videoUrl: videoSource,
            description:
                'Metland School give me the practical skills and confidence to excel in the tech industry.',
        },
        {
            id: 2,
            name: 'Budi Santoso',
            role: 'Student - Multimedia',
            videoUrl: videoSource,
            description:
                'Program multimedia di Metland sangat membantu saya mengasah kreativitas.',
        },
        {
            id: 3,
            name: 'Siti Aminah',
            role: 'Student - Culinary',
            videoUrl: videoSource,
            description:
                'Kitchen Facility in Metland School really supports my learning journey in culinary arts.',
        },
    ],
    parents: [
        {
            id: 4,
            name: 'Ibu Ratna',
            role: 'Parents',
            videoUrl: videoSource,
            description:
                'character development in Metland School reallu prepares my child for the future.',
        },
    ],
    teacher: [
        {
            id: 5,
            name: 'Bpk. Aris',
            role: 'Teacher - Engineering',
            videoUrl: videoSource,
            description:
                'we focus on hands-on learning to ensure students are job-ready upon graduation.',
        },
    ],
    alumni: [
        {
            id: 6,
            name: 'Rizky Ramadhan',
            role: 'Software Engineer',
            videoUrl: videoSource,
            description:
                'industry partnerships at Metland School opened doors for my career in tech.',
        },
    ],
};

const TestimonialVideo = () => {
    const [activeTab, setActiveTab] = useState<string>('student');
    const [activeIndex, setActiveIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1200,
    );

    const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());
    const categories = Object.keys(testimonialData);

    const controlMarsAudio = (shouldPause: boolean) => {
        const marsAudio = document.getElementById(
            'mars-metland-audio',
        ) as HTMLAudioElement;
        if (!marsAudio) return;

        if (shouldPause) {
            marsAudio.pause();
        } else {
            const isUserMuted =
                marsAudio.getAttribute('data-user-muted') === 'true';
            if (!isUserMuted) {
                marsAudio.play().catch(() => {});
            }
        }
    };

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            controlMarsAudio(false);
        };
    }, []);

    useEffect(() => {
        videoRefs.current.forEach((video) => {
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });
        controlMarsAudio(false);
    }, [activeTab, activeIndex]);

    const handleNext = () => {
        const total = testimonialData[activeTab].length;
        setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    };

    const handlePrev = () => {
        const total = testimonialData[activeTab].length;
        setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
    };

    const getVideoPosition = (index: number) => {
        const total = testimonialData[activeTab].length;
        const position = (index - activeIndex + total) % total;
        let spacing = windowWidth < 640 ? 80 : windowWidth < 1024 ? 150 : 220;

        return {
            left: position * spacing,
            zIndex: total - position,
            scale: 1 - position * 0.1,
            opacity: position > (windowWidth < 640 ? 2 : 3) ? 0 : 1,
            pointerEvents: (position === 0 ? 'auto' : 'none') as any,
        };
    };

    return (
        <section className="overflow-hidden bg-white py-16 sm:py-24">
            <div className="container mx-auto px-6 lg:px-24">
                {/* Judul dengan Animasi Scroll */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={itemVariants}
                    className="mb-16 text-center"
                >
                    <h2 className="text-3xl font-black text-[#0F5F58] md:text-5xl">
                        Voices of Metland
                    </h2>
                    <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-teal-500/20" />
                </motion.div>

                {/* Tabs dengan Animasi Fade-in */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="no-scrollbar mb-16 flex justify-center gap-6 overflow-x-auto border-b border-slate-100 pb-2 sm:gap-12"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setActiveTab(cat);
                                setActiveIndex(0);
                            }}
                            className={`relative pb-4 text-base font-bold capitalize transition-all sm:text-lg ${
                                activeTab === cat
                                    ? 'text-[#0F5F58]'
                                    : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            {cat}
                            {activeTab === cat && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-[#0F5F58]"
                                />
                            )}
                        </button>
                    ))}
                </motion.div>

                <motion.div
                    className="flex flex-col gap-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    {/* Content Section (Kiri) */}
                    <motion.div variants={itemVariants} className="max-w-3xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${activeTab}-${activeIndex}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="flex gap-4"
                            >
                                <Quote className="h-10 w-10 flex-shrink-0 text-teal-500 opacity-30" />
                                <div>
                                    <p className="mb-4 text-lg italic leading-relaxed text-slate-600 sm:text-xl">
                                        "
                                        {
                                            testimonialData[activeTab][
                                                activeIndex
                                            ]?.description
                                        }
                                        "
                                    </p>
                                    <h4 className="text-2xl font-black text-[#0F5F58]">
                                        {
                                            testimonialData[activeTab][
                                                activeIndex
                                            ]?.name
                                        }
                                    </h4>
                                    <p className="text-sm font-bold uppercase tracking-widest text-teal-600">
                                        {
                                            testimonialData[activeTab][
                                                activeIndex
                                            ]?.role
                                        }
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Video Interaction Section (Kanan/Bawah) */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16"
                    >
                        <div className="relative h-[300px] w-full overflow-visible sm:h-[400px] md:h-[450px]">
                            {testimonialData[activeTab].map((item, index) => {
                                const positionStyle = getVideoPosition(index);
                                const isFront = index === activeIndex;

                                return (
                                    <motion.div
                                        key={item.id}
                                        className="group absolute top-0 h-full w-[180px] cursor-pointer overflow-hidden border-4 border-white bg-black shadow-2xl sm:w-[280px] md:w-[320px]"
                                        animate={positionStyle}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 100,
                                            damping: 20,
                                        }}
                                        onMouseEnter={() => {
                                            if (isFront) {
                                                const v = videoRefs.current.get(
                                                    item.id,
                                                );
                                                if (v) {
                                                    // Melanjutkan dari posisi terakhir (Progress Tersimpan)
                                                    v.play().catch(() => {});
                                                    controlMarsAudio(true);
                                                }
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            if (isFront) {
                                                const v = videoRefs.current.get(
                                                    item.id,
                                                );
                                                if (v) {
                                                    // Hanya pause, jangan reset currentTime agar status tersimpan
                                                    v.pause();
                                                    controlMarsAudio(false);
                                                }
                                            }
                                        }}
                                        onClick={() => setActiveIndex(index)}
                                    >
                                        <video
                                            ref={(el) => {
                                                if (el)
                                                    videoRefs.current.set(
                                                        item.id,
                                                        el,
                                                    );
                                                else
                                                    videoRefs.current.delete(
                                                        item.id,
                                                    );
                                            }}
                                            src={item.videoUrl}
                                            className={`h-full w-full object-cover transition-all duration-700 ${
                                                isFront
                                                    ? 'opacity-100 grayscale-0'
                                                    : 'opacity-40 grayscale'
                                            }`}
                                            loop
                                            playsInline
                                            // Tambahkan ini agar saat video selesai (loop), dia tidak kaget
                                            onPlay={() =>
                                                controlMarsAudio(true)
                                            }
                                        />

                                        {isFront && (
                                            <div className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity group-hover:opacity-0">
                                                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-md">
                                                    <Play
                                                        size={24}
                                                        className="ml-1 fill-white text-white"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Pagination Buttons dengan Animasi Slide-in */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative flex h-20 w-32 flex-shrink-0 items-center justify-center"
                        >
                            <div className="absolute left-1/2 top-1/2 h-24 w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-[45deg] bg-[#0F5F58]/20" />
                            <button
                                onClick={handlePrev}
                                className="group absolute -top-2 left-0 flex h-12 w-12 rotate-45 items-center justify-center border-2 border-[#0F5F58]/30 transition-all hover:bg-[#0F5F58] hover:text-white"
                            >
                                <ChevronLeft className="-rotate-45" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="group absolute -bottom-2 right-0 flex h-12 w-12 rotate-45 items-center justify-center border-2 border-[#0F5F58]/30 transition-all hover:bg-[#0F5F58] hover:text-white"
                            >
                                <ChevronRight className="-rotate-45" />
                            </button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialVideo;
