import { motion } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import programIt from '@/assets/program-it.webp';
import programCulinary from '@/assets/program-culinary.webp';
import achievement from '@/assets/achievement-1.jpg';
import programDkv from '@/assets/program-dkv.jpg';

const Academics = () => {
  const { t } = useLanguage();

  const majors = [
    {
      name: t('category.it'),
      description: t('academics.majors.pplg.desc'),
    },
    {
      name: t('category.accounting'),
      description: t('academics.majors.accounting.desc'),
    },
    {
      name: t('category.culinary'),
      description: t('academics.majors.culinary.desc'),
    },
    {
      name: t('category.hospitality'),
      description: t('academics.majors.hospitality.desc'),
    },
    {
      name: t('category.dkv'),
      description: t('academics.majors.dkv.desc'),
    },
  ];

  const timelineItems = [
    { 
      image: programIt,
      title: t('academics.timeline.1.title'),
      subtitle: t('academics.timeline.1.subtitle'),
      description: t('academics.timeline.1.desc')
    },
    { 
      image: programCulinary, 
      title: t('academics.timeline.2.title'),
      subtitle: t('academics.timeline.2.subtitle'),
      description: t('academics.timeline.2.desc')
    },
    { 
      image: achievement, 
      title: t('academics.timeline.3.title'),
      subtitle: t('academics.timeline.3.subtitle'),
      description: t('academics.timeline.3.desc')
    },
    { 
      image: programIt, 
      title: t('academics.timeline.4.title'),
      subtitle: t('academics.timeline.4.subtitle'),
      description: t('academics.timeline.4.desc')
    }, 
  ];

  const studentWorks = [
    { title: t('academics.works.1.title'), tag: t('academics.works.1.tag'), desc: t('academics.works.1.desc'), image: programIt },
    { title: t('academics.works.2.title'), tag: t('academics.works.2.tag'), desc: t('academics.works.2.desc'), image: programCulinary },
    { title: t('academics.works.3.title'), tag: t('academics.works.3.tag'), desc: t('academics.works.3.desc'), image: programDkv },
    { title: t('academics.works.4.title'), tag: t('academics.works.4.tag'), desc: t('academics.works.4.desc'), image: achievement },
  ];

  return (
    <MainLayout>
      {/* Hero Carousel */}
      <HeroCarousel
        title={t('academics.hero.title')}
        subtitle={t('academics.hero.subtitle')}
        description={t('academics.hero.desc')}
        height="h-[70vh]"
      />

      {/* Main Content: Two Columns */}
      <section className="section-padding bg-background overflow-hidden px-6 md:px-12">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 relative">
            
            {/* Left Column: Text & Majors */}
            <div className="lg:col-span-5 space-y-12 lg:ml-20">
              <ScrollReveal>
                <div className="space-y-6">
                  <h2 className="section-title text-3xl md:text-4xl text-primary font-bold">{t('academics.main.title')}</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed text-pretty">
                    <p className='text-[#12606A] font-medium text-justify'>
                      {t('academics.main.desc1')}
                    </p>
                    <p className='text-[#12606A] font-medium text-justify'>
                      {t('academics.main.desc2')}
                    </p>
                    <p className='text-[#12606A] font-medium text-justify'>
                      {t('academics.main.desc3')}
                    </p>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="relative inline-block text-2xl font-bold text-primary mb-6">
                    {t('academics.majors.title')}
                    <div className="absolute -bottom-2 left-0 h-1 w-24 rounded-full bg-primary" />
                  </h3>
                  <ul className="space-y-4">
                    {majors.map((major, index) => (
                      <li key={index} className="flex gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                        <p className="text-primary font-medium">
                          <strong className="text-primary">{major.name}</strong> – {major.description}
                        </p>  
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Timeline & Cards */}
            <div className="lg:col-span-7 relative lg:ml-[160px]">
               {/* Vertical Line */}
               <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-[#12606A] hidden md:block"></div>
               
               <div className="space-y-12">
                 {timelineItems.map((item, index) => (
                   <ScrollReveal key={index} delay={index * 0.2}>
                     <div className="relative flex items-center md:items-start gap-8">
                       
                       {/* Timeline Marker (Diamond) */}
                       <div className="hidden md:flex flex-shrink-0 z-10 mt-[76px] relative">
                          <div className="w-10 h-10 bg-background flex items-center justify-center">
                             {/* Diamond Shape */}
                             <div className="w-4 h-4 border-2 border-primary rotate-45 bg-background"></div>
                             {/* Crosshair effect for diamond - optional based on "decoration" */}
                             <div className="absolute w-8 h-px bg-primary/30"></div>
                             <div className="absolute h-8 w-px bg-primary/30"></div>
                          </div>
                          {/* Inner dot */}
                          <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          </div>
                       </div>

                       {/* Card */}
                       <div className="bg-primary rounded-xl overflow-hidden shadow-xl w-full max-w-lg card-hover border-none">
                          <div className="h-48 overflow-hidden relative">
                            <img 
                              src={item.image} 
                              alt="Vocational Excellence" 
                              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 border-none outline-none" 
                            />
                          </div>
                          <div className="p-6 text-primary-foreground">
                            <div className="flex items-center gap-4 mb-2">
                               <h4 className="text-xl font-bold">{item.title}</h4>
                            </div>
                            <p className="text-xs text-primary-foreground/80 mb-1 font-medium">
                              {item.subtitle}
                            </p>
                            <p className="text-xs text-primary-foreground/70 leading-relaxed font-medium">
                              {item.description}
                            </p>
                          </div>
                       </div>
                     </div>
                   </ScrollReveal>
                 ))}
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Student Works */}
      <section className="section-padding bg-background pb-32" id="works">
        <div className="container mx-auto px-6 md:px-12">
          <ScrollReveal>
             {/* Header */}
             <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                   <div className="w-1 h-12 bg-[#12606A] rounded-full" />
                   <h2 className="text-3xl md:text-4xl font-bold text-[#12606A]">{t('academics.works.title')}</h2>
                </div>
                <Link to="/student-works" className="px-6 py-2 rounded-full bg-gray-200 text-[#12606A] font-medium hover:bg-gray-300 transition-colors text-sm">
                   {t('academics.works.view_all')}
                </Link>
             </div>

             {/* Bento Grid Layout */}
             <div className="grid lg:grid-cols-2 gap-6 h-auto lg:h-[600px]">
                
                {/* Left Large Card */}
                <div className="relative rounded-lg overflow-hidden group h-[350px] lg:h-full shadow-lg">
                   <img src={studentWorks[2].image} alt="Student Work 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                   <div className="absolute bottom-8 left-8 right-8 text-white">
                      <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium mb-3 inline-block">{studentWorks[2].tag}</span>
                      <h3 className="font-bold text-xl mb-1">{studentWorks[2].title}</h3>
                      <p className="text-white/80 text-sm opacity-90">{studentWorks[2].desc}</p>
                   </div>
                </div>

                {/* Right Column Grid */}
                <div className="grid grid-rows-2 h-full">
                   
                   {/* Top Row: 2 Cards */}
                   <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                      {/* Top Left */}
                      <div className="relative rounded-lg overflow-hidden group h-[280px] shadow-lg">
                         <img src={studentWorks[0].image} alt="Student Work 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                         <div className="absolute bottom-6 left-6 right-6 text-white">
                            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-medium mb-2 inline-block">{studentWorks[0].tag}</span>
                            <h3 className="font-bold text-lg mb-1">{studentWorks[0].title}</h3>
                            <p className="text-white/80 text-xs opacity-90">{studentWorks[0].desc}</p>
                         </div>
                      </div>
                      
                      {/* Top Right */}
                      <div className="relative rounded-lg overflow-hidden group h-[280px] shadow-lg">
                         <img src={studentWorks[1].image} alt="Student Work 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                         <div className="absolute bottom-6 left-6 right-6 text-white">
                            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-medium mb-2 inline-block">{studentWorks[1].tag}</span>
                            <h3 className="font-bold text-lg mb-1">{studentWorks[1].title}</h3>
                            <p className="text-white/80 text-xs opacity-90">{studentWorks[1].desc}</p>
                         </div>
                      </div>
                   </div>

                   {/* Bottom Row: Wide Card */}
                   <div className="relative rounded-lg overflow-hidden group h-[300px] shadow-lg">
                      <img src={studentWorks[3].image} alt="Student Work 4" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-8 left-8 right-8 text-white">
                         <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium mb-3 inline-block">{studentWorks[3].tag}</span>
                         <h3 className="font-bold text-xl mb-1">{studentWorks[3].title}</h3>
                         <p className="text-white/80 text-sm opacity-90">{studentWorks[3].desc}</p>
                      </div>
                   </div>

                </div>

             </div>
          </ScrollReveal>
        </div>
      </section>
    </MainLayout>
  );
};

export default Academics;
