import { useState, useEffect, JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Palette,
  ShieldCheck,
  Award,
  Zap,
} from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import HeroCarousel from '@/components/HeroCarousel';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { getPublicExploreGalleries, ExploreGalleryData } from '@/services/ExploreGallery';

interface OrganizationCategory {
  id: number;
  nameKey: string;
  slug: string;
  shortName: string;
  icon: JSX.Element;
  image: string;
}

const categories: OrganizationCategory[] = [
  { id: 1, nameKey: 'cat_leadership', slug: 'leadership', shortName: 'Leadership', icon: <Award />, image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200' },
  { id: 2, nameKey: 'cat_creative', slug: 'creative', shortName: 'Creative', icon: <Palette />, image: 'https://images.unsplash.com/photo-1514525253344-99a4299966c2?q=80&w=1200' },
  { id: 3, nameKey: 'cat_discipline', slug: 'discipline', shortName: 'Discipline', icon: <ShieldCheck />, image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200' },
  { id: 4, nameKey: 'cat_wellness', slug: 'wellness', shortName: 'Wellness', icon: <Zap />, image: 'https://images.unsplash.com/photo-1514525253344-99a4299966c2?q=80&w=1200' },
];

const categoryDescriptions: Record<string, { introKey: string }> = {
  cat_leadership: { introKey: 'desc_leadership_intro' },
  cat_creative: { introKey: 'desc_creative_intro' },
  cat_discipline: { introKey: 'desc_discipline_intro' },
  cat_wellness: { introKey: 'desc_wellness_intro' },
};

const MoreOrg = () => {
  const { t, language } = useLanguage();
  const [galleryItems, setGalleryItems] = useState<ExploreGalleryData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPublicExploreGalleries()
      .then(setGalleryItems)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setCurrentProjectIndex(0);
  }, [selectedCategory]);

  const filteredProjects = galleryItems.filter(
    (p) => p.organization_id && p.organization?.category === selectedCategory.slug
  );
  const currentProject = filteredProjects[currentProjectIndex];

  const handleNext = () => {
    if (filteredProjects.length > 1) {
      setCurrentProjectIndex((prev) => (prev + 1) % filteredProjects.length);
    }
  };

  const handlePrev = () => {
    if (filteredProjects.length > 1) {
      setCurrentProjectIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
    }
  };

  return (
    <MainLayout>
      <HeroCarousel
        category="moreorg"
        lang={language}
        height="h-[60vh]"
      />

      {/* SECTION 1: HIGHLIGHTED ACTIVITY */}
      <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-2 ml-0 md:ml-14">
              <div className="w-[2px] h-8 bg-[#0F5F58]" />
              <h2 className="text-2xl md:text-4xl font-bold text-[#0F5F58]">{t('org_featured_title')}</h2>
            </div>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            {currentProject ? (
              <div key={currentProject.id} className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center ml-0 md:ml-14 mt-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  className="overflow-hidden shadow-2xl rounded-2xl"
                >
                  <img
                    src={currentProject.documentation_url}
                    className="w-full h-64 md:h-96 object-cover"
                    alt={currentProject.event_name}
                    onError={e => (e.currentTarget.src = 'https://placehold.co/800x600/e2e8f0/94a3b8?text=No+Image')}
                  />
                </motion.div>

                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-[#0F5F58]/60 uppercase tracking-widest">
                    {currentProject.organization?.name || t(selectedCategory.nameKey)}
                  </h3>
                  <h2 className="text-3xl md:text-5xl font-bold text-[#0F5F58] leading-tight">{currentProject.event_name}</h2>
                  <p className="text-[#0F5F58]/80 text-lg leading-relaxed text-justify">{currentProject.traits_achievement}</p>
                  <p className="text-sm font-semibold text-teal-600">Tahun {currentProject.year}</p>

                  <div className="relative flex items-center h-20 w-32">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-[2px] bg-[#0F5F58]/30 rotate-[45deg]" />
                    <button onClick={handlePrev} className="absolute left-2 -top-1 w-12 h-12 border-2 border-[#0F5F58]/40 flex items-center justify-center rotate-45 hover:bg-[#0F5F58] hover:text-white transition-all group">
                      <ChevronLeft className="-rotate-45" />
                    </button>
                    <button onClick={handleNext} className="absolute right-2 -bottom-1 w-12 h-12 border-2 border-[#0F5F58]/40 flex items-center justify-center rotate-45 hover:bg-[#0F5F58] hover:text-white transition-all group">
                      <ChevronRight className="-rotate-45" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-[#0F5F58]/40">
                {loading ? 'Memuat aktivitas...' : t('org_no_activity')}
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION 2: CATEGORY NAVIGATOR */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#0F5F58] mb-2">{t('org_explore_title')}</h2>
            <p className="text-[#0F5F58]/60">{t('org_explore_subtitle')}</p>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-6 hide-scrollbar justify-start md:justify-center">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                whileHover={{ y: -5 }}
                className={`flex-shrink-0 w-40 p-6 rounded-2xl border-2 transition-all ${
                  selectedCategory.id === cat.id
                    ? 'bg-[#0F5F58] border-[#0F5F58] text-white shadow-xl shadow-teal-900/20'
                    : 'bg-white border-gray-100 text-[#0F5F58] hover:border-[#0F5F58]/30'
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="text-3xl">{cat.icon}</div>
                  <h3 className="text-xs font-bold uppercase tracking-tighter leading-tight">{t(cat.nameKey)}</h3>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: DESCRIPTION BANNER */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={selectedCategory.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
            <img src={selectedCategory.image} className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-[#0F5F58]/80 backdrop-blur-[2px]" />
          </motion.div>
        </AnimatePresence>
        <div className="relative h-full flex items-center justify-center text-center px-6">
          <div className="max-w-4xl text-white">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-black mb-4 opacity-20 uppercase tracking-[0.2em]">{selectedCategory.shortName}</h2>
              <p className="text-sm md:text-lg font-medium leading-relaxed italic">{t(categoryDescriptions[selectedCategory.nameKey]?.introKey)}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 4: GALLERY GRID */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-14">
          <div className="mb-12 border-l-4 border-[#0F5F58] pl-6">
            <h2 className="text-3xl font-bold text-[#0F5F58]">{t('org_active_programs')}</h2>
            <p className="text-[#0F5F58]/60 mt-2">{t('org_active_desc')} {t(selectedCategory.nameKey)}.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.1}>
                <motion.div whileHover={{ y: -10 }} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.documentation_url}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={project.event_name}
                      onError={e => (e.currentTarget.src = 'https://placehold.co/400x300/e2e8f0/94a3b8?text=No+Image')}
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-[#0F5F58]">
                      {project.year}
                    </div>
                  </div>
                  <div className="p-8">
                    <h4 className="text-xs font-black text-teal-600 uppercase tracking-widest mb-2">
                      {project.organization?.name}
                    </h4>
                    <h3 className="text-2xl font-bold text-[#0F5F58] mb-4 group-hover:text-teal-600 transition-colors">{project.event_name}</h3>
                    <p className="text-sm text-[#0F5F58]/70 leading-relaxed">{project.traits_achievement}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
            {filteredProjects.length === 0 && !loading && (
              <div className="col-span-full text-center py-16 text-[#0F5F58]/40">
                Belum ada dokumentasi untuk kategori ini.
              </div>
            )}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </MainLayout>
  );
};

export default MoreOrg;