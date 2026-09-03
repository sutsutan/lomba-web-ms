import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeroCarousel from '@/components/HeroCarousel';
import ScrollReveal from '@/components/ScrollReveal';
import MainLayout from '@/layouts/MainLayout';
import { Search, ChevronLeft, ChevronRight, Hash } from 'lucide-react';

import programAccounting from '@/assets/akuntansi.webp';
import programHospitality from '@/assets/aph.webp';
import programCulinary from '@/assets/program-culinary.webp';
import programDkv from '@/assets/program-dkv.jpg';
import programIt from '@/assets/program-it.webp';
import pepleg from '@/assets/pepleg.webp';
import pameran from '@/assets/pameran.jpg';
import culinaryScene from '@/assets/culinary-scene.jpg';
import galaDinner from '@/assets/gala-dinner.jpg';
import tefaItSoftware from '@/assets/tefa/tefa-it-software.jpg';
import tefaDkvStudio from '@/assets/tefa/tefa-dkv-studio.jpg';
import tefaHospitalityRoom from '@/assets/tefa/tefa-hospitality-room.jpg';
import tefaAccountingBank from '@/assets/tefa/tefa-accounting-bank.jpg';
import tefaAccountingTax from '@/assets/tefa/tefa-accounting-tax.jpg';
import tefaCulinaryPastry from '@/assets/tefa/tefa-culinary-pastry.jpg';

import { Calculator, Code, Hotel, Palette, Utensils, CheckCircle2, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// ─── Category Data ───────────────────────────────────────────────────
const categories = [
    {
        id: 1,
        key: 'it',
        name: 'Information Technology',
        nameId: 'Teknologi Informasi',
        icon: <Code />,
        color: '#0F5F58',
        image: programIt,
        shortName: 'PPLG/IT',
    },
    {
        id: 2,
        key: 'dkv',
        name: 'Design Communication Visual',
        nameId: 'Desain Komunikasi Visual',
        icon: <Palette />,
        color: '#0F5F58',
        image: programDkv,
        shortName: 'DKV',
    },
    {
        id: 3,
        key: 'culinary',
        name: 'Culinary',
        nameId: 'Kuliner',
        icon: <Utensils />,
        color: '#0F5F58',
        image: programCulinary,
        shortName: 'Culinary',
    },
    {
        id: 4,
        key: 'hospitality',
        name: 'Hospitality',
        nameId: 'Perhotelan',
        icon: <Hotel />,
        color: '#0F5F58',
        image: programHospitality,
        shortName: 'Hospitality',
    },
    {
        id: 5,
        key: 'accounting',
        name: 'Accounting',
        nameId: 'Akuntansi',
        icon: <Calculator />,
        color: '#0F5F58',
        image: programAccounting,
        shortName: 'Accounting',
    },
];

// ─── Static TeFa Projects ───────────────────────────────────────────
const tefaProjects = [
    // IT Projects
    { id: 1, categoryKey: 'it', student: 'Veria Raja Tunggal', class: 'XI PPLG 1', title: 'School Website Redesign', titleId: 'Redesain Website Sekolah', description: 'Complete redesign of the school website with modern UI/UX and responsive layout.', descriptionId: 'Redesain lengkap website sekolah dengan UI/UX modern dan layout responsif.', image: programIt },
    { id: 2, categoryKey: 'it', student: 'Ana Malia', class: 'XI PPLG 1', title: 'Inventory Management App', titleId: 'Aplikasi Manajemen Inventaris', description: 'Web-based inventory tracking system for school laboratory equipment.', descriptionId: 'Sistem pelacakan inventaris berbasis web untuk peralatan laboratorium sekolah.', image: programIt },
    { id: 3, categoryKey: 'it', student: 'Cutan Bawiq', class: 'XI PPLG 2', title: 'E-Learning Platform', titleId: 'Platform E-Learning', description: 'Interactive online learning platform with video streaming and quiz features.', descriptionId: 'Platform pembelajaran daring interaktif dengan fitur streaming video dan kuis.', image: programIt },

    // DKV Projects
    { id: 4, categoryKey: 'dkv', student: 'Raka Pratama', class: 'XI DKV 1', title: 'Brand Identity Package', titleId: 'Paket Identitas Merek', description: 'Complete branding for a local café including logo, menu, and social media templates.', descriptionId: 'Branding lengkap untuk kafe lokal termasuk logo, menu, dan template media sosial.', image: programDkv },
    { id: 5, categoryKey: 'dkv', student: 'Sinta Maharani', class: 'XI DKV 2', title: 'Product Photography', titleId: 'Fotografi Produk', description: 'Professional product photography for an e-commerce fashion brand.', descriptionId: 'Fotografi produk profesional untuk merek fashion e-commerce.', image: programDkv },
    { id: 6, categoryKey: 'dkv', student: 'Dimas Putra', class: 'XI DKV 1', title: 'Motion Graphics Reel', titleId: 'Reel Motion Graphics', description: 'Animated promotional video for a school event campaign.', descriptionId: 'Video promosi animasi untuk kampanye acara sekolah.', image: programDkv },

    // Culinary Projects
    { id: 7, categoryKey: 'culinary', student: 'Chef Anisa', class: 'XI Kuliner 1', title: 'Fusion Menu Development', titleId: 'Pengembangan Menu Fusi', description: 'Created a 5-course fusion menu combining Indonesian and Japanese flavors.', descriptionId: 'Membuat menu fusi 5 tahap yang menggabungkan cita rasa Indonesia dan Jepang.', image: programCulinary },
    { id: 8, categoryKey: 'culinary', student: 'Budi Santoso', class: 'XI Kuliner 2', title: 'Artisan Bread Collection', titleId: 'Koleksi Roti Artisan', description: 'Handcrafted artisan bread line for the school bakery shop.', descriptionId: 'Lini roti artisan buatan tangan untuk toko roti sekolah.', image: programCulinary },
    { id: 9, categoryKey: 'culinary', student: 'Maria Dewi', class: 'XI Kuliner 1', title: 'Catering for 200 Guests', titleId: 'Katering untuk 200 Tamu', description: 'Planned and executed a full catering service for a corporate event.', descriptionId: 'Merencanakan dan melaksanakan layanan katering penuh untuk acara korporat.', image: programCulinary },

    // Hospitality Projects
    { id: 10, categoryKey: 'hospitality', student: 'Rina Permata', class: 'XI APH 1', title: 'Guest Service Simulation', titleId: 'Simulasi Layanan Tamu', description: 'Led a complete front-office simulation including check-in, concierge, and complaint handling.', descriptionId: 'Memimpin simulasi front-office lengkap termasuk check-in, concierge, dan penanganan keluhan.', image: programHospitality },
    { id: 11, categoryKey: 'hospitality', student: 'Ahmad Fauzi', class: 'XI APH 2', title: 'Banquet Organization', titleId: 'Organisasi Jamuan', description: 'Organized a formal dinner banquet for 100 guests with full table service.', descriptionId: 'Mengorganisir jamuan makan formal untuk 100 tamu dengan layanan meja penuh.', image: programHospitality },
    { id: 12, categoryKey: 'hospitality', student: 'Putri Ayu', class: 'XI APH 1', title: 'Room Setup Excellence', titleId: 'Keunggulan Penataan Kamar', description: 'Professional room setup and housekeeping standards for mock hotel rooms.', descriptionId: 'Standar penataan kamar dan housekeeping profesional untuk kamar hotel tiruan.', image: programHospitality },

    // Accounting Projects
    { id: 13, categoryKey: 'accounting', student: 'Kevin Wijaya', class: 'XI AK 1', title: 'Cooperative Financial Report', titleId: 'Laporan Keuangan Koperasi', description: 'Complete annual financial report for the school cooperative.', descriptionId: 'Laporan keuangan tahunan lengkap untuk koperasi sekolah.', image: programAccounting },
    { id: 14, categoryKey: 'accounting', student: 'Lisa Hartono', class: 'XI AK 2', title: 'Tax Filing Practice', titleId: 'Praktik Pengisian Pajak', description: 'Prepared SPT reports and practiced tax calculation for small businesses.', descriptionId: 'Menyiapkan laporan SPT dan mempraktikkan perhitungan pajak untuk usaha kecil.', image: programAccounting },
    { id: 15, categoryKey: 'accounting', student: 'Roberto Carlos', class: 'XI AK 1', title: 'Budget Planning System', titleId: 'Sistem Perencanaan Anggaran', description: 'Developed a comprehensive budget plan for the next fiscal year.', descriptionId: 'Mengembangkan rencana anggaran komprehensif untuk tahun fiskal berikutnya.', image: programAccounting },
];

// ─── TeFa Program Facilities & Activities Mini Gallery ──────────────
const categoryGalleries: Record<string, Array<{
    id: number;
    title: string;
    titleId: string;
    subtitle: string;
    subtitleId: string;
    image: string;
}>> = {
    it: [
        {
            id: 1,
            title: 'IoT & Robotics Lab',
            titleId: 'Lab IoT & Robotika',
            subtitle: 'Applied Embedded Systems',
            subtitleId: 'Sistem Tertanam Terapan',
            image: programIt,
        },
        {
            id: 2,
            title: 'Software Dev Studio',
            titleId: 'Studio Software Dev',
            subtitle: 'Web & Mobile Production',
            subtitleId: 'Produksi Web & Mobile',
            image: tefaItSoftware,
        },
        {
            id: 3,
            title: 'IT Systems & Cloud',
            titleId: 'Sistem & Cloud IT',
            subtitle: 'Infrastructure & Networks',
            subtitleId: 'Infrastruktur & Jaringan',
            image: pepleg,
        },
    ],
    dkv: [
        {
            id: 1,
            title: 'Creative Agency',
            titleId: 'Agensi Desain Kreatif',
            subtitle: 'Brand Identity & Visuals',
            subtitleId: 'Identitas Visual & Branding',
            image: programDkv,
        },
        {
            id: 2,
            title: 'Photography Studio',
            titleId: 'Studio Fotografi',
            subtitle: 'Professional Media Lighting',
            subtitleId: 'Tata Cahaya & Media Profesional',
            image: tefaDkvStudio,
        },
        {
            id: 3,
            title: 'Creative Showcase',
            titleId: 'Pameran Karya Kreatif',
            subtitle: 'Exhibition & Portfolio',
            subtitleId: 'Portofolio & Eksibisi',
            image: pameran,
        },
    ],
    culinary: [
        {
            id: 1,
            title: 'Commercial Kitchen',
            titleId: 'Dapur Komersial',
            subtitle: 'Professional Line Cookery',
            subtitleId: 'Manajemen Dapur Profesional',
            image: programCulinary,
        },
        {
            id: 2,
            title: 'Pastry & Bakery',
            titleId: 'Workshop Pastry & Roti',
            subtitle: 'Artisan Baking Production',
            subtitleId: 'Produksi Roti & Kue Artisan',
            image: tefaCulinaryPastry,
        },
        {
            id: 3,
            title: 'Culinary Plating',
            titleId: 'Penyajian & Plating',
            subtitle: 'Fine Dining Service',
            subtitleId: 'Layanan Restoran & Tata Meja',
            image: culinaryScene,
        },
    ],
    hospitality: [
        {
            id: 1,
            title: 'Front Office Desk',
            titleId: 'Resepsionis Front Office',
            subtitle: 'Guest Services & Concierge',
            subtitleId: 'Layanan Tamu & Reservasi',
            image: programHospitality,
        },
        {
            id: 2,
            title: 'Suite Housekeeping',
            titleId: 'Housekeeping Suite',
            subtitle: 'Hotel Room Standards',
            subtitleId: 'Standar Kamar Hotel Bintang 5',
            image: tefaHospitalityRoom,
        },
        {
            id: 3,
            title: 'Banquet & Events',
            titleId: 'Layanan Jamuan Acara',
            subtitle: 'Formal Dinner Service',
            subtitleId: 'Operasional Event & Banquet',
            image: galaDinner,
        },
    ],
    accounting: [
        {
            id: 1,
            title: 'Financial Accounting',
            titleId: 'Pusat Akuntansi Keuangan',
            subtitle: 'Bookkeeping & Ledgers',
            subtitleId: 'Pembukuan & Laporan Finansial',
            image: programAccounting,
        },
        {
            id: 2,
            title: 'Mini Bank Simulation',
            titleId: 'Simulasi Mini Bank',
            subtitle: 'Live Teller & Customer Flow',
            subtitleId: 'Layanan Teller & Nasabah',
            image: tefaAccountingBank,
        },
        {
            id: 3,
            title: 'Tax & Digital Lab',
            titleId: 'Lab Pajak & Digital',
            subtitle: 'SPT Audit & Accounting Apps',
            subtitleId: 'Audit Pajak & Aplikasi Komputer',
            image: tefaAccountingTax,
        },
    ],
};

const TeFa = () => {
    const { t, language } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

    const filteredProjects = tefaProjects.filter(
        (p) => p.categoryKey === selectedCategory.key,
    );

    const currentProject = filteredProjects[currentProjectIndex];

    const currentGalleryList = categoryGalleries[selectedCategory.key] || [];
    const currentActivePhoto = currentGalleryList[activeGalleryIndex] || {
        id: 0,
        title: selectedCategory.name,
        titleId: selectedCategory.nameId,
        subtitle: selectedCategory.shortName,
        subtitleId: selectedCategory.shortName,
        image: selectedCategory.image,
    };

    const handleNext = () => {
        if (filteredProjects.length > 1) {
            setCurrentProjectIndex(
                (prev) => (prev + 1) % filteredProjects.length,
            );
        }
    };

    const handlePrev = () => {
        if (filteredProjects.length > 1) {
            setCurrentProjectIndex(
                (prev) =>
                    (prev - 1 + filteredProjects.length) %
                    filteredProjects.length,
            );
        }
    };

    // Reset project and gallery index on category change
    const handleCategoryChange = (cat: typeof categories[0]) => {
        setSelectedCategory(cat);
        setCurrentProjectIndex(0);
        setActiveGalleryIndex(0);
    };

    const getCategoryName = (cat: typeof categories[0]) =>
        language === 'id' ? cat.nameId : cat.name;

    // Programs per category
    const programKeys = [1, 2, 3];

    return (
        <MainLayout>
            {/* ─── Hero Section ─── */}
            <HeroCarousel
                category="tefa"
                lang={language}
                height="h-[60vh]"
                title={t('tefa.hero.title')}
                subtitle={t('tefa.hero.subtitle')}
                description={t('tefa.hero.desc')}
            />

            {/* ─── About TeFa Section ─── */}
            <section className="bg-background pt-12 md:pt-16 pb-6 sm:pb-10">
                <div className="container mx-auto px-4 sm:px-6 md:px-8">
                    <ScrollReveal>
                        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 pl-0 md:pl-8 lg:pl-14">
                            <div className="flex-1 w-full">
                                <div className="mb-4 flex items-center gap-3 md:gap-4">
                                    <div className="h-8 w-[2px] bg-[#12606A] sm:h-10 sm:w-[3px]" />
                                    <h2 className="text-2xl font-bold tracking-tight text-[#12606A] sm:text-3xl md:text-4xl lg:text-5xl">
                                        {t('tefa.about.title')}
                                    </h2>
                                </div>
                                <div className="space-y-4 md:space-y-6">
                                    <p className="text-sm font-medium leading-[1.8] text-[#12606A]/80 sm:text-base md:text-lg text-justify pr-0 lg:pr-6">
                                        {t('tefa.about.desc1')}
                                    </p>
                                    <p className="text-sm font-medium leading-[1.8] text-[#12606A]/80 sm:text-base md:text-lg text-justify pr-0 lg:pr-6">
                                        {t('tefa.about.desc2')}
                                    </p>
                                </div>
                            </div>
                            <div className="flex-1 w-full lg:max-w-md xl:max-w-lg mt-8 lg:mt-0">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#12606A]/20 to-transparent rounded-3xl translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6" />
                                    <img
                                        src={programAccounting}
                                        alt="Teaching Factory"
                                        className="relative w-full h-[300px] md:h-[400px] rounded-3xl shadow-xl border-4 border-white object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ─── Category Filter Section ─── */}
            <section className="bg-white pt-6 pb-12 sm:pt-8 md:pb-16 lg:pb-20">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                    <ScrollReveal>
                        <div className="mb-10 text-center md:mb-12 lg:mb-16">
                            <div className="mb-4 flex justify-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 sm:h-14 sm:w-14 md:h-16 md:w-16">
                                    <Search className="h-6 w-6 text-blue-600 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                                </div>
                            </div>
                            <h2 className="mb-2 text-xl font-bold text-[#0F5F58] sm:text-2xl md:mb-3 md:text-3xl lg:text-4xl">
                                {t('tefa.explore_title')}
                            </h2>
                            <p className="mx-auto max-w-2xl px-4 text-xs text-[#0F5F58]/70 sm:text-sm md:text-base">
                                {t('tefa.explore_desc')}
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <div className="hide-scrollbar flex justify-start gap-2 overflow-x-auto px-2 pb-4 sm:justify-center sm:gap-3 sm:px-0 md:gap-4 lg:gap-6">
                            {categories.map((cat) => (
                                <motion.button
                                    key={cat.id}
                                    onClick={() => handleCategoryChange(cat)}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-28 flex-shrink-0 rounded-lg border-2 p-3 transition-all duration-300 sm:w-36 sm:rounded-xl sm:p-4 md:w-40 md:rounded-2xl md:p-5 lg:w-48 lg:p-6 ${selectedCategory.id === cat.id
                                        ? 'border-[#0F5F58] bg-[#0F5F58] shadow-lg shadow-teal-200'
                                        : 'border-gray-200 bg-white hover:border-[#0F5F58]/30 hover:shadow-md'
                                        }`}
                                >
                                    <div className="flex flex-col items-center gap-1.5 text-center sm:gap-2 md:gap-3">
                                        <div
                                            className={`font-mono text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl ${selectedCategory.id === cat.id
                                                ? 'text-white'
                                                : 'text-[#0F5F58]'
                                                }`}
                                        >
                                            {cat.icon}
                                        </div>
                                        <div>
                                            <h3
                                                className={`mb-0.5 text-[9px] font-semibold leading-tight sm:text-[10px] md:mb-1 md:text-xs lg:text-sm ${selectedCategory.id === cat.id
                                                    ? 'text-white'
                                                    : 'text-[#0F5F58]'
                                                    }`}
                                            >
                                                {getCategoryName(cat)}
                                            </h3>
                                            <p
                                                className={`text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs ${selectedCategory.id === cat.id
                                                    ? 'text-white/80'
                                                    : 'text-[#0F5F58]/60'
                                                    }`}
                                            >
                                                {t('tefa.total_programs')}: {programKeys.length}
                                            </p>
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                        <div className="mt-4 text-center">
                            <p className="inline-flex items-center justify-center border-b border-[#0F5F58] pb-1 italic text-[#0F5F58] sm:hidden">
                                {t('tefa.swipe_info')}
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ─── Category Banner ─── */}
            <section className="bg-white relative pb-12">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedCategory.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="relative overflow-hidden rounded-[2rem] shadow-2xl h-48 sm:h-56 md:h-64 lg:h-80 xl:h-[400px] border border-gray-100 group"
                        >
                            <img
                                src={selectedCategory.image}
                                alt={getCategoryName(selectedCategory)}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-in-out group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-tr from-[#0F5F58]/80 via-[#0F5F58]/40 to-[#0F5F58]/5 backdrop-blur-[1px] transition-opacity duration-700 group-hover:opacity-90" />

                            <div className="absolute -left-32 -bottom-32 w-80 h-80 bg-[#4ade80]/20 rounded-full blur-[80px]" />
                            <div className="absolute top-10 right-10 w-48 h-48 bg-[#67e8f9]/30 rounded-full blur-[60px]" />

                            <div className="absolute inset-0 flex items-center p-6 sm:p-10 md:p-16">
                                <ScrollReveal>
                                    <div className="max-w-3xl transform transition-transform duration-700 translate-y-2 group-hover:translate-y-0">
                                        <div className="inline-flex p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md mb-4 sm:mb-6 border border-white/20 text-white shadow-lg">
                                            {selectedCategory.icon}
                                        </div>
                                        <h2 className="text-3xl font-extrabold tracking-tight text-white shadow-black/20 sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 leading-tight drop-shadow-xl">
                                            {getCategoryName(selectedCategory)}
                                        </h2>
                                        <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-emerald-400 to-transparent rounded-full" />
                                    </div>
                                </ScrollReveal>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* ─── TeFa Programs Section ─── */}
            <section className="bg-white pt-12 pb-4 md:pt-16 md:pb-8 lg:pt-20 lg:pb-10">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                    <ScrollReveal>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedCategory.id + '-programs'}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="ml-0 md:ml-6 lg:ml-12"
                            >
                                <div className="mb-4 flex items-center gap-2 md:mb-6 md:gap-3">
                                    <div className="h-10 w-1 bg-[#0F5F58] md:h-12" />
                                    <h2 className="text-xl font-bold text-[#0F5F58] sm:text-2xl md:text-3xl lg:text-4xl">
                                        {t('tefa.programs_of')} {selectedCategory.shortName}
                                    </h2>
                                </div>

                                <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 mb-10">
                                    {/* LEFT: TeFa Photo Showcase + Mini Gallery Cards */}
                                    <div className="w-full lg:w-1/2 flex flex-col">
                                        {/* Main Featured Photo */}
                                        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl border border-[#0F5F58]/15 bg-slate-900 group">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={selectedCategory.key + '-' + activeGalleryIndex}
                                                    initial={{ opacity: 0, scale: 0.97 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 1.03 }}
                                                    transition={{ duration: 0.35, ease: 'easeOut' }}
                                                    className="relative w-full h-64 sm:h-72 md:h-80 lg:h-[340px] xl:h-[380px]"
                                                >
                                                    <img
                                                        src={currentActivePhoto.image}
                                                        alt={language === 'id' ? currentActivePhoto.titleId : currentActivePhoto.title}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />
                                                </motion.div>
                                            </AnimatePresence>

                                            {/* Top Tag */}
                                            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-2">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-[#0F5F58] backdrop-blur-md shadow-md border border-[#0F5F58]/10">
                                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                    {language === 'id' ? currentActivePhoto.titleId : currentActivePhoto.title}
                                                </span>
                                            </div>

                                            {/* Bottom Caption Overlay */}
                                            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 flex items-end justify-between gap-3">
                                                <div>
                                                    <p className="text-xs sm:text-sm font-bold text-white drop-shadow">
                                                        {language === 'id' ? currentActivePhoto.titleId : currentActivePhoto.title}
                                                    </p>
                                                    <p className="text-[11px] sm:text-xs text-white/80 font-medium drop-shadow">
                                                        {language === 'id' ? currentActivePhoto.subtitleId : currentActivePhoto.subtitle}
                                                    </p>
                                                </div>
                                                <span className="px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-bold bg-black/60 backdrop-blur-md text-white/90 border border-white/20 flex-shrink-0">
                                                    {activeGalleryIndex + 1} / {currentGalleryList.length}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Mini Gallery Cards Underneath Photo */}
                                        <div className="mt-3.5 sm:mt-4">
                                            <div className="flex items-center justify-between mb-2 px-1">
                                                <span className="text-xs font-bold text-[#0F5F58] flex items-center gap-1.5">
                                                    <Sparkles className="w-3.5 h-3.5 text-[#0F5F58]" />
                                                    {t('tefa.gallery.facility_title')}
                                                </span>
                                                <span className="text-[11px] text-[#0F5F58]/70 italic hidden sm:inline">
                                                    {t('tefa.gallery.hint')}
                                                </span>
                                            </div>

                                            {/* 3 Mini Cards */}
                                            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                                                {currentGalleryList.map((item, idx) => {
                                                    const isActive = activeGalleryIndex === idx;
                                                    return (
                                                        <motion.button
                                                            key={item.id}
                                                            type="button"
                                                            onClick={() => setActiveGalleryIndex(idx)}
                                                            whileHover={{ y: -3 }}
                                                            whileTap={{ scale: 0.97 }}
                                                            className={`group relative flex flex-col p-1.5 sm:p-2 rounded-xl sm:rounded-2xl transition-all duration-200 text-left border ${
                                                                isActive
                                                                    ? 'bg-[#0F5F58]/10 border-[#0F5F58] shadow-md ring-2 ring-[#0F5F58]/30'
                                                                    : 'bg-white border-gray-200 hover:border-[#0F5F58]/40 hover:bg-slate-50'
                                                            }`}
                                                        >
                                                            <div className="relative h-14 sm:h-18 md:h-20 w-full overflow-hidden rounded-lg sm:rounded-xl">
                                                                <img
                                                                    src={item.image}
                                                                    alt={language === 'id' ? item.titleId : item.title}
                                                                    className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                                                                        isActive ? 'brightness-100' : 'brightness-90 group-hover:brightness-100'
                                                                    }`}
                                                                />
                                                                {isActive && (
                                                                    <div className="absolute inset-0 bg-[#0F5F58]/20 flex items-center justify-center">
                                                                        <span className="w-2.5 h-2.5 rounded-full bg-white shadow-md ring-2 ring-[#0F5F58]" />
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="mt-1.5 w-full">
                                                                <h4
                                                                    className={`text-[10px] sm:text-xs font-bold leading-tight truncate ${
                                                                        isActive ? 'text-[#0F5F58]' : 'text-gray-800 group-hover:text-[#0F5F58]'
                                                                    }`}
                                                                >
                                                                    {language === 'id' ? item.titleId : item.title}
                                                                </h4>
                                                                <p className="text-[9px] text-gray-500 truncate hidden sm:block mt-0.5">
                                                                    {language === 'id' ? item.subtitleId : item.subtitle}
                                                                </p>
                                                            </div>
                                                        </motion.button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* RIGHT: Category Description & Key Highlights */}
                                    <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-6 leading-[1.8] text-[#0F5F58]/80 text-justify">
                                        <div className="space-y-4 md:space-y-5">
                                            <p className="text-sm md:text-base lg:text-lg">
                                                {t(`tefa.cat.${selectedCategory.key}.intro`)}
                                            </p>
                                            <p className="text-sm md:text-base lg:text-lg">
                                                {t(`tefa.cat.${selectedCategory.key}.detail`)}
                                            </p>
                                            <p className="text-sm md:text-base lg:text-lg">
                                                {t(`tefa.cat.${selectedCategory.key}.closing`)}
                                            </p>
                                        </div>

                                        {/* Key Highlights Pill Badges */}
                                        <div className="pt-4 border-t border-[#0F5F58]/10 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0F5F58]/5 border border-[#0F5F58]/10">
                                                <CheckCircle2 className="w-4 h-4 text-[#0F5F58] flex-shrink-0" />
                                                <span className="text-xs font-semibold text-[#0F5F58]">
                                                    {t('tefa.highlights.item1')}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0F5F58]/5 border border-[#0F5F58]/10">
                                                <CheckCircle2 className="w-4 h-4 text-[#0F5F58] flex-shrink-0" />
                                                <span className="text-xs font-semibold text-[#0F5F58]">
                                                    {t('tefa.highlights.item2')}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0F5F58]/5 border border-[#0F5F58]/10">
                                                <CheckCircle2 className="w-4 h-4 text-[#0F5F58] flex-shrink-0" />
                                                <span className="text-xs font-semibold text-[#0F5F58]">
                                                    {t('tefa.highlights.item3')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Program Cards */}
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {programKeys.map((num, index) => (
                                        <ScrollReveal key={num} delay={index * 0.1} className="h-full">
                                            <motion.div
                                                whileHover={{ y: -6 }}
                                                transition={{ duration: 0.3 }}
                                                className="flex flex-col h-full rounded-xl border border-[#0F5F58]/10 bg-gradient-to-br from-[#0F5F58]/5 to-transparent p-5 sm:p-6 md:p-7 transition-shadow duration-300 hover:shadow-xl"
                                            >
                                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F5F58] text-white sm:h-12 sm:w-12 md:mb-4">
                                                    {selectedCategory.icon}
                                                </div>
                                                <h3 className="mb-2 text-sm font-bold text-[#0F5F58] sm:text-base md:text-lg">
                                                    {t(`tefa.program.${selectedCategory.key}.${num}.title`)}
                                                </h3>
                                                <p className="text-xs leading-relaxed text-[#0F5F58]/70 sm:text-sm flex-1">
                                                    {t(`tefa.program.${selectedCategory.key}.${num}.desc`)}
                                                </p>
                                            </motion.div>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </ScrollReveal>
                </div>
            </section>

            {/* ─── Project Gallery Grid Section ─── */}
            <section className="section-padding bg-background pt-8 pb-12 sm:pt-10 md:pb-16 lg:pt-12 lg:pb-20">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                    <ScrollReveal>
                        <div className="mb-2 ml-0 flex items-center gap-3 md:ml-8 md:gap-4 lg:ml-14">
                            <div className="h-8 w-[2px] bg-[#12606A] sm:h-10 sm:w-[3px]" />
                            <h2 className="text-2xl font-bold tracking-tight text-[#12606A] sm:text-3xl md:text-4xl lg:text-5xl">
                                {t('tefa.projects_title')}
                            </h2>
                        </div>
                        <p className="mb-8 ml-3 max-w-2xl text-sm font-medium text-[#12606A]/80 sm:ml-4 sm:text-base md:mb-12 md:ml-12 md:text-lg lg:ml-20">
                            {getCategoryName(selectedCategory)}
                        </p>
                    </ScrollReveal>

                    {filteredProjects.length === 0 ? (
                        <div className="py-12 text-center text-base text-[#12606A]/60 md:py-20 md:text-xl">
                            {t('tefa.no_projects')}
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedCategory.id + '-gallery'}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="grid gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-3"
                            >
                                {filteredProjects.map((project, index) => (
                                    <ScrollReveal
                                        key={project.id}
                                        delay={index * 0.1}
                                    >
                                        <motion.div
                                            whileHover={{ y: -8 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-shadow duration-300 hover:shadow-2xl md:rounded-2xl"
                                        >
                                            <div className="relative h-40 overflow-hidden sm:h-44 md:h-48 lg:h-56">
                                                <img
                                                    src={project.image}
                                                    alt={language === 'id' ? project.titleId : project.title}
                                                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                                                />
                                            </div>

                                            <div className="p-4 sm:p-5 md:p-6 mb:pb-8 flex flex-col justify-between">
                                                <div className="mb-3 flex items-center gap-2 md:mb-4 md:gap-3">
                                                    <img
                                                        src={project.image}
                                                        alt={project.student}
                                                        className="h-9 w-9 rounded-full border-2 border-gray-200 object-cover sm:h-10 sm:w-10 md:h-12 md:w-12"
                                                    />
                                                    <div>
                                                        <h4 className="text-xs font-bold text-[#0F5F58] sm:text-sm md:text-base">
                                                            {project.student}
                                                        </h4>
                                                        <p className="text-[10px] text-[#0F5F58]/60 sm:text-xs md:text-sm">
                                                            {project.class}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mt-4 flex items-center gap-1 text-[#2563eb]">
                                                    <span className="block break-all text-[12px] font-bold text-[#2563eb] sm:text-sm md:text-base">#</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </ScrollReveal>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </section>

            <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </MainLayout>
    );
};

export default TeFa;
