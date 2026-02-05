import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import { 
  Hotel, Utensils, Calculator, Palette, Code, 
  CheckCircle2, Target, Briefcase, GraduationCap 
} from 'lucide-react';
import hospitality from '@/assets/aph.webp';
import culinary from '@/assets/kuliner.webp';
import accounting from '@/assets/akuntansi.webp';
import dkv from '@/assets/dkv.webp';
import pplg from '@/assets/pepleg.webp';

const majorsData = [
  {
    id: 'perhotelan',
    title: 'Perhotelan',
    subtitle: 'Hospitality & Tourism',
    description: 'Menyiapkan tenaga profesional di bidang akomodasi dan pelayanan tamu dengan standar internasional.',
    image: hospitality,
    color: 'teal',
    icon: <Hotel className="w-6 h-6" />,
    stats: { students: '400+', partners: '25+ Hotels', duration: '3 Years' },
    competencies: ['Front Office Management', 'Housekeeping Operations', 'Laundry Service', 'Food & Beverage Service'],
    careers: ['Hotel Manager', 'Receptionist', 'Executive Housekeeper', 'Cruise Ship Staff']
  },
  {
    id: 'kuliner',
    title: 'Kuliner',
    subtitle: 'Culinary Arts',
    description: 'Menguasai seni mengolah makanan dari tradisional hingga internasional dengan manajemen dapur profesional.',
    image: culinary,
    color: 'orange',
    icon: <Utensils className="w-6 h-6" />,
    stats: { students: '350+', partners: '15+ Resto', duration: '3 Years' },
    competencies: ['Pastry & Bakery', 'Indonesian Cuisine', 'International Cuisine', 'Kitchen Management'],
    careers: ['Professional Chef', 'Pastry Chef', 'Restaurateur', 'F&B Consultant']
  },
  {
    id: 'akuntansi',
    title: 'Akuntansi',
    subtitle: 'Finance & Business',
    description: 'Membentuk ahli keuangan yang teliti, jujur, dan mahir menggunakan teknologi akuntansi modern.',
    image: accounting,
    color: 'blue',
    icon: <Calculator className="w-6 h-6" />,
    stats: { students: '300+', partners: '20+ Firms', duration: '3 Years' },
    competencies: ['Financial Reporting', 'Corporate Tax', 'Audit Systems', 'Computerized Accounting'],
    careers: ['Accountant', 'Tax Consultant', 'Banker', 'Financial Analyst']
  },
  {
    id: 'dkv',
    title: 'DKV',
    subtitle: 'Visual Design',
    description: 'Ekspresikan kreativitas melalui desain grafis, fotografi, dan videografi di industri kreatif digital.',
    image: dkv,
    color: 'purple',
    icon: <Palette className="w-6 h-6" />,
    stats: { students: '450+', partners: '30+ Studios', duration: '3 Years' },
    competencies: ['Graphic Design', 'UI/UX Design', 'Digital Imaging', 'Motion Graphics'],
    careers: ['Graphic Designer', 'Photographer', 'Art Director', 'Content Creator']
  },
  {
    id: 'pplg',
    title: 'PPLG',
    subtitle: 'Software Engineering',
    description: 'Membangun masa depan melalui coding, pengembangan aplikasi web, mobile, hingga pembuatan gim.',
    image: pplg,
    color: 'indigo',
    icon: <Code className="w-6 h-6" />,
    stats: { students: '500+', partners: '40+ Tech Co', duration: '3 Years' },
    competencies: ['Web Development', 'Mobile App Dev', 'Database Management', 'Game Programming'],
    careers: ['Fullstack Developer', 'App Developer', 'Game Programmer', 'System Analyst']
  }
];

const Major = () => {
  const [index, setIndex] = useState(0);
  const current = majorsData[index];

  return (
    <MainLayout>
      {/* DYNAMIC HERO */}
      <section className="relative h-[60vh] min-h-[600px] w-full overflow-hidden bg-neutral-600">
        <AnimatePresence mode="wait">
          <motion.div 
            key={current.id}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <img src={current.image} className="w-full h-full object-cover opacity-40 scale-105" alt="" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-[1]" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center">
          <motion.div
            key={current.id + "content"}
            initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-neutral-900/50 backdrop-blur-md text-teal-400 font-bold text-xs tracking-widest uppercase mb-4">
              {current.subtitle}
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-neutral-50 mb-6 uppercase tracking-tighter">
              {current.title}
            </h1>
            <p className="text-xl text-neutral-50 leading-relaxed max-w-xl">
              {current.description}
            </p>
          </motion.div>
        </div>

        {/* Floating Navigation Dots for Major Switcher */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-30">
          {majorsData.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setIndex(i)}
              className={`group relative p-4 transition-all ${index === i ? 'scale-110' : 'opacity-50 hover:opacity-100'}`}
            >
              <div className={`flex flex-col items-center gap-2`}>
                 <div className={`p-3 rounded-xl bg-neutral/50 backdrop-blur-md border ${index === i ? 'border-teal-400 text-teal-400' : 'border-white/20 text-white'}`}>
                   {m.icon}
                 </div>
                 <span className="text-[10px] font-bold text-neutral-50 uppercase tracking-widest hidden md:block">{m.title}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* DYNAMIC CONTENT BASED ON HERO SELECTION */}
      <section className="py-24 bg-neutral-50 text-neutral-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left: Competencies */}
            <div className="lg:col-span-7">
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/20 flex items-center justify-center text-teal-400">
                    <Target />
                  </div>
                  <h2 className="text-3xl font-bold">Kompetensi Keahlian</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {current.competencies.map((item, i) => (
                    <motion.div 
                      key={item}
                      initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                      className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4 hover:bg-white/10 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-teal-400 mt-1" />
                      <span className="font-medium text-neutral-950">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Career & Stats */}
            <div className="lg:col-span-5 space-y-12">
              <ScrollReveal>
                <div className="p-8 rounded-3xl bg-gradient-to-br from-teal-500 to-emerald-600">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Briefcase /> Prospek Karier
                  </h3>
                  <div className="space-y-4">
                    {current.careers.map(job => (
                      <div key={job} className="bg-white/20 backdrop-blur-sm p-4 rounded-xl font-bold">
                        {job}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-black text-neutral-50">{current.stats.students.split(' ')[0]}</p>
                    <p className="text-[10px] uppercase text-slate-500 font-bold">Siswa Aktif</p>
                  </div>
                  <div className="text-center border-x border-white/10">
                    <p className="text-3xl font-black text-neutral-50">{current.stats.partners.split(' ')[0]}</p>
                    <p className="text-[10px] uppercase text-slate-500 font-bold">Mitra Industri</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-black text-neutral-950">3</p>
                    <p className="text-[10px] uppercase text-slate-500 font-bold">Tahun Studi</p>
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