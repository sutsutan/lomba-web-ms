import { motion } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import { ArrowRight } from 'lucide-react';
import programIt from '@/assets/program-it.jpg';
import programCulinary from '@/assets/program-culinary.jpg';
import achievement from '@/assets/achievement-1.jpg';

const majors = [
  {
    name: 'PPLG (IT & Software)',
    description: 'Learn software development, web programming, and digital problem solving.',
  },
  {
    name: 'Akuntansi Bisnis',
    description: 'Master accounting fundamentals and business finance management.',
  },
  {
    name: 'Kuliner',
    description: 'Explore culinary arts, food preparation, and restaurant management.',
  },
  {
    name: 'Perhotelan',
    description: 'Develop hospitality skills, customer service, and hotel operations.',
  },
  {
    name: 'Desain Komunikasi Visual (DKV)',
    description: 'Create visual content, branding, and multimedia design.',
  },
];

const studentWorks = [
  { title: 'Mobile App UI Design', student: 'SMK METLAND', image: programIt },
  { title: 'Culinary Presentation', student: 'SMK METLAND', image: programCulinary },
  { title: 'Brand Identity Project', student: 'SMK METLAND', image: achievement },
  { title: 'Web Development', student: 'SMK METLAND', image: programIt },
  { title: 'Photography Portfolio', student: 'SMK METLAND', image: programCulinary },
];

const Academics = () => {
  return (
    <MainLayout>
      {/* Hero Carousel */}
      <HeroCarousel
        title="Academics"
        subtitle="Empowering Vocational Excellence"
        description="SMK Metland School is a vocational secondary school that focuses on preparing students for their future careers. Learning activities are designed to help students gain practical skills for real-life situations."
      />

      {/* Academics Overview */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="section-title text-3xl md:text-4xl">Academics</h2>
                <div className="space-y-4 mt-8">
                  <p className="text-muted-foreground leading-relaxed">
                    Empowering Vocational Excellence - SMK Metland School is a 
                    vocational secondary school that focuses on preparing students 
                    for their future careers. Learning activities are designed to 
                    help students not only understand academic concepts, but also 
                    gain practical skills that can be applied in real-life situations.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Our programs combine industry-relevant skills, character 
                    development, and hands-on practice. Through this approach, 
                    students learn discipline, responsibility, teamwork, and 
                    self-confidence—qualities that are important both in the 
                    workplace and in daily life.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    By balancing academic learning with practical experience, 
                    SMK Metland School supports students in continuing to higher 
                    education or entering the workforce with strong skills and 
                    positive character.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative space-y-4">
                {[programIt, programCulinary, achievement].map((img, index) => (
                  <div 
                    key={index}
                    className={`relative rounded-2xl overflow-hidden shadow-lg ${
                      index === 0 ? 'ml-auto w-4/5' : index === 1 ? 'w-4/5' : 'ml-auto w-4/5'
                    }`}
                  >
                    <img src={img} alt="Academic program" className="w-full h-48 object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-4">
                      <span className="text-white text-sm font-medium">Academics</span>
                      <p className="text-white/80 text-xs mt-1">
                        Empowering Vocational Excellence
                      </p>
                    </div>
                    {/* Diamond decoration */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-2 border-white/50 rotate-45" />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Majors */}
      <section className="section-padding bg-section">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="section-title text-3xl md:text-4xl mb-12">Majors</h2>
          </ScrollReveal>

          <div className="space-y-4">
            {majors.map((major, index) => (
              <ScrollReveal key={major.name} delay={index * 0.1}>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">{major.name}</h3>
                    <p className="text-muted-foreground text-sm">{major.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Student Works */}
      <section className="section-padding bg-muted" id="works">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-12">
              <h2 className="section-title text-3xl md:text-4xl">Student Works</h2>
              <button className="btn-primary inline-flex items-center gap-2">
                View All Projects
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentWorks.map((work, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div className="group relative rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={work.image} 
                    alt={work.title} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-white/70 text-xs mb-1 block">Web Development</span>
                    <h3 className="text-white font-bold text-lg">{work.student}</h3>
                    <p className="text-white/80 text-sm">{work.title}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Academics;
