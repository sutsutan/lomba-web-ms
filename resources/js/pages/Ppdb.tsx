import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import { ArrowRight, User, Phone, School, BookOpen, CheckCircle, Send, FileText } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import logoMetland from '@/assets/logo-metland.png';
import achievement1 from '@/assets/achievement-1.jpg';
import studentEnrollment from '@/assets/pepleg.webp';

const Ppdb = () => {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    asalSekolah: '',
    whatsapp: '',
    jurusan: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
  };

  return (
    <MainLayout>
      {/* Hero Carousel */}
      <HeroCarousel
        title={t('ppdb.hero.title')}
        subtitle={t('ppdb.hero.subtitle')}
        description={t('ppdb.hero.desc')}
        height="h-[50vh] sm:h-[60vh] md:h-[70vh]"
      />

      {/* Enrollment Journey Section */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <ScrollReveal>
            <div className="flex items-center gap-3 md:gap-4 mb-8 ml-0 md:ml-6 lg:ml-10">
              <div className="w-[3px] h-8 sm:h-10 md:h-12 bg-[#12606A] flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#12606A] tracking-tight">
                {t('ppdb.journey.title')}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24 mt-12 md:mt-16 items-center">
            {/* Content Card */}
            <ScrollReveal delay={0.1}>
              <div className="bg-[#E8F0F2] rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg relative overflow-hidden">
                {/* Decorative circle */}
                <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#9DB8BF] rounded-full opacity-60" />
                
                <div className="relative z-10 space-y-4 md:space-y-6">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#12606A] leading-snug">
                    {t('ppdb.journey.open_title')}<br />
                    <span className="text-[#12606A]">{t('ppdb.journey.open_subtitle')}</span>
                  </h3>
                  
                  <p className="text-[#12606A]/80 font-medium leading-relaxed text-sm sm:text-base">
                    {t('ppdb.journey.desc')}
                  </p>
                  
                  <button className="px-8 py-3 rounded-full bg-[#9DB8BF] text-[#12606A] font-bold text-sm hover:bg-[#8AA8AF] transition-all active:scale-95 shadow-md flex items-center gap-2 group">
                    {t('ppdb.journey.learn_more')}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Image */}
            <ScrollReveal delay={0.2}>
              <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-2xl overflow-hidden shadow-xl relative">
                <img
                  src={studentEnrollment}
                  alt="Student Enrollment"
                  className="w-full h-full object-cover"
                />
                {/* Overlay decorations */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <p className="text-xs font-semibold text-[#12606A]">{t('ppdb.journey.status')}</p>
                  <p className="text-[10px] text-[#12606A]/70">{t('ppdb.journey.tagline')}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Admission Steps Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-5xl">
          {/* Steps */}
          <div className="space-y-0">
            {[
              { 
                step: 1, 
                title: t('ppdb.step1.title'), 
                subtitle: t('ppdb.step1.subtitle'),
                desc: t('ppdb.step1.desc'),
                date: t('ppdb.step1.date')
              },
              { 
                step: 2, 
                title: t('ppdb.step2.title'), 
                subtitle: t('ppdb.step2.subtitle'),
                desc: t('ppdb.step2.desc'),
                date: t('ppdb.step2.date')
              },
              { 
                step: 3, 
                title: t('ppdb.step3.title'), 
                subtitle: t('ppdb.step3.subtitle'),
                desc: t('ppdb.step3.desc'),
                date: t('ppdb.step3.date')
              },
              { 
                step: 4, 
                title: t('ppdb.step4.title'), 
                subtitle: t('ppdb.step4.subtitle'),
                desc: t('ppdb.step4.desc'),
                date: t('ppdb.step4.date')
              },
            ].map((item, index, arr) => (
              <ScrollReveal key={index} delay={0.1 * index}>
                <div className="relative">
                  {/* Top Separator with Logo */}
                  <div className="flex items-center justify-center gap-4 py-6">
                    <div className="flex-1 h-[1px] bg-[#12606A]/30" />
                    <img 
                      src={logoMetland} 
                      alt="Metland Logo" 
                      className="w-8 h-8 object-contain"
                    />
                    <div className="flex-1 h-[1px] bg-[#12606A]/30" />
                  </div>

                  {/* Step Content */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 py-6">
                    {/* Left Column - Title */}
                    <div className="text-center md:text-left">
                      <p className="text-[#12606A] font-bold text-lg mb-1">{t('ppdb.steps.step')} {item.step}:</p>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#12606A] mb-2 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-[#12606A]/70 font-medium text-sm">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Right Column - Description */}
                    <div className="space-y-4">
                      <p className="text-[#12606A]/80 leading-relaxed text-sm md:text-base text-justify">
                        {item.desc}
                      </p>
                      <p className="text-[#12606A] font-medium text-sm">
                        {t('ppdb.steps.date_label')}: <span className="text-[#12606A]/70">[{item.date}]</span>
                      </p>
                    </div>
                  </div>

                  {/* Bottom Separator for last item */}
                  {index === arr.length - 1 && (
                    <div className="flex items-center justify-center gap-4 py-6">
                      <div className="flex-1 h-[1px] bg-[#12606A]/30" />
                      <img 
                        src={logoMetland} 
                        alt="Metland Logo" 
                        className="w-8 h-8 object-contain"
                      />
                      <div className="flex-1 h-[1px] bg-[#12606A]/30" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-16 md:py-24 bg-[#E8F0F2] relative overflow-hidden" id="formulir-pendaftaran">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#12606A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl relative z-10">
            <ScrollReveal>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-black text-[#12606A] mb-4">
                        Formulir Pendaftaran Siswa Baru
                    </h2>
                    <p className="text-[#12606A]/80 text-lg font-medium max-w-2xl mx-auto">
                        Silakan isi data di bawah ini dengan benar. Tim kami akan segera menghubungi Bapak/Ibu melalui WhatsApp untuk proses selanjutnya.
                    </p>
                </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
                <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl border border-slate-100">
                    {isSubmitted ? (
                        <div className="text-center py-12">
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                            >
                                <CheckCircle className="w-12 h-12" />
                            </motion.div>
                            <h3 className="text-2xl font-bold text-[#12606A] mb-4">Pendaftaran Berhasil Dikirim!</h3>
                            <p className="text-slate-600 mb-8 max-w-md mx-auto">
                                Terima kasih. Data Bapak/Ibu telah kami terima. Tim pendaftaran Metland School akan segera menghubungi Bapak/Ibu melalui WhatsApp.
                            </p>
                            <button 
                                onClick={() => setIsSubmitted(false)}
                                className="px-8 py-3 bg-[#12606A] text-white font-bold rounded-full hover:bg-[#0f4f57] transition-all shadow-md"
                            >
                                Kirim Data Baru
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Nama Lengkap */}
                            <div>
                                <label className="block text-[#12606A] font-bold mb-2 ml-1 text-lg">Nama Lengkap Anak</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-6 w-6 text-slate-400" />
                                    </div>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.nama}
                                        onChange={(e) => setFormData({...formData, nama: e.target.value})}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#12606A]/50 focus:border-[#12606A] text-lg text-slate-800 transition-all placeholder:text-slate-400"
                                        placeholder="Contoh: Budi Santoso"
                                    />
                                </div>
                            </div>

                            {/* Asal Sekolah */}
                            <div>
                                <label className="block text-[#12606A] font-bold mb-2 ml-1 text-lg">Asal Sekolah (SMP/MTs)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <School className="h-6 w-6 text-slate-400" />
                                    </div>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.asalSekolah}
                                        onChange={(e) => setFormData({...formData, asalSekolah: e.target.value})}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#12606A]/50 focus:border-[#12606A] text-lg text-slate-800 transition-all placeholder:text-slate-400"
                                        placeholder="Contoh: SMP Negeri 1 Cileungsi"
                                    />
                                </div>
                            </div>

                            {/* No WhatsApp */}
                            <div>
                                <label className="block text-[#12606A] font-bold mb-2 ml-1 text-lg">Nomor WhatsApp Orang Tua</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Phone className="h-6 w-6 text-slate-400" />
                                    </div>
                                    <input 
                                        type="tel" 
                                        required
                                        value={formData.whatsapp}
                                        onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#12606A]/50 focus:border-[#12606A] text-lg text-slate-800 transition-all placeholder:text-slate-400"
                                        placeholder="Contoh: 081234567890"
                                    />
                                </div>
                            </div>

                            {/* Jurusan */}
                            <div>
                                <label className="block text-[#12606A] font-bold mb-2 ml-1 text-lg">Pilihan Jurusan yang Diminati</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <BookOpen className="h-6 w-6 text-slate-400" />
                                    </div>
                                    <select 
                                        required
                                        value={formData.jurusan}
                                        onChange={(e) => setFormData({...formData, jurusan: e.target.value})}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#12606A]/50 focus:border-[#12606A] text-lg text-slate-800 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled>-- Pilih Jurusan --</option>
                                        <option value="Perhotelan">Perhotelan</option>
                                        <option value="Kuliner / Tata Boga">Kuliner (Tata Boga)</option>
                                        <option value="Akuntansi">Akuntansi</option>
                                        <option value="DKV">Desain Komunikasi Visual (DKV)</option>
                                        <option value="PPLG">Pengembangan Perangkat Lunak & Gim (PPLG)</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                        <ArrowRight className="h-5 w-5 text-slate-400 rotate-90" />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button 
                                    type="submit"
                                    className="w-full py-5 bg-[#12606A] hover:bg-[#0f4f57] text-white rounded-2xl font-bold text-xl shadow-lg shadow-[#12606A]/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3"
                                >
                                    <Send className="w-6 h-6" />
                                    Kirim Pendaftaran
                                </button>
                                <p className="text-center text-slate-500 text-sm mt-4">
                                    Dengan mengirimkan formulir ini, Bapak/Ibu bersedia untuk dihubungi oleh tim pendaftaran Metland School.
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </ScrollReveal>
        </div>
      </section>

      {/* Floating Action Button */}
      <motion.a
        href="#formulir-pendaftaran"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
            e.preventDefault();
            document.getElementById('formulir-pendaftaran')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="fixed bottom-10 right-10 z-[9999] flex items-center justify-center w-16 h-16 rounded-full shadow-2xl text-white bg-teal-600 hover:bg-teal-700 transition-colors group"
      >
        <FileText size={28} className="relative z-10" />
        {/* Wave Effect */}
        <motion.span 
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute inset-0 rounded-full bg-white/40 pointer-events-none"
        />
        {/* Tooltip */}
        <span className="absolute right-20 bg-teal-800 text-white text-sm font-bold px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
            Isi Formulir
        </span>
      </motion.a>
    </MainLayout>
  );
};

export default Ppdb;
