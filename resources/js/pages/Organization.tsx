import HeroCarousel from '@/components/HeroCarousel';
import ScrollReveal from '@/components/ScrollReveal';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
    ArrowRight,
    HeartPulse,
    Palette,
    ShieldCheck,
    Star,
    Zap,
} from 'lucide-react';

// Import assets
import cims from '@/assets/cims.jpeg';
import kkr from '@/assets/kkr.jpeg';
import osis from '@/assets/logo-osis.png';
import itec from '@/assets/Logo_ITEC.png';
import mahes from '@/assets/mahes.png';
import mcs from '@/assets/MCSLogo.png';
import mpk from '@/assets/mpk-logo.png';
import mse from '@/assets/mse.png';
import msp from '@/assets/msp.jpeg';
import programCulinary from '@/assets/program-culinary.webp';
import programIt from '@/assets/program-it.webp';
import rohkris from '@/assets/rohkris.png';

interface Organization {
    name: string;
    description: string;
    category: string;
    image: string;
}

const organizations: Record<string, Organization[]> = {
    leadership: [
        {
            name: 'Osis Student Council',
            description: 'The heartbeat of student life, organizing major events and representing the student voice to the school board.',
            category: 'Leadership & Governance',
            image: osis,
        },
        {
            name: 'MPK Representatives',
            description: 'The supreme student legislative body, ensuring transparency and bridging ideas between students and faculty.',
            category: 'Leadership & Governance',
            image: mpk,
        },
    ],
    creative: [
        {
            name: 'Maheswara - Maheswari',
            description: 'Preserving tradition and modern art through breathtaking dance and stage performances.',
            category: 'Performing Arts',
            image: mahes,
        },
        {
            name: 'CIMS Cinematography',
            description: 'A creative powerhouse for aspiring filmmakers, editors, and digital storytellers.',
            category: 'Media & Production',
            image: cims,
        },
        {
            name: 'MSE (Metland School of Entertainment)',
            description: 'Preserving tradition and modern art through breathtaking dance and stage performances.',
            category: 'Performing Arts',
            image: mse,
        },
        {
            name: 'CILVOK (Cileungsi Vocal)',
            description: 'Preserving tradition and modern art through breathtaking dance and stage performances.',
            category: 'Performing Arts',
            image: mahes,
        },
    ],
    discipline: [
        {
            name: 'Pramuka (Scouts)',
            description: 'Building resilience, survival skills, and a strong sense of community through outdoor adventures.',
            category: 'Outdoor Leadership',
            image: programIt,
        },
        {
            name: 'Paskibra',
            description: 'The epitome of precision and discipline, training students for national-level ceremonial excellence.',
            category: 'Ceremonial & Drill',
            image: programCulinary,
        },
    ],
    wellness: [
        {
            name: 'Rohis (Muslim Spiritual)',
            description: 'Fostering spiritual growth and moral integrity through community worship and discussion.',
            category: 'Faith & Community',
            image: programIt,
        },
        {
            name: 'Rohkris (Christiants Spiritual)',
            description: 'Fostering spiritual growth and moral integrity through community worship and discussion.',
            category: 'Faith & Community',
            image: rohkris,
        },
        {
            name: 'GIFT (Grow in Faith : Catholic)',
            description: 'Fostering spiritual growth and moral integrity through community worship and discussion.',
            category: 'Faith & Community',
            image: programIt,
        },
        {
            name: 'Rohbud (Buddhist Spiritual)',
            description: 'Fostering spiritual growth and moral integrity through community worship and discussion.',
            category: 'Faith & Community',
            image: programIt,
        },
        {
            name: 'KKR (Health Cadets)',
            description: 'Promoting healthy lifestyles and emergency response skills within the school environment.',
            category: 'Health & Safety',
            image: kkr,
        },
        {
            name: 'MCS (Metland School Care & Share)',
            description: 'Promoting compassion, community service, and social responsibility among students.',
            category: 'Community Service',
            image: mcs,
        },
        {
            name: 'CK (Culinary Kingdom)',
            description: 'A hub for technical innovation and project-based learning for the future tech industry.',
            category: 'Production & Technology',
            image: msp,
        },
        {
            name: 'ITEC (Information Technology Engineering Club)',
            description: 'A hub for technical innovation and project-based learning for the future tech industry.',
            category: 'Production & Technology',
            image: itec,
        },
        {
            name: 'MSP (Metland School Projects)',
            description: 'A hub for technical innovation and project-based learning for the future tech industry.',
            category: 'Production & Technology',
            image: msp,
        },
    ],
};

const TiltCard = ({ image }: { image: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ rotateY, rotateX, transformStyle: 'preserve-3d' }}
            className="group relative mx-auto w-full max-w-[280px] cursor-pointer"
        >
            <div style={{ transform: 'translateZ(50px)', transformStyle: 'preserve-3d' }} className="relative aspect-square transition-all duration-500">
                <img src={image} alt="Logo" className="h-full w-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] filter group-hover:scale-105 group-hover:drop-shadow-[0_30px_50px_rgba(0,0,0,0.25)]" />
            </div>
            <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <div className="h-32 w-32 rounded-full bg-teal-500/10 blur-[60px]" />
            </div>
        </motion.div>
    );
};

const OrganizationPage = () => {
    return (
        <MainLayout>
            <HeroCarousel
                title="Learning Beyond Class"
                subtitle="Student Organizations"
                description="Empowering the next generation of leaders through passion, collaboration, and real-world experience."
                height="h-[70vh]"
            />

            <div className="bg-slate-50/30">
                {/* SECTION 1: LEADERSHIP */}
                <section className="overflow-hidden bg-white py-24">
                    <div className="container mx-auto px-6">
                        <ScrollReveal>
                            <div className="mb-20 flex flex-col items-center text-center">
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                                    <Star className="h-3 w-3 text-teal-600" /> The Pillars of Metland
                                </div>
                                {/* Heading with Underline Decoration */}
                                <div className="relative inline-block">
                                    <h2 className="text-4xl font-black uppercase tracking-tighter text-[#0F5F58] md:text-6xl">
                                        Leadership
                                    </h2>
                                    <div className="absolute -bottom-2 left-0 h-1.5 w-full rounded-full bg-[#0F5F58]/20" />
                                    <div className="absolute -bottom-2 left-0 h-1.5 w-1/3 rounded-full bg-[#0F5F58]" />
                                </div>
                            </div>
                        </ScrollReveal>

                        <div className="mx-auto grid max-w-4xl gap-16 lg:grid-cols-2 lg:gap-24">
                            {organizations.leadership.map((org, index) => (
                                <ScrollReveal key={org.name} delay={index * 0.2}>
                                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                                        <div style={{ perspective: '1200px' }} className="mb-8">
                                            <TiltCard image={org.image} />
                                        </div>
                                        <div className="space-y-4">
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-600">{org.category}</span>
                                            <h3 className="text-3xl font-black tracking-tight text-slate-900">{org.name}</h3>
                                            <p className="max-w-sm text-base font-medium leading-relaxed text-slate-500">{org.description}</p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 2: CREATIVE */}
                <section className="border-y border-slate-100 bg-white py-24">
                    <div className="container mx-auto px-6">
                        <ScrollReveal>
                            <div className="mb-16 flex items-center gap-6">
                                {/* Side Line Decoration */}
                                <div className="h-[2px] w-12 bg-[#0F5F58]" />
                                <div>
                                    <div className="mb-1 flex items-center gap-2">
                                        <Palette className="h-4 w-4 text-[#0F5F58]" />
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#0F5F58]">Creative Hub</h3>
                                    </div>
                                    <h2 className="text-4xl font-black tracking-tight text-[#0F5F58]">Arts & Performances</h2>
                                </div>
                            </div>
                        </ScrollReveal>

                        <div className="grid gap-8 lg:grid-cols-2">
                            {organizations.creative.map((org, index) => (
                                <ScrollReveal key={org.name} delay={index * 0.1}>
                                    <div className="group flex flex-col gap-8 rounded-3xl border border-transparent bg-slate-50 p-8 transition-all duration-500 hover:border-[#0F5F58] hover:bg-white hover:shadow-2xl hover:shadow-[#0F5F58]/5 sm:flex-row">
                                        <div className="h-44 w-full shrink-0 overflow-hidden rounded-2xl shadow-md sm:w-44">
                                            <img src={org.image} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" alt={org.name} />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h4 className="mb-3 text-2xl font-bold italic text-slate-900 transition-colors group-hover:text-[#0F5F58]">{org.name}</h4>
                                            <p className="mb-6 text-sm leading-relaxed text-slate-500">{org.description}</p>
                                          <Link to={`/moreorg`} className="w-fit">
                                            <button className="group/btn flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#0F5F58]">
                                                Explore Gallery <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-2" />
                                            </button>
                                          </Link>
                                           
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 3: DISCIPLINE */}
                <section className="relative overflow-hidden bg-slate-900 py-24 text-white">
                    <div className="container relative z-10 mx-auto px-6">
                        <ScrollReveal>
                            <div className="mb-16 flex flex-col items-center md:items-start">
                                <div className="mb-4 flex items-center gap-3">
                                    <ShieldCheck className="h-6 w-6  text-teal-500" />
                                    <span className="text-sm font-bold uppercase tracking-[0.3em]  text-teal-500">Elite Discipline</span>
                                </div>
                                {/* Elegant Double Line Heading */}
                                <div className="flex items-center gap-4">
                                    <h2 className="text-4xl font-black tracking-tight md:text-5xl">Character & Honor</h2>
                                    <div className="hidden h-[2px] flex-1 bg-gradient-to-r from-[#0F5F58]/50 to-transparent md:block" />
                                </div>
                            </div>
                        </ScrollReveal>

                        <div className="grid gap-8 md:grid-cols-2">
                            {organizations.discipline.map((org, index) => (
                                <ScrollReveal key={org.name} delay={index * 0.1}>
                                    <div className="group flex flex-col gap-8 rounded-[2.5rem] border border-white/10 bg-white/5 p-10 backdrop-blur-md transition-all duration-500 hover:border-teal-500/30 hover:bg-white/10 md:flex-row">
                                        <div className="mx-auto flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-teal-500/20 md:mx-0">
                                            <img src={org.image} className="h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-100" alt="" />
                                        </div>
                                        <div className="text-center md:text-left">
                                            <h4 className="mb-3 text-2xl font-bold tracking-wide transition-colors group-hover:text-teal-400">{org.name}</h4>
                                            <p className="leading-relaxed text-slate-400">{org.description}</p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 4: WELLNESS */}
                <section className="bg-slate-50/50 py-24">
                    <div className="container mx-auto px-6">
                        <ScrollReveal>
                            <div className="mb-16 text-center">
                                <div className="mx-auto mb-6 w-fit rounded-2xl bg-white p-4 shadow-sm">
                                    <Zap className="h-8 w-8 fill-[#0F5F58] text-[#0F5F58]" />
                                </div>
                                {/* Centered Heading with Symmetrical Lines */}
                                <div className="flex items-center justify-center gap-6">
                                    <div className="hidden h-[1px] w-20 bg-[#0F5F58] md:block" />
                                    <h2 className="text-4xl font-black tracking-tight text-[#0F5F58]">Innovation & Wellbeing</h2>
                                    <div className="hidden h-[1px] w-20 bg-[#0F5F58] md:block" />
                                </div>
                                <p className="mt-4 text-lg text-slate-500">Nurturing the mind, soul, and future skills.</p>
                            </div>
                        </ScrollReveal>

                        <div className="grid gap-8 lg:grid-cols-3">
                            {organizations.wellness.map((org, index) => (
                                <ScrollReveal key={org.name} delay={index * 0.1}>
                                    <div className="group flex h-full flex-col rounded-[3rem] border border-slate-100 bg-white p-10 shadow-sm transition-all duration-500 hover:border-teal-100 hover:shadow-2xl hover:shadow-teal-900/5">
                                        <div className="mb-8 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 transition-colors group-hover:border-teal-500/30">
                                            <img src={org.image} alt="" className="h-full w-full scale-110 object-cover" />
                                        </div>
                                        <h4 className="mb-4 text-2xl font-black text-slate-900 transition-colors group-hover:text-[#0F5F58]">{org.name}</h4>
                                        <p className="mb-8 flex-1 leading-relaxed text-slate-500">{org.description}</p>
                                        <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                                            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">{org.category}</span>
                                            <HeartPulse className="h-5 w-5 text-teal[#0F5F58] opacity-0 transition-opacity group-hover:opacity-100" />
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
};

export default OrganizationPage;