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

        // Urutkan berdasarkan tanggal terbaru
        const sortedNews = [...data].sort(
          (a, b) =>
            new Date(b.published_date).getTime() -
            new Date(a.published_date).getTime()
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
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    );
  };

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };

  if (loading) {
    return (
      <section className="section-padding bg-background">
        <div className="container mx-auto flex min-h-[300px] items-center justify-center text-gray-500">
          Memuat berita terbaru...
        </div>
      </section>
    );
  }

  if (!featuredNews) {
    return (
      <section className="section-padding bg-background">
        <div className="container mx-auto py-20 text-center text-gray-400">
          Belum ada berita yang diterbitkan saat ini.
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-background overflow-hidden">

      {/* Header */}
      <div className="container mx-auto mb-16 px-6 text-center md:px-16 lg:px-24 xl:px-32">
        <h2 className="text-3xl font-black text-[#0F5F58] md:text-5xl">
          {t('more.news.title')}
        </h2>

        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-teal-500/20" />
      </div>

      <ScrollReveal delay={0.4}>
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* Image */}
            <div className="relative">

              <img
                src={
                  featuredNews.thumbnail ||
                  'https://placehold.co/800x500?text=News'
                }
                alt={featuredNews.title_id}
                className="h-full w-full rounded-lg object-cover shadow-xl"
              />

              <div className="mt-6">

                <p className="mb-2 text-sm font-bold text-[#0F5F58]">
                  {formatDate(featuredNews.published_date)}
                </p>

                <p className="text-xs text-muted-foreground">
                  {featuredNews.category}
                </p>

              </div>

            </div>

            {/* Content */}
            <div className="space-y-6">

              <p className="font-medium italic text-[#0F5F58]">
                {t('more.news.subtitle')}
              </p>

              <h3 className="text-2xl font-bold leading-tight text-[#0F5F58] md:text-3xl">
                {featuredNews.title_id}
              </h3>

              <div className="space-y-4 text-muted-foreground leading-relaxed">

                <p>
                  {featuredNews.excerpt_id
                    ? featuredNews.excerpt_id
                    : `${stripHtml(featuredNews.content_id).substring(0, 250)}...`}
                </p>

              </div>

              <div className="pt-4">

                <Link
                  to={`/more-news/${featuredNews.id}`}
                  className="inline-block rounded-full bg-[#B8C5D0] px-8 py-3 font-semibold text-[#0F5F58] transition-all duration-300 hover:bg-[#A0B0BD]"
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