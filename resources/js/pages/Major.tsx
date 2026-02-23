import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import MainLayout from '@/layouts/MainLayout';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    Briefcase,
    Building2,
    Calculator,
    CheckCircle2,
    Code,
    Hotel,
    Maximize2,
    Palette,
    Users,
    Utensils,
    X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

// Assets
import accounting from '@/assets/akuntansi.webp';
import hospitality from '@/assets/aph.webp';
import dkv from '@/assets/dkv.webp';
import culinary from '@/assets/kuliner.webp';
import LogoMetland from '@/assets/metland.png';
import pplg from '@/assets/pepleg.webp';

const majorsData = [
    {
        id: 'hospitality',
        image: hospitality,
        themeColor: '#12606A',
        bgGradient: 'from-teal-600 to-emerald-700',
        icon: <Hotel className="h-6 w-6" />,
        stats: { students: '450+', partners: '30+', duration: '3' },
        gallery: [
            {
                image: '/images/gallery/hospitality-1.jpg',
            },
            {
                image: '/images/gallery/hospitality-1.jpg',
            },
            {
                image: '/images/gallery/hospitality-1.jpg',
            },
            {
                image: '/images/gallery/hospitality-1.jpg',
            },
        ],
    },
    {
        id: 'culinary',
        image: culinary,
        themeColor: '#12606A',
        bgGradient: 'from-orange-500 to-amber-600',
        icon: <Utensils className="h-6 w-6" />,
        stats: { students: '410+', partners: '20+', duration: '3' },
        gallery: [
            {
                image: '/images/gallery/culinary-1.jpg',
            },
            {
                image: '/images/gallery/culinary-2.jpg',
            },
        ],
    },
    {
        id: 'accounting',
        image: accounting,
        themeColor: '#12606A',
        bgGradient: 'from-blue-600 to-indigo-700',
        icon: <Calculator className="h-6 w-6" />,
        stats: { students: '350+', partners: '25+', duration: '3' },
        gallery: [
            {
                image: '/images/gallery/accounting-1.jpg',
            },
        ],
    },
    {
        id: 'dkv',
        image: dkv,
        themeColor: '#12606A',
        bgGradient: 'from-pink-600 to-rose-700',
        icon: <Palette className="h-6 w-6" />,
        stats: { students: '480+', partners: '35+', duration: '3' },
        gallery: [
            {
                image: '/images/gallery/dkv-1.jpg',
            },
        ],
    },
    {
        id: 'pplg',
        image: pplg,
        themeColor: '#12606A',
        bgGradient: 'from-purple-600 to-violet-700',
        icon: <Code className="h-6 w-6" />,
        stats: { students: '520+', partners: '40+', duration: '3' },
        gallery: [
            {
                image: '/images/gallery/pplg-1.jpg',
            },
            {
                image: '/images/gallery/hospitality-1.jpg',
            },
            {
                image: '/images/gallery/hospitality-1.jpg',
            },
            {
                image: '/images/gallery/hospitality-1.jpg',
            },
            {
                image: '/images/gallery/hospitality-1.jpg',
            },
        ],
    },
];

interface FacilityItem {
    image: string;
}

interface MajorData {
    id: string;
    facilities: FacilityItem[];
    bgGradient: string;
}

const Major = () => {
    const [index, setIndex] = useState(0);
    const { t } = useLanguage();
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    const currentStatic = (majorsData as any)[index];
    const id = currentStatic.id;

    const getList = (key: string) =>
        t(key)
            .split(',')
            .map((item) => item.trim());

    const currentData = useMemo(() => {
        return {
            ...currentStatic,
            title: t(`${id}_title`),
            subtitle: t(`${id}_subtitle`),
            description: t(`${id}_desc`),
            detailedInfo: t(`${id}_detailed`),
            fullDescription: t(`${id}_full`),
            competencies: getList(`${id}_comp`),
            careers: getList(`${id}_careers`),
            facilities: getList(`${id}_facilities`),
            galleryTitle: t('gallery_title') || 'Activity Gallery',
            gallerySubtitle:
                t('gallery_subtitle') ||
                'A glimpse into our vibrant activities.',
        };
    }, [index, t, id, currentStatic]);

    return (
        <MainLayout>
            {/* DYNAMIC HERO SECTION */}
            <section className="relative h-[70vh] min-h-[650px] w-full overflow-hidden bg-neutral-900">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={majorsData[index].id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                    >
                        <img
                            src={majorsData[index].image}
                            className="h-full w-full scale-105 object-cover opacity-60"
                            alt={t(`${majorsData[index].id}_title`)}
                        />
                        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/95 via-black/50 to-transparent" />
                    </motion.div>
                </AnimatePresence>

                <div className="container relative z-10 mx-auto flex h-full flex-col justify-center px-6">
                    <motion.div
                        key={majorsData[index].id + 'text'}
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="mt-20 max-w-3xl md:mt-0"
                    >
                        <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-teal-400 backdrop-blur-md">
                            {t(`${majorsData[index].id}_subtitle`)}
                        </span>
                        <h1 className="mb-6 text-6xl font-black uppercase leading-[0.9] tracking-tighter text-neutral-50 md:text-8xl">
                            {t(`${majorsData[index].id}_title`)}
                        </h1>
                        <p className="max-w-xl text-lg leading-relaxed text-neutral-300 md:text-xl">
                            {t(`${majorsData[index].id}_desc`)}
                        </p>
                    </motion.div>
                </div>

                {/* FLOATING NAVIGATOR */}
                <div className="no-scrollbar absolute bottom-10 left-0 right-0 z-30 overflow-x-auto px-6 py-4">
                    <div className="mx-auto flex min-w-max items-center justify-start gap-6 px-4 md:justify-center">
                        {majorsData.map((m, i) => (
                            <button
                                key={m.id}
                                onClick={() => setIndex(i)}
                                className={`group relative flex flex-shrink-0 flex-col items-center transition-all duration-300 ${
                                    index === i ? 'z-10' : 'hover:opacity-100'
                                }`}
                            >
                                {/* Icon Container */}
                                <div
                                    className={`rounded-2xl border bg-black/60 p-4 backdrop-blur-xl transition-all duration-500 ${
                                        index === i
                                            ? 'scale-110 border-[#12606A] shadow-[0_0_20px_rgba(18,96,106,0.5)]'
                                            : 'border-white/10 opacity-40 group-hover:opacity-100'
                                    }`}
                                    style={{
                                        color:
                                            index === i ? '#2dd4bf' : 'white',
                                    }}
                                >
                                    {m.icon}
                                </div>

                                {/* Label Text - Multi Line */}
                                <div className="mt-3 hidden h-10 w-24 items-start justify-center md:flex">
                                    <span
                                        className={`whitespace-normal text-center text-[9px] font-bold uppercase leading-tight tracking-[0.1em] text-white transition-all duration-300 lg:text-[10px] ${index === i ? 'font-black text-teal-400 opacity-100' : 'opacity-50'} `}
                                    >
                                        {t(`${m.id}_title`)}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* INTRO SECTION */}
            <section className="border-b border-neutral-100 bg-white py-12 md:py-20">
                <div className="container mx-auto px-6">
                    <ScrollReveal>
                        <div className="mb-4 flex items-center gap-4">
                            <div className="h-12 w-1.5 bg-[#12606A]" />
                            <h2 className="text-3xl font-bold uppercase tracking-tight text-[#12606A] md:text-5xl">
                                {t('academic_title')}
                            </h2>
                        </div>
                        <p className="ml-5 max-w-2xl text-lg font-medium text-[#12606A]/70">
                            {t('academic_desc')}
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* DETAIL SECTION */}
            <section className="bg-white py-24">
                <div className="container mx-auto px-6 md:px-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={majorsData[index].id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid items-start gap-16 lg:grid-cols-2"
                        >
                            {/* Image & Stats Overlay */}
                            <div className="group relative pr-8 pt-8">
                                <div className="absolute left-[-15px] top-0 z-20 h-24 w-24 border-l-4 border-t-4 border-[#12606A]" />
                                <div className="relative z-10 overflow-hidden rounded-3xl bg-neutral-100 shadow-2xl">
                                    <img
                                        src={majorsData[index].image}
                                        className="h-[400px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[400px]"
                                        alt={t(`${majorsData[index].id}_title`)}
                                    />
                                </div>
                                <div className="absolute -bottom-6 -right-4 z-20 min-w-[280px] rounded-2xl bg-[#12606A]/80 p-6 text-white shadow-xl md:-right-8 md:p-8">
                                    <div className="flex items-center justify-between gap-8">
                                        <div className="flex items-center gap-3">
                                            <Users className="h-5 w-5 opacity-60" />
                                            <div>
                                                <p className="text-2xl font-black leading-none">
                                                    {
                                                        majorsData[index].stats
                                                            .students
                                                    }
                                                </p>
                                                <p className="text-[10px] uppercase tracking-widest opacity-60">
                                                    {t('label_students')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="h-10 w-[1px] bg-white/10" />
                                        <div className="flex items-center gap-3">
                                            <Building2 className="h-5 w-5 opacity-60" />
                                            <div>
                                                <p className="text-2xl font-black leading-none">
                                                    {
                                                        majorsData[index].stats
                                                            .partners
                                                    }
                                                </p>
                                                <p className="text-[10px] uppercase tracking-widest opacity-60">
                                                    {t('label_partners')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content side */}
                            <div className="space-y-10 lg:mt-4">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-[#12606A]/60">
                                        {t('curriculum_focus')}
                                    </div>
                                    <h3 className="text-5xl font-black uppercase leading-none tracking-tighter text-[#12606A] md:text-7xl">
                                        {t(`${majorsData[index].id}_title`)}
                                    </h3>
                                    <p className="border-l-4 border-neutral-100 pl-6 text-justify text-lg italic leading-relaxed text-[#12606A]/80">
                                        "{t(`${majorsData[index].id}_detailed`)}
                                        "
                                    </p>
                                </div>

                                {/* Render Competencies as Array */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {t(`${majorsData[index].id}_comp`)
                                        .split(',')
                                        .map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="group flex items-center gap-4 rounded-2xl border border-neutral-100 bg-neutral-50 p-5 transition-all hover:border-[#12606A]/30"
                                            >
                                                <CheckCircle2
                                                    size={18}
                                                    className="text-[#12606A]"
                                                />
                                                <span className="text-sm font-bold text-[#12606A]">
                                                    {item.trim()}
                                                </span>
                                            </div>
                                        ))}
                                </div>

                                <div className="pt-6">
                                    <Link to="/ppdb">
                                        <button className="group flex w-full items-center justify-center gap-4 rounded-[2rem] bg-[#12606A] px-12 py-5 text-sm font-black uppercase tracking-widest text-white shadow-xl transition-all hover:bg-neutral-900 md:w-auto">
                                            {t('btn_register')}
                                            <ArrowRight className="transition-transform group-hover:translate-x-2" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* Explanation Section */}
            <section className="perspective-1000 bg-[#12606A]/5 py-24">
                <div className="container mx-auto px-6">
                    <div className="mx-auto max-w-5xl">
                        <ScrollReveal>
                            <motion.div className="group relative overflow-hidden rounded-[3rem] border border-neutral-100 bg-white p-8 shadow-xl md:p-16">
                                {/* Decorative Background Blur */}
                                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#12606A]/5 blur-3xl transition-colors duration-500 group-hover:bg-[#12606A]/10" />

                                <div
                                    style={{ transform: 'translateZ(50px)' }}
                                    className="relative z-10"
                                >
                                    <div className="mb-10 flex items-center gap-4">
                                        <div>
                                            <h4 className="text-2xl font-black uppercase tracking-tight text-[#12606A] md:text-3xl">
                                                {t('profile_section_title')}
                                            </h4>
                                            <div className="mt-1 h-1 w-20 bg-[#12606A]/20" />
                                        </div>
                                    </div>

                                    <div className="prose prose-teal max-w-none">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={
                                                    majorsData[index].id +
                                                    'full'
                                                }
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="space-y-6 text-justify text-lg leading-loose text-[#12606A]/80"
                                            >
                                                {t(
                                                    `${majorsData[index].id}_full`,
                                                )
                                                    .split('\n')
                                                    .map((para, i) => (
                                                        <p key={i}>{para}</p>
                                                    ))}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* Bottom Accent */}
                                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#12606A]/20 to-transparent" />
                            </motion.div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-white py-24">
                {/* Background Watermark Text */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 select-none overflow-hidden opacity-[0.03]">
                    <h2 className="whitespace-nowrap text-[20vw] font-black uppercase leading-none">
                        Future Leader • Metland • Future Leader • Metland
                    </h2>
                </div>

                <div className="container relative z-10 mx-auto px-6">
                    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
                        {/* LEFT: CAREER PATHWAYS */}
                        <div className="lg:col-span-7">
                            <ScrollReveal>
                                <div className="space-y-12">
                                    <div className="flex items-center gap-5">
                                        <div className="rounded-2xl bg-teal-50 p-4 text-[#12606A] shadow-inner">
                                            <Briefcase size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-4xl font-black uppercase tracking-tighter text-[#12606A]">
                                                {t('career_title')}
                                            </h3>
                                            <p className="font-medium text-[#12606A]/60">
                                                {t('career_subtitle')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="relative ml-10 mt-16">
                                        {/* Animated Vertical Line */}
                                        <motion.div
                                            initial={{ height: 0 }}
                                            whileInView={{ height: '100%' }}
                                            transition={{
                                                duration: 1.5,
                                                ease: 'easeInOut',
                                            }}
                                            className="absolute left-0 top-0 w-[2px] origin-top bg-gradient-to-b from-[#12606A] via-[#12606A] to-transparent"
                                        />

                                        <div className="space-y-14">
                                            {t(
                                                `${majorsData[index].id}_careers`,
                                            )
                                                .split(',')
                                                .map((job, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{
                                                            opacity: 0,
                                                            x: -30,
                                                        }}
                                                        whileInView={{
                                                            opacity: 1,
                                                            x: 0,
                                                        }}
                                                        transition={{
                                                            delay: idx * 0.2,
                                                            duration: 0.6,
                                                        }}
                                                        viewport={{
                                                            once: true,
                                                        }}
                                                        className="group relative pl-12"
                                                    >
                                                        <div className="absolute left-0 top-1/2 h-[1px] w-8 origin-left -translate-y-1/2 -rotate-[30deg] bg-[#12606A]/30 transition-colors duration-300 group-hover:bg-[#12606A]" />
                                                        <div className="absolute left-[-6px] top-1/2 z-10 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-[#12606A] bg-white shadow-sm transition-all duration-300 group-hover:bg-[#12606A]" />

                                                        <div className="flex flex-col">
                                                            <span className="mb-1 text-[10px] font-black uppercase tracking-[0.3em] text-[#12606A]/40">
                                                                {t(
                                                                    'career_stage',
                                                                )}{' '}
                                                                {idx + 1}
                                                            </span>
                                                            <p className="text-2xl font-bold tracking-tight text-[#12606A] transition-all duration-300 group-hover:translate-x-3 group-hover:text-teal-600 md:text-3xl">
                                                                {job.trim()}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* RIGHT: PARTNERSHIP & CERTIFICATION */}
                        <div className="relative lg:col-span-6 xl:col-span-5">
                            <div className="absolute -inset-4 -z-10 hidden rounded-[4rem] border border-neutral-100 lg:block" />
                            <div className="absolute -inset-8 -z-20 hidden rounded-[5rem] border border-neutral-50 lg:block" />

                            <ScrollReveal delay={0.3}>
                                <div
                                    className={`relative flex min-h-[650px] flex-col justify-between overflow-hidden rounded-[3.5rem] bg-gradient-to-br p-10 text-white md:p-14 ${majorsData[index].bgGradient} shadow-[0_40px_80px_-15px_rgba(18,96,106,0.3)] transition-all duration-500 hover:shadow-2xl`}
                                >
                                    {/* Overlay Pattern */}
                                    <div
                                        className="pointer-events-none absolute inset-0 opacity-[0.15]"
                                        style={{
                                            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                                            backgroundSize: '32px 32px',
                                        }}
                                    />

                                    <div className="relative z-10 flex h-full flex-col">
                                        <div className="flex-grow">
                                            <h4 className="mb-4 text-4xl font-black uppercase leading-[0.85] tracking-tighter md:text-5xl">
                                                {t('cert_title_1')}
                                                <br />
                                                <span className="text-teal-300">
                                                    {t('cert_title_2')}
                                                </span>
                                            </h4>

                                            <div className="mb-10 flex items-center gap-6">
                                                <span className="text-[10rem] font-black leading-none tracking-tighter text-white/95">
                                                    03
                                                </span>
                                                <div className="space-y-1 border-l-2 border-white/20 pl-6">
                                                    <p className="text-2xl font-bold uppercase leading-tight tracking-wide">
                                                        {t('cert_label_main')}
                                                    </p>
                                                    <p className="text-xs font-medium uppercase tracking-widest text-teal-100 opacity-60">
                                                        {t('cert_label_sub')}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="max-w-[340px] space-y-8">
                                                <p className="text-xl font-medium leading-relaxed text-white/90">
                                                    {t('cert_desc')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Background Branding (Watermark) */}
                                    <div className="pointer-events-none absolute -bottom-16 -right-16 rotate-[-12deg] opacity-[0.08] transition-transform duration-700 group-hover:scale-110">
                                        <img
                                            src={LogoMetland}
                                            alt="Metland Watermark"
                                            className="h-[550px] w-[550px] object-contain brightness-0 invert"
                                        />
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* CORE COMPETENCIES & FACILITIES */}
            <section className="bg-neutral-50 py-24">
                <div className="container mx-auto px-6">
                    <div className="mb-12 flex flex-col items-center">
                        <h3 className="text-center text-3xl font-black uppercase text-[#12606A] md:text-4xl">
                            {t('facilities_title')}
                        </h3>
                        <div className="mt-4 h-1.5 w-20 rounded-full bg-teal-500" />
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Iiteration from currentData.facilities (Array String) */}
                        {currentData.facilities?.map(
                            (facName: string, idx: number) => {
                                const facilityImage =
                                    currentStatic.facilities?.[idx]?.image ||
                                    '/images/placeholder-lab.jpg';

                                return (
                                    <motion.div
                                        key={`${currentData.id}-fac-${idx}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        viewport={{ once: true }}
                                        onClick={() =>
                                            setSelectedImg(facilityImage)
                                        }
                                        className="group relative h-72 cursor-pointer overflow-hidden rounded-3xl bg-[#12606A] shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                                    >
                                        <img
                                            src={facilityImage}
                                            alt={facName}
                                            className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-90"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-[#12606A]/90 via-transparent to-transparent opacity-80" />

                                        <div className="absolute bottom-0 left-0 w-full p-8">
                                            <p className="transform text-xl font-bold uppercase tracking-tight text-white transition-transform duration-500 group-hover:translate-x-2">
                                                {facName}
                                            </p>
                                            <div className="mt-2 h-1 w-0 bg-teal-400 transition-all duration-500 group-hover:w-16" />
                                        </div>

                                        <div className="absolute right-5 top-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                            <div className="rounded-full bg-white/20 p-2 backdrop-blur-md">
                                                <Maximize2
                                                    size={20}
                                                    className="text-white"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            },
                        )}
                    </div>
                </div>

                <AnimatePresence>
                    {selectedImg && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#12606A]/95 p-4 backdrop-blur-sm"
                            onClick={() => setSelectedImg(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="relative w-full max-w-5xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src={selectedImg}
                                    className="h-auto w-full rounded-2xl border-4 border-white/10 shadow-2xl"
                                    alt="Preview"
                                />
                                <button
                                    className="absolute -top-12 right-0 text-white transition-colors hover:text-teal-400"
                                    onClick={() => setSelectedImg(null)}
                                >
                                    <X size={32} />
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* GALLERY SECTION */}
            <section className="bg-white py-24">
                <div className="container mx-auto px-6">
                    <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <div>
                            <div className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-teal-600">
                                <span className="h-px w-8 bg-teal-600"></span>
                                <span>Moments & Activities</span>
                            </div>
                            <h2 className="text-4xl font-black uppercase text-[#12606A]">
                                {currentData.galleryTitle}
                            </h2>
                        </div>
                        <p className="max-w-md border-l-4 border-teal-500 pl-4 italic text-neutral-500">
                            {currentData.gallerySubtitle}
                        </p>
                    </div>

                    {/* Bento Grid Gallery */}
                    <div className="grid h-auto min-h-[600px] grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2">
                        {currentStatic.gallery?.map(
                            (item: any, idx: number) => (
                                <motion.div
                                    key={`${id}-gallery-${idx}`}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    onClick={() => setSelectedImg(item.image)}
                                    className={`group relative cursor-pointer overflow-hidden rounded-3xl bg-neutral-200 shadow-lg transition-all duration-500 hover:shadow-2xl ${
                                        idx === 0
                                            ? 'h-[400px] md:col-span-2 md:row-span-2 md:h-full'
                                            : 'h-[250px] md:h-full'
                                    }`}
                                >
                                    {/* OGradation Overlay */}
                                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

                                    {/* Main Image */}
                                    <img
                                        src={
                                            item.image ||
                                            '/images/placeholder.jpg'
                                        }
                                        alt={item.title}
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Text Content(Hover) */}
                                    <div className="absolute bottom-0 left-0 z-20 w-full translate-y-4 transform p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        <span className="mb-2 inline-block rounded-full bg-teal-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-teal-400 backdrop-blur-md">
                                            {item.category || 'Activity'}
                                        </span>
                                        <h4 className="text-xl font-bold leading-tight text-white">
                                            {item.title}
                                        </h4>
                                    </div>

                                    {/* Visual Expand */}
                                    <div className="absolute right-6 top-6 z-20 rounded-full bg-white/10 p-2 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                                        <Maximize2
                                            className="text-white"
                                            size={20}
                                        />
                                    </div>
                                </motion.div>
                            ),
                        )}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Major;
