import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import { useLanguage } from '@/contexts/LanguageContext';
import { submitPpdbForm } from '@/services/PpdbSubmission';

const Contact = () => {
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus('idle');
    setSubmitError('');

    try {
      await submitPpdbForm({
        parent_name: `${formData.first_name} ${formData.last_name}`.trim(),
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        message: formData.message,
      });
      setSubmitStatus('success');
      setFormData({ 
        first_name: '', 
        last_name: '', 
        email: '', 
        phone: '', 
        subject: '', 
        message: '' 
      });
    } catch (error: any) {
      setSubmitStatus('error');
      setSubmitError(
        error?.response?.data?.message || 'Gagal mengirim pesan. Silakan coba lagi.'
      );
    } finally {
      setSubmitting(false);
    }
  };

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

                {submitStatus === 'success' && (
                  <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    Pesan Anda berhasil dikirim. Tim kami akan segera menghubungi Anda.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-medium">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {submitError}
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-foreground mb-2">
                        {t('contact.form.first_name')}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.first_name}
                        onChange={e => setFormData({ ...formData, first_name: e.target.value })}
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
                        value={formData.last_name}
                        onChange={e => setFormData({ ...formData, last_name: e.target.value })}
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
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      No. Telepon / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium"
                      placeholder="0812xxxxxxx"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      {t('contact.form.subject')}
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium appearance-none"
                    >
                      <option value="" disabled>Pilih topik...</option>
                      {t('contact.form.subject_options').split(',').map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/20 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Mengirim...' : t('contact.form.send')}
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.176044703714!2d106.96918881476986!3d-6.371261395389658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69922e39cd1ef3%3A0x6b44ddc0612ce6ed!2sSMK%20Pariwisata%20Metland%20School!5e0!3m2!1sid!2sid!4v1680000000000!5m2!1sid!2sid"
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
                Jl. Kota Taman Metropolitan, Cileungsi Kidul, Kecamatan Cileungsi, Kabupaten Bogor, Jawa Barat 16820
              </p>

              <div className="space-y-3">
                <a
                  href="https://maps.google.com/?q=SMK+Pariwisata+Metland+School"
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