// src/pages/public/NewsArchive.tsx

import { useState, useEffect, useMemo } from "react";
import MainLayout from "@/layouts/MainLayout";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import HeroCarousel from "@/components/HeroCarousel";
import { Link } from "react-router-dom";

import { newsService, NewsData } from "@/services/News";

const NewsArchive = () => {
  const { t, language } = useLanguage();

  const [allNewsData, setAllNewsData] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        const data = await newsService.getAll(true);

        const now = new Date();

        const publishedNews = data
          .filter(
            (item) =>
              item.is_published &&
              new Date(item.published_date) <= now
          )
          .sort(
            (a, b) =>
              new Date(b.published_date).getTime() -
              new Date(a.published_date).getTime()
          );

        setAllNewsData(publishedNews);
        setCurrentPage(1);
      } catch (error) {
        console.error("Gagal memuat arsip berita:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(
      language === "id" ? "id-ID" : "en-US",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  const getExcerpt = (news: NewsData) => {
    if (news.excerpt_id) return news.excerpt_id;

    const plain = news.content_id.replace(/<[^>]+>/g, "");

    return plain.length > 120
      ? plain.substring(0, 120) + "..."
      : plain;
  };

  const totalPages = useMemo(() => {
    return Math.ceil(allNewsData.length / itemsPerPage);
  }, [allNewsData]);

  const currentNews = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return allNewsData.slice(start, start + itemsPerPage);
  }, [allNewsData, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <MainLayout>
      <HeroCarousel
        title={t("news.hero.title")}
        subtitle={t("news.hero.subtitle")}
        description={t("news.hero.desc")}
        height="h-[70vh]"
      />

      <section className="pt-20 pb-12 bg-section border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("news.all.title")}
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === "id"
              ? "Jelajahi seluruh arsip berita, pengumuman, dan pencapaian terbaru dari sekolah kami."
              : "Explore all news archives, announcements, and our latest achievements from our school."}
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20 text-muted-foreground font-medium">
              Sinkronisasi arsip berita sekolah...
            </div>
          ) : allNewsData.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              Belum ada berita yang diterbitkan.
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {currentNews.map((news, index) => (
                  <ScrollReveal
                    key={news.id}
                    delay={index * 0.1}
                  >
                    <article className="group card-hover bg-card rounded-2xl overflow-hidden border border-border flex flex-col h-full shadow-sm">

                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={news.thumbnail || "/placeholder-news.jpg"}
                          alt={news.title_id}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src =
                              "/placeholder-news.jpg";
                          }}
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
                          {formatDate(news.published_date)}
                        </div>

                        <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                          {news.title_id}
                        </h3>

                        <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">
                          {getExcerpt(news)}
                        </p>

                        <div className="mt-auto">
                          <Link
                            to={`/more-news/${news.slug ?? news.id}`}
                          >
                            <button className="flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all group/btn">
                              {t("news.all.read_more")}
                              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                            </button>
                          </Link>
                        </div>

                      </div>

                    </article>
                  </ScrollReveal>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3">

                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-3 rounded-xl border border-border bg-card hover:bg-primary hover:text-primary-foreground disabled:opacity-30 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`w-12 h-12 rounded-xl border font-bold transition-all ${
                          currentPage === i + 1
                            ? "bg-primary border-primary text-primary-foreground shadow-lg scale-110"
                            : "border-border bg-card hover:border-primary hover:text-primary"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-3 rounded-xl border border-border bg-card hover:bg-primary hover:text-primary-foreground disabled:opacity-30 transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                </div>
              )}
            </>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default NewsArchive;