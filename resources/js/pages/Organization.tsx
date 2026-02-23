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
import { useLanguage } from '@/contexts/LanguageContext';

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
import rohis from '@/assets/rohis.jpeg';
import cilvok from '@/assets/cilvok.jpg';
import pramuka from '@/assets/pramuka.png';
import paskib from '@/assets/paskib.png';
import gift from '@/assets/gift.jpg';
import ck from '@/assets/ck.jpg';

interface Organization {
    name: string;
    description: string;
    category: string;
    image: string;
}

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
    const { t } = useLanguage();

    const organizations: Record<string, Organization[]> = {
        leadership: [
            {
                name: t('org.osis.name'),
                description: t('org.osis.desc'),
                category: t('category.leadership'),
                image: osis,
            },
            {
                name: t('org.mpk.name'),
                description: t('org.mpk.desc'),
                category: t('category.leadership'),
                image: mpk,
            },
        ],
        creative: [
            {
                name: t('org.mahes.name'),
                description: t('org.mahes.desc'),
                category: t('category.arts'),
                image: mahes,
            },
            {
                name: t('org.cims.name'),
                description: t('org.cims.desc'),
                category: t('category.media'),
                image: cims,
            },
            {
                name: t('org.mse.name'),
                description: t('org.mse.desc'),
                category: t('category.arts'),
                image: mse,
            },
            {
                name: t('org.cilvok.name'),
                description: t('org.cilvok.desc'),
                category: t('category.arts'),
                image: cilvok,
            },
        ],
        discipline: [
            {
                name: t('org.pramuka.name'),
                description: t('org.pramuka.desc'),
                category: t('category.outdoor'),
                image: pramuka,
            },
            {
                name: t('org.paskibra.name'),
                description: t('org.paskibra.desc'),
                category: t('category.ceremonial'),
                image: paskib,
            },
        ],
        wellness: [
            {
                name: t('org.rohis.name'),
                description: t('org.rohis.desc'),
                category: t('category.faith'),
                image: rohis,
            },
            {
                name: t('org.rohkris.name'),
                description: t('org.rohkris.desc'),
                category: t('category.faith'),
                image: rohkris,
            },
            {
                name: t('org.gift.name'),
                description: t('org.gift.desc'),
                category: t('category.faith'),
                image: gift,
            },
            {
                name: t('org.rohbud.name'),
                description: t('org.rohbud.desc'),
                category: t('category.faith'),
                image: programCulinary,
            },
            {
                name: t('org.kkr.name'),
                description: t('org.kkr.desc'),
                category: t('category.health'),
                image: kkr,
            },
            {
                name: t('org.mcs.name'),
                description: t('org.mcs.desc'),
                category: t('category.service'),
                image: mcs,
            },
            {
                name: t('org.ck.name'),
                description: t('org.ck.desc'),
                category: t('category.tech'),
                image: ck,
            },
            {
                name: t('org.itec.name'),
                description: t('org.itec.desc'),
                category: t('category.tech'),
                image: itec,
            },
            {
                name: t('org.msp.name'),
                description: t('org.msp.desc'),
                category: t('category.tech'),
                image: msp,
            },
        ],
    };

    return (
        <MainLayout>
            <HeroCarousel
                title={t('organization.hero.title')}
                subtitle={t('organization.hero.subtitle')}
                description={t('organization.hero.desc')}
                height="h-[70vh]"
            />

            <div className="bg-slate-50/30">
                {/* SECTION 1: LEADERSHIP */}
                <section className="overflow-hidden bg-white py-24">
                    <div className="container mx-auto px-6">
                        <ScrollReveal>
                            <div className="mb-20 flex flex-col items-center text-center">
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                                     {t('organization.leadership.pill')}
                                </div>
                                {/* Heading with Underline Decoration */}
                                <div className="relative inline-block">
                                    <h2 className="text-4xl font-black uppercase tracking-tighter text-[#0F5F58] md:text-6xl">
                                        {t('organization.leadership.title')}
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
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#0F5F58]">
                                            {t('organization.creative.label')}
                                        </h3>
                                    </div>
                                    <h2 className="text-4xl font-black tracking-tight text-[#0F5F58]">
                                        {t('organization.creative.title')}
                                    </h2>
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
                                                {t('organization.creative.explore')} <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-2" />
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
                                    <span className="text-sm font-bold uppercase tracking-[0.3em]  text-teal-500">
                                        {t('organization.discipline.label')}
                                    </span>
                                </div>
                                {/* Elegant Double Line Heading */}
                                <div className="flex items-center gap-4">
                                    <h2 className="text-4xl font-black tracking-tight md:text-5xl">
                                        {t('organization.discipline.title')}
                                    </h2>
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
                                </div>
                                {/* Centered Heading with Symmetrical Lines */}
                                <div className="flex items-center justify-center gap-6">
                                    <div className="hidden h-[1px] w-20 bg-[#0F5F58] md:block" />
                                    <h2 className="text-4xl font-black tracking-tight text-[#0F5F58]">
                                        {t('organization.wellness.title')}
                                    </h2>
                                    <div className="hidden h-[1px] w-20 bg-[#0F5F58] md:block" />
                                </div>
                                <p className="mt-4 text-lg text-slate-500">
                                    {t('organization.wellness.desc')}
                                </p>
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