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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'
        }`}
    >
      <div className="container mx-auto px-4">
        <nav
          className={`navbar-pill flex items-center justify-between transition-all duration-300 ${isScrolled ? 'shadow-xl' : ''
            }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-primary-foreground">
            <div className="w-9 h-9 flex items-center justify-center">
              <img src={logo} alt="logo" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg">Metland</span>
              <span className="block text-xs opacity-90">School</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors relative group ${isActive(item.href) ? 'text-primary-foreground' : ''
                    }`}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-4 h-4" />}

                  {/* Active/Hover Underline */}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-0.5 bg-white rounded-full transition-transform duration-300 origin-left ${isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                  />
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 min-w-[200px] bg-white rounded-xl shadow-xl overflow-hidden"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-4 py-3 text-sm text-foreground hover:bg-primary-lighter hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-primary-foreground p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-2 bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    to={item.href}
                    className={`block px-6 py-4 text-foreground font-medium border-b border-border/30 ${isActive(item.href) ? 'text-primary bg-primary-lighter' : 'hover:bg-muted'
                      }`}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="bg-muted/50">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-8 py-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
