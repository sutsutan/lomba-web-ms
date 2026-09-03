import { useEffect, useMemo, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import HeroCarousel from "@/components/HeroCarousel";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    Trophy,
    ArrowRight,
    Calendar,
    Search,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
    AchievementSummary,
    fetchAchievementSummary,
    fetchPublicAchievements,
    AchievementData,
} from "@/services/Achievement";

const Achievement = () => {
    const { t, language } = useLanguage();

    const [achievements, setAchievements] = useState<AchievementData[]>([]);
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState<AchievementSummary>({ total: 0, international: 0, national: 0, categories: 0 });


    const [selectedCategory, setSelectedCategory] =
        useState("All");

    const [search, setSearch] = useState("");

 useEffect(() => {
    const loadAchievements = async () => {
        try {
            setLoading(true);
            const [data, summaryData] = await Promise.all([
                fetchPublicAchievements(),
                fetchAchievementSummary(),
            ]);
            const sorted = [...data].sort((a, b) => b.year - a.year);
            setAchievements(sorted);
            setSummary(summaryData);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    loadAchievements();
}, []);


    const categories = useMemo(() => {
        const unique = [
            ...new Set(
                achievements.map((a) => a.category)
            ),
        ];

        return ["All", ...unique];
    }, [achievements]);

   const latestAchievements = useMemo(() => {
    return achievements.slice(0, 3);
}, [achievements]);

   const filteredAchievements = useMemo(() => {
    let result = [...achievements];

    if (selectedCategory !== "All") {
        result = result.filter(
            item => item.category === selectedCategory
        );
    }

    if (search.trim()) {
        const keyword = search.toLowerCase();

        result = result.filter(item =>
            [
                item.title,
                item.holder_name,
                item.competition,
                item.category,
                item.description,
                item.organizer,
                item.level,
                item.medal,
            ]
                .join(" ")
                .toLowerCase()
                .includes(keyword)
        );
    }

    return result;
}, [
    achievements,
    selectedCategory,
    search,
]);

    if (loading) {
        return (
            <MainLayout>
                <div className="flex min-h-[80vh] items-center justify-center text-primary font-medium">
                    Memuat data prestasi...
                </div>
            </MainLayout>
        );
    }
    
if (achievements.length === 0) {
        return (
            <MainLayout>
                <HeroCarousel
                    category="achievement"
                    lang={language}
                    height="h-[40vh]"
                />

                <div className="py-24 text-center text-gray-400">
                    Belum ada data prestasi.
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>

            <HeroCarousel
                category="achievement"
                lang={language}
                height="h-[60vh] md:h-[70vh]"
            />

            {/* ================= Latest Achievements ================= */}
            <section className="py-12 bg-slate-50/50">
                <div className="container mx-auto px-6 lg:px-16">
                    <ScrollReveal>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0F5F58] text-white shadow-md">
                                <Trophy className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black text-[#0F5F58]">
                                    Prestasi Terbaru
                                </h2>
                                <p className="text-xs md:text-sm text-slate-500">Pencapaian membanggakan siswa-siswi terbaik SMK Pariwisata Metland</p>
                            </div>
                        </div>
                    </ScrollReveal>

                    <div className="grid gap-6 md:grid-cols-3">
                        {latestAchievements.map((item, idx) => (
                            <ScrollReveal key={item.id} delay={idx * 0.1}>
                                <Link
                                    to={`/achievement-detail/${item.id}`}
                                    className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white p-6 shadow-md border border-slate-100 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:border-teal-200 h-full"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-teal-500/20 p-1 bg-gradient-to-tr from-teal-500 to-emerald-400">
                                            <img
                                                src={item.image_url}
                                                alt={item.holder_name}
                                                className="h-full w-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                onError={(e) => {
                                                    e.currentTarget.src = "https://placehold.co/400x400?text=🏆";
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-[11px] font-bold text-[#0F5F58] uppercase tracking-wider border border-teal-100 mb-2">
                                                {item.category}
                                            </span>
                                            <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-[#0F5F58] transition-colors">
                                                {item.holder_name}
                                            </h3>
                                            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                                                <Calendar className="h-3.5 w-3.5 text-teal-600" />
                                                <span>{item.year}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <p className="mt-4 text-xs text-slate-600 leading-relaxed line-clamp-2">
                                        {item.description}
                                    </p>

                                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0F5F58]">
                                        <span>Lihat Detail</span>
                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-50 transition-transform group-hover:translate-x-1 group-hover:bg-[#0F5F58] group-hover:text-white">
                                            <ArrowRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= Search + Filter ================= */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-6 lg:px-16">
                    <ScrollReveal>
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            <div>
                                <h2 className="text-3xl font-black text-[#0F5F58]">
                                    Semua Prestasi
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Jelajahi seluruh jejak prestasi dan kebanggaan sekolah
                                </p>
                            </div>
                            <div className="relative w-full lg:w-96">
                                <Search
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={18}
                                />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari nama, lomba, atau bidang..."
                                    className="w-full rounded-full border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-[#0F5F58] focus:bg-white focus:ring-2 focus:ring-teal-500/20"
                                />
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.15}>
                        <div className="mt-8 flex flex-wrap gap-2.5">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 ${
                                        selectedCategory === category
                                            ? "bg-[#0F5F58] text-white shadow-md shadow-teal-900/20"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ================= Grid Achievement ================= */}
            <section className="pb-24 bg-white">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredAchievements.map((item, index) => (
                            <ScrollReveal key={item.id} delay={index * 0.06}>
                                <div className="group h-full flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-t from-white via-slate-50/50 to-teal-50/30 p-6 shadow-md border border-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-teal-200">
                                    <div>
                                        <div className="flex justify-center pt-4 pb-6">
                                            <div className="relative">
                                                <div className="absolute inset-0 rounded-full bg-teal-500/20 blur-lg transition-all duration-500 group-hover:scale-125" />
                                                <img
                                                    src={item.image_url}
                                                    alt={item.holder_name}
                                                    className="relative h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg transition-transform duration-500 group-hover:scale-105"
                                                    onError={(e) => {
                                                        e.currentTarget.src = "https://placehold.co/400x400?text=🏆";
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <span className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0F5F58] shadow-sm border border-slate-100">
                                                {item.category}
                                            </span>

                                            <h3 className="mt-4 text-xl font-black text-slate-900 group-hover:text-[#0F5F58] transition-colors">
                                                {item.holder_name}
                                            </h3>

                                            <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-slate-600">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-4 border-t border-slate-100/80 flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                                            <Calendar size={14} className="text-teal-600" />
                                            <span>{item.year}</span>
                                        </div>

                                        <Link
                                            to={`/achievement-detail/${item.id}`}
                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F5F58] transition-all hover:gap-2.5 hover:text-teal-600"
                                        >
                                            <span>{t("achievements.learn_more")}</span>
                                            <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    {filteredAchievements.length === 0 && (
                        <div className="py-20 text-center text-slate-400">
                            Tidak ada data prestasi yang ditemukan.
                        </div>
                    )}
                </div>
            </section>

        </MainLayout>
    );
};

export default Achievement;