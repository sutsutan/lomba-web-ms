import React from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Rocket, Globe, Users, TrendingUp } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import HeroCarousel from '@/components/HeroCarousel';
import ScrollReveal from '@/components/ScrollReveal';

// Import Language Hook
import { useLanguage } from '@/contexts/LanguageContext';

// Assets
import schoolImage from '@/assets/metland.jpg'; 
import logoMetland from '@/assets/metland.png';

const TiltCard = ({ misi }: { misi: any }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-full p-10 rounded-[3rem] bg-white border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(15,95,88,0.2)] transition-shadow duration-500 overflow-hidden"
    >
      <div 
        style={{ transform: "translateZ(20px)" }}
        className="absolute -bottom-10 -right-10 w-48 h-48 opacity-[0.03] grayscale pointer-events-none group-hover:scale-110 transition-transform duration-700"
      >
        <img src={logoMetland} alt="" className="w-full h-full object-contain" />
      </div>

      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        <div className={`w-14 h-14 ${misi.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:shadow-[#0F5F58]/20 transition-all duration-500`}>
          {misi.icon}
        </div>
        
        <h3 className="text-2xl font-bold text-[#0F5F58] mb-4 group-hover:text-[#2D8B82] transition-colors">
          {misi.title}
        </h3>
        <p className="text-gray-600 leading-relaxed text-lg">
          {misi.desc}
        </p>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

const VisionMission = () => {
  // 1. Inisialisasi Hook t (Translate)
  const { t } = useLanguage();
  
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // 2. Definisikan misi di dalam komponen agar teks ter-update saat bahasa berubah
  const missions = [
    {
      icon: <Rocket className="w-6 h-6 text-white" />,
      title: t("misi1_title"),
      desc: t("misi1_desc"),
      color: "bg-[#0F5F58]"
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: t("misi2_title"),
      desc: t("misi2_desc"),
      color: "bg-[#2D8B82]"
    },
    {
      icon: <Globe className="w-6 h-6 text-white" />,
      title: t("misi3_title"),
      desc: t("misi3_desc"),
      color: "bg-[#B8C5D0]"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      title: t("misi4_title"),
      desc: t("misi4_desc"),
      color: "bg-[#0F5F58]"
    }
  ];

  return (
    <MainLayout>
      <HeroCarousel 
        title={t("hero_title")} 
        subtitle={t("hero_subtitle")} 
        description={t("hero_desc")}
        height="h-[60vh]"
      />

      <section className="bg-[#fcfcfc] py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />

        <div className="container mx-auto px-6 lg:px-24 relative z-10">
          
          {/* VISION SECTION */}
          <div className="mb-48">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal direction="left">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F5F58]/5 border border-[#0F5F58]/10 text-[#0F5F58] font-bold text-sm uppercase tracking-widest">
                    {t("vision_label")}
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black text-[#0F5F58] leading-tight">
                    {t("vision_title_start")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F5F58] to-[#2D8B82]">{t("vision_title_highlight")}</span>
                  </h2>
                  <div className="relative">
                    <div className="absolute -left-6 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#0F5F58] to-transparent rounded-full" />
                    <p className="text-2xl md:text-3xl text-gray-700 font-medium leading-relaxed italic pl-4">
                      {t("vision_quote")}
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.2}>
                <motion.div style={{ y: yRange }} className="relative group">
                  <div className="absolute -inset-4 bg-[#0F5F58]/10 rounded-[3rem] blur-2xl group-hover:bg-[#0F5F58]/20 transition-all duration-500" />
                  <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white group-hover:rotate-1 transition-transform duration-500">
                    <img src={schoolImage} alt="SMK Metland" className="w-full h-[500px] object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F5F58]/40 to-transparent" />
                  </div>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>

          {/* MISSION SECTION */}
          <div className="mb-48">
            <ScrollReveal>
              <div className="flex flex-col items-center mb-20 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F5F58]/5 border border-[#0F5F58]/10 text-[#0F5F58] font-bold text-sm mb-6 uppercase tracking-widest">
                  {t("mission_label")}
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-[#0F5F58]">{t("mission_section_title")}</h2>
                <div className="w-24 h-1 bg-[#B8C5D0] mt-6 rounded-full" />
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-10 perspective-1000">
              {missions.map((misi, idx) => (
                <ScrollReveal key={idx} delay={idx * 0.1}>
                  <TiltCard misi={misi} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default VisionMission;