import { motion } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import { Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import heroBg from '@/assets/hero-bg.jpg';
import programIt from '@/assets/program-it.webp';
import programCulinary from '@/assets/program-culinary.webp';
import achievement from '@/assets/achievement-1.jpg';
import axios from 'axios';

const News = () => {
  const { t } = useLanguage();

  const newsItems = [
    {
      id: 1,
      title: t('news.item.1.title'),
      excerpt: t('news.item.1.excerpt'),
      date: '2024-01-15',
      category: t('achievements.1.cat'),
      image: achievement,
    },
    {
      id: 2,
      title: t('news.item.2.title'),
      excerpt: t('news.item.2.excerpt'),
      date: '2024-01-10',
      category: 'Partnership',
      image: programIt,
    },
    {
      id: 3,
      title: t('news.item.3.title'),
      excerpt: t('news.item.3.excerpt'),
      date: '2024-01-05',
      category: 'Event',
      image: programCulinary,
    },
    {
      id: 4,
      title: t('news.item.4.title'),
      excerpt: t('news.item.4.excerpt'),
      date: '2024-01-01',
      category: 'Event',
      image: heroBg,
    },
  ];

  return (
    <MainLayout>
      {/* Hero Carousel */}
      <HeroCarousel
        title={t('news.hero.title')}
        subtitle={t('news.hero.subtitle')}
        description={t('news.hero.desc')}
        height="h-[70vh]"
      />

      {/* Featured News */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Main Featured */}
              <div className="group relative rounded-2xl overflow-hidden h-[500px]">
                <img
                  src={newsItems[0].image}
                  alt={newsItems[0].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-white text-sm mb-4">
                    {newsItems[0].category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {newsItems[0].title}
                  </h2>
                  <p className="text-white/80 mb-4">{newsItems[0].excerpt}</p>
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <Calendar className="w-4 h-4" />
                    {new Date(newsItems[0].date).toLocaleDateString(t('nav.lang_code') === 'ID' ? 'id-ID' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </div>

              {/* Side News */}
              <div className="space-y-4">
                {newsItems.slice(1, 4).map((news, index) => (
                  <div key={news.id} className="card-hover flex gap-4 p-4">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-32 h-24 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <span className="text-primary text-xs font-medium">
                        {news.category}
                      </span>
                      <h3 className="font-semibold text-foreground line-clamp-2 mt-1">
                        {news.title}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground text-xs mt-2">
                        <Calendar className="w-3 h-3" />
                        {new Date(news.date).toLocaleDateString(t('nav.lang_code') === 'ID' ? 'id-ID' : 'en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* All News Grid */}
      <section className="section-padding bg-section">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-12">
              <h2 className="section-title text-3xl">{t('news.all.title')}</h2>
              <button className="btn-outline inline-flex items-center gap-2">
                {t('news.all.archive')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...newsItems, ...newsItems.slice(0, 2)].map((news, index) => (
              <ScrollReveal key={`${news.id}-${index}`} delay={index * 0.1}>
                <article className="card-hover overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-primary-lighter text-primary text-xs font-medium rounded-full">
                        {news.category}
                      </span>
                      <span className="text-muted-foreground text-xs flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(news.date).toLocaleDateString(t('nav.lang_code') === 'ID' ? 'id-ID' : 'en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground line-clamp-2 mb-2">
                      {news.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {news.excerpt}
                    </p>
                    <button className="text-primary text-sm font-medium mt-4 inline-flex items-center gap-1 hover:gap-2 transition-all">
                      {t('news.all.read_more')}
                      <ArrowRight className="w-4 h-4" />
                    </button>
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
