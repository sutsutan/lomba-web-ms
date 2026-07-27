import { useEffect, useState } from 'react';
import { motion} from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

import api from '@/lib/api';

const Contact = () => {
   const { t, language } = useLanguage();
    const [heroSlides, setHeroSlides] = useState<any[]>([]);

     useEffect(() => {
        const fetchHero = async () => {
            try {
                const res = await api.get("/contact");

                const data = Array.isArray(res.data)
                    ? res.data
                    : (res.data.data || []);

                const filtered = data.filter(
                    (item: any) =>
                        item.category === "contact" &&
                        item.is_active
                );

                setHeroSlides(
                    filtered.map((item: any) => ({
                        image_url: item.image_url,
                        title: language === "id" ? item.title_id : item.title_en,
                        subtitle:
                            language === "id"
                                ? item.subtitle_id
                                : item.subtitle_en,
                    }))
                );
            } catch (err) {
                console.error("Gagal load hero:", err);
            }
        };

        fetchHero();
    }, [language]);

  return (
    <MainLayout>
       <HeroCarousel 
            category="contact" 
            lang={language}
            height="h-[60vh]"
            />

      {/* Contact Content */}
      <section className="py-20 bg-background px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <ScrollReveal direction="left">
              <div className="space-y-8">
                <div>
                   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 font-bold text-sm mb-6">
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                    {t('nav.contact')}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600 mb-8">
                    {t('contact.main.title')}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {t('contact.main.desc')}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{t('contact.info.address')}</h4>
                      <p className="text-muted-foreground whitespace-pre-line">
                         Jl. Kota Taman Metropolitan, Cileungsi Kidul, Kec. Cileungsi, Kabupaten Bogor, Jawa Barat 16820
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{t('contact.info.phone')}</h4>
                      <p className="text-muted-foreground">(021) 82496976</p>
                    </div>
                  </div>

                   <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{t('contact.info.phone')}</h4>
                      <p className="text-muted-foreground">+6281293395500</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{t('contact.info.email')}</h4>
                      <p className="text-muted-foreground">@metlandschool.sch.id</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{t('contact.info.hours')}</h4>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {t('contact.info.hours_detail')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal delay={0.2}>
              <div className="bg-slate-50 rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  {t('contact.form.title')}
                </h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-foreground mb-2">
                        {t('contact.form.first_name')}
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-foreground mb-2">
                        {t('contact.form.last_name')}
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      {t('contact.form.subject')}
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium appearance-none">
                      {t('contact.form.subject_options').split(',').map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/20 active:scale-[0.98]"
                  >
                    {t('contact.form.send')}
                    <Send className="w-4 h-4" />
                  </motion.button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Google Maps */}
<section className="py-24 bg-gradient-to-b from-slate-50 to-white">
    <div className="container mx-auto px-6">
        <ScrollReveal>
            <div className="mb-14 text-center">
                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
                    <MapPin className="h-10 w-10 text-teal-600" />
                </div>

                <h2 className="mb-4 text-4xl font-bold text-foreground">
                    {t("contact.map.title")}
                </h2>

                <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
                    {t("contact.map.desc")}
                </p>
            </div>
        </ScrollReveal>

        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
        >
            <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-2xl">
                <iframe
                    title="SMK Pariwisata Metland School"
                    src="https://www.google.com/maps?q=SMK+Pariwisata+Metland+School+Cileungsi&output=embed"
                    className="h-[650px] w-full"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>

            {/* Floating Information */}
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-8 left-8 hidden max-w-sm rounded-3xl bg-white p-7 shadow-2xl lg:block"
            >
                <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                        <MapPin className="text-teal-600" />
                    </div>

                    <div>
                        <h3 className="text-lg font-bold">
                            SMK Pariwisata Metland School
                        </h3>
                        <p className="text-sm text-slate-500">
                            Cileungsi, Bogor
                        </p>
                    </div>
                </div>

                <p className="mb-6 leading-relaxed text-slate-600">
                    Jl. Kota Taman Metropolitan,
                    Cileungsi Kidul,
                    Kecamatan Cileungsi,
                    Kabupaten Bogor,
                    Jawa Barat 16820
                </p>

                <div className="space-y-3">
                    <a
                        href="https://maps.google.com/?q=SMK+Pariwisata+Metland+School+Cileungsi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center rounded-xl bg-teal-600 py-3 font-semibold text-white transition hover:bg-teal-700"
                    >
                        📍 Open Google Maps
                    </a>

                    <a
                        href="tel:+622182496976"
                        className="flex w-full items-center justify-center rounded-xl border py-3 font-semibold transition hover:bg-slate-50"
                    >
                        📞 Call School
                    </a>
                </div>
            </motion.div>
        </motion.div>
    </div>
</section>
    </MainLayout>
  );
};

export default Contact;