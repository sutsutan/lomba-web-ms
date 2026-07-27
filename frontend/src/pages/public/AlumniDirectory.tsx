import {
    useState,
    useEffect,
    useMemo,
    useCallback,
} from "react";
import MainLayout from "@/layouts/MainLayout";
import ScrollReveal from "@/components/ScrollReveal";
import {
    GraduationCap,
    Search,
    ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import api from "@/lib/api";
import { getPublicAlumniYears } from "@/services/Alumni";

import AlumniGroup from "@/components/alumni/AlumniGroup";

interface Alumni {
    id: number;
    name: string;
    grad_year: number;
    role?: string;
    location_name?: string;
    profile_picture?: string;
    testimony?: string;
    tags?: string;
}

const AlumniDirectory = () => {
    const { t } = useLanguage();

    const [alumni, setAlumni] = useState<Alumni[]>([]);
    const [availableYears, setAvailableYears] = useState<number[]>([]);

    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    const [yearFilter, setYearFilter] = useState("all");

    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    /**
     * Debounce Search
     */
    useEffect(() => {
        const timer = setTimeout(() => {
            setPage(1);
            setSearchQuery(searchInput);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput]);

    /**
     * Load Available Years
     */
    useEffect(() => {
        getPublicAlumniYears()
            .then(setAvailableYears)
            .catch(console.error);
    }, []);

    /**
     * Fetch Alumni
     */
    const fetchAlumni = useCallback(async () => {
        try {
            setLoading(true);

            const params = new URLSearchParams({
                page: page.toString(),
            });

            if (yearFilter !== "all") {
                params.append("year", yearFilter);
            }

            if (searchQuery) {
                params.append("search", searchQuery);
            }

            const res = await api.get(`/alumni?${params.toString()}`);

            const response =
                res.data.data ?? res.data;

            if (page === 1) {
                setAlumni(response);
            } else {
                setAlumni((prev) => [...prev, ...response]);
            }

            setHasMore(
                res.data.current_page < res.data.last_page
            );
        } catch (err) {
            console.error("Failed loading alumni", err);
        } finally {
            setLoading(false);
        }
    }, [page, yearFilter, searchQuery]);

    useEffect(() => {
        fetchAlumni();
    }, [fetchAlumni]);

    /**
     * Group Alumni by Graduation Year
     */
    const groupedAlumni = useMemo(() => {
        const groups = new Map<number, Alumni[]>();

        alumni.forEach((item) => {
            if (!groups.has(item.grad_year)) {
                groups.set(item.grad_year, []);
            }

            groups.get(item.grad_year)!.push(item);
        });

        return [...groups.entries()]
            .sort((a, b) => b[0] - a[0])
            .map(([year, items]) => ({
                year,
                items,
            }));
    }, [alumni]);

    const isInitialLoading = loading && page === 1;
    const isLoadingMore = loading && page > 1;

    return (
        <MainLayout>
            <div className="min-h-screen bg-slate-50">

                {/* Hero */}
                <div className="relative mb-[-4rem] overflow-hidden rounded-b-[3rem] bg-[#12606A] px-4 pb-24 pt-40 text-center">
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                            backgroundSize: "40px 40px",
                        }}
                    />

                    <ScrollReveal>
                        <div className="relative z-10">
                            <h1 className="mb-4 text-4xl font-black text-white md:text-5xl">
                                Direktori Alumni
                            </h1>

                            <p className="mx-auto max-w-2xl text-teal-50">
                                Temukan dan jalin koneksi dengan jaringan alumni sukses kami
                                yang tersebar di seluruh dunia.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>

                <div className="container relative z-20 mx-auto px-4">

                    {/* Filter */}
                    <div className="mx-auto mb-12 max-w-5xl">
                        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:flex-row">

                            {/* Search */}
                            <div className="relative w-full md:w-96">
                                <Search
                                    size={20}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="text"
                                    value={searchInput}
                                    placeholder="Cari nama alumni..."
                                    onChange={(e) =>
                                        setSearchInput(e.target.value)
                                    }
                                    className="w-full rounded-xl bg-slate-50 py-3 pl-12 pr-4 text-sm outline-none ring-0 transition-all focus:ring-2 focus:ring-[#12606A]/20"
                                />
                            </div>

                            {/* Filter Tahun */}
                            <div className="relative w-full md:w-56">
                                <select
                                    value={yearFilter}
                                    onChange={(e) => {
                                        setPage(1);
                                        setYearFilter(e.target.value);
                                    }}
                                    className="w-full cursor-pointer appearance-none rounded-xl bg-slate-50 py-3 pl-4 pr-10 text-sm font-bold text-slate-700 outline-none transition-all focus:ring-2 focus:ring-[#12606A]/20"
                                >
                                    <option value="all">
                                        Semua Tahun
                                    </option>

                                    {availableYears.map((year) => (
                                        <option
                                            key={year}
                                            value={year}
                                        >
                                            Angkatan {year}
                                        </option>
                                    ))}
                                </select>

                                <ChevronDown
                                    size={18}
                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                            </div>
                        </div>
                    </div>
                                        {/* Content */}
                    {isInitialLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-[#12606A]" />
                        </div>
                    ) : groupedAlumni.length === 0 ? (
                        <div className="py-20 text-center">
                            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
                                <GraduationCap
                                    size={32}
                                    className="text-slate-400"
                                />
                            </div>

                            <h3 className="text-xl font-bold text-slate-700">
                                Tidak ada alumni ditemukan
                            </h3>

                            <p className="mt-2 text-slate-500">
                                Coba ubah kata kunci pencarian atau filter
                                angkatan.
                            </p>
                        </div>
                    ) : (
                        <div className="mx-auto max-w-7xl space-y-10">
                            {groupedAlumni.map((group) => (
                                <AlumniGroup
                                    key={group.year}
                                    year={group.year}
                                    items={group.items}
                                />
                            ))}
                        </div>
                    )}

                    {/* Load More */}
                    {hasMore && !loading && (
                        <div className="mt-12 text-center">
                            <button
                                onClick={() =>
                                    setPage((prev) => prev + 1)
                                }
                                className="rounded-xl border-2 border-[#12606A] bg-white px-8 py-3 font-bold text-[#12606A] shadow-lg transition-all hover:-translate-y-1 hover:bg-[#12606A] hover:text-white hover:shadow-xl"
                            >
                                Muat Lebih Banyak
                            </button>
                        </div>
                    )}

                    {/* Loading More */}
                    {isLoadingMore && (
                        <div className="mt-8 flex justify-center">
                            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-[#12606A]" />
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default AlumniDirectory;