import React, { useState, useEffect } from 'react';
import { motion} from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  ZoomControl,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import api from '@/lib/api';
import "@/lib/leaflet";

const Contact = () => {
   const { t, language } = useLanguage();
   const schoolPosition: [number, number] = [
 -6.4033441,
  106.9756046,
];
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

        {/* map with leaflet */}
      <section className="py-20 bg-slate-50">
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
    <div className="container mx-auto px-6">
        <ScrollReveal>
            <div className="text-center mb-14">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-6">
                    <MapPin className="w-10 h-10 text-teal-600" />
                </div>
                <h2 className="text-4xl font-bold text-foreground mb-4">
                    {t("contact.map.title")}
                </h2>
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                    {t("contact.map.desc")}
                </p>
            </div>
        </ScrollReveal>
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .6 }}
            className="relative"
        >
            <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-2xl">
                <MapContainer
                    center={schoolPosition}
                    zoom={17}
                    zoomControl={false}
                    scrollWheelZoom={false}
                    className="w-full h-[650px]"
                >
                    <ZoomControl position="bottomright" />
                    <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Circle
                        center={schoolPosition}
                        radius={120}
                        pathOptions={{
                            color: "#0d9488",
                            fillColor: "#14b8a6",
                            fillOpacity: .2,
                            weight: 2,
                        }}
                    />
                    <Marker position={schoolPosition}>
                        <Popup>
                            <div className="space-y-2">
                                <h3 className="font-bold text-base">
                                    SMK Metland School
                                </h3>
                                <p className="text-sm">
                                    Jl. Kota Taman Metropolitan,
                                    Cileungsi Kidul,
                                    Kabupaten Bogor,
                                    Jawa Barat
                                </p>
                                <a
                                    href="https://www.google.com/maps/dir/?api=1&destination=-6.4033441,106.9756046"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-2 text-teal-600 font-semibold hover:underline"
                                >
                                    Open Google Maps →
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>

            {/* Floating Card */}
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: .3 }}
                className="absolute left-8 bottom-8 max-w-sm bg-white rounded-3xl shadow-2xl p-7 hidden lg:block"
            >
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                        <MapPin className="text-teal-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">
                            SMK Metland School
                        </h3>
                        <p className="text-sm text-slate-500">
                            Kabupaten Bogor
                        </p>
                    </div>
                </div>
                <p className="text-slate-600 leading-relaxed mb-5">
                    Jl. Kota Taman Metropolitan,
                    Cileungsi Kidul,
                    Kecamatan Cileungsi,
                    Kabupaten Bogor,
                    Jawa Barat 16820
                </p>
                <div className="space-y-3">
                    <a
                        href="https://www.google.com/maps/dir/?api=1&destination=-6.363659,106.997040"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-3 font-semibold transition"
                    >
                        📍 Open Google Maps
                    </a>
                    <a
                        href="tel:+622182496976"
                        className="flex justify-center items-center w-full border rounded-xl py-3 font-semibold hover:bg-slate-50 transition"
                    >
                        📞 Call School
                    </a>
                </div>
            </motion.div>
        </motion.div>
    </div>
      </section>
      </section>
    </MainLayout>
  );
};

export default Contact;