import { motion } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import { 
  Users, 
  Palette, 
  ShieldCheck, 
  HeartPulse, 
  ArrowRight, 
  Star,
  Zap
} from 'lucide-react';

// Import assets (Pastikan path sesuai dengan project Anda)
import programIt from '@/assets/program-it.jpg';
import programCulinary from '@/assets/program-culinary.jpg';
import cims from '@/assets/cims.jpeg';
import osis from '@/assets/logo-osis.png';
import mpk from '@/assets/mpk-logo.png';
import itec from '@/assets/Logo_ITEC.png';
import msp from '@/assets/msp.jpeg';
import kkr from '@/assets/kkr.jpeg';
import mahes from '@/assets/mahes.png';
import mse from '@/assets/mse.png';
import mcs from '@/assets/MCSLogo.png';
import rohkris from '@/assets/rohkris.png';

interface Organization {
  name: string;
  description: string;
  category: string;
  image: string;
}

const organizations: Record<string, Organization[]> = {
  leadership: [
    {
      name: 'Osis Student Council',
      description: 'The heartbeat of student life, organizing major events and representing the student voice to the school board.',
      category: 'Leadership & Governance',
      image: osis,
    },
    {
      name: 'MPK Representatives',
      description: 'The supreme student legislative body, ensuring transparency and bridging ideas between students and faculty.',
      category: 'Leadership & Governance',
      image: mpk,
    },
  ],
  creative: [
     {
      name: 'Maheswara - Maheswari',
      description: 'Preserving tradition and modern art through breathtaking dance and stage performances.',
      category: 'Performing Arts',
      image: mahes,
    },
    {
      name: 'CIMS Cinematography',
      description: 'A creative powerhouse for aspiring filmmakers, editors, and digital storytellers.',
      category: 'Media & Production',
      image: cims,
    },
    {
      name: 'MSE (Metland School of Entertainment)',
      description: 'Preserving tradition and modern art through breathtaking dance and stage performances.',
      category: 'Performing Arts',
      image: mse,
    },
    {
      name: 'CILVOK (Cileungsi Vocal)',
      description: 'Preserving tradition and modern art through breathtaking dance and stage performances.',
      category: 'Performing Arts',
      image: mahes,
    },
  ],
  discipline: [
    {
      name: 'Pramuka (Scouts)',
      description: 'Building resilience, survival skills, and a strong sense of community through outdoor adventures.',
      category: 'Outdoor Leadership',
      image: programIt,
    },
    {
      name: 'Paskibra',
      description: 'The epitome of precision and discipline, training students for national-level ceremonial excellence.',
      category: 'Ceremonial & Drill',
      image: programCulinary,
    },
  ],
  wellness: [
    {
      name: 'Rohis (Muslim Spiritual)',
      description: 'Fostering spiritual growth and moral integrity through community worship and discussion.',
      category: 'Faith & Community',
      image: programIt,
    },
       {
      name: 'Rohkris (Christiants Spiritual)',
      description: 'Fostering spiritual growth and moral integrity through community worship and discussion.',
      category: 'Faith & Community',
      image: rohkris,
    },
       {
      name: 'GIFT (Grow in Faith : Catholic)',
      description: 'Fostering spiritual growth and moral integrity through community worship and discussion.',
      category: 'Faith & Community',
      image: programIt,
    },
       {
      name: 'Rohbud (Buddhist Spiritual)',
      description: 'Fostering spiritual growth and moral integrity through community worship and discussion.',
      category: 'Faith & Community',
      image: programIt,
    },
    {
      name: 'KKR (Health Cadets)',
      description: 'Promoting healthy lifestyles and emergency response skills within the school environment.',
      category: 'Health & Safety',
      image: kkr,
    },
    {
      name: 'MCS (Metland Care & Share)',
      description: 'Promoting compassion, community service, and social responsibility among students.',
      category: 'Community Service',
      image: mcs,
    },
    {
      name: 'CK (Culinary Kingdom)',
      description: 'A hub for technical innovation and project-based learning for the future tech industry.',
      category: 'Production & Technology',
      image: msp,
    },
      {
      name: 'ITEC (Information Technology Engineering Club)',
      description: 'A hub for technical innovation and project-based learning for the future tech industry.',
      category: 'Production & Technology',
      image: itec,
    },
    {
      name: 'MSP (Metland School Projects)',
      description: 'A hub for technical innovation and project-based learning for the future tech industry.',
      category: 'Production & Technology',
      image: msp,
    },
  ],
};

const OrganizationPage = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroCarousel
        title="Learning Beyond Class"
        subtitle="Student Organizations"
        description="Empowering the next generation of leaders through passion, collaboration, and real-world experience."
        height="min-h-[50vh]"
      />

      <div className="bg-slate-50/30">
        {/* SECTION 1: LEADERSHIP (Featured Cards) */}
        <section className="section-padding overflow-hidden">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="flex flex-col items-center text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-6">
                  <Star className="w-4 h-4" /> Core Organizations
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Leadership & Governance</h2>
                <div className="w-20 h-1.5 bg-primary rounded-full" />
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
              {organizations.leadership.map((org, index) => (
                <ScrollReveal key={org.name} delay={index * 0.2}>
                  <div className="group relative bg-white rounded-[2.5rem] p-5 shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                    <div className="relative h-72 md:h-80 rounded-[2rem] overflow-hidden">
                      <img
                        src={org.image}
                        alt={org.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 blur-[0.5px] group-hover:blur-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                      <div className="absolute bottom-8 left-8 right-8">
                        <span className="text-primary-light font-bold text-xs uppercase tracking-[0.2em] mb-3 block">
                          {org.category}
                        </span>
                        <h3 className="text-3xl font-bold text-white tracking-tight">{org.name}</h3>
                      </div>
                    </div>
                    <div className="p-8">
                      <p className="text-slate-600 leading-relaxed text-lg italic font-medium">
                        "{org.description}"
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: CREATIVE (Horizontal Bento) */}
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-2 bg-pink-100 rounded-lg text-pink-600">
                    <Palette className="w-6 h-6" />
                  </div>
                  <h3 className="text-primary font-bold tracking-widest uppercase text-sm">Creative Hub</h3>
                </div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">Arts & Performances</h2>
              </ScrollReveal>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {organizations.creative.map((org, index) => (
                <ScrollReveal key={org.name} delay={index * 0.1}>
                  <div className="flex flex-col sm:flex-row gap-8 p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 group border border-transparent hover:border-slate-100">
                    <div className="w-full sm:w-44 h-44 shrink-0 rounded-2xl overflow-hidden shadow-md">
                      <img 
                        src={org.image} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        alt={org.name} 
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors italic">
                        {org.name}
                      </h4>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6">{org.description}</p>
                      <button className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest group/btn">
                        Explore Gallery <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: DISCIPLINE (Dark Contrast Mode) */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="container mx-auto px-6 relative z-10">
            <ScrollReveal>
              <div className="mb-16 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm">Elite Discipline</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">Character & Honor</h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8">
              {organizations.discipline.map((org, index) => (
                <ScrollReveal key={org.name} delay={index * 0.1}>
                  <div className="group flex flex-col md:flex-row gap-8 p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-500">
                    <div className="w-24 h-24 shrink-0 rounded-2xl bg-primary/20 flex items-center justify-center overflow-hidden border border-white/10 mx-auto md:mx-0">
                      <img src={org.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="" />
                    </div>
                    <div className="text-center md:text-left">
                      <h4 className="text-2xl font-bold mb-3 tracking-wide group-hover:text-primary transition-colors">{org.name}</h4>
                      <p className="text-slate-400 leading-relaxed">{org.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: WELLNESS (Minimalist Grid) */}
        <section className="py-24 bg-slate-50/50">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="p-4 bg-white shadow-sm rounded-2xl w-fit mx-auto mb-6">
                  <Zap className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Innovation & Wellbeing</h2>
                <p className="text-slate-500 text-lg">Nurturing the mind, soul, and future skills.</p>
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-3 gap-8">
              {organizations.wellness.map((org, index) => (
                <ScrollReveal key={org.name} delay={index * 0.1}>
                  <div className="h-full bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 group">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 overflow-hidden border border-slate-100 group-hover:border-primary/30 transition-colors">
                      <img src={org.image} alt="" className="w-full h-full object-cover scale-110" />
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-primary transition-colors">{org.name}</h4>
                    <p className="text-slate-500 leading-relaxed mb-8 flex-1">{org.description}</p>
                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                        {org.category}
                      </span>
                      <HeartPulse className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default OrganizationPage;