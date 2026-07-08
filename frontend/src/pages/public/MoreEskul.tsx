import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowLeft,
    ArrowUpRight,
    Award,
    Calendar,
    CheckCircle2,
    ChevronRight,
    Sparkles,
    Target,
} from 'lucide-react';

import HeroCarousel from '@/components/HeroCarousel';
import ScrollReveal from '@/components/ScrollReveal';
import MainLayout from '@/layouts/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { getPublicExtracurriculars, Extracurricular as ExtracurricularType } from '@/services/Extracurricular';
import api from '@/lib/api';

const fallbackExtracurriculars = [
    {
        id: 'basket',
        nameKey: 'excu_basket_name',
        descKey: 'excu_basket_desc',
        detailKey: 'excu_basket_detail',
        category: 'Sports',
        skills: ['Tactical Strategy', 'Physical Endurance', 'Leadership'],
        gallery: ['https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800'],
        achievements: ['Regional O2SN Champions', 'MVP Invitational Cup 2025'],
        schedule: 'Tue & Thu, 15:30',
        intensity: 'Advanced',
        registration_link: '#'
    },
    {
        id: 'volly',
        nameKey: 'excu_volly_name',
        descKey: 'excu_volly_desc',
        detailKey: 'excu_volly_detail',
        category: 'Sports',
        skills: ['Vertical Jump', 'Agility', 'Communication'],
        gallery: ['https://images.unsplash.com/photo-1592656670411-2918837bc754?q=80&w=800'],
        achievements: ['National Vocational League Semi-finalist'],
        schedule: 'Mon & Wed, 15:30',
        intensity: 'Intermediate',
        registration_link: '#'
    },
    {
        id: 'futsal',
        nameKey: 'excu_futsal_name',
        descKey: 'excu_futsal_desc',
        detailKey: 'excu_futsal_detail',
        category: 'Sports',
        skills: ['Ball Control', 'Speed', 'Precision'],
        gallery: ['https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800'],
        achievements: ['Top Scorer Regional Cup'],
        schedule: 'Fri, 14:00',
        intensity: 'Advanced',
        registration_link: '#'
    },
    {
        id: 'badminton',
        nameKey: 'excu_badminton_name',
        descKey: 'excu_badminton_desc',
        detailKey: 'excu_badminton_detail',
        category: 'Sports',
        skills: ['Footwork', 'Reflexes', 'Stamina'],
        gallery: ['https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800'],
        achievements: ['Runner up Men’s Doubles Bogor'],
        schedule: 'Saturday, 08:00',
        intensity: 'Beginner to Advanced',
        registration_link: '#'
    },
    {
        id: 'taekwondo',
        nameKey: 'excu_taekwondo_name',
        descKey: 'excu_taekwondo_desc',
        detailKey: 'excu_taekwondo_detail',
        category: 'Sports',
        skills: ['Self-Defense', 'Discipline', 'Flexibility'],
        gallery: ['https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800'],
        achievements: ['Gold Medal Kejurda 2024'],
        schedule: 'Thu, 16:00',
        intensity: 'Intermediate',
        registration_link: '#'
    },
    {
        id: 'lukis',
        nameKey: 'excu_lukis_name',
        descKey: 'excu_lukis_desc',
        detailKey: 'excu_lukis_detail',
        category: 'Arts',
        skills: ['Color Theory', 'Aesthetics', 'Creativity'],
        gallery: ['https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800'],
        achievements: ['Best Canvas Art 2024'],
        schedule: 'Wed, 15:00',
        intensity: 'Beginner',
        registration_link: '#'
    },
    {
        id: 'digital',
        nameKey: 'excu_digital_name',
        descKey: 'excu_digital_desc',
        detailKey: 'excu_digital_detail',
        category: 'Arts',
        skills: ['UI/UX Basics', 'Digital Rendering', 'Storyboarding'],
        gallery: ['https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800'],
        achievements: ['Winner Digital Art Fest'],
        schedule: 'Friday, 15:30',
        intensity: 'Intermediate',
        registration_link: '#'
    },
    {
        id: 'musik',
        nameKey: 'excu_musik_name',
        descKey: 'excu_musik_desc',
        detailKey: 'excu_musik_detail',
        category: 'Arts',
        skills: ['Harmony', 'Performance', 'Audio Mixing'],
        gallery: ['https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800'],
        achievements: ['Best School Band 2024'],
        schedule: 'Saturday, 10:00',
        intensity: 'Intermediate',
        registration_link: '#'
    },
    {
        id: 'paskibra',
        nameKey: 'excu_paskibra_name',
        descKey: 'excu_paskibra_desc',
        detailKey: 'excu_paskibra_detail',
        category: 'Specialized',
        skills: ['Leadership', 'Physical Fitness', 'Discipline'],
        gallery: ['https://images.unsplash.com/photo-1540324155974-7523202daa3f?q=80&w=800'],
        achievements: ['Best Paskibraka Team District Level'],
        schedule: 'Saturday, 07:00',
        intensity: 'Advanced',
        registration_link: '#'
    },
    {
        id: 'flair',
        nameKey: 'excu_flair_name',
        descKey: 'excu_flair_desc',
        detailKey: 'excu_flair_detail',
        category: 'Specialized',
        skills: ['Acrobatics', 'Hospitality', 'Mixology'],
        gallery: ['https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800'],
        achievements: ['Best Performance Bartender Cup'],
        schedule: 'Mon & Fri, 16:00',
        intensity: 'Advanced',
        registration_link: '#'
    }
];

interface UnifiedEkskul {
    id: string;
    name: string;
    category: string;
    description: string;
    detail: string;
    image: string;
    schedule: string;
    intensity: string;
    achievements: string[];
    registration_link: string;
}

const ExtracurricularPage = () => {
    const { t, language } = useLanguage();
    const [heroSlides, setHeroSlides] = useState<any[]>([]);
    const [rawEkskul, setRawEkskul] = useState<ExtracurricularType[]>([]);
    const [selectedId, setSelectedId] = useState<string>('');
    const [activeCat, setActiveCat] = useState('All');
    const categories = ['All', 'Sports', 'Arts', 'Specialized'];

      useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await api.get("/eskul");

                const data = Array.isArray(res.data)
                    ? res.data
                    : (res.data.data || []);

                const filtered = data.filter(
                    (item: any) =>
                        item.category === "eskul" &&
                        item.is_active
                );

                setHeroSlides(
                    filtered.map((item: any) => ({
                        image_url: item.image_url,
                        title: language === "id" ? item.title_id : item.title_en,
                        subtitle:
                            language === "id"
                                ? item.subtitle_id
                                : item.subtitle_en,
                    }))
                );
            } catch (err) {
                console.error("Gagal load hero:", err);
            }
        };

        fetchHero();
    }, [language]);


    useEffect(() => {
        getPublicExtracurriculars().then((data) => {
            if (data && data.length > 0) {
                setRawEkskul(data);
                setSelectedId(String(data[0].id));
            } else {
                setSelectedId(fallbackExtracurriculars[0].id);
            }
        }).catch(() => {
            setSelectedId(fallbackExtracurriculars[0].id);
        });
    }, []);

    const normalizedItems: UnifiedEkskul[] = useMemo(() => {
        if (rawEkskul.length > 0) {
            return rawEkskul.map((item) => ({
                id: String(item.id),
                name: item.name,
                category: item.category,
                description: item.description || '',
                detail: item.description || '',
                image: item.image_url || 'https://placehold.co/800x450/e2e8f0/94a3b8?text=Ekskul',
                schedule: item.schedule || 'Jadwal belum ditentukan',
                intensity: item.intensity || 'Normal',
                achievements: item.track_record ? [item.track_record] : ['Belum ada riwayat prestasi tercatat'],
                registration_link: item.registration_link || '#'
            }));
        }

        return fallbackExtracurriculars.map((item) => ({
            id: item.id,
            name: t(item.nameKey),
            category: item.category,
            description: t(item.descKey),
            detail: t(item.detailKey),
            image: item.gallery[0],
            schedule: item.schedule,
            intensity: item.intensity,
            achievements: item.achievements,
            registration_link: item.registration_link
        }));
    }, [rawEkskul, t]);

    const filteredItems = useMemo(() => {
        const items = activeCat === 'All' 
            ? normalizedItems 
            : normalizedItems.filter((i) => i.category === activeCat);

        if (items.length > 0 && !items.some(i => i.id === selectedId)) {
            setSelectedId(items[0].id);
        }
        return items;
    }, [activeCat, normalizedItems, selectedId]);

    const selected = useMemo(() => {
        return normalizedItems.find((i) => i.id === selectedId) || normalizedItems[0];
    }, [selectedId, normalizedItems]);

    return (
        <MainLayout>
            <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-teal-100">
                <HeroCarousel 
                category="eskul" 
                lang={language}
                height="h-[60vh]"
                />

                {/* NAVIGATION BAR */}
                <nav className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 shadow-sm backdrop-blur-md">
                    <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-12 lg:px-24">
                        <Link to="/" className="flex items-center gap-3 font-medium text-slate-400 hover:text-teal-700 transition-colors">
                            <ArrowLeft size={18} />
                            <span className="text-sm tracking-wide">{t('excu_back')}</span>
                        </Link>

                        <div className="flex gap-1 rounded-full border border-slate-200/60 bg-slate-50 p-1">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCat(cat)}
                                    className={`rounded-full px-6 py-2 text-xs font-semibold tracking-wider transition-all ${
                                        activeCat === cat ? 'bg-white text-teal-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>

                <main className="container mx-auto px-6 md:px-12 lg:px-24 py-16">
                    <div className="grid gap-12 lg:grid-cols-12">
                        {/* LEFT: SIDEBAR LIST */}
                        <div className="space-y-8 lg:col-span-4">
                            <div className="space-y-2">
                                <ScrollReveal>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-teal-600">
                                        {t('cert_label_main')}
                                    </p>
                                    <h2 className="text-4xl font-light leading-tight text-slate-900">
                                        {t('excu_choose_title')} <span className="font-black">{t('excu_choose_bold')}</span>
                                    </h2>
                                </ScrollReveal>
                            </div>

                            <div className="custom-scrollbar flex max-h-[60vh] flex-col gap-2 overflow-y-auto pr-4 grayscale-[0.5]">
                                {filteredItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setSelectedId(item.id)}
                                        className={`group flex w-full items-center justify-between rounded-2xl p-5 text-left transition-all duration-300 ${
                                            selectedId === item.id ? 'border-l-4 border-teal-600 bg-teal-50/50' : 'border-l-4 border-transparent hover:bg-slate-50'
                                        }`}
                                    >
                                        <div>
                                            <h4 className={`text-base font-bold ${selectedId === item.id ? 'text-teal-900' : 'text-slate-600'}`}>
                                                {item.name}
                                            </h4>
                                            <p className="mt-1 text-[10px] font-medium uppercase tracking-widest text-slate-400">
                                                {item.category}
                                            </p>
                                        </div>
                                        <ChevronRight size={18} className={`transition-all ${selectedId === item.id ? 'text-teal-600 opacity-100' : 'opacity-0'}`} />
                                    </button>
                                ))}
                                {filteredItems.length === 0 && (
                                    <p className="text-xs text-slate-400 p-4 text-center">Tidak ada kegiatan kategori ini.</p>
                                )}
                            </div>
                        </div>

                        {/* RIGHT: CONTENT DETAIL */}
                        <div className="lg:col-span-8">
                            <AnimatePresence mode="wait">
                                {selected && (
                                    <motion.div
                                        key={selected.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="bg-white"
                                    >
                                        <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-[2rem] shadow-2xl shadow-slate-200">
                                            <img src={selected.image} alt={selected.name} className="h-full w-full object-cover" />
                                            <div className="absolute bottom-10 left-10">
                                                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                                                    Active Program 2025/2026
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid gap-12 md:grid-cols-12">
                                            <div className="space-y-8 md:col-span-8">
                                                <div className="space-y-4">
                                                    <h2 className="text-5xl font-black italic tracking-tighter text-slate-900">
                                                        {selected.name}
                                                    </h2>
                                                    <p className="text-xl font-light leading-relaxed text-slate-500">
                                                        {selected.description}
                                                    </p>
                                                </div>

                                                <div className="flex gap-8 border-y border-slate-100 py-6">
                                                    <div className="space-y-1">
                                                        <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                                            <Calendar size={14} /> {t('excu_schedule')}
                                                        </p>
                                                        <p className="text-sm font-bold text-slate-800">{selected.schedule}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                                            <Target size={14} /> {t('excu_intensity')}
                                                        </p>
                                                        <p className="text-sm font-bold text-slate-800">{selected.intensity}</p>
                                                    </div>
                                                </div>

                                                <p className="text-sm leading-relaxed text-slate-600">
                                                    {selected.detail}
                                                </p>
                                            </div>

                                            <div className="space-y-8 md:col-span-4">
                                                <div className="group relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white">
                                                    <Sparkles className="absolute -right-4 -top-4 h-24 w-24 opacity-10" />
                                                    <h5 className="mb-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-teal-400">
                                                        <Award size={14} /> {t('excu_track_record')}
                                                    </h5>
                                                    <div className="space-y-4">
                                                        {selected.achievements.map((item, i) => (
                                                            <div key={i} className="flex gap-3">
                                                                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-teal-500" />
                                                                <p className="text-xs font-medium leading-tight opacity-90">{item}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {selected.registration_link && selected.registration_link !== '#' ? (
                                                    <a 
                                                        href={selected.registration_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-800 py-5 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-teal-900/20 transition-all hover:bg-teal-900"
                                                    >
                                                        {t('excu_reg_form')}
                                                        <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                                                    </a>
                                                ) : (
                                                    <button 
                                                        disabled
                                                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-200 py-5 text-xs font-bold uppercase tracking-widest text-slate-400 cursor-not-allowed"
                                                    >
                                                        Pendaftaran Ditutup
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </main>
            </div>
        </MainLayout>
    );
};

export default ExtracurricularPage;