// src/pages/public/NewsDetail.tsx
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import { Calendar, ArrowLeft, Share2, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroCarousel from '@/components/HeroCarousel';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import api from '@/lib/api';

import { newsService, NewsData } from '@/services/News';

const NewsDetail = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
   const [heroSlides, setHeroSlides] = useState<any[]>([]);
  const { toast } = useToast();

  const [currentNews, setCurrentNews] = useState<NewsData | null>(null);
  const [sidebarNews, setSidebarNews] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

   useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await api.get("/contact");

                const data = Array.isArray(res.data)
                    ? res.data
                    : (res.data.data || []);

                const filtered = data.filter(
                    (item: any) =>
                        item.category === "contact" &&
                        item.is_active
                );

                setHeroSlides(
                    filtered.map((item: any) => ({
                        image_url: item.image_url,
                        title: language === "id" ? item.title_id : item.title_en,
                        subtitle:
                            language === "id"
                                ? item.subtitle_id
                                : item.subtitle_en,
                    }))
                );
            } catch (err) {
                console.error("Gagal load hero:", err);
            }
        };

        fetchHero();
    }, [language]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentNews?.gallery_images) {
      setCurrentImageIndex((prev) => (prev + 1) % currentNews.gallery_images!.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentNews?.gallery_images) {
      setCurrentImageIndex((prev) => (prev - 1 + currentNews.gallery_images!.length) % currentNews.gallery_images!.length);
    }
  };

  useEffect(() => {
    const loadNewsDetails = async () => {
  if (!id) return;
  try {
    setLoading(true);
    const activeNews = await newsService.getById(id);
    console.log("Detail Berita Diterima:", activeNews); 
    setCurrentNews(activeNews);

        const allNews = await newsService.getAll(true);
        const otherNews = allNews
          .filter(n => String(n.id) !== String(id) && n.slug !== id) 
          .slice(0, 3);
        setSidebarNews(otherNews);
      } catch (error) {
        console.error("Gagal memuat detail konten berita:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNewsDetails();
  }, [id]);

  const handleShare = async () => {
    if (!currentNews) return;
    
    const shareData = {
      title: currentNews.title_id,
      text: currentNews.excerpt_id || currentNews.content_id.replace(/<[^>]*>/g, '').substring(0, 100),
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: language === 'id' ? 'Tautan disalin!' : 'Link copied!',
          description: language === 'id' 
            ? 'Tautan berita telah disalin ke papan klip Anda.' 
            : 'The news link has been copied to your clipboard.',
        });
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    }
  };

  if (loading) {
    return <MainLayout><div className="text-center py-40 text-muted-foreground font-medium">Memuat detail berita...</div></MainLayout>;
  }

  if (!currentNews) {
    return (
      <MainLayout>
         <HeroCarousel 
            category="contact" 
            lang={language}
            height="h-[60vh]"
            />

        <div className="text-center py-40 text-destructive font-medium">
          <p className="mb-4">Berita tidak ditemukan atau telah dihapus.</p>
          <Link to="/news-archive" className="text-primary hover:underline">Kembali ke Arsip</Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4">
          <Link to="/news-archive" className="inline-flex items-center gap-2 text-primary font-medium mb-8 hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" /> {language === 'id' ? 'Kembali ke Arsip' : 'Back to Archive'}
          </Link>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <main className="lg:w-2/3 w-full">
              <ScrollReveal>
                <div className="mb-6">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                    {currentNews.category}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-bold text-foreground mt-4 mb-6 leading-tight">
                    {currentNews.title_id}
                  </h1>
                  <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-y py-4 border-border">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(currentNews.published_date).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { 
                        day: 'numeric', month: 'long', year: 'numeric' 
                      })}
                    </div>
                    <button onClick={handleShare} className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors focus:outline-none">
                      <Share2 className="w-4 h-4" /> {language === 'id' ? 'Bagikan' : 'Share'}
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden mb-8 shadow-xl">
                  <img src={currentNews.thumbnail} className="w-full object-cover max-h-[500px]" alt={currentNews.title_id} />
                </div>

                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                  <div className="text-foreground font-normal text-lg mb-6" dangerouslySetInnerHTML={{ __html: currentNews.content_id }} />
                </div>
                
                {/* Photo Gallery Section */}
                {currentNews.gallery_images && currentNews.gallery_images.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-border/50">
                    <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                       {language === 'id' ? 'Galeri Foto' : 'Photo Gallery'}
                    </h3>
                    <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
                      {currentNews.gallery_images.map((img, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => openLightbox(idx)}
                          className="relative flex-none w-64 h-40 sm:w-72 sm:h-48 rounded-2xl overflow-hidden cursor-pointer group snap-center shadow-md border border-border/50"
                        >
                          <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                            <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8 drop-shadow-md scale-75 group-hover:scale-100" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ScrollReveal>
            </main>

            <aside className="lg:w-1/3 w-full space-y-8">
              <div className="p-6 bg-section rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-4">{language === 'id' ? 'Kategori Berita' : 'News Categories'}</h3>
                {/* ... (sidebar content remains same) */}
              </div>

              <div className="p-6 bg-section rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-6">{language === 'id' ? 'Berita Lainnya' : 'Other News'}</h3>
                <div className="space-y-6">
                  {sidebarNews.map((news) => (
                    <Link 
                      key={news.id} 
                      to={`/more-news/${news.slug || news.id}`} 
                      className="group flex gap-4 items-start"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-muted">
                        <img src={news.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={news.title_id} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-1">
                          {news.title_id}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                          <span className="text-primary">{news.category}</span>
                          <span>•</span>
                          <span>{new Date(news.published_date).getFullYear()}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxOpen && currentNews?.gallery_images && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center backdrop-blur-md"
            onClick={closeLightbox}
          >
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 lg:top-8 lg:right-8 text-white/50 hover:text-white bg-white/5 hover:bg-white/20 p-2 lg:p-3 rounded-full transition-all group z-50"
            >
              <X className="w-6 h-6 lg:w-8 lg:h-8 group-hover:scale-110 transition-transform" />
            </button>
            
            <button 
              onClick={prevImage}
              className="absolute left-2 sm:left-4 lg:left-8 text-white/50 hover:text-white bg-white/5 hover:bg-white/20 p-2 lg:p-4 rounded-full transition-all group z-50"
            >
              <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8 group-hover:-translate-x-1 transition-transform" />
            </button>

            <motion.img 
              key={currentImageIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={currentNews.gallery_images[currentImageIndex]} 
              alt="Fullscreen view" 
              className="max-w-[95vw] lg:max-w-[85vw] max-h-[85vh] object-contain rounded-lg shadow-2xl drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] cursor-default"
              onClick={(e) => e.stopPropagation()}
            />

            <button 
              onClick={nextImage}
              className="absolute right-2 sm:right-4 lg:right-8 text-white/50 hover:text-white bg-white/5 hover:bg-white/20 p-2 lg:p-4 rounded-full transition-all group z-50"
            >
              <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs sm:text-sm tracking-widest font-medium bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
              {currentImageIndex + 1} / {currentNews.gallery_images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default NewsDetail;