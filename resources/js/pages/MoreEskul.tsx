import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Users, 
  Target, 
  Image as ImageIcon, 
  Info, 
  Award, 
  Calendar, 
  CheckCircle, 
  ChevronRight,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroCarousel from '@/components/HeroCarousel';
import ScrollReveal from '@/components/ScrollReveal';
import MainLayout from '@/layouts/MainLayout';

// 1. DATA EKSKUL
const extracurriculars = [
    { 
        id: 'basket', name: 'Basketball', category: 'Sports', icon: '🏀', 
        desc: 'Master the court with professional coaching. We focus on tactical play and physical endurance.',
        details: 'Basketball at Metland School has a long history of regional achievements. Training is held 3 times a week at the main court.',
        achievements: ['Juara 1 O2SN Kabupaten', 'MVP Invitational Cup 2025'],
        skills: ['Teamwork', 'Endurance', 'Tactical Strategy'],
        gallery: ['https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800', 'https://images.unsplash.com/photo-1519861531158-286d04c5195b?q=80&w=800'],
    },
    { 
        id: 'volly', name: 'Volleyball', category: 'Sports', icon: '🏐', 
        desc: 'Developing power hits and solid defense through disciplined teamwork.',
        details: 'Focuses on building core strength and vertical leap for competitive matches.',
        achievements: ['Semi-finalist National Vocational League'],
        skills: ['Vertical Jump', 'Agility', 'Communication'],
        gallery: ['https://images.unsplash.com/photo-1592656670411-2918837bc754?q=80&w=800', 'https://images.unsplash.com/photo-1547347298-407458488a5f?q=80&w=800'],
    },
    { id: 'futsal', name: 'Futsal', category: 'Sports', icon: '⚽', desc: 'Fast-paced agility and ball control in a high-intensity environment.', details: 'Held at the indoor arena with professional futsal standards.', achievements: ['Top Scorer Regional Cup'], skills: ['Ball Control', 'Speed', 'Precision'], gallery: ['https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800', 'https://images.unsplash.com/photo-1526232762682-d235b5563561?q=80&w=800'] },
    { id: 'badminton', name: 'Badminton', category: 'Sports', icon: '🏸', desc: 'Speed and precision. Developing world-class footwork and powerful smashes.', details: 'Intensive drills for both singles and doubles categories.', achievements: ['Juara 2 Ganda Putra Bogor'], skills: ['Footwork', 'Reflexes', 'Stamina'], gallery: ['https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800', 'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?q=80&w=800'] },
    { id: 'taekwondo', name: 'Taekwondo', category: 'Sports', icon: '🥋', desc: 'Korean martial art focusing on kicks, discipline, and self-defense.', details: 'Weekly training with certified Sabum (Black Belt instructors).', achievements: ['Medali Emas Kejurda 2024'], skills: ['Self-Defense', 'Discipline', 'Flexibility'], gallery: ['https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800', 'https://images.unsplash.com/photo-1552072805-2a9039d00e57?q=80&w=800'] },
    { id: 'lukis', name: 'Seni Lukis', category: 'Arts', icon: '🎨', desc: 'Exploring fine arts from traditional canvas to contemporary styles.', details: 'Learning color theory, anatomy, and various medium explorations.', achievements: ['Best Canvas Art 2024'], skills: ['Color Theory', 'Aesthetics', 'Creativity'], gallery: ['https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800', 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=800'] },
    { id: 'digital', name: 'Ilustrasi Digital', category: 'Arts', icon: '💻', desc: 'The future of art. Creating characters and worlds using professional tablets.', details: 'Focuses on industry-standard software like Photoshop and Procreate.', achievements: ['Winner Digital Art Fest'], skills: ['UI/UX Basics', 'Digital Rendering', 'Storyboarding'], gallery: ['https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800', 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800'] },
    { id: 'musik', name: 'Musik/Band', category: 'Arts', icon: '🎸', desc: 'Finding your rhythm through instruments and vocal harmony.', details: 'Equipped with a soundproof studio for band rehearsals.', achievements: ['Best School Band 2024'], skills: ['Harmony', 'Performance', 'Audio Mixing'], gallery: ['https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800', 'https://images.unsplash.com/photo-1514525253361-bee8a18744ad?q=80&w=800'] },
    { id: 'paskibra', name: 'Paskibra', category: 'Specialized', icon: '🇮🇩', desc: 'Leadership, discipline, and the pride of national flag-hoisting.', details: 'Intensive training for high-level ceremonial standards.', achievements: ['Paskibraka Kabupaten Best Team'], skills: ['Leadership', 'Physical Fitness', 'Discipline'], gallery: ['https://images.unsplash.com/photo-1540324155974-7523202daa3f?q=80&w=800', 'https://images.unsplash.com/photo-1461080639469-66d73688fb21?q=80&w=800'] },
    { id: 'flair', name: 'Flair Bartending', category: 'Specialized', icon: '🍹', desc: 'The art of showmanship in mixology. Technical skills with style.', details: 'Students learn to handle professional bar tools with acrobatic flair.', achievements: ['Best Performance Bartender Cup'], skills: ['Acrobatics', 'Hospitality', 'Mixology'], gallery: ['https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800', 'https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=800'] },
];

const ExtracurricularPage = () => {
    const [selectedId, setSelectedId] = useState(extracurriculars[0].id);
    const [activeCat, setActiveCat] = useState('All');

    const categories = ['All', 'Sports', 'Arts', 'Specialized'];

    // Filter Logic
    const filteredItems = useMemo(() => 
        activeCat === 'All' ? extracurriculars : extracurriculars.filter(i => i.category === activeCat)
    , [activeCat]);

    const selected = useMemo(() => 
        extracurriculars.find(i => i.id === selectedId) || extracurriculars[0]
    , [selectedId]);

    return (
        <MainLayout>
            <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
                {/* 1. Hero Section */}
                <HeroCarousel
                    title="Extracurricular Hub"
                    subtitle="Empowering Vocational Excellence"
                    description="Explore our diverse range of activities designed to sharpen your skills beyond the classroom. At Metland School, your passion meets professional guidance."
                    height="h-[55vh]"
                />

                {/* 2. Sticky Sub-Header Navigation */}
                <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40 shadow-sm">
                    <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                        <Link to="/extracurricular" className="flex items-center gap-2 text-slate-500 hover:text-[#0F5F58] transition-all font-bold group">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="hidden sm:inline text-sm">Back</span>
                        </Link>
                        
                        <div className="flex gap-2 md:gap-6 overflow-x-auto no-scrollbar py-2">
                            {categories.map(cat => (
                                <button 
                                    key={cat}
                                    onClick={() => setActiveCat(cat)}
                                    className={`px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                                        activeCat === cat 
                                        ? 'bg-[#0F5F58] text-white shadow-md' 
                                        : 'bg-transparent text-slate-400 hover:text-slate-600'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>

                {/* 3. Main Content Content */}
                <main className="container mx-auto px-4 py-10 lg:px-12">
                    <div className="grid lg:grid-cols-12 gap-8 items-start">
                        
                        {/* LEFT PANEL: Selection List */}
                        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                            <div className="px-2">
                                <ScrollReveal>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-[2px] bg-[#0F5F58]" />
                                        <span className="text-[#0F5F58] font-black text-[10px] uppercase tracking-widest">Student Life</span>
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 leading-tight">
                                        Pick Your <span className="text-[#0F5F58]">Journey.</span>
                                    </h2>
                                </ScrollReveal>
                            </div>

                            {/* List Container with fixed height scroll */}
                            <div className="flex flex-col gap-3 max-h-[50vh] lg:max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
                                {filteredItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        onClick={() => setSelectedId(item.id)}
                                        className={`p-4 rounded-2xl cursor-pointer border-2 transition-all flex items-center gap-4 group ${
                                            selectedId === item.id 
                                            ? 'border-[#0F5F58] bg-white shadow-xl shadow-slate-200' 
                                            : 'border-transparent bg-white hover:bg-slate-50 hover:border-slate-200'
                                        }`}
                                    >
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all ${selectedId === item.id ? 'bg-teal-50 scale-110' : 'bg-slate-100 opacity-60'}`}>
                                            {item.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className={`font-bold text-sm transition-colors ${selectedId === item.id ? 'text-[#0F5F58]' : 'text-slate-600'}`}>{item.name}</h4>
                                            <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">{item.category}</p>
                                        </div>
                                        <ChevronRight size={16} className={`transition-all ${selectedId === item.id ? 'opacity-100 translate-x-0 text-[#0F5F58]' : 'opacity-0 -translate-x-2'}`} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT PANEL: Details */}
                        <div className="lg:col-span-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selected.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden"
                                >
                                    {/* Feature Image Grid */}
                                    <div className="grid md:grid-cols-2 h-72 md:h-[400px] gap-1 p-1 bg-slate-100">
                                        <div className="relative overflow-hidden group">
                                            <img src={selected.gallery[0]} alt="Activity" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                            <div className="absolute bottom-6 left-6 text-white">
                                                <div className="flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-bold uppercase tracking-widest border border-white/30">
                                                    <ImageIcon size={12} /> Main Gallery
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden md:grid grid-rows-2 gap-1">
                                            <img src={selected.gallery[1]} alt="Sub" className="w-full h-full object-cover" />
                                            <div className="bg-[#0F5F58] flex flex-col justify-center p-8 text-white relative overflow-hidden">
                                                <Star className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 rotate-12" />
                                                <h3 className="text-2xl font-black italic leading-tight relative z-10">WHERE PASSION <br/> MEETS SKILLS.</h3>
                                                <p className="text-xs mt-2 opacity-80 font-medium tracking-wide relative z-10 uppercase">Join Metland Extracurricular</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Info */}
                                    <div className="p-8 md:p-14">
                                        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12 pb-10 border-b border-slate-100">
                                            <div className="space-y-3">
                                                <div className="inline-flex items-center gap-2 text-teal-600 font-black text-[10px] uppercase tracking-[0.3em]">
                                                    <Target size={14} className="animate-pulse" /> {selected.category} Division
                                                </div>
                                                <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">{selected.name}</h2>
                                                <div className="flex flex-wrap gap-4 text-slate-400 text-[10px] font-bold uppercase tracking-wider italic">
                                                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-[#0F5F58]"/> Schedule: 3x / Week</span>
                                                    <span className="flex items-center gap-1.5"><Users size={14} className="text-[#0F5F58]"/> 30+ Total Members</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center">
                                                <button className="w-full md:w-auto px-10 py-5 bg-[#0F5F58] hover:bg-[#0A443E] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-teal-900/20 active:scale-95">
                                                    Click to Join
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-12 gap-12">
                                            {/* Text Description */}
                                            <div className="md:col-span-7 space-y-10">
                                                <div>
                                                    <h5 className="flex items-center gap-2 font-black text-[#0F5F58] uppercase tracking-tighter mb-4 text-sm">
                                                        <Info size={18} /> Overview
                                                    </h5>
                                                    <p className="text-slate-500 text-lg leading-relaxed italic mb-6">"{selected.desc}"</p>
                                                    <div className="p-6 bg-slate-50 rounded-3xl border-l-4 border-[#0F5F58]">
                                                        <p className="text-slate-600 text-sm leading-relaxed">{selected.details}</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h5 className="font-black text-slate-900 uppercase tracking-tighter mb-4 text-xs">Core Skills You'll Learn:</h5>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selected.skills?.map(skill => (
                                                            <span key={skill} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-[10px] font-bold rounded-xl shadow-sm">
                                                                #{skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Achievement & Mini Gallery */}
                                            <div className="md:col-span-5 space-y-8">
                                                <div className="p-8 bg-[#F1F9F8] rounded-[2rem] border border-teal-100 relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                                        <Award size={64} className="text-teal-900" />
                                                    </div>
                                                    <h5 className="flex items-center gap-2 font-black text-teal-800 uppercase tracking-tighter mb-6 text-sm">
                                                        <Award size={18} /> Our Pride
                                                    </h5>
                                                    <ul className="space-y-4">
                                                        {selected.achievements.map((item, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-sm font-bold text-teal-900 leading-tight">
                                                                <CheckCircle size={18} className="text-teal-500 shrink-0" />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                                                        <ImageIcon size={14} /> Snapshots
                                                    </p>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        {selected.gallery.map((img, i) => (
                                                            <div key={i} className="aspect-square rounded-xl overflow-hidden hover:ring-2 ring-[#0F5F58] ring-offset-2 transition-all cursor-zoom-in">
                                                                <img src={img} alt="thumb" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </main>
            </div>
        </MainLayout>
    );
};

export default ExtracurricularPage;