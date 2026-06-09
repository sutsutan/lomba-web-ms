import React, { useEffect, useState } from 'react';
import HeroCarousel from '@/components/HeroCarousel';
import ScrollReveal from '@/components/ScrollReveal';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

import { organizationService, OrganizationData } from '@/services/Organization';

const TiltCard = ({ image }: { image: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
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
            <div style={{ transform: 'translateZ(50px)', transformStyle: 'preserve-3d' }} className="relative aspect-square transition-all duration-50">
                <img src={image} alt="Logo" className="h-full w-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] filter group-hover:scale-105 group-hover:drop-shadow-[0_30px_50px_rgba(0,0,0,0.25)]" />
            </div>
            <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <div className="h-32 w-32 rounded-full bg-teal-500/10 blur-[60px]" />
            </div>
        </motion.div>
    );
};

const OrganizationPage = () => {
    // 1. Perbaikan: Ambil 'language' sesuai dengan context Anda
    const { t, language } = useLanguage(); 
    
    const [organizations, setOrganizations] = useState<Record<string, OrganizationData[]>>({
        leadership: [],
        creative: [],
        discipline: [],
        wellness: []
    });
    const [loading, setLoading] = useState(true);

    // 2. Perbaikan: Fungsi helper untuk memilih bahasa
    const getDescription = (org: OrganizationData) => {
        if (language === 'en' && org.description_en) {
            return org.description_en;
        }
        return org.description_id || 'Deskripsi tidak tersedia';
    };

    useEffect(() => {
        const loadOrganizations = async () => {
            try {
                setLoading(true);
                const data = await organizationService.getAll();
                
                if (!Array.isArray(data)) throw new Error("Format data tidak valid");

                const grouped = data.reduce((acc, item) => {
                    if (item.is_active) {
                        const category = item.category.toLowerCase().trim();
                        if (acc.hasOwnProperty(category)) {
                            acc[category].push(item);
                        }
                    }
                    return acc;
                }, { leadership: [], creative: [], discipline: [], wellness: [] } as Record<string, OrganizationData[]>);

                setOrganizations(grouped);
            } catch (error) {
                console.error("Gagal memuat data organisasi:", error);
            } finally {
                setLoading(false);
            }
        };
        loadOrganizations();
    }, []);

    if (loading) {
        return (
            <MainLayout>
                <div className="flex h-screen items-center justify-center bg-white">
                    <p className="text-lg font-semibold text-teal-600 animate-pulse">Memuat data organisasi...</p>
                </div>
            </MainLayout>
        );
    }

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
                {organizations.leadership.length > 0 && (
                    <section className="overflow-hidden bg-white py-24">
                        <div className="container mx-auto px-6">
                            <ScrollReveal>
                                <div className="mb-20 flex flex-col items-center text-center">
                                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                                         {t('organization.leadership.pill')}
                                    </div>
                                    <h2 className="text-4xl font-black uppercase tracking-tighter text-[#0F5F58] md:text-6xl">
                                        {t('organization.leadership.title')}
                                    </h2>
                                </div>
                            </ScrollReveal>

                            <div className="mx-auto grid max-w-4xl gap-16 lg:grid-cols-2 lg:gap-24">
                                {organizations.leadership.map((org, index) => (
                                    <ScrollReveal key={org.name} delay={index * 0.2}>
                                        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                                            <div style={{ perspective: '1200px' }} className="mb-8">
                                                <TiltCard image={org.logo_url} />
                                            </div>
                                            <div className="space-y-4">
                                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-600">{t('category.leadership')}</span>
                                                <h3 className="text-3xl font-black tracking-tight text-slate-900">{org.name}</h3>
                                                <p className="text-xs text-slate-400 font-semibold -mt-2">Pembina: {org.advisor_name} | Ketua: {org.leader_name}</p>
                                                {/* Menggunakan fungsi helper */}
                                                <p className="max-w-sm text-base font-medium leading-relaxed text-slate-500">{getDescription(org)}</p>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Sisa section lainnya mengikuti pola yang sama untuk getDescription(org) */}
                {/* (Section Creative, Discipline, Wellness silakan gunakan pola getDescription(org) di atas) */}
                
                {/* ... (Layout lainnya tetap sama seperti kode asli Anda) ... */}
            </div>
        </MainLayout>
    );
};

export default OrganizationPage;