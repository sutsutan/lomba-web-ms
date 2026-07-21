import { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import { Briefcase, MapPin, Search, GraduationCap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import api from '@/lib/api';

const AlumniDirectory = () => {
    const { t } = useLanguage();
    const [alumni, setAlumni] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [yearFilter, setYearFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    // List of years for the filter (e.g. from 2018 to current year)
    const currentYear = new Date().getFullYear();
    const years = ['all', ...Array.from({ length: 15 }, (_, i) => (currentYear - i).toString())];

    useEffect(() => {
        const fetchAlumni = async () => {
            try {
                setLoading(true);
                // Adjust query params
                const params = new URLSearchParams({
                    page: page.toString(),
                    ...(yearFilter !== 'all' && { year: yearFilter }),
                    ...(searchQuery && { search: searchQuery })
                });

                const res = await api.get(`/alumni?${params.toString()}`);
                const responseData = res.data.data || res.data;
                
                if (page === 1) {
                    setAlumni(responseData);
                } else {
                    setAlumni(prev => [...prev, ...responseData]);
                }
                
                // Check if there are more pages
                setHasMore(res.data.current_page < res.data.last_page);
            } catch (err) {
                console.error("Gagal load alumni:", err);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchAlumni();
        }, 500); // Debounce search

        return () => clearTimeout(timeoutId);
    }, [yearFilter, page, searchQuery]);

    // Reset pagination when filter changes
    useEffect(() => {
        setPage(1);
    }, [yearFilter, searchQuery]);

    return (
        <MainLayout>
            <div className="bg-slate-50 min-h-screen">
                {/* Custom dark header background so white navbar is visible */}
                <div className="bg-[#12606A] pt-40 pb-24 px-4 text-center rounded-b-[3rem] relative overflow-hidden mb-[-4rem]">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                    <ScrollReveal>
                        <div className="relative z-10">
                            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                                Direktori Alumni
                            </h1>
                            <p className="max-w-2xl mx-auto text-teal-50">
                                Temukan dan jalin koneksi dengan jaringan alumni sukses kami yang tersebar di seluruh dunia.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>

                <div className="container mx-auto px-4 relative z-20">

                    {/* Filter Section */}
                    <div className="max-w-5xl mx-auto mb-12">
                        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                            
                            {/* Search */}
                            <div className="relative w-full md:w-96 flex-shrink-0">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input 
                                    type="text" 
                                    placeholder="Cari nama alumni..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#12606A]/20 transition-all"
                                />
                            </div>

                            {/* Year Filter Pills */}
                            <div className="flex gap-2 overflow-x-auto w-full pb-2 md:pb-0 hide-scrollbar">
                                {years.slice(0, 8).map(year => (
                                    <button
                                        key={year}
                                        onClick={() => setYearFilter(year)}
                                        className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                                            yearFilter === year 
                                            ? 'bg-[#12606A] text-white shadow-md shadow-[#12606A]/20' 
                                            : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                        }`}
                                    >
                                        {year === 'all' ? 'Semua Tahun' : year}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Loading State or Grid */}
                    {loading && page === 1 ? (
                         <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#12606A]"></div>
                        </div>
                    ) : alumni.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-6">
                                <GraduationCap className="text-slate-400" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-700">Tidak ada alumni ditemukan</h3>
                            <p className="text-slate-500 mt-2">Coba sesuaikan kata kunci pencarian atau tahun kelulusan.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                            {alumni.map((item, index) => (
                                <ScrollReveal key={item.id} delay={index * 0.05}>
                                    <div className="group relative flex flex-col overflow-hidden rounded-3xl border-2 border-slate-100 bg-white p-6 transition-all duration-500 hover:border-teal-200 hover:shadow-xl hover:-translate-y-1">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="relative h-20 w-20 shrink-0">
                                                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#12606A]/30 transition-transform duration-[3000ms] group-hover:rotate-180" style={{ animationDuration: '10s' }} />
                                                <div className="absolute inset-1 overflow-hidden rounded-full bg-slate-50 shadow-inner">
                                                    <img 
                                                        src={item.profile_picture ? (item.profile_picture.startsWith('http') ? item.profile_picture : `${import.meta.env.VITE_API_URL}/storage/${item.profile_picture}`) : 'https://ui-avatars.com/api/?name=' + item.name + '&background=12606A&color=fff'} 
                                                        alt={item.name} 
                                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                                        onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${item.name}&background=12606A&color=fff` }}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-slate-800 transition-colors group-hover:text-[#12606A] line-clamp-1 border-b-2 border-transparent group-hover:border-[#12606A]/20 pb-1 inline-block">
                                                    {item.name}
                                                </h3>
                                                <span className="block mt-1 text-sm font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded inline-flex items-center gap-1 w-fit">
                                                    <GraduationCap size={14} /> Angkatan {item.grad_year}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-3 flex-grow">
                                            <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500 shrink-0">
                                                    <Briefcase size={16} />
                                                </div>
                                                <span className="line-clamp-2">{item.role || 'Alumni'}</span>
                                            </div>
                                            
                                            {item.location_name && (
                                                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-500 shrink-0">
                                                        <MapPin size={16} />
                                                    </div>
                                                    <span className="line-clamp-1">{item.location_name}</span>
                                                </div>
                                            )}
                                        </div>

                                        {item.testimony && (
                                            <div className="mt-4 pt-4 border-t border-slate-100">
                                                <blockquote className="text-sm italic text-slate-500 line-clamp-3">
                                                    "{item.testimony}"
                                                </blockquote>
                                            </div>
                                        )}
                                        
                                        {/* Tags */}
                                        {item.tags && (
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {item.tags.split(',').map((tag: string, idx: number) => (
                                                    <span key={idx} className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                                        {tag.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    )}

                    {/* Load More Button */}
                    {hasMore && !loading && (
                        <div className="mt-12 text-center">
                            <button
                                onClick={() => setPage(p => p + 1)}
                                className="px-8 py-3 rounded-xl bg-white border-2 border-[#12606A] text-[#12606A] font-bold hover:bg-[#12606A] hover:text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                Muat Lebih Banyak
                            </button>
                        </div>
                    )}
                    {loading && page > 1 && (
                        <div className="flex justify-center mt-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#12606A]"></div>
                        </div>
                    )}
                </div>
            </div>
            
            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </MainLayout>
    );
};

export default AlumniDirectory;
