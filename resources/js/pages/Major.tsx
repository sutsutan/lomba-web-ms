import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import { 
  Hotel, Utensils, Calculator, Palette, Code, 
  CheckCircle2, Target, Briefcase, GraduationCap 
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
    title: 'Visual Design',
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
      {/* --- DYNAMIC HERO SECTION --- */}
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

       {/* --- FLOATING NAVIGATOR --- */}
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

      {/* --- CONTENT SECTION --- */}
      <section className="py-24 bg-white text-neutral-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left: Program Highlights & Competencies */}
            <div className="lg:col-span-7 space-y-12">
              <ScrollReveal>
                <div className="space-y-6">
                  <div className="flex items-center gap-5">
                    <div 
                      className="w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-2xl transition-all duration-500" 
                      style={{ backgroundColor: current.themeColor }}
                    >
                      <Target size={32} />
                    </div>
                    <div>
                      <h2 className="text-4xl font-black tracking-tight uppercase leading-none">Program Highlights</h2>
                      <p className="text-neutral-400 font-bold tracking-[0.2em] uppercase text-[10px] mt-2">Discover your expertise</p>
                    </div>
                  </div>
                  <p className="text-xl text-neutral-600 leading-relaxed italic border-l-4 border-neutral-100 pl-8 py-2">
                    "{current.detailedInfo}"
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-neutral-400 flex items-center gap-3">
                    <GraduationCap size={18} /> Core Skill Competencies
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {current.competencies.map((item, i) => (
                      <motion.div 
                        key={item}
                        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-3xl bg-neutral-50 border border-neutral-100 flex items-center gap-4 group hover:bg-white hover:shadow-2xl hover:border-transparent transition-all duration-300"
                      >
                        <div className="p-2 rounded-xl bg-white shadow-sm group-hover:scale-110 transition-transform">
                          <CheckCircle2 className="w-5 h-5" style={{ color: current.themeColor }} />
                        </div>
                        <span className="font-bold text-neutral-800 tracking-tight">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Careers & Stats */}
            <div className="lg:col-span-5 space-y-8">
              <ScrollReveal>
                <div className={`p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group bg-gradient-to-br ${current.bgGradient}`}>
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                  
                  <h3 className="text-2xl font-black mb-8 flex items-center gap-3 tracking-tighter">
                    <Briefcase /> CAREER PROSPECTS
                  </h3>
                  <div className="space-y-3">
                    {current.careers.map((job, idx) => (
                      <motion.div 
                        key={job}
                        initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                        className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 font-bold hover:bg-white/20 transition-all duration-300 cursor-default"
                      >
                        {job}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="grid grid-cols-3 gap-2 bg-neutral-50 p-10 rounded-[3rem] border border-neutral-100 shadow-sm">
                  {[
                    { label: 'Alumni', value: current.stats.students },
                    { label: 'Partners', value: current.stats.partners },
                    { label: 'Years', value: current.stats.duration }
                  ].map((stat, i) => (
                    <div key={stat.label} className={`text-center ${i === 1 ? 'border-x border-neutral-200' : ''}`}>
                      <p className="text-3xl font-black text-neutral-950 leading-none tracking-tighter">{stat.value}</p>
                      <p className="text-[9px] uppercase text-neutral-400 font-bold tracking-[0.2em] mt-3">{stat.label}</p>
                    </div>
                  ))}
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