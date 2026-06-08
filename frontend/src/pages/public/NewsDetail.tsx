// src/pages/public/NewsDetail.tsx
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import { Calendar, ArrowLeft, Share2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

// 🛠️ MENGGUNAKAN SERVICE & INTERFACE BERITA YANG ASLI
import { newsService, NewsData } from '@/services/News';

const NewsDetail = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const { toast } = useToast();

  // ➕ STATE DATA DINAMIS DARI SERVER
  const [currentNews, setCurrentNews] = useState<NewsData | null>(null);
  const [sidebarNews, setSidebarNews] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);

  // 🛠️ EFFECT: AMBIL DETAIL BERITA & REKOMENDASI SIDEBAR
  useEffect(() => {
    const loadNewsDetails = async () => {
      if (!id) return;
      try {
        setLoading(true);
        
        // 1. Dapatkan detail berita aktif berdasarkan id menggunakan fungsi getById murni
        const activeNews = await newsService.getById(id);
        setCurrentNews(activeNews);

        // 2. Dapatkan daftar berita publik lainnya untuk disaring ke sidebar
        const allNews = await newsService.getAll(true);
        const otherNews = allNews
          .filter(n => n.id !== Number(id))
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

  // 🛠️ HANDLER BERBAGI: Menggunakan data murni database
  const handleShare = async () => {
    if (!currentNews) return;
    
    const shareData = {
      title: currentNews.title,
      text: currentNews.excerpt || currentNews.content.substring(0, 100),
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
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
        toast({
          variant: "destructive",
          title: language === 'id' ? 'Gagal menyalin' : 'Failed to copy',
          description: language === 'id' 
            ? 'Tidak dapat menyalin tautan secara otomatis.' 
            : 'Could not copy the link automatically.',
        });
      }
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center py-40 text-muted-foreground font-medium">
          Memuat detail berita...
        </div>
      </MainLayout>
    );
  }

  if (!currentNews) {
    return (
      <MainLayout>
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
          
          {/* Back Button */}
          <Link to="/news-archive" className="inline-flex items-center gap-2 text-primary font-medium mb-8 hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" /> {language === 'id' ? 'Kembali ke Arsip' : 'Back to Archive'}
          </Link>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* LEFT CONTENT: Berita Utama */}
            <main className="lg:w-2/3 w-full">
              <ScrollReveal>
                <div className="mb-6">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                    {currentNews.category}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-bold text-foreground mt-4 mb-6 leading-tight">
                    {currentNews.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-y py-4 border-border">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(currentNews.published_date).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { 
                        day: 'numeric', month: 'long', year: 'numeric' 
                      })}
                    </div>
                    <button 
                      onClick={handleShare}
                      className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors focus:outline-none"
                    >
                      <Share2 className="w-4 h-4" /> {language === 'id' ? 'Bagikan' : 'Share'}
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden mb-8 shadow-xl">
                  <img src={currentNews.cover_image} className="w-full object-cover max-h-[500px]" alt={currentNews.title} />
                </div>

                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                  <p className="mb-6 text-foreground font-normal text-lg">
                    {currentNews.content}
                  </p>
                  
                  <blockquote className="border-l-4 border-primary pl-4 italic my-8 text-foreground font-medium bg-section p-4 rounded-r-lg">
                    "Pendidikan adalah senjata paling ampuh yang bisa Anda gunakan untuk mengubah dunia."
                  </blockquote>
                </div>
              </ScrollReveal>
            </main>

            {/* RIGHT CONTENT: Sidebar */}
            <aside className="lg:w-1/3 w-full space-y-8">
              
              {/* Kategori */}
              <div className="p-6 bg-section rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-4">{language === 'id' ? 'Kategori Berita' : 'News Categories'}</h3>
                <div className="flex flex-wrap gap-2">
                  {['Achievement', 'Event', 'Partnership', 'Facility'].map(cat => (
                    <span key={cat} className="bg-background px-3 py-1.5 rounded-lg border border-border text-sm hover:border-primary hover:text-primary cursor-pointer transition-all">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Berita Lainnya */}
              <div className="p-6 bg-section rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-6">{language === 'id' ? 'Berita Lainnya' : 'Other News'}</h3>
                <div className="space-y-6">
                  {sidebarNews.map((news) => (
                    <Link 
                      key={news.id} 
                      to={`/more-news/${news.id}`} 
                      className="group flex gap-4 items-start"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-muted">
                        <img 
                          src={news.cover_image} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          alt={news.title}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-1">
                          {news.title}
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
    </MainLayout>
  );
};

export default NewsDetail;