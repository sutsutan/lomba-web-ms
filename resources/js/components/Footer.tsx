import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import footerBg from '@/assets/footer.jpg';
import logo from '@/assets/logo-metland.png';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer 
      className="text-white relative"
      style={{
        backgroundImage: `url(${footerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <img src={logo} alt="logo" className="w-12 h-12" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Metland</h3>
                <span className="text-sm opacity-80">School</span>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer.quick_links')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm opacity-80 hover:opacity-100 link-underline transition-opacity">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/academics" className="text-sm opacity-80 hover:opacity-100 link-underline transition-opacity">
                  {t('nav.academics')}
                </Link>
              </li>
              <li>
                <Link to="/extracurricular" className="text-sm opacity-80 hover:opacity-100 link-underline transition-opacity">
                  {t('nav.extracurricular')}
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-sm opacity-80 hover:opacity-100 link-underline transition-opacity">
                  {t('nav.news')}
                </Link>
              </li>
              <li>
                <Link to="/alumni" className="text-sm opacity-80 hover:opacity-100 link-underline transition-opacity">
                  {t('nav.alumni')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer.programs')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/major" className="text-sm opacity-80 hover:opacity-100 link-underline transition-opacity">
                  {t('category.it')}
                </Link>
              </li>
              <li>
                <Link to="/major" className="text-sm opacity-80 hover:opacity-100 link-underline transition-opacity">
                  {t('category.accounting')}
                </Link>
              </li>
              <li>
                <Link to="/major" className="text-sm opacity-80 hover:opacity-100 link-underline transition-opacity">
                  {t('category.culinary')}
                </Link>
              </li>
              <li>
                <Link to="/major" className="text-sm opacity-80 hover:opacity-100 link-underline transition-opacity">
                  {t('category.hospitality')}
                </Link>
              </li>
              <li>
                <Link to="/major" className="text-sm opacity-80 hover:opacity-100 link-underline transition-opacity">
                  {t('category.dkv')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer.contact_us')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 opacity-80" />
                <span className="text-sm opacity-80">
                  Jl. Pendidikan No. 123, Cileungsi,<br />
                  Bogor, West Java 16820
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 opacity-80" />
                <span className="text-sm opacity-80">(021) 1234-5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 opacity-80" />
                <span className="text-sm opacity-80">info@metlandschool.sch.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-70">
            © {new Date().getFullYear()} Metland School. {t('footer.rights')}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
