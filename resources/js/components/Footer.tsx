import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import footerBg from '@/assets/footer.jpg';
import logo from '@/assets/logo-metland.png';

const Footer = () => {
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
              Empowering vocational excellence through industry-focused education, 
              character development, and hands-on learning experiences.
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
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm opacity-80 hover:opacity-100 link-underline transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/academics" className="text-sm opacity-80 hover:opacity-100 link-underline transition-opacity">
                  Academics
                </Link>
              </li>
              <li>
                <Link to="/extracurricular" className="text-sm opacity-80 hover:opacity-100 link-underline transition-opacity">
                  Extracurricular
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-sm opacity-80 hover:opacity-100 link-underline transition-opacity">
                  News & Events
                </Link>
              </li>
              <li>
                <Link to="/alumni" className="text-sm opacity-80 hover:opacity-100 link-underline transition-opacity">
                  Alumni
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Programs</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/academics" className="text-sm opacity-80 hover:opacity-100 link-underline transition-opacity">
                  IT & Software Development
                </Link>
              </li>
              <li>
                <Link to="/academics" className="text-sm opacity-80 hover:opacity-100 link-underline transition-opacity">
                  Business & Accounting
                </Link>
              </li>
              <li>
                <Link to="/academics" className="text-sm opacity-80 hover:opacity-100 link-underline transition-opacity">
                  Culinary Arts
                </Link>
              </li>
              <li>
                <Link to="/academics" className="text-sm opacity-80 hover:opacity-100 link-underline transition-opacity">
                  Hospitality & Tourism
                </Link>
              </li>
              <li>
                <Link to="/academics" className="text-sm opacity-80 hover:opacity-100 link-underline transition-opacity">
                  Visual Communication Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
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
            © {new Date().getFullYear()} Metland School. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
              Privacy Policy
            </a>
            <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
