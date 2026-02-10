import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import { Calendar, ArrowLeft, Share2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

import achievement from '@/assets/achievement-1.jpg';
import programIt from '@/assets/program-it.webp';
import programCulinary from '@/assets/program-culinary.webp';

const NewsDetail = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();

  const allNews = useMemo(() => [
    { id: 1, category: "Achievement", date: "2024-01-15", image: achievement, titleKey: "news.item.1.title", contentKey: "news.item.1.excerpt" },
    { id: 2, category: "Partnership", date: "2024-01-12", image: programIt, titleKey: "news.item.2.title", contentKey: "news.item.2.excerpt" },
    { id: 3, category: "Event", date: "2024-01-10", image: programCulinary, titleKey: "news.item.3.title", contentKey: "news.item.3.excerpt" },
    { id: 4, category: "Event", date: "2024-01-08", image: programIt, titleKey: "news.item.4.title", contentKey: "news.item.4.excerpt" },
  ], []);

  const currentNews = allNews.find(n => n.id === Number(id)) || allNews[0];
  
  const sidebarNews = allNews.filter(n => n.id !== currentNews.id).slice(0, 3);

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
                    {t(currentNews.titleKey)}
                  </h1>
                  <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-y py-4 border-border">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(currentNews.date).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { 
                        day: 'numeric', month: 'long', year: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                      <Share2 className="w-4 h-4" /> {language === 'id' ? 'Bagikan' : 'Share'}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden mb-8 shadow-xl">
                  <img src={currentNews.image} className="w-full object-cover max-h-[500px]" alt="News" />
                </div>

                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                  <p className="mb-6">{t(currentNews.contentKey)}</p>
                  <p className="mb-6">
                    {language === 'id' 
                      ? 'Konten berita lengkap akan ditampilkan di sini. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' 
                      : 'Full news content will be displayed here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
                  </p>
                  <blockquote className="border-l-4 border-primary pl-4 italic my-8 text-foreground font-medium bg-section p-4 rounded-r-lg">
                    "Pendidikan adalah senjata paling ampuh yang bisa Anda gunakan untuk mengubah dunia."
                  </blockquote>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                  </p>
                </div>
              </ScrollReveal>
            </main>

            {/* RIGHT CONTENT: Sidebar (Fixed in place, scrolls with page) */}
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

              {/* Berita Terpopuler / Terbaru */}
              <div className="p-6 bg-section rounded-2xl border border-border">
                <h3 className="text-xl font-bold mb-6">{language === 'id' ? 'Berita Lainnya' : 'Other News'}</h3>
                <div className="space-y-6">
                  {sidebarNews.map((news) => (
                    <Link 
                      key={news.id} 
                      to={`/news/${news.id}`} 
                      className="group flex gap-4 items-start"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-muted">
                        <img 
                          src={news.image} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          alt={t(news.titleKey)}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-1">
                          {t(news.titleKey)}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                          <span className="text-primary">{news.category}</span>
                          <span>•</span>
                          <span>{new Date(news.date).getFullYear()}</span>
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