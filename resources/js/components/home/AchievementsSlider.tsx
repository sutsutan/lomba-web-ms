import achievementImg from '@/assets/achievement-1.jpg';
import ScrollReveal from '@/components/ScrollReveal';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { useState } from 'react';

interface Achievement {
    id: number;
    title: string;
    student: string;
    description: string;
    category: string;
    image: string;
}

const achievements: Achievement[] = [
    {
        id: 1,
        title: 'Gold Medal - National Robotics Competition',
        student: 'Ghattan Firstian Ilhaq',
        description:
            'First place in the National Robotics Competition 2024, showcasing innovative automation solutions.',
        category: 'Technology',
        image: achievementImg,
    },
    {
        id: 2,
        title: 'Best Culinary Innovation Award',
        student: 'Sutan Bariq Rajabbani Pasai',
        description:
            'Winner of the Jakarta Culinary Festival for creative fusion cuisine.',
        category: 'Culinary',
        image: achievementImg,
    },
    {
        id: 3,
        title: 'National Debate Championship',
        student: 'Hanna Maria',
        description:
            'Champion in the National English Debate Competition representing West Java.',
        category: 'Academic',
        image: achievementImg,
    },
];

const AchievementsSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % achievements.length);
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prev) => (prev - 1 + achievements.length) % achievements.length,
        );
    };

    return (
        <section className="section-padding bg-section overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                {/* Header Section dengan Tombol Navigasi di Kanan Atas */}
                <div className="mb-8 flex flex-col justify-between px-2 md:mb-16 md:flex-row md:items-end md:px-12 lg:mb-24">
                    <ScrollReveal>
                        <div className="text-left">
                            <h2 className="section-title !mx-0 text-2xl md:text-3xl lg:text-4xl">
                                Moments of Achievement
                            </h2>
                            <p className="mt-2 text-sm text-muted-foreground md:text-base">
                                Celebrating our students' global excellence
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Custom Navigation Button (Diamond Style) */}
                    <ScrollReveal delay={0.2}>
                        <div className="mt-6 flex items-center gap-2 md:mt-0">
                            <div className="relative flex h-16 w-24 items-center justify-center md:h-20 md:w-32">
                                {/* Garis miring */}
                                <div className="absolute z-10 h-12 w-[2px] rotate-[45deg] bg-primary/30 md:h-16" />

                                {/* Button Prev */}
                                <button
                                    onClick={prevSlide}
                                    className="group absolute -top-1 left-1 flex h-10 w-10 rotate-45 items-center justify-center border-2 border-primary/40 transition-all hover:bg-primary hover:text-white md:left-2 md:h-12 md:w-12"
                                >
                                    <ChevronLeft className="h-5 w-5 -rotate-45 transition-transform group-active:-translate-x-1 md:h-6 md:w-6" />
                                </button>

                                {/* Button Next */}
                                <button
                                    onClick={nextSlide}
                                    className="group absolute -bottom-1 right-1 flex h-10 w-10 rotate-45 items-center justify-center border-2 border-primary/40 transition-all hover:bg-primary hover:text-white md:right-2 md:h-12 md:w-12"
                                >
                                    <ChevronRight className="h-5 w-5 -rotate-45 transition-transform group-active:translate-x-1 md:h-6 md:w-6" />
                                </button>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Kontainer Utama Slider */}
                <div className="relative mx-auto w-full max-w-6xl">
                    {/* Layer Fade Smooth di Samping */}
                    <div className="from-section via-section/80 pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-12 bg-gradient-to-r to-transparent md:block md:w-32" />
                    <div className="from-section via-section/80 pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-12 bg-gradient-to-l to-transparent md:block md:w-32" />

                    {/* Area Slider */}
                    <div className="relative overflow-visible">
                        <motion.div
                            className="flex gap-4 md:gap-8 lg:gap-12"
                            animate={{
                                x: `calc(-${currentIndex * 100}% - ${currentIndex * (typeof window !== 'undefined' && window.innerWidth < 768 ? 16 : 32)}px)`,
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 260,
                                damping: 26,
                            }}
                        >
                            {achievements.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    className="min-w-full"
                                    animate={{
                                        scale: index === currentIndex ? 1 : 0.9,
                                        opacity:
                                            index === currentIndex ? 1 : 0.4,
                                        filter:
                                            index === currentIndex
                                                ? 'blur(0px)'
                                                : 'blur(2px)',
                                    }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {/* New Design Card - Inspired by the image */}
                                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-t from-white via-[#E2F0F9]/20 to-[#E2F0F9] shadow-[0_20px_60px_rgba(0,0,0,0.15)] md:rounded-[3rem]">
                                        <div className="grid items-center gap-6 p-8 md:grid-cols-[1.2fr,0.8fr] md:gap-0 md:p-12 lg:p-16">
                                            {/* Left Content */}
                                            <div className="order-2 space-y-4 md:order-1 md:space-y-6">
                                                {/* Category Badge */}
                                                <span className="inline-block rounded-2xl border border-white/50 bg-white/90 px-4 py-2 text-xs font-bold text-slate-700 shadow-sm backdrop-blur-sm md:px-6 md:py-2.5 md:text-sm">
                                                    {item.category}
                                                </span>

                                                {/* Student Name */}
                                                <h3 className="text-2xl font-black leading-tight text-[#0F5F58] md:text-3xl lg:text-4xl xl:text-5xl">
                                                    {item.student}
                                                </h3>

                                                {/* Description */}
                                                <p className="max-w-lg text-sm leading-relaxed text-slate-700 md:text-base lg:text-lg">
                                                    {item.description}
                                                </p>

                                                {/* Consultation Button */}
                                                <button className="group mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-[#0F4C5C] px-8 py-3.5 text-sm font-bold text-white shadow-xl transition-all hover:bg-[#0a3844] hover:shadow-2xl active:scale-95 md:mt-4 md:px-10 md:py-4 md:text-base">
                                                    <Trophy className="h-4 w-4 md:h-5 md:w-5" />
                                                    Learn More
                                                </button>
                                            </div>

                                            {/* Right Image - Circle */}
                                            <div className="px-15 order-1 flex justify-center md:order-2 md:justify-end">
                                                <div className="relative">
                                                    {/* Circle Background */}
                                                    <div className="absolute inset-0 scale-95 transform rounded-full bg-gradient-to-br md:scale-100" />

                                                    {/* Image Container */}
                                                    <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 shadow-2xl md:h-64 md:w-64 lg:h-80 lg:w-80">
                                                        <img
                                                            src={item.image}
                                                            alt={item.student}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Dots Indicator */}
                    <div className="mt-8 flex justify-center gap-2 md:mt-12 md:gap-3">
                        {achievements.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`rounded-full transition-all duration-500 ${
                                    index === currentIndex
                                        ? 'h-2.5 w-8 bg-primary md:h-3 md:w-10'
                                        : 'h-2.5 w-2.5 bg-slate-300 md:h-3 md:w-3'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AchievementsSlider;
