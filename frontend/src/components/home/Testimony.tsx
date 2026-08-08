import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Quote, X, Maximize2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { fetchPublicTestimonies, TestimonialItem } from '@/services/Testimony';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const TestimonialVideo = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('student');
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeModalVideo, setActiveModalVideo] = useState<TestimonialItem | null>(null);
  const [testimonialData, setTestimonialData] = useState<Record<string, TestimonialItem[]>>({
    student: [], parents: [], teacher: [], alumni: [], industry: []
  });
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200,
  );

  const videoRefs = useRef<Map<number, HTMLIFrameElement>>(new Map());
  const categories = Object.keys(testimonialData);

  useEffect(() => {
    fetchPublicTestimonies().then((data) => {
      const hasData = Object.values(data).some(arr => arr.length > 0);
      if (hasData) {
        setTestimonialData(data);
        const firstActive = Object.keys(data).find(key => data[key].length > 0);
        if (firstActive) setActiveTab(firstActive);
      } else {
        const fallBackUrl = 'https://www.youtube.com/embed/Ech9a-wIzTM?enablejsapi=1&autoplay=0&controls=0&loop=1&playlist=Ech9a-wIzTM&playsinline=1&rel=0';
        setTestimonialData({
          student: [
            { id: 1, name: 'Andini Julianti', role: t('testimony.role.it'), videoUrl: fallBackUrl, description: t('testimony.desc.1') },
          ],
          parents: [{ id: 4, name: 'Ibu Ratna', role: t('testimony.role.parent'), videoUrl: fallBackUrl, description: t('testimony.desc.4') }],
          teacher: [{ id: 5, name: 'Bpk. Aris', role: t('testimony.role.eng'), videoUrl: fallBackUrl, description: t('testimony.desc.5') }],
          alumni: [{ id: 6, name: 'Rizky Ramadhan', role: t('testimony.role.sw'), videoUrl: fallBackUrl, description: t('testimony.desc.6') }],
          industry: [{ id: 7, name: 'Google Indonesia', role: t('testimony.role.industry'), videoUrl: fallBackUrl, description: t('testimony.desc.7') }],
        });
      }
    });
  }, [t]);

  const controlMarsAudio = (isVideoPlaying: boolean) => {
    window.dispatchEvent(new CustomEvent('sync-metland-music', {
      detail: !isVideoPlaying
    }));
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      controlMarsAudio(false);
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((iframe) => {
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
    });
  }, [activeTab, activeIndex]);

  const handleNext = () => {
    const total = testimonialData[activeTab]?.length || 0;
    if (total === 0) return;
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    const total = testimonialData[activeTab]?.length || 0;
    if (total === 0) return;
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const getVideoPosition = (index: number) => {
    const total = testimonialData[activeTab]?.length || 0;
    const position = (index - activeIndex + total) % total;
    let spacing = windowWidth < 640 ? 80 : windowWidth < 1024 ? 150 : 220;

    return {
      left: position * spacing,
      zIndex: total - position,
      scale: 1 - position * 0.1,
      opacity: position > (windowWidth < 640 ? 2 : 3) ? 0 : 1,
      pointerEvents: (position === 0 ? 'auto' : 'none') as any,
    };
  };

  const getYoutubeEmbedUrl = (url: string, autoplay = false) => {
    let videoId = '';

    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('watch?v=')) {
      videoId = url.split('watch?v=')[1].split('&')[0];
    } else if (url.includes('/embed/')) {
      videoId = url.split('/embed/')[1].split('?')[0];
    }

    if (!videoId) return url;

    if (autoplay) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1`;
    }

    return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&controls=0&loop=1&playlist=${videoId}&playsinline=1&rel=0&modestbranding=1`;
  };

  return (
    <section className="overflow-hidden bg-white py-16 sm:py-24">
      <div className="container mx-auto px-6 lg:px-24">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={itemVariants}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-black text-[#0F5F58] md:text-5xl">
            {t('testimony.title')}
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-teal-500/20" />
        </motion.div>

        {/* Categories Tab */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="no-scrollbar mb-16 flex justify-center gap-6 overflow-x-auto border-b border-slate-100 pb-2 sm:gap-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveTab(cat);
                setActiveIndex(0);
              }}
              className={`relative pb-4 text-base font-bold transition-all sm:text-lg ${activeTab === cat ? 'text-[#0F5F58]' : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              {t('testimony.cat.' + cat)}
              {activeTab === cat && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#0F5F58]"
                />
              )}
            </button>
          ))}
        </motion.div>

        {testimonialData[activeTab] && testimonialData[activeTab].length > 0 ? (
          <motion.div
            className="flex flex-col gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Text Testimony */}
            <motion.div variants={itemVariants} className="max-w-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTab}-${activeIndex}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex gap-4"
                >
                  <Quote className="h-10 w-10 flex-shrink-0 text-teal-500 opacity-30" />
                  <div>
                    <p className="mb-4 text-lg italic leading-relaxed text-slate-600 sm:text-xl">
                      "{testimonialData[activeTab][activeIndex]?.description}"
                    </p>
                    <h4 className="text-2xl font-black text-[#0F5F58]">
                      {testimonialData[activeTab][activeIndex]?.name}
                    </h4>
                    <p className="text-sm font-bold uppercase tracking-widest text-teal-600 mb-3">
                      {testimonialData[activeTab][activeIndex]?.role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Video Stack Section */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16"
            >
              <div className="relative h-[300px] w-full overflow-visible sm:h-[400px] md:h-[450px]">
                {testimonialData[activeTab].map((item, index) => {
                  const positionStyle = getVideoPosition(index);
                  const isFront = index === activeIndex;

                  return (
                    <motion.div
                      key={item.id}
                      className="group absolute top-0 h-full w-[180px] cursor-pointer overflow-hidden border-4 border-white bg-black shadow-2xl sm:w-[280px] md:w-[320px] rounded-2xl"
                      animate={positionStyle}
                      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                      onMouseEnter={() => {
                        if (isFront) {
                          const v = videoRefs.current.get(item.id);
                          if (v && v.contentWindow) {
                            v.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                            controlMarsAudio(true);
                          }
                        }
                      }}
                      onMouseLeave={() => {
                        if (isFront) {
                          const v = videoRefs.current.get(item.id);
                          if (v && v.contentWindow) {
                            v.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                            controlMarsAudio(false);
                          }
                        }
                      }}
                      onClick={() => {
                        if (!isFront) {
                          setActiveIndex(index);
                        }
                      }}
                    >
                      <div className="absolute top-1/2 left-1/2 w-[1600px] h-[900px] max-w-none -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <iframe
                          ref={(el) => {
                            if (el) videoRefs.current.set(item.id, el);
                            else videoRefs.current.delete(item.id);
                          }}
                          src={getYoutubeEmbedUrl(item.videoUrl)}
                          className={`h-full w-full object-cover transition-all duration-700 ${isFront ? 'opacity-100 grayscale-0' : 'opacity-40 grayscale'
                            }`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                      </div>

                      {/* Subtle bottom gradient so the corner button stays legible, without covering the video's own play icon */}
                      {isFront && (
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/50 to-transparent" />
                      )}

                      {/* Simple expand button, like YouTube's fullscreen icon, tucked in a corner instead of sitting over the video */}
                      {isFront && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            controlMarsAudio(true);
                            setActiveModalVideo(item);
                          }}
                          aria-label="Perbesar video"
                          className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-lg bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-black/80 hover:scale-110 active:scale-95"
                        >
                          <Maximize2 size={16} />
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Navigation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative flex h-20 w-32 flex-shrink-0 items-center justify-center"
              >
                <div className="absolute left-1/2 top-1/2 h-24 w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-[45deg] bg-[#0F5F58]/20" />
                <button
                  onClick={handlePrev}
                  className="group absolute -top-2 left-0 flex h-12 w-12 rotate-45 items-center justify-center border-2 border-[#0F5F58]/30 transition-all hover:bg-[#0F5F58] hover:text-white"
                >
                  <ChevronLeft className="-rotate-45" />
                </button>
                <button
                  onClick={handleNext}
                  className="group absolute -bottom-2 right-0 flex h-12 w-12 rotate-45 items-center justify-center border-2 border-[#0F5F58]/30 transition-all hover:bg-[#0F5F58] hover:text-white"
                >
                  <ChevronRight className="-rotate-45" />
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <div className="text-center py-12 text-slate-400">Belum ada data testimoni pada kategori ini.</div>
        )}
      </div>

      {/* Full Video Modal - now with a white card */}
      <AnimatePresence>
        {activeModalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md"
            onClick={() => {
              setActiveModalVideo(null);
              controlMarsAudio(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-200 p-5 bg-white text-slate-900">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span>{activeModalVideo.name}</span>
                    <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                      {activeModalVideo.role}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1 italic">
                    "{activeModalVideo.description}"
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveModalVideo(null);
                    controlMarsAudio(false);
                  }}
                  className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Video Player */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={getYoutubeEmbedUrl(activeModalVideo.videoUrl, true)}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TestimonialVideo;