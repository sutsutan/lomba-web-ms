import { useState, useEffect } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { newsService, NewsData } from '@/services/News';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';

const FALLBACK_NEWS: NewsData[] = [
  {
    id: 1,
    title_id: 'SMK Pariwisata Metland Meraih Juara 1 Lomba Kompetensi Siswa Nasional',
    category: 'Achievement',
    published_date: '2026-03-15',
    is_published: true,
    thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
    content_id: 'Siswa SMK Pariwisata Metland kembali mengukir prestasi gemilang dalam ajang Lomba Kompetensi Siswa (LKS) tingkat nasional bidang Hospitality & Culinary Arts.',
    excerpt_id: 'Siswa SMK Pariwisata Metland kembali mengukir prestasi gemilang dalam ajang Lomba Kompetensi Siswa (LKS) tingkat nasional bidang Hospitality & Culinary Arts.'
  },
  {
    id: 2,
    title_id: 'Kunjungan Industri & Workshop Bersama Hotel Bintang 5 Jakarta',
    category: 'Industrial Visit',
    published_date: '2026-03-10',
    is_published: true,
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop',
    content_id: 'Siswa jurusan Perhotelan dan Tata Boga mengikuti sesi pembelajaran langsung dari praktisi profesional industri perhotelan bintang lima.',
    excerpt_id: 'Siswa jurusan Perhotelan dan Tata Boga mengikuti sesi pembelajaran langsung dari praktisi profesional industri.'
  },
  {
    id: 3,
    title_id: 'Pembukaan Pendaftaran PPDB Gelombang II Tahun Ajaran 2026/2027',
    category: 'Admission',
    published_date: '2026-03-01',
    is_published: true,
    thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop',
    content_id: 'SMK Pariwisata Metland secara resmi membuka pendaftaran peserta didik baru gelombang II dengan berbagai program beasiswa prestasi.',
    excerpt_id: 'SMK Pariwisata Metland secara resmi membuka pendaftaran peserta didik baru gelombang II dengan beasiswa prestasi.'
  },
  {
    id: 4,
    title_id: 'Festival Kuliner Nusantara & Gelar Karya Siswa Metland 2026',
    category: 'Event',
    published_date: '2026-02-20',
    is_published: true,
    thumbnail: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop',
    content_id: 'Acara tahunan pameran karya kreasi kuliner dan pertunjukan seni budaya siswa-siswi SMK Pariwisata Metland berlangsung meriah.',
    excerpt_id: 'Acara tahunan pameran karya kreasi kuliner dan pertunjukan seni budaya siswa-siswi SMK Pariwisata Metland.'
  }
];

const NewsPreview = () => {
  const { t } = useLanguage();
  const [newsList, setNewsList] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await newsService.getAll(true);
        if (data && data.length > 0) {
          const sortedNews = [...data].sort(
            (a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime()
          );
          setNewsList(sortedNews);
        } else {
          setNewsList(FALLBACK_NEWS);
        }
      } catch (error) {
        console.error('Gagal mendapatkan berita:', error);
        setNewsList(FALLBACK_NEWS);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString(
      t('nav.lang_code') === 'ID' ? 'id-ID' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };

  const stripHtml = (html: string) => {
    if (!html) return '';
    const text = html.replace(/<[^>]*>/g, '');
    return text.replace(/\s+/g, ' ').trim();
  };

  if (loading) {
    return (
      <section className="section-padding bg-background overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <div className="h-8 w-48 bg-slate-200 animate-pulse mx-auto rounded-lg mb-4" />
        </div>
      </section>
    );
  }

  const featured = newsList[0] || FALLBACK_NEWS[0];
  const sideNews = newsList.slice(1, 4).length > 0 ? newsList.slice(1, 4) : FALLBACK_NEWS.slice(1, 4);

  return (
    <section className="section-padding bg-background overflow-hidden relative">
      {/* Header */}
      <div className="container mx-auto mb-12 px-6 text-center md:px-16 lg:px-24">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-xs font-bold text-[#0F5F58] mb-3 border border-teal-100">
            <Newspaper className="w-4 h-4" />
            <span>METLAND NEWS & UPDATES</span>
          </div>
          <h2 className="text-3xl font-black text-[#0F5F58] md:text-5xl">{t('more.news.title')}</h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-teal-500/20" />
        </ScrollReveal>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Main Featured News Card (Matching Reference Design) */}
        <ScrollReveal delay={0.2} className="mb-8 md:mb-10">
          <div className="grid md:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left Side: Big Image + Date & Excerpt underneath */}
            <div className="md:col-span-6 flex flex-col gap-2.5">
              <div className="relative h-[240px] sm:h-[300px] md:h-[320px] lg:h-[350px] w-full overflow-hidden rounded-3xl shadow-lg border border-slate-100 group">
                <img
                  src={featured.thumbnail || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800"}
                  alt={featured.title_id}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-[#0F5F58] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                    {featured.category}
                  </span>
                </div>
              </div>
              {/* Date & Excerpt below image */}
              <div className="px-1 pt-0.5">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-800 mb-0.5">
                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                  <span>{formatDate(featured.published_date)}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {featured.excerpt_id ? featured.excerpt_id : stripHtml(featured.content_id)}
                </p>
              </div>
            </div>

            {/* Right Side: Header Tagline, Title, Content, Read More Button */}
            <div className="md:col-span-6 flex flex-col items-start justify-start pt-1 md:pt-2 md:pl-2">
              <p className="text-xs font-semibold text-teal-600 tracking-wide italic mb-2">
                Stay updated with our latest announcements and events
              </p>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight text-[#0F5F58] mb-3">
                {featured.title_id}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-5 mb-4">
                {featured.excerpt_id ? featured.excerpt_id : stripHtml(featured.content_id)}
              </p>

              <div>
                <Link
                  to={`/more-news/${featured.id}`}
                  className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-white bg-[#0F5F58] hover:bg-[#0b4b45] px-7 py-3 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* Small Horizontal Cards for Other News */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#0F5F58] border-l-4 border-teal-500 pl-3">
              Berita Lainnya
            </h3>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar">
            {sideNews.map((item, idx) => (
              <ScrollReveal key={item.id || idx} delay={0.2 + idx * 0.1}>
                <Link
                  to={`/more-news/${item.id}`}
                  className="group relative block w-[260px] sm:w-[280px] h-[180px] sm:h-[200px] flex-shrink-0 overflow-hidden rounded-2xl shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Full Background Image */}
                  <img
                    src={item.thumbnail || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600"}
                    alt={item.title_id}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                  {/* Content Overlay at Bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col gap-1">
                    {/* Category Badge */}
                    <span className="self-start rounded-md bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white border border-white/20">
                      {item.category}
                    </span>

                    {/* Title */}
                    <h4 className="text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-teal-200 transition-colors">
                      {item.title_id}
                    </h4>

                    {/* Excerpt */}
                    <p className="text-[10px] text-slate-300 line-clamp-1 leading-relaxed">
                      {item.excerpt_id ? item.excerpt_id : stripHtml(item.content_id)}
                    </p>

                    {/* Date */}
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(item.published_date)}</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <ScrollReveal delay={0.4}>
          <div className="mt-8 text-center">
            <Link
              to="/news"
              className="inline-flex items-center gap-3 rounded-full bg-[#0F5F58] px-8 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:bg-[#0b4b45] hover:shadow-xl active:scale-95"
            >
              <span>Lihat Semua Berita</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default NewsPreview;