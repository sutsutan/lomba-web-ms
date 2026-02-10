import achievement from '@/assets/achievement-1.jpg';
import heroBg from '@/assets/hero-bg.jpg';
import programCulinary from '@/assets/program-culinary.webp';
import programIt from '@/assets/program-it.webp';
import HeroCarousel from '@/components/HeroCarousel';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import MainLayout from '@/layouts/MainLayout';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

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
                        <div className="grid gap-8 lg:grid-cols-2">
                            {/* Main Featured */}
                            <div className="group relative h-[500px] overflow-hidden rounded-2xl">
                                <img
                                    src={newsItems[0].image}
                                    alt={newsItems[0].title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <span className="mb-4 inline-block rounded-full bg-white/20 px-3 py-1 text-sm text-white">
                                        {newsItems[0].category}
                                    </span>
                                    <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                                        {newsItems[0].title}
                                    </h2>
                                    <p className="mb-4 text-white/80">
                                        {newsItems[0].excerpt}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-white/70">
                                        <Calendar className="h-4 w-4" />
                                        {new Date(
                                            newsItems[0].date,
                                        ).toLocaleDateString(
                                            t('nav.lang_code') === 'ID'
                                                ? 'id-ID'
                                                : 'en-US',
                                            {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            },
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Side News */}
                            <div className="space-y-4">
                                {newsItems.slice(1, 4).map((news, index) => (
                                    <div
                                        key={news.id}
                                        className="card-hover flex gap-4 p-4"
                                    >
                                        <img
                                            src={news.image}
                                            alt={news.title}
                                            className="h-24 w-32 flex-shrink-0 rounded-xl object-cover"
                                        />
                                        <div className="flex-1">
                                            <span className="text-xs font-medium text-primary">
                                                {news.category}
                                            </span>
                                            <h3 className="mt-1 line-clamp-2 font-semibold text-foreground">
                                                {news.title}
                                            </h3>
                                            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(
                                                    news.date,
                                                ).toLocaleDateString(
                                                    t('nav.lang_code') === 'ID'
                                                        ? 'id-ID'
                                                        : 'en-US',
                                                    {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    },
                                                )}
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
                    // Di dalam News.tsx Anda, ubah bagian ini:
                    <ScrollReveal>
                        <div className="mb-12 flex items-center justify-between">
                            <h2 className="section-title text-3xl">
                                {t('news.all.title')}
                            </h2>

                            {/* Gunakan Link dari react-router-dom */}
                            <Link
                                to="/news-archive"
                                className="btn-outline inline-flex items-center gap-2"
                            >
                                {t('news.all.archive')}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </ScrollReveal>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[...newsItems, ...newsItems.slice(0, 2)].map(
                            (news, index) => (
                                <ScrollReveal
                                    key={`${news.id}-${index}`}
                                    delay={index * 0.1}
                                >
                                    <article className="card-hover overflow-hidden">
                                        <img
                                            src={news.image}
                                            alt={news.title}
                                            className="h-48 w-full object-cover"
                                        />
                                        <div className="p-6">
                                            <div className="mb-3 flex items-center gap-3">
                                                <span className="bg-primary-lighter rounded-full px-3 py-1 text-xs font-medium text-primary">
                                                    {news.category}
                                                </span>
                                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(
                                                        news.date,
                                                    ).toLocaleDateString(
                                                        t('nav.lang_code') ===
                                                            'ID'
                                                            ? 'id-ID'
                                                            : 'en-US',
                                                        {
                                                            month: 'short',
                                                            day: 'numeric',
                                                        },
                                                    )}
                                                </span>
                                            </div>
                                            <h3 className="mb-2 line-clamp-2 font-semibold text-foreground">
                                                {news.title}
                                            </h3>
                                            <p className="line-clamp-2 text-sm text-muted-foreground">
                                                {news.excerpt}
                                            </p>
                                            <Link to={`/more-news`} className="flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all">
                                            <button className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-all hover:gap-2">
                                                {t('news.all.read_more')}
                                                <ArrowRight className="h-4 w-4" />
                                            </button>
                                            </Link>
                                        </div>
                                    </article>
                                </ScrollReveal>
                            ),
                        )}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default News;
