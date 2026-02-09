import React from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import HeroCarousel from '@/components/HeroCarousel';
import ScrollReveal from '@/components/ScrollReveal';
import { ShieldCheck, CheckCircle2, Heart, Sparkles, Trophy, Lightbulb } from 'lucide-react';
import gcp from '@/assets/gcp.png';
import logoMetland from '@/assets/metland.png';

const OurValues = () => {
  const cintaPoints = [
    "Tuhan", "Orang Tua", "Guru", "Ilmu Pengetahuan",
    "Bangsa & Tanah Air", "Alam & Budaya", "Sahabat", "Diri Sendiri"
  ];

  const prestasiPoints = [
    { l: "P", t: "Percaya Diri yang Kuat" },
    { l: "R", t: "Riang & Optimis" },
    { l: "E", t: "Empati" },
    { l: "S", t: "Sehat Jiwa & Raga" },
    { l: "T", t: "Tidak Pantang Menyerah" },
    { l: "A", t: "Amanah Pemimpin" },
    { l: "S", t: "Pribadi Mandiri" },
    { l: "I", t: "Inovatif & Bermanfaat" },
  ];

  const goldenRules = [
    "Place Honesty In the Priority above all.",
    "Should be present according to the timing of attendance.",
    "Should speak politely and behave well.",
    "Well Groomed and dressed respectfully.",
    "No Bullying and no sexual harassment.",
    "No smoking at the school area.",
    "Keep the school clean and beautiful.",
    "Smile and greet everyone you meet."
  ];

  const teachersValues = [
    { word: "METLAND", list: [
      { l: "M", t: "Model In Integrity" }, { l: "E", t: "Enthusiastic" },
      { l: "T", t: "Team work" }, { l: "L", t: "Leadership" },
      { l: "A", t: "Action make it real" }, { l: "N", t: "Notion" },
      { l: "D", t: "Dedication to service quality" }
    ]},
    { word: "SCHOOL", list: [
      { l: "S", t: "Sincere" }, { l: "C", t: "Creative" },
      { l: "H", t: "Helpful" }, { l: "O", t: "Optimistic" },
      { l: "O", t: "Ordinary Teacher People" }, { l: "L", t: "Loving" }
    ]}
  ];

  return (
    <MainLayout>
      <HeroCarousel 
        title="Our Values" 
        subtitle="The Metland Way" 
        description="Filosofi mendalam yang membentuk ekosistem pendidikan di SMK Metland School."
        height="h-[70vh]"
      />

      <section className="bg-[#fcfcfc] py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />

        <div className="container mx-auto px-6 lg:px-24 relative z-10">
          
          {/* GENERASI CINTA PRESTASI */}
          <div className="mb-48">
            <ScrollReveal>
              <div className="flex flex-col items-center mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F5F58]/5 border border-[#0F5F58]/10 text-[#0F5F58] font-bold text-sm mb-6 uppercase tracking-widest">
                  <Sparkles className="w-4 h-4" /> Core Values
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-[#0F5F58] text-center">
                  Generasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F5F58] to-[#2D8B82]">Cinta Prestasi</span>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <motion.div whileHover={{ y: -5 }} className="md:col-span-4 flex flex-col items-center justify-center relative overflow-hidden">
                <img src={gcp} alt="GCP Logo" className="w-full max-w-[350px] object-contain mb-6" />
              </motion.div>

              <div className="md:col-span-8 bg-[#0F5F58] p-10 rounded-[3rem] shadow-2xl text-white relative overflow-hidden border border-[#0F5F58]">
                <Heart className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 rotate-12" />
                <h3 className="text-3xl font-bold mb-8 flex items-center gap-4">
                  Nilai <span className="italic underline decoration-[#B8C5D0] underline-offset-8">CINTA</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cintaPoints.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 hover:bg-white/20 transition-all">
                      <CheckCircle2 className="w-5 h-5 text-[#B8C5D0]" />
                      <span className="font-medium tracking-wide">CINTA {item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nilai PRESTASI */}
              <div className="md:col-span-12 bg-white p-10 md:p-14 rounded-[3rem] shadow-xl border border-gray-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#0F5F58]/5 rounded-full blur-3xl -mr-32 -mt-32 transition-colors group-hover:bg-[#0F5F58]/10" />
                
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-12 bg-[#0F5F58] rounded-xl flex items-center justify-center shadow-lg shadow-[#0F5F58]/20">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-4xl font-black text-[#0F5F58] tracking-tight">Nilai <span className="text-[#B8C5D0]">PRESTASI</span></h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                  {prestasiPoints.map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -10 }} 
                      className="group/card relative p-7 rounded-[2rem] bg-[#f8f9fa] border border-transparent hover:border-[#0F5F58]/20 hover:bg-white hover:shadow-[0_20px_40px_rgba(15,95,88,0.1)] transition-all duration-500"
                    >
                      <div className="flex justify-between items-start mb-5">
                        <div className="text-4xl font-black text-[#0F5F58]/10 group-hover/card:text-[#0F5F58]/30 transition-colors uppercase italic">
                          {item.l}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="h-1 w-6 bg-[#0F5F58]/20 group-hover/card:w-12 group-hover/card:bg-[#0F5F58] transition-all duration-500 rounded-full" />
                        <p className="font-bold text-[#0F5F58] leading-tight text-lg">
                          {item.t}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 8 GOLDEN RULES */}
        <div className="container mx-auto px-2 mb-48">
          <div className="bg-[#1A2F2C] py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden rounded-[3rem] shadow-2xl">
            {/* Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
            
            <div className="relative z-10">
              <ScrollReveal>
                <div className="flex flex-col items-center mb-16">
                  {/* Gold Icon */}
                  <div className="bg-gradient-to-br from-[#BF953F] via-[#FCF6BA] to-[#B38728] p-4 rounded-2xl mb-6 shadow-[0_0_25px_rgba(253,185,49,0.2)]">
                    <ShieldCheck className="w-10 h-10 text-[#1A2F2C]" />
                  </div>

                  {/* Shining Gold Animation */}
                  <h2 className="relative text-4xl md:text-6xl font-black tracking-tight text-center">
                    <span 
                      className="bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#BF953F]"
                      style={{
                        backgroundSize: '200% auto',
                        animation: 'shining 3s linear infinite',
                      }}
                    >
                      8 Golden Rules
                    </span>
                  </h2>
                  
                  {/* Gold Divider */}
                  <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#FDB931] to-transparent mt-6 rounded-full" />
                </div>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-4 max-w-6xl mx-auto">
                {goldenRules.map((rule, idx) => (
                  <ScrollReveal key={idx} delay={idx * 0.1}>
                    <div className="group flex items-center gap-6 bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 hover:border-[#FDB931]/40 hover:bg-white/10 transition-all duration-500 shadow-xl">
                      <div className="text-5xl font-black text-[#BF953F]/20 group-hover:text-[#FDB931] transition-colors duration-500 flex-shrink-0">
                        {(idx + 1).toString().padStart(2, '0')}
                      </div>
                      
                      <p className="font-bold text-white/80 group-hover:text-white text-lg leading-snug">
                        {rule}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* CSS Keyframe */}
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes shining {
                0% { background-position: 0% center; }
                100% { background-position: 200% center; }
              }
            `}} />
          </div>
        </div>

          {/* TEACHERS VALUE - DENGAN LOGO BACKGROUND MONOKROM */}
          <div className="relative pb-24">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-20">
                <div className="w-20 h-[2px] bg-[#0F5F58]" />
                <h2 className="text-4xl md:text-5xl font-black text-[#0F5F58]">Teachers Value</h2>
                <Lightbulb className="w-8 h-8 text-[#0F5F58]" />
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-12">
              {teachersValues.map((group, gIdx) => (
                <div key={gIdx} className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 relative overflow-hidden group">
                  {/* Logo Metland Monokrom sebagai Background */}
                  <img 
                    src={logoMetland} 
                    alt="Metland Logo Background" 
                    className="absolute -bottom-10 -right-10 w-80 h-80 object-contain grayscale opacity-[0.04] pointer-events-none group-hover:scale-110 group-hover:opacity-[0.06] transition-all duration-700"
                  />
                  
                  <h3 className="text-2xl font-black text-[#0F5F58]/20 mb-8 tracking-[0.5em] uppercase italic group-hover:text-[#0F5F58]/40 transition-colors">
                    {group.word}
                  </h3>

                  <div className="space-y-6 relative z-10">
                    {group.list.map((item, i) => (
                      <ScrollReveal key={i} delay={i * 0.1}>
                        <div className="flex items-center gap-6 group/item">
                          <div className="flex-shrink-0 w-12 h-12 bg-white shadow-md rounded-xl flex items-center justify-center border border-gray-100 group-hover/item:bg-[#0F5F58] group-hover/item:scale-110 transition-all duration-300">
                            <span className="text-xl font-black text-[#0F5F58] group-hover/item:text-white">{item.l}</span>
                          </div>
                          <div className="flex flex-col">
                            <h4 className="text-lg font-bold text-[#0F5F58]/80 group-hover/item:text-[#0F5F58] transition-colors">
                              {item.t}
                            </h4>
                          </div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </MainLayout>
  );
};

export default OurValues;