import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  aboutPageService,
  aboutValueService,
  aboutTimelineService,
  AboutPageData,
  AboutValueData,
  AboutTimelineData,
} from '@/services/AboutPage';
import { getPublicMajors, MajorData } from '@/services/Major';
import { newsService, NewsData } from '@/services/News';

import aboutImage from '@/assets/about-preview.jpg';
import programIt from '@/assets/program-it.webp';
import galadinner from '@/assets/gala-dinner.jpg';
import leadership from '@/assets/leadership-training.jpg';
import osis from '@/assets/osis.jpg';

const studentLifeFallbackImages = [osis, galadinner, leadership];

const About = () => {
  const { t } = useLanguage();

  const [aboutData, setAboutData] = useState<AboutPageData | null>(null);
  const [valuesData, setValuesData] = useState<AboutValueData[]>([]);
  const [timelines, setTimelines] = useState<AboutTimelineData[]>([]);
  const [majors, setMajors] = useState<MajorData[]>([]);
  const [studentLifeNews, setStudentLifeNews] = useState<NewsData[]>([]);
  const [activeYear, setActiveYear] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAboutContent = async () => {
      try {
        const [page, values, timelineData, majorList, news] = await Promise.all([
          aboutPageService.get(),
          aboutValueService.getAll(),
          aboutTimelineService.getAll(),
          getPublicMajors(),
          newsService.getAll(true),
        ]);

        setAboutData(page);
        setValuesData(values);
        setTimelines(timelineData);
        if (timelineData.length > 0) setActiveYear(timelineData[0].year);
        setMajors(majorList.slice(0, 5));

        const publishedNews = news
          .filter((n) => n.is_published)
          .sort(
            (a, b) =>
              new Date(b.published_date).getTime() -
              new Date(a.published_date).getTime()
          )
          .slice(0, 3);
        setStudentLifeNews(publishedNews);
      } catch (err) {
        console.error('Gagal memuat konten About:', err);
      } finally {
        setLoading(false);
      }
    };
    loadAboutContent();
  }, []);

  const activeTimeline = timelines.find((tl) => tl.year === activeYear);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex min-h-[60vh] items-center justify-center text-gray-500">
          Memuat konten...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Hero */}
      <HeroCarousel
        title={t('about.hero.title')}
        subtitle={t('about.hero.subtitle')}
        description={t('about.hero.desc')}
        height="h-[60vh] md:h-[70vh]"
      />

      {/* Get to Know Us */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-black text-[#12606A] tracking-tight">
                  {aboutData?.know_us_title || t('about.know_us.title')}
                </h2>
                <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                  <p>{aboutData?.know_us_desc1 || t('about.know_us.desc1')}</p>
                  <p>{aboutData?.know_us_desc2 || t('about.know_us.desc2')}</p>
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    to="/contact"
                    className="px-6 md:px-8 py-3 bg-[#B8C5D0] text-[#0F5F58] font-semibold rounded-full hover:bg-[#A0B0BD] transition-all shadow-sm text-sm md:text-base"
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/mission-vision"
                    className="px-6 md:px-8 py-3 border-2 border-[#B8C5D0] text-[#0F5F58] font-semibold rounded-full hover:bg-white transition-all text-sm md:text-base"
                  >
                    Our Vision & Mission
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex gap-4 h-[300px] md:h-[400px]">
                <div className="w-2/3 h-full rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={aboutData?.know_us_image1 || aboutImage}
                    alt="Students"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-1/3 h-full rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={aboutData?.know_us_image2 || programIt}
                    alt="School"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      {valuesData.length > 0 && (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar pb-8">
              {valuesData.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-[280px] md:w-[350px] lg:w-[400px] h-[300px] rounded-2xl overflow-hidden relative group shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-xl md:text-2xl font-bold mb-1">{item.title}</h3>
                    <p className="text-white/80 text-xs md:text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-2">
              <p className="text-[#0F5F58] text-sm italic border-b border-[#0F5F58] inline-block pb-1">
                {t('about.values.swipe')}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Timeline Section */}
      {timelines.length > 0 && activeTimeline && (
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F5F58] mb-8 text-center md:text-left">
                {t('about.timeline.title')}
              </h2>

              <div className="flex gap-4 border-b-2 border-[#2D8FDB] mb-12 overflow-x-auto hide-scrollbar scroll-smooth">
                {timelines.map((tl) => (
                  <button
                    key={tl.id}
                    onClick={() => setActiveYear(tl.year)}
                    className={`pb-4 text-lg md:text-xl font-medium transition-all whitespace-nowrap min-w-[80px] ${
                      activeYear === tl.year
                        ? 'text-white bg-[#0F5F58] px-6 rounded-t-lg -mb-[2px]'
                        : 'text-[#0F5F58]/60 hover:text-[#0F5F58] px-4'
                    }`}
                  >
                    {tl.year}
                  </button>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 order-2 lg:order-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTimeline.year}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-8"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-[#0F5F58] mb-2 uppercase tracking-wide">
                          {t('about.timeline.heads')}
                        </h3>
                        {activeTimeline.heads.map((head, i) => (
                          <p key={i} className="text-[#0F5F58]/80 font-medium">
                            {head}
                          </p>
                        ))}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#0F5F58] mb-2 border-l-4 border-[#0F5F58] pl-3">
                          {t('about.timeline.begin')}
                        </h3>
                        <p className="text-[#0F5F58]/80 leading-relaxed text-justify text-sm md:text-base">
                          {activeTimeline.beginning}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#0F5F58] mb-2 border-l-4 border-[#0F5F58] pl-3">
                          {t('about.timeline.growing')}
                        </h3>
                        <p className="text-[#0F5F58]/80 leading-relaxed text-justify text-sm md:text-base">
                          {activeTimeline.growing}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                  <div className="relative w-full max-w-[500px] aspect-[4/5] md:aspect-[3/4] rounded-t-full overflow-hidden bg-gray-100 shadow-2xl">
                    <img
                      src={activeTimeline.image || aboutImage}
                      alt="Timeline"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-6 right-6 bg-[#0F5F58] text-white py-2 px-6 rounded-full font-bold text-xl shadow-lg">
                      {activeTimeline.year}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Study Program — data dari module Jurusan (Majors) */}
      {majors.length > 0 && (
        <section className="py-20 bg-[#0F5F58] text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('about.program.title')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {majors.map((program, idx) => (
                <div
                  key={program.id}
                  className="bg-white rounded-2xl overflow-hidden text-[#0F5F58] shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="h-36 md:h-40 overflow-hidden">
                    <img
                      src={
                        program.curriculum_image ||
                        studentLifeFallbackImages[idx % studentLifeFallbackImages.length]
                      }
                      alt={program.name}
                      className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{program.name}</h3>
                    <p className="text-xs md:text-sm opacity-80 mb-4 h-14 line-clamp-3">
                      {program.description}
                    </p>
                    <Link
                      to={program.program_link || `/major?type=${program.code}`}
                      className="flex items-center text-xs md:text-sm font-bold uppercase tracking-wide hover:gap-2 transition-all"
                    >
                      {t('about.program.explore')}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Student Life Section — data dari module Berita (News) */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12 justify-center md:justify-start">
              <GraduationCap className="w-10 h-10 text-[#0F5F58]" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F5F58]">
                {t('about.life.title')}
              </h2>
            </div>

            {studentLifeNews.length > 0 ? (
              <div className="space-y-12 md:space-y-16">
                {studentLifeNews.map((news, idx) => {
                  const imageFirst = idx % 2 === 0;
                  const fallbackImg =
                    studentLifeFallbackImages[idx % studentLifeFallbackImages.length];

                  return (
                    <div
                      key={news.id}
                      className="grid md:grid-cols-2 gap-6 md:gap-8 items-start"
                    >
                      <div
                        className={`w-full h-[280px] md:h-[350px] rounded-2xl overflow-hidden shadow-lg ${
                          imageFirst ? '' : 'order-1 md:order-2'
                        }`}
                      >
                        <img
                          src={news.thumbnail || fallbackImg}
                          className="w-full h-full object-cover"
                          alt={news.title_id}
                        />
                      </div>
                      <div
                        className={`flex gap-4 ${
                          imageFirst ? '' : 'order-2 md:order-1'
                        }`}
                      >
                        <div className="w-1 bg-[#0F5F58] rounded-full flex-shrink-0" />
                        <div className="flex flex-col">
                          <h3 className="text-xl md:text-2xl font-bold text-[#0F5F58] mb-4">
                            {news.title_id}
                          </h3>
                          <p className="text-[#0F5F58]/80 leading-relaxed text-justify text-sm md:text-base">
                            {news.excerpt_id || 'Baca selengkapnya di halaman berita.'}
                          </p>
                          <Link
                            to={`/more-news/${news.slug || news.id}`}
                            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#0F5F58] hover:gap-2 transition-all"
                          >
                            {t('news.all.read_more')}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Belum ada berita kegiatan siswa yang dipublikasikan.
              </p>
            )}
          </ScrollReveal>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;