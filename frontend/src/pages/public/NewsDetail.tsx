// src/pages/public/NewsDetail.tsx
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import { Calendar, ArrowLeft, Share2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

import { newsService, NewsData } from '@/services/News';

const NewsDetail = () => {
  // Menggunakan 'id' sebagai slug/id penentu di URL
  const { id } = useParams();
  const { t, language } = useLanguage();
  const { toast } = useToast();

  const [currentNews, setCurrentNews] = useState<NewsData | null>(null);
  const [sidebarNews, setSidebarNews] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);

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
    </MainLayout>
  );
};

export default NewsDetail;