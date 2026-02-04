import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import logo from '@/assets/logo-metland.png';

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Profile', href: '/about' },
      { label: 'Vision & Mission', href: '/about#vision' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    label: 'Academics',
    href: '/academics',
    children: [
      { label: 'Majors', href: '/academics' },
      { label: 'Student Works', href: '/academics#works' },
    ],
  },
  {
    label: 'Activity',
    href: '/extracurricular',
    children: [
      { label: 'Extracurricular', href: '/extracurricular' },
      { label: 'Organization', href: '/organization' },
      { label: 'News', href: '/news' },
    ],
  },
  { label: 'Alumni', href: '/alumni' },
  { label: 'PPDB', href: '/ppdb' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'pt-2' : 'pt-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/*SECTION LOGO*/}
        <Link to="/" className="flex items-center gap-3 group z-10">
          {/* Logo Pill Wrapper scroll*/}
          <div className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-500 ${
            isScrolled 
              ? 'bg-white/80 backdrop-blur-md shadow-lg border border-white/20' 
              : 'bg-transparent border-transparent'
          }`}>
            <div className="transition-transform duration-300 group-hover:scale-110">
              <img 
                src={logo} 
                alt="Metland Logo" 
                className="w-9 h-9 object-contain" 
              />
            </div>
            
            <div className="flex flex-col leading-tight">
              <span className={`font-bold text-lg tracking-tight transition-colors duration-500 ${
                isScrolled ? 'text-slate-900' : 'text-white'
              }`}>
                Metland
              </span>
              <span className={`text-[9px] uppercase tracking-widest font-light transition-colors duration-500 ${
                isScrolled ? 'text-slate-600' : 'text-white/80'
              }`}>
                School
              </span>
            </div>
          </div>
        </Link>

        {/*NAV PILL SECTION*/}
        <nav
          className={`hidden lg:flex items-center gap-1 p-1.5 rounded-full border border-white/20 transition-all duration-500 ${
            isScrolled 
              ? 'bg-black/20 backdrop-blur-xl shadow-2xl' 
              : 'bg-white/10 backdrop-blur-md shadow-lg'
          }`}
        >
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={item.href}
                className={`flex items-center gap-1 px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                  isActive(item.href)
                    ? 'bg-white text-teal-700 shadow-md' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {item.label}
                {item.children && (
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                    openDropdown === item.label ? 'rotate-180' : ''
                  }`} />
                )}
              </Link>

              <AnimatePresence>
                {item.children && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute top-[120%] left-0 min-w-[200px] bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl py-2 border border-white/20 overflow-hidden"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block px-5 py-3 text-sm text-slate-700 hover:bg-teal-500 hover:text-white transition-colors font-medium"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/*MOBILE BUTTON*/}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden w-11 h-11 flex items-center justify-center rounded-full transition-all duration-500 ${
            isScrolled 
              ? 'bg-white/80 backdrop-blur-md text-slate-900 shadow-md' 
              : 'bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-lg'
          }`}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/*MOBILE MENU OVERLAY*/}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="container mx-auto px-6 mt-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
            >
              <div className="p-4 flex flex-col gap-1">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <Link
                      to={item.href}
                      className={`px-5 py-4 rounded-2xl font-bold transition-colors ${
                        isActive(item.href) ? 'bg-teal-600 text-white' : 'text-slate-800'
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="pl-6 py-2 border-l-2 border-slate-100 ml-5 my-1">
                        {item.children.map((child) => (
                          <Link key={child.href} to={child.href} className="block px-4 py-2 text-sm text-slate-500 font-medium">
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;