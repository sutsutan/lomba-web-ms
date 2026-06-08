// src/pages/public/News.tsx
import React, { useState, useEffect } from 'react';
import HeroCarousel from '@/components/HeroCarousel';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import MainLayout from '@/layouts/MainLayout';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

import { newsService, NewsData } from '@/services/News';

const News = () => {
  const { t } = useLanguage();
  const [newsItems, setNewsItems] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicNews = async () => {
      try {
        setLoading(true);
        const data = await newsService.getAll(true);
        setNewsItems(data);
      } catch (error) {
        console.error("Gagal mendapatkan berita publik:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPublicNews();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString(
      t('nav.lang_code') === 'ID' ? 'id-ID' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-[80vh] flex items-center justify-center text-gray-500">
          Memuat berita terbaru...
        </div>
      </MainLayout>
    );
  }

  if (newsItems.length === 0) {
    return (
      <MainLayout>
        <HeroCarousel title={t('news.hero.title')} subtitle={t('news.hero.subtitle')} description={t('news.hero.desc')} height="h-[40vh]" />
        <div className="text-center py-20 text-gray-400">Belum ada berita yang diterbitkan saat ini.</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <HeroCarousel
        title={t('news.hero.title')}
        subtitle={t('news.hero.subtitle')}
        description={t('news.hero.desc')}
        height="h-[70vh]"
      />

      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="grid gap-8 lg:grid-cols-2">
              <Link to={`/more-news/${newsItems[0].id}`} className="group relative h-[500px] overflow-hidden rounded-2xl block">
                <img
                  src={newsItems[0].thumbnail}
                  alt={newsItems[0].title_id}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="mb-4 inline-block rounded-full bg-white/20 px-3 py-1 text-sm text-white">
                    {newsItems[0].category}
                  </span>
                  <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                    {newsItems[0].title_id}
                  </h2>
                  <p className="mb-4 text-white/80 line-clamp-2">
                    {newsItems[0].excerpt_id || 'Baca selengkapnya...'}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Calendar className="h-4 w-4" />
                    {formatDate(newsItems[0].published_date)}
                  </div>
                </div>
              </Link>

              <div className="space-y-4">
                {newsItems.slice(1, 4).map((news) => (
                  <Link
                    key={news.id}
                    to={`/more-news/${news.id}`}
                    className="card-hover flex gap-4 p-4 block"
                  >
                    <img
                      src={news.thumbnail}
                      alt={news.title_id}
                      className="h-24 w-32 flex-shrink-0 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <span className="text-xs font-medium text-primary">
                        {news.category}
                      </span>
                      <h3 className="mt-1 line-clamp-2 font-semibold text-foreground">
                        {news.title_id}
                      </h3>
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(news.published_date)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-section">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="mb-12 flex items-center justify-between">
              <h2 className="section-title text-3xl">{t('news.all.title')}</h2>
              <Link to="/news-archive" className="btn-outline inline-flex items-center gap-2">
                {t('news.all.archive')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {newsItems.map((news, index) => (
              <ScrollReveal key={news.id} delay={index * 0.1}>
                <article className="card-hover overflow-hidden h-full flex flex-col justify-between">
                  <div>
                    <img
                      src={news.thumbnail}
                      alt={news.title_id}
                      className="h-48 w-full object-cover"
                    />
                    <div className="p-6">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="bg-primary-lighter rounded-full px-3 py-1 text-xs font-medium text-primary">
                          {news.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {formatDate(news.published_date)}
                        </span>
                      </div>
                      <h3 className="mb-2 line-clamp-2 font-semibold text-foreground">
                        {news.title_id}
                      </h3>
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {news.excerpt_id || 'Klik untuk membaca detail artikel.'}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <Link to={`/more-news/${news.id}`} className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-all hover:gap-2">
                      {t('news.all.read_more')}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default News;