import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import { 
  Hotel, Utensils, Calculator, Palette, Code, 
  CheckCircle2, Target, Briefcase, GraduationCap, ArrowRight 
} from 'lucide-react';

// Assets
import hospitality from '@/assets/aph.webp';
import culinary from '@/assets/kuliner.webp';
import accounting from '@/assets/akuntansi.webp';
import dkv from '@/assets/dkv.webp';
import pplg from '@/assets/pepleg.webp';

const majorsData = [
  {
    id: 'perhotelan',
    title: 'Hospitality',
    subtitle: 'Excellence in Service',
    description: 'Transform your passion for service into a professional career. Our program focuses on international standards of guest relations, room divisions, and management.',
    image: hospitality,
    themeColor: '#0d9488',
    bgGradient: 'from-teal-500 to-emerald-600',
    icon: <Hotel className="w-6 h-6" />,
    competencies: ['Front Office Administration', 'Housekeeping Management', 'Laundry Operations', 'F&B Service Excellence'],
    careers: ['Hotel Administrator', 'Guest Service Officer', 'Executive Housekeeper', 'Cruise Ship Professional'],
    stats: { students: '420+', partners: '25+', duration: '3' },
    detailedInfo: "Students are trained in our mock-up hotel rooms and industry-standard labs to master the art of hospitality and global service protocols."
  },
  {
    id: 'kuliner',
    title: 'Culinary Arts',
    subtitle: 'Master the Kitchen',
    description: 'From traditional heritage to modern fusion. Learn the science of gastronomy, kitchen management, and the high-paced environment of professional culinary arts.',
    image: culinary,
    themeColor: '#0d9488',
    bgGradient: 'from-teal-500 to-emerald-600',
    icon: <Utensils className="w-6 h-6" />,
    competencies: ['Pastry & Bakery Arts', 'Indonesian Heritage Cuisine', 'Continental Cooking', 'Kitchen Logistics'],
    careers: ['Professional Chef', 'Pastry Specialist', 'Restaurant Manager', 'Culinary Entrepreneur'],
    stats: { students: '380+', partners: '15+', duration: '3' },
    detailedInfo: "Equipped with commercial-grade kitchens, students learn food safety (HACCP) and high-volume production for international banquets."
  },
  {
    id: 'akuntansi',
    title: 'Accounting',
    subtitle: 'Finance & Integrity',
    description: 'The backbone of every business. Master financial analysis, tax regulation, and digital accounting systems with high precision and ethical standards.',
    image: accounting,
    themeColor: '#0d9488',
    bgGradient: 'from-teal-500 to-emerald-600',
    icon: <Calculator className="w-6 h-6" />,
    competencies: ['Financial Reporting', 'Corporate Tax Audit', 'Digital Spreadsheet Mastery', 'Computerized Accounting'],
    careers: ['Financial Accountant', 'Tax Consultant', 'Internal Auditor', 'Bank Officer'],
    stats: { students: '310+', partners: '20+', duration: '3' },
    detailedInfo: "Our curriculum integrates Myob and Accurate software, ensuring graduates are ready for the digital transformation in financial sectors."
  },
  {
    id: 'dkv',
    title: 'Visual Design & Communication',
    subtitle: 'Creative Industry',
    description: 'Bring ideas to life. Explore the world of graphic design, photography, and motion graphics to become a versatile creator in the digital era.',
    image: dkv,
    themeColor: '#0d9488',
    bgGradient: 'from-teal-500 to-emerald-600',
    icon: <Palette className="w-6 h-6" />,
    competencies: ['Graphic Brand Identity', 'UI/UX Design Concept', 'Digital Illustration', 'Photography & Cinematography'],
    careers: ['Graphic Designer', 'Art Director', 'UI/UX Designer', 'Content Creator'],
    stats: { students: '460+', partners: '30+', duration: '3' },
    detailedInfo: "Focuses on creative problem solving and visual storytelling across various media platforms, from print to interactive digital assets."
  },
  {
    id: 'pplg',
    title: 'PPLG',
    subtitle: 'Building the Future',
    description: 'Code the future with us. Develop high-scale web applications, mobile apps, and immersive games using the latest technology stacks.',
    image: pplg,
    themeColor: '#0d9488',
    bgGradient: 'from-teal-500 to-emerald-600',
    icon: <Code className="w-6 h-6" />,
    competencies: ['Fullstack Web Development', 'Mobile App Development', 'Database Architecture', 'Game Development'],
    careers: ['Software Developer', 'System Analyst', 'Web Architect', 'Game Programmer'],
    stats: { students: '520+', partners: '40+', duration: '3' },
    detailedInfo: "Students dive deep into Logic, Algorithms, and Agile Development methods to solve real-world problems through innovative software solutions."
  }
];

const Major = () => {
  const [index, setIndex] = useState(0);
  const current = majorsData[index];

  return (
    <MainLayout>
      {/* DYNAMIC HERO SECTION */}
      <section className="relative h-[65vh] min-h-[600px] w-full overflow-hidden bg-neutral-900">
        <AnimatePresence mode="wait">
          <motion.div 
            key={current.id}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img src={current.image} className="w-full h-full object-cover opacity-50 scale-105" alt={current.title} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-[1]" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center">
          <motion.div
            key={current.id + "text"}
            initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            className="max-w-3xl mt-20 md:mt-0"
          >
            <span 
              className="inline-block px-4 py-1 rounded-full bg-black/40 backdrop-blur-md font-bold text-xs tracking-[0.2em] uppercase mb-4 border border-white/10"
              style={{ color: current.themeColor }}
            >
              {current.subtitle}
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-neutral-50 mb-6 uppercase tracking-tighter leading-[0.9]">
              {current.title}
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-xl">
              {current.description}
            </p>
          </motion.div>
        </div>

        {/* FLOATING NAVIGATOR */}
        <div className="absolute bottom-10 left-0 right-0 z-30 px-6 overflow-x-auto no-scrollbar py-4">
          <div className="flex justify-start md:justify-center items-center gap-6 min-w-max mx-auto px-4">
            {majorsData.map((m, i) => (
              <button
                key={m.id}
                onClick={() => setIndex(i)}
                className={`group flex flex-col items-center gap-2 transition-all duration-300 relative ${
                  index === i ? 'scale-110 z-10' : 'opacity-40 hover:opacity-100'
                }`}
              >
                <div 
                  className={`p-4 rounded-2xl bg-black/40 backdrop-blur-xl border transition-all duration-500 ${
                    index === i ? 'shadow-[0_0_25px_rgba(0,0,0,0.3)]' : 'border-white/10'
                  }`}
                  style={{ 
                    borderColor: index === i ? m.themeColor : 'transparent', 
                    color: index === i ? m.themeColor : 'white',
                    boxShadow: index === i ? `0 0 20px ${m.themeColor}33` : '' 
                  }}
                >
                  {m.icon}
                </div>
                <span className="text-[10px] font-bold text-white uppercase tracking-widest hidden md:block">
                  {m.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-1 h-10 bg-[#12606A]" />
              <h2 className="text-3xl md:text-5xl font-bold text-[#12606A] tracking-tight">
                Major Highlights
              </h2>
            </div>
            <p className="text-[#12606A] text-lg max-w-2xl ml-5">
              Every major at Metland School is designed to equip students with industry-relevant skills, ensuring they are ready to excel in their chosen fields.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* DETAIL SECTION */}
      <section className="pb-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              {/* Image Side */}
              <div className="relative pt-8 pr-8"> 
                <div className="absolute top-0 left-[-20px] w-32 h-32 border-t-4 border-l-4 border-[#12606A] z-20" />
                <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl bg-neutral-100">
                  <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-[350px] md:h-[400px] object-cover"
                  />
                </div>

                {/* Stats Overlay */}
                <div className="absolute -bottom-6 -right-4 md:-right-8 bg-[#12606A]/80 text-white p-6 md:p-8 rounded-2xl shadow-[0_20px_50px_rgba(15,95,88,0.3)] z-20 min-w-[240px]">
                  <div className="flex justify-around items-center gap-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold">{current.stats.students}</p>
                      <p className="text-[10px] uppercase tracking-widest opacity-80">Students</p>
                    </div>
                    <div className="w-[1px] h-10 bg-white/20" />
                    <div className="text-center">
                      <p className="text-3xl font-bold">{current.stats.partners}</p>
                      <p className="text-[10px] uppercase tracking-widest opacity-80">Partners</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="space-y-8 mt-12 lg:mt-0">
                <div className="space-y-4">
                  <h3 className="text-4xl md:text-6xl font-black text-[#12606A] leading-none uppercase tracking-tighter">
                    {current.title}
                  </h3>
                  <p className="text-[#12606A]/70 text-lg leading-relaxed text-justify italic border-l-4 border-neutral-100 pl-6">
                    "{current.detailedInfo}"
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {current.competencies.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-100 hover:border-[#0F5F58]/30 transition-colors">
                      <CheckCircle2 size={18} className="text-[#0F5F58]" />
                      <span className="text-[#12606A] font-bold text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button className="group w-full md:w-auto flex items-center justify-center gap-3 bg-[#12606A] text-white px-10 py-5 rounded-2xl font-bold hover:bg-[#0F5F58] transition-all shadow-lg hover:shadow-[#0F5F58]/20">
                    Click to Register!
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CAREER SECTION */} 
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
               <ScrollReveal>
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white rounded-2xl shadow-sm text-[#0F5F58]">
                        <Briefcase size={32} />
                      </div>
                      <h3 className="text-3xl font-black text-[#12606A]">CAREER PROSPECTS</h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {current.careers.map((job, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
                          <p className="font-bold text-[#12606A]">{job}</p>
                        </div>
                      ))}
                    </div>
                  </div>
               </ScrollReveal>
            </div>
            
            <div className="lg:col-span-5">
               <ScrollReveal delay={0.2}>
                  <div className={`h-full p-10 rounded-[2.5rem] text-white flex flex-col justify-center relative overflow-hidden bg-gradient-to-br ${current.bgGradient}`}>
                    <div className="relative z-10">
                      <h4 className="text-2xl font-bold mb-4">Duration of Study</h4>
                      <div className="text-6xl font-black mb-6">{current.stats.duration} <span className="text-2xl opacity-70">Years</span></div>
                      <p className="opacity-80 mb-8">Integrated curriculum with intensive industry practice and professional certification.</p>
                      <div className="w-12 h-1 bg-white/30" />
                    </div>
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <GraduationCap size={120} />
                    </div>
                  </div>
               </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Major;