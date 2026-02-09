import achievement from '@/assets/achievement-1.jpg';
import HeroCarousel from '@/components/HeroCarousel';
import ScrollReveal from '@/components/ScrollReveal';
import MainLayout from '@/layouts/MainLayout';
import GlobeAlumni from '@/pages/GlobeAlumni';
import { Briefcase, ChevronRight, GraduationCap, MapPin, Target } from 'lucide-react';
import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Alumni = () => {
    const { t } = useLanguage();
    const [activeAlumniId, setActiveAlumniId] = useState<number | null>(null);
    const globeSectionRef = useRef<HTMLDivElement>(null);

    const alumniData = [
        {
            id: 1,
            name: 'Ahmad Rizky',
            year: '2020',
            major: t('category.it'),
            company: 'Tokopedia',
            location: [-6.1751, 106.8272] as [number, number],
            position: 'Software Engineer',
            image: achievement,
            quote: t('alumni.quote.1'),
        },
        {
            id: 2,
            name: 'Siti Nurhaliza',
            year: '2019',
            major: t('category.culinary'),
            location: [35.6762, 139.6503] as [number, number],
            company: 'Marriott Hotels',
            position: 'Executive Chef',
            image: achievement,
            quote: t('alumni.quote.2'),
        },
        {
            id: 3,
            name: 'Budi Santoso',
            year: '2021',
            major: t('category.accounting'),
            location: [1.3521, 103.8198] as [number, number],
            company: 'Bank Mandiri',
            position: 'Financial Analyst',
            image: achievement,
            quote: t('alumni.quote.3'),
        },
        {
            id: 4,
            name: 'Dewi Lestari',
            year: '2020',
            major: t('category.dkv'),
            location: [-37.8136, 144.9631] as [number, number],
            company: 'Gojek',
            position: 'UI/UX Designer',
            image: achievement,
            quote: t('alumni.quote.4'),
        },
    ];

    const activeAlumni = alumniData.find((a) => a.id === activeAlumniId);

    const handleAlumniClick = (alumni: typeof alumniData[0]) => {
        setActiveAlumniId(alumni.id);
        globeSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <MainLayout>
            <HeroCarousel
                title={t('alumni.hero.title')}
                subtitle={t('alumni.hero.subtitle')}
                description={t('alumni.hero.desc')}
                height="h-[60vh] md:h-[70vh]"
            />

            {/* Globe Visualization Section */}
            <section ref={globeSectionRef} className="relative overflow-hidden bg-slate-50 py-16 md:py-24">
                <div className="absolute -left-24 top-24 h-64 w-64 md:h-96 md:w-96 rounded-full bg-teal-100/50 blur-[80px] md:blur-[100px]" />
                <div className="absolute -right-24 bottom-24 h-64 w-64 md:h-96 md:w-96 rounded-full bg-blue-100/50 blur-[80px] md:blur-[100px]" />

                <div className="container relative z-10 mx-auto px-4">
                    <div className="flex flex-col items-center">
                        <ScrollReveal>
                            <div className="mb-8 md:mb-12 text-center">
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#12606A]/10 px-4 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#12606A]">
                                    <Target size={14} /> {t('alumni.global.pill')}
                                </div>
                                <h2 className="text-3xl font-black tracking-tight text-[#12606A] md:text-6xl">
                                    {t('alumni.global.title').split(' ').map((word, i) => (
                                      i === t('alumni.global.title').split(' ').length - 1 
                                      ? <span key={i} className="text-teal-500">{word}</span>
                                      : word + ' '
                                    ))}
                                </h2>
                                <p className="mt-4 md:mt-6 max-w-2xl text-sm md:text-lg text-slate-500">
                                    {t('alumni.global.desc')}
                                    <span className="hidden md:inline"> {t('alumni.global.instruction')}</span>
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Globe Display Container */}
                        <div className="relative w-full max-w-5xl rounded-[2.5rem] md:rounded-[4rem] border border-white/40 bg-white/30 p-2 md:p-8 shadow-2xl backdrop-blur-md">
                            <div className="relative overflow-hidden rounded-[2.2rem] md:rounded-[3.5rem] bg-[#12606A] shadow-2xl">
                                
                                {activeAlumni && (
                                    <div className="absolute left-4 top-4 z-40 animate-in fade-in zoom-in duration-500 md:left-10 md:top-10">
                                        <div className="overflow-hidden rounded-xl border border-white bg-white/90 shadow-2xl backdrop-blur-md md:rounded-2xl">
                                            <div className="bg-[#12606A] px-3 py-1.5 md:px-4 md:py-2 text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-white">
                                                {t('alumni.map.active_dest')}
                                            </div>
                                            <div className="p-3 md:p-4">
                                                <h4 className="text-sm md:text-lg font-bold text-teal-800">{activeAlumni.company}</h4>
                                                <p className="mt-1 flex items-center gap-2 text-[10px] md:text-sm text-teal-800 font-medium">
                                                    <MapPin size={14} /> {activeAlumni.location[0].toFixed(2)}°, {activeAlumni.location[1].toFixed(2)}°
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="absolute bottom-6 right-8 z-20 hidden flex-col items-end gap-1 opacity-60 md:flex">
                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white">{t('alumni.map.interactive')}</p>
                                    <div className="h-0.5 w-12 bg-teal-500" />
                                </div>
                                
                                <div className="h-[400px] w-full md:h-[650px]">
                                    <GlobeAlumni 
                                        targetLocation={activeAlumni?.location || null} 
                                        alumniData={alumniData} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Alumni Cards Grid */}
            <section className="relative bg-white py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mb-12 md:mb-20 flex flex-col items-center justify-between gap-6 border-b border-slate-100 pb-8 md:pb-12 md:flex-row md:items-end">
                        <div className="max-w-xl text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-black text-[#12606A]">{t('alumni.stories.title')}</h2>
                            <p className="mt-2 md:mt-4 text-sm md:text-base text-slate-500">{t('alumni.stories.desc')}</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex -space-x-3 scale-90 md:scale-100">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-10 w-10 md:h-12 md:w-12 rounded-full border-4 border-white bg-slate-200" />
                                ))}
                                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border-4 border-white bg-[#12606A] text-[10px] md:text-xs font-bold text-white shadow-lg">
                                    +5K
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 md:gap-8 lg:grid-cols-2 lg:gap-10">
                        {alumniData.map((alumni, index) => {
                            const isActive = activeAlumniId === alumni.id;
                            return (
                                <ScrollReveal key={alumni.id} delay={index * 0.1}>
                                    <div
                                        onClick={() => handleAlumniClick(alumni)}
                                        className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-[2.5rem] md:rounded-[3rem] border-2 p-2 md:p-3 transition-all duration-500 ${
                                            isActive
                                                ? 'border-[#12606A] bg-teal-50/30 ring-4 md:ring-8 ring-[#12606A]/5 scale-[1.01] md:scale-[1.02]'
                                                : 'border-slate-100 bg-white hover:border-teal-200 hover:shadow-xl'
                                        }`}
                                    >
                                        <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center md:gap-8">
                                            {/* Profile Image */}
                                            <div className="relative mx-auto h-32 w-32 shrink-0 md:h-40 md:w-40 lg:mx-0">
                                                <div className={`absolute inset-0 rounded-full border-2 border-dashed border-[#12606A]/30 transition-transform duration-[3000ms] group-hover:rotate-180 ${isActive ? 'animate-spin' : ''}`} style={{ animationDuration: '10s' }} />
                                                <div className="absolute inset-2 overflow-hidden rounded-full shadow-inner bg-slate-50">
                                                    <img src={alumni.image} alt={alumni.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                </div>
                                                <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-[#12606A] text-white shadow-xl ring-4 ring-white">
                                                    <GraduationCap size={16} className="md:size-5" />
                                                </div>
                                            </div>

                                            <div className="flex-1 text-center lg:text-left">
                                                <div className="flex items-start justify-between">
                                                    <div className="w-full">
                                                        <h3 className="text-xl md:text-2xl font-black text-slate-800 transition-colors group-hover:text-[#12606A]">
                                                            {alumni.name}
                                                        </h3>
                                                        <p className="mt-1 flex items-center justify-center lg:justify-start gap-2 text-xs md:text-base font-bold text-teal-600">
                                                            <Briefcase size={16} /> {alumni.position}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3">
                                                    <span className="flex items-center gap-2 rounded-lg md:rounded-xl bg-slate-100 px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-bold text-slate-600">
                                                        <MapPin size={12} /> {alumni.company}
                                                    </span>
                                                    <span className="rounded-lg md:rounded-xl bg-teal-50 px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-bold text-[#12606A]">
                                                        {t('alumni.card.class_of')} {alumni.year}
                                                    </span>
                                                </div>

                                                <blockquote className="relative mt-4 md:mt-6 italic text-slate-500">
                                                    <p className="relative z-10 line-clamp-2 leading-relaxed text-xs md:text-sm">
                                                        "{alumni.quote}"
                                                    </p>
                                                </blockquote>
                                            </div>

                                            <div className={`hidden h-12 w-12 items-center justify-center rounded-full bg-[#12606A] text-white shadow-lg transition-all duration-300 lg:flex ${isActive ? 'scale-100 opacity-100' : 'translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`}>
                                                <ChevronRight />
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative overflow-hidden bg-[#12606A] py-16 md:py-24 text-white">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px md:40px 40px' }} />
                <div className="container relative mx-auto px-4">
                    <div className="grid grid-cols-2 gap-8 md:gap-12 lg:grid-cols-4">
                        {[
                            { value: '5K+', label: t('alumni.stats.total') },
                            { value: '95%', label: t('alumni.stats.employability') },
                            { value: '200+', label: t('alumni.stats.companies') },
                            { value: '50+', label: t('alumni.stats.countries') },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl font-black italic tracking-tighter sm:text-5xl md:text-6xl text-white">
                                    {stat.value}
                                </div>
                                <div className="mt-2 md:mt-3 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-white/50">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Alumni;