import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ourVisionImg from '@/assets/our-vision.jpg';
import ourMissionImg from '@/assets/our-mission.jpg';
import ScrollReveal from '@/components/ScrollReveal';

const InteractiveCard = ({ children, delay }: { children: React.ReactNode, delay: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <ScrollReveal delay={delay}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="vision-card h-full relative group transition-colors duration-500"
      >
        {/* Efek Spotlight Glow yang mengikuti kursor */}
        <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
             style={{
               background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(20, 184, 166, 0.1), transparent 40%)`
             }}
        />
        
        <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
          {children}
        </div>
      </motion.div>
    </ScrollReveal>
  );
};

const VisionMission = () => {
  const { t } = useLanguage();
  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-primary section-title mx-auto">{t('vision.direction')}</h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto" style={{ perspective: "1000px" }}>
          {/* Vision Card */}
          <InteractiveCard delay={0.1}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 flex items-center justify-center">
                <img src={ourVisionImg} alt="our-vision" className="rounded-full shadow-lg" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">{t('vision.title')}</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4 indent-8 text-justify">
              {t('vision.desc1')}
            </p>
            <p className="text-muted-foreground leading-relaxed indent-8 text-justify">
              {t('vision.desc2')}
            </p>
          </InteractiveCard>

          {/* Mission Card */}
          <InteractiveCard delay={0.2}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 flex items-center justify-center">
                <img src={ourMissionImg} alt="our-mission" className="rounded-full shadow-lg" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">{t('mission.title')}</h3>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed indent-8 text-justify">
                {t('mission.desc1')}
              </p>
              <p className="text-muted-foreground leading-relaxed indent-8 text-justify">
                {t('mission.desc2')}
              </p>
            </div>
          </InteractiveCard>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;