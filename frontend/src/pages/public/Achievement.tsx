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
    fetchPublicAchievements,
    AchievementData,
} from "@/services/Achievement";

const Achievement = () => {
    const { t, language } = useLanguage();

    const [achievements, setAchievements] = useState<AchievementData[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedCategory, setSelectedCategory] =
        useState("All");

    const [search, setSearch] = useState("");

   useEffect(() => {
    const loadAchievements = async () => {
        try {
            setLoading(true);

            const data = await fetchPublicAchievements();

            console.log("Achievement API:", data);

            const sorted = [...data].sort((a, b) => b.year - a.year);

            setAchievements(sorted);
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
                height="h-[70vh]"
            />

            {/* Latest Achievement */}

            <section className="pb-12 bg-background">

                <div className="container mx-auto px-4">

                    <ScrollReveal>

                        <h2 className="mb-8 text-3xl font-bold mt-8">

                            Prestasi Terbaru

                        </h2>

                    </ScrollReveal>

                    <div className="space-y-4">

                        {latestAchievements.map((item) => (

                            <ScrollReveal
                                key={item.id}
                            >

                                <Link
                                    to={`/achievement-detail/${item.id}`}
                                    className="flex items-center gap-5 rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-lg"
                                >

                                    <img
                                        src={
                                            item.image_url
                                        }
                                        className="h-24 w-24 rounded-full object-cover"
                                    />

                                    <div className="flex-1">

                                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                            {item.category}
                                        </span>

                                        <h3 className="mt-2 text-xl font-bold">
                                            {
                                                item.holder_name
                                            }
                                        </h3>
                                        <p className="line-clamp-2 text-sm text-muted-foreground">
                                            {
                                                item.description
                                            }
                                        </p>
                                    </div>
                                    <ArrowRight />
                                </Link>
                            </ScrollReveal>

                        ))}

                    </div>

                </div>

            </section>

                        {/* ================= Statistics ================= */}

            <section className="py-16 bg-section">

                <div className="container mx-auto px-4">

                    <ScrollReveal>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                            <div className="rounded-3xl bg-white p-8 shadow-lg text-center">
                                <h2 className="text-5xl font-black text-primary">
                                    {achievements.length}+
                                </h2>
                                <p className="mt-3 text-muted-foreground">
                                    Total Achievements
                                </p>
                            </div>

                            <div className="rounded-3xl bg-white p-8 shadow-lg text-center">
                                <h2 className="text-5xl font-black text-primary">
                                    {
                                        achievements.filter(
                                            a =>
                                                a.category
                                                    .toLowerCase()
                                                    .includes("international")
                                        ).length
                                    }
                                </h2>
                                <p className="mt-3 text-muted-foreground">
                                    International
                                </p>
                            </div>

                            <div className="rounded-3xl bg-white p-8 shadow-lg text-center">
                                <h2 className="text-5xl font-black text-primary">
                                    {
                                        achievements.filter(
                                            a =>
                                                a.category
                                                    .toLowerCase()
                                                    .includes("national")
                                        ).length
                                    }
                                </h2>
                                <p className="mt-3 text-muted-foreground">
                                    National
                                </p>
                            </div>

                            <div className="rounded-3xl bg-white p-8 shadow-lg text-center">
                                <h2 className="text-5xl font-black text-primary">
                                    {categories.length - 1}
                                </h2>
                                <p className="mt-3 text-muted-foreground">
                                    Categories
                                </p>
                            </div>

                        </div>

                    </ScrollReveal>

                </div>

            </section>

            {/* ================= Search + Filter ================= */}

            <section className="py-16 bg-background">

                <div className="container mx-auto px-4">

                    <ScrollReveal>
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                            <div>
                                <h2 className="mt-6 text-4xl font-black text-[#0F5F58]">
                                    Semua Prestasi
                                </h2>
                                <p className="mt-2 text-muted-foreground">
                                    Browse all student achievements.
                                </p>
                            </div>
                            <div className="relative w-full lg:w-96">
                                <Search
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={18}
                                />
                                <input
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search achievement..."
                                    className="w-full rounded-2xl border bg-white py-4 pl-12 pr-4 outline-none transition focus:border-primary"
                                />

                            </div>

                        </div>

                    </ScrollReveal>

                    <ScrollReveal delay={0.15}>

                        <div className="mt-8 flex flex-wrap gap-3">

                            {categories.map((category) => (

                                <button
                                    key={category}
                                    onClick={() =>
                                        setSelectedCategory(category)
                                    }
                                    className={`rounded-full px-6 py-3 font-semibold transition

                                    ${
                                        selectedCategory === category
                                            ? "bg-primary text-white shadow-lg"
                                            : "bg-white border hover:border-primary"
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

            <section className="pb-24 bg-background">

                <div className="container mx-auto px-4">

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                        {filteredAchievements.map((item, index) => (

                            <ScrollReveal
                                key={item.id}
                                delay={index * 0.08}
                            >

                                <div className="group h-full overflow-hidden rounded-[2rem] bg-gradient-to-t from-white via-[#E2F0F9]/30 to-[#E2F0F9] shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

                                    <div className="flex justify-center pt-10">

                                        <img
                                            src={item.image_url}
                                            alt={item.holder_name}
                                            className="h-40 w-40 rounded-full border-4 border-white object-cover shadow-xl"
                                            onError={(e) => {
                                                e.currentTarget.src =
                                                    "https://placehold.co/400x400?text=🏆";
                                            }}
                                        />

                                    </div>

                                    <div className="p-8">

                                        <span className="inline-block rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider shadow">

                                            {item.category}

                                        </span>

                                        <h3 className="mt-5 text-2xl font-black text-[#0F5F58]">

                                            {item.holder_name}

                                        </h3>

                                        <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-slate-600">

                                            {item.description}

                                        </p>

                                        <div className="mt-8 flex items-center justify-between">

                                            <div className="flex items-center gap-2 text-sm text-slate-500">

                                                <Calendar size={16} />

                                                {item.year}

                                            </div>

                                            <Link
                                                to={`/achievement-detail/${item.id}`}
                                                className="inline-flex items-center gap-2 font-bold text-primary transition hover:gap-3"
                                            >

                                                {t(
                                                    "achievements.learn_more"
                                                )}

                                                <ArrowRight
                                                    size={18}
                                                />

                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            </ScrollReveal>

                        ))}

                    </div>

                    {filteredAchievements.length === 0 && (

                        <div className="py-20 text-center text-muted-foreground">

                            No achievements found.

                        </div>

                    )}

                </div>

            </section>

        </MainLayout>
    );
};

export default Achievement;