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
<<<<<<< HEAD
        title="Contact Us"
        subtitle="SMK Metland School"
        description="Get in touch with us for inquiries about admissions, programs, or general information."
        height="h-[70vh]"
      />

      {/* Contact Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
=======
        title={t('contact.hero.title')}
        subtitle={t('contact.hero.subtitle')}
        description={t('contact.hero.desc')}
        height="h-[60vh] md:h-[70vh]"
      />

      {/* Contact Content */}
      <section className="py-20 bg-background px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
>>>>>>> cf76c0e34cf58e8b624f83ee30d14cf21d09ce28
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <ScrollReveal direction="left">
              <div className="space-y-8">
                <div>
<<<<<<< HEAD
                  <h2 className="text-4xl font-black text-primary mb-6">Get In Touch</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Kami sangat senang mendengar dari Anda. Baik itu pertanyaan mengenai 
                    program kami, proses pendaftaran, atau informasi umum mengenai Metland School.
=======
                   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 font-bold text-sm mb-6">
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                    {t('nav.contact')}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600 mb-8">
                    {t('contact.main.title')}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {t('contact.main.desc')}
>>>>>>> cf76c0e34cf58e8b624f83ee30d14cf21d09ce28
                  </p>
                </div>

                <div className="space-y-6">
<<<<<<< HEAD
                  {/* Address */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <MapPin className="w-6 h-6 text-primary group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-lg">Address</h4>
                      <p className="text-muted-foreground leading-snug">
                        Jl. Taman Metland, Cileungsi Kidul, Kec. Cileungsi,<br />
                        Kabupaten Bogor, Jawa Barat 16820
=======
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{t('contact.info.address')}</h4>
                      <p className="text-muted-foreground whitespace-pre-line">
                        Jl. Pendidikan No. 123, Cileungsi,
                        Bogor, West Java 16820
>>>>>>> cf76c0e34cf58e8b624f83ee30d14cf21d09ce28
                      </p>
                    </div>
                  </div>

<<<<<<< HEAD
                  {/* Phone */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Phone className="w-6 h-6 text-primary group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-lg">Phone</h4>
                      <p className="text-muted-foreground">(021) 2921 2121</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Mail className="w-6 h-6 text-primary group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-lg">Email</h4>
=======
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
>>>>>>> cf76c0e34cf58e8b624f83ee30d14cf21d09ce28
                      <p className="text-muted-foreground">info@metlandschool.sch.id</p>
                    </div>
                  </div>

<<<<<<< HEAD
                  {/* Office Hours */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Clock className="w-6 h-6 text-primary group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-lg">Office Hours</h4>
                      <p className="text-muted-foreground">
                        Monday - Friday: 07.00 - 16.00<br />
                        Saturday: By Appointment
=======
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{t('contact.info.hours')}</h4>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {t('contact.info.hours_detail')}
>>>>>>> cf76c0e34cf58e8b624f83ee30d14cf21d09ce28
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
<<<<<<< HEAD
            <ScrollReveal direction="right" delay={0.2}>
              <div className="bg-[#f8f9fa] rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-xl shadow-gray-200/50">
                <h3 className="text-2xl font-bold text-primary mb-8">
                  Send Us a Message
                </h3>
                <form className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">First Name</label>
                      <input
                        type="text"
                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm"
=======
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
>>>>>>> cf76c0e34cf58e8b624f83ee30d14cf21d09ce28
                        placeholder="Doe"
                      />
                    </div>
                  </div>

<<<<<<< HEAD
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm"
=======
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium"
>>>>>>> cf76c0e34cf58e8b624f83ee30d14cf21d09ce28
                      placeholder="john@example.com"
                    />
                  </div>

<<<<<<< HEAD
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Subject</label>
                    <select className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm appearance-none">
                      <option>General Inquiry</option>
                      <option>Admissions</option>
                      <option>Industrial Partnership</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm resize-none"
                      placeholder="How can we help you?"
=======
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
>>>>>>> cf76c0e34cf58e8b624f83ee30d14cf21d09ce28
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
<<<<<<< HEAD
                    className="w-full bg-primary text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/30 flex items-center justify-center gap-3 mt-4 hover:bg-primary/90 transition-colors"
                  >
                    Send Message
                    <Send className="w-5 h-5" />
                  </motion.button>
=======
                    className="w-full inline-flex items-center justify-center gap-2 bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/20 active:scale-[0.98]"
                  >
                    {t('contact.form.send')}
                    <Send className="w-4 h-4" />
                  </button>
>>>>>>> cf76c0e34cf58e8b624f83ee30d14cf21d09ce28
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Map Section - Integrated Google Maps */}
      <section className="relative h-[500px] w-full bg-gray-100 overflow-hidden">
        {/* Decorative Card over Map */}
        <div className="absolute top-10 left-10 z-10 hidden lg:block pointer-events-none">
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20 max-w-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                <MapPin size={20} />
              </div>
              <h3 className="font-black text-primary">Our Location</h3>
            </div>
            <p className="text-sm text-gray-600 font-medium">
              Kunjungi kampus kami untuk melihat langsung fasilitas standar industri yang kami miliki.
            </p>
=======
      {/* Map Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-xl mb-6">
            <MapPin className="w-10 h-10 text-teal-600" />
>>>>>>> cf76c0e34cf58e8b624f83ee30d14cf21d09ce28
          </div>
          <h3 className="text-3xl font-bold text-foreground mb-4">{t('contact.map.title')}</h3>
          <p className="text-muted-foreground text-lg">
            {t('contact.map.desc')}
          </p>
        </div>

        {/* The Actual Iframe */}
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.234674720188!2d106.99446487503893!3d-6.363659493626374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699416560370ad%3A0x67907575791726a8!2sSMK%20Metland%20School!5e0!3m2!1sid!2sid!4v1709192461011!5m2!1sid!2sid" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale-[20%] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
        />
      </section>
    </MainLayout>
  );
};

export default Contact;