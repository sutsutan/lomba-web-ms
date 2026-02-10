import { useState, useMemo } from 'react';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import HeroCarousel from '@/components/HeroCarousel';
import { Link } from 'react-router-dom';

import achievement from '@/assets/achievement-1.jpg';
import programIt from '@/assets/program-it.webp';
import programCulinary from '@/assets/program-culinary.webp';

const NewsArchive = () => {
  const { t, language } = useLanguage();

  const allNewsData = useMemo(() => [
    { 
      id: 1, 
      category: "Achievement", 
      date: "2024-01-15", 
      image: achievement,
      titleKey: "news.item.1.title",
      excerptKey: "news.item.1.excerpt" 
    },
    { 
      id: 2, 
      category: "Partnership", 
      date: "2024-01-12", 
      image: programIt,
      titleKey: "news.item.2.title",
      excerptKey: "news.item.2.excerpt"
    },
    { 
      id: 3, 
      category: "Event", 
      date: "2024-01-10", 
      image: programCulinary,
      titleKey: "news.item.3.title",
      excerptKey: "news.item.3.excerpt"
    },
    { 
      id: 4, 
      category: "Event", 
      date: "2024-01-08", 
      image: programIt,
      titleKey: "news.item.4.title",
      excerptKey: "news.item.4.excerpt"
    },
    { 
      id: 5, 
      category: "Field Trip", 
      date: "2024-01-05", 
      image: programCulinary,
      titleKey: "news.item.1.title",
      excerptKey: "news.item.1.excerpt"
    },
    { 
      id: 6, 
      category: "Announcement", 
      date: "2024-01-03", 
      image: achievement,
      titleKey: "news.item.2.title",
      excerptKey: "news.item.2.excerpt"
    },
    { 
      id: 7, 
      category: "Event", 
      date: "2023-12-28", 
      image: achievement,
      titleKey: "news.item.3.title",
      excerptKey: "news.item.3.excerpt"
    }
  ], []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 
  const totalPages = Math.ceil(allNewsData.length / itemsPerPage);

  const currentNews = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return allNewsData.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, allNewsData]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroCarousel
        title={t('news.hero.title')}
        subtitle={t('news.hero.subtitle')}
        description={t('news.hero.desc')}
        height="h-[70vh]"
      />

      {/* Header Deskripsi */}
      <section className="pt-20 pb-12 bg-section border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('news.all.title')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
             {language === 'id' 
               ? 'Jelajahi seluruh arsip berita, pengumuman, dan pencapaian terbaru dari sekolah kami.' 
               : 'Explore all news archives, announcements, and our latest achievements from our school.'}
          </p>
        </div>
      </section>

      {/* Grid Berita */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {currentNews.map((news, index) => (
              <ScrollReveal key={`${news.id}-${index}`} delay={index * 0.1}>
                <article className="group card-hover bg-card rounded-2xl overflow-hidden border border-border flex flex-col h-full shadow-sm">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={news.image} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      alt={t(news.titleKey)} 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold text-primary-foreground shadow-lg">
                        {news.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(news.date).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { 
                        day: 'numeric', month: 'long', year: 'numeric' 
                      })}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {t(news.titleKey)}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">
                      {t(news.excerptKey)}
                    </p>
                    
                    <div className="mt-auto">
                      <Link to={`/more-news`} className="flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all">
                      <button className="flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all group/btn">
                        {t('news.all.read_more')} 
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                      </Link>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          {/* Navigasi Nomor Halaman */}
          <div className="flex justify-center items-center gap-3">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-3 rounded-xl border border-border bg-card hover:bg-primary hover:text-primary-foreground disabled:opacity-30 disabled:hover:bg-card disabled:hover:text-current transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-12 h-12 rounded-xl border font-bold transition-all ${
                    currentPage === i + 1 
                      ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20 scale-110' 
                      : 'border-border bg-card hover:border-primary hover:text-primary'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-3 rounded-xl border border-border bg-card hover:bg-primary hover:text-primary-foreground disabled:opacity-30 disabled:hover:bg-card disabled:hover:text-current transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default NewsArchive;