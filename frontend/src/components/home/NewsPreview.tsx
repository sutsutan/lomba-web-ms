import { useState, useEffect } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { newsService, NewsData } from '@/services/News';

const NewsPreview = () => {
  const { t } = useLanguage();
  const [featuredNews, setFeaturedNews] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedNews = async () => {
      try {
        setLoading(true);
        const data = await newsService.getAll(true);
        if (!data || data.length === 0) {
          setFeaturedNews(null);
          return;
        }
        const sortedNews = [...data].sort(
          (a, b) => new Date(b.published_date).getTime() - new Date(a.published_date).getTime()
        );
        setFeaturedNews(sortedNews[0]);
      } catch (error) {
        console.error('Gagal mendapatkan berita utama:', error);
        setFeaturedNews(null);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedNews();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString(
      t('nav.lang_code') === 'ID' ? 'id-ID' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };

  const stripHtml = (html: string) => {
    const text = html.replace(/<[^>]*>/g, '');
    return text.replace(/\s+/g, ' ').trim();
  };

  if (loading || !featuredNews) return null;

  return (
    <section className="section-padding bg-background overflow-hidden">
      {/* Header */}
      <div className="container mx-auto mb-16 px-6 text-center md:px-16 lg:px-24 xl:px-32">
        <h2 className="text-3xl font-black text-[#0F5F58] md:text-5xl">{t('more.news.title')}</h2>
        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-teal-500/20" />
      </div>

      <ScrollReveal delay={0.4}>
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
          {/* Grid Layout */}
          <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
            
            {/* Image Section */}
            <div className="relative">
              <img
                src={featuredNews.thumbnail || "https://placehold.co/800x500?text=News"}
                alt={featuredNews.title_id}
                className="h-[420px] w-full rounded-xl object-cover shadow-xl lg:h-[520px]"
              />
              <div className="mt-6">
                <p className="mb-2 text-sm font-bold text-[#0F5F58]">{formatDate(featuredNews.published_date)}</p>
                <p className="text-xs text-muted-foreground">{featuredNews.category}</p>
              </div>
            </div>

            {/* Content Section: Diberikan min-w-0 agar teks tidak menembus grid */}
            <div className="flex flex-col min-w-0">
              <div className="space-y-6">
                <p className="font-medium italic text-[#0F5F58]">
                  {t('more.news.subtitle')}
                </p>

                <h3 className="text-2xl md:text-3xl font-bold leading-tight text-[#0F5F58]">
                  {featuredNews.title_id}
                </h3>

                {/* Preview Text - Menggunakan whitespace-normal untuk wrap teks */}
                <div className="relative"> 
                  <div 
                    className="text-muted-foreground leading-8 text-justify whitespace-normal break-words overflow-hidden"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 8, // Menampilkan maksimal 8 baris
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {featuredNews.excerpt_id
                      ? featuredNews.excerpt_id
                      : stripHtml(featuredNews.content_id)}
                  </div>

                  {/* Fade Effect: Z-index diatur agar berada di atas teks */}
                  <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-background to-transparent z-10" />
                </div>
              </div>

              {/* Button */}
              <div className="mt-8">
                <Link
                  to={`/more-news/${featuredNews.id}`}
                  className="inline-flex items-center rounded-full bg-[#B8C5D0] px-8 py-3 font-semibold text-[#0F5F58] transition-all duration-300 hover:bg-[#A0B0BD]"
                >
                  {t('news.all.read_more')}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default NewsPreview;