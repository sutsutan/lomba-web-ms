import { motion } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <MainLayout>
      {/* Hero Carousel */}
      <HeroCarousel
        title={t('contact.hero.title')}
        subtitle={t('contact.hero.subtitle')}
        description={t('contact.hero.desc')}
        height="h-[60vh] md:h-[70vh]"
      />

      {/* Contact Content */}
      <section className="py-20 bg-background px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <ScrollReveal>
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
                        Jl. Pendidikan No. 123, Cileungsi,
                        Bogor, West Java 16820
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{t('contact.info.phone')}</h4>
                      <p className="text-muted-foreground">(021) 1234-5678</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{t('contact.info.email')}</h4>
                      <p className="text-muted-foreground">info@metlandschool.sch.id</p>
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

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/20 active:scale-[0.98]"
                  >
                    {t('contact.form.send')}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-xl mb-6">
            <MapPin className="w-10 h-10 text-teal-600" />
          </div>
          <h3 className="text-3xl font-bold text-foreground mb-4">{t('contact.map.title')}</h3>
          <p className="text-muted-foreground text-lg">
            {t('contact.map.desc')}
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default Contact;
