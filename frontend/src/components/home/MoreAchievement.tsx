import { useState, useEffect } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Culinarypartner from '@/assets/culinary-scene.jpg';

const MoreAchievement = () => {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-background overflow-hidden">
       {/* Header Section */}
       <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-32 mb-106 text-center">
         <h2 className="text-3xl font-black text-[#0F5F58] md:text-5xl">
            {t('more.achievements.title')}
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-teal-500/20" />
       </div>
      {/* Student Achievement Section */}
      <ScrollReveal delay={0.4}>
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 mt-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src={Culinarypartner} 
                alt="Student Achievement" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
              <div className="mt-6">
                <p className="text-[#0F5F58] font-bold text-sm mb-2">{t('more.achievements.date')}</p>
                <p className="text-muted-foreground text-xs leading-relaxed max-w-md">
                  {t('more.achievements.caption')}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-[#0F5F58] font-medium italic">
                {t('more.achievements.subtitle')}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-[#0F5F58] leading-tight">
                {t('more.achievements.title')}
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{t('more.achievements.desc1')}</p>
                <p>{t('more.achievements.desc2')}</p>
                <p>{t('more.achievements.desc3')}</p>
              </div>
              <div className="pt-4">
                <Link 
                  to="/about" 
                  className="inline-block px-8 py-3 bg-[#B8C5D0] hover:bg-[#A0B0BD] text-[#0F5F58] font-semibold rounded-full transition-all duration-300"
                >
                  {t('hero.learn_more')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default MoreAchievement;