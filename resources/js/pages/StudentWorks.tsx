<<<<<<< HEAD
=======
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
>>>>>>> cf76c0e34cf58e8b624f83ee30d14cf21d09ce28
import HeroCarousel from '@/components/HeroCarousel';
import ScrollReveal from '@/components/ScrollReveal';
import MainLayout from '@/layouts/MainLayout';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import programAccounting from '@/assets/akuntansi.webp';
import programHospitality from '@/assets/aph.webp';
import programCulinary from '@/assets/program-culinary.webp';
import programDkv from '@/assets/program-dkv.jpg';
import programIt from '@/assets/program-it.webp';
import { Calculator, Code, Hotel, Palette, Utensils } from 'lucide-react';

<<<<<<< HEAD
const categories = [
    {
        id: 1,
        name: 'Culinary',
        icon: <Utensils />,
        color: '#0F5F58',
        image: programCulinary,
        shortName: 'Culinary',
    },
    {
        id: 2,
        name: 'Design Communication Visual',
        icon: <Palette />,
        color: '#0F5F58',
        image: programDkv,
        shortName: 'DKV',
    },
    {
        id: 3,
        name: 'Information Technology',
        icon: <Code />,
        color: '#0F5F58',
        image: programIt,
        shortName: 'IT',
    },
    {
        id: 4,
        name: 'Hospitality',
        icon: <Hotel />,
        color: '#0F5F58',
        image: programHospitality,
        shortName: 'Hospitality',
    },
    {
        id: 5,
        name: 'Accounting',
        icon: <Calculator />,
        color: '#0F5F58',
        image: programAccounting,
        shortName: 'Accounting',
    },
];

const galleryProjects = [
    // Culinary Projects
    {
        id: 1,
        category: 'Culinary',
        student: 'Chef Anisa',
        class: 'XI Culinary 1',
        title: 'Fusion Cuisine',
        description:
            'Creative fusion dishes combining traditional Indonesian flavors with modern techniques.',
        image: programCulinary,
        githubUrl: '#',
        profileImage: programCulinary,
    },
    {
        id: 2,
        category: 'Culinary',
        student: 'Budi Santoso',
        class: 'XI Culinary 2',
        title: 'Pastry Art',
        description:
            'Artistic pastry creations showcasing precision and creativity.',
        image: programCulinary,
        githubUrl: '#',
        profileImage: programCulinary,
    },
    {
        id: 3,
        category: 'Culinary',
        student: 'Maria Dewi',
        class: 'XI Culinary 1',
        title: 'Traditional Delights',
        description: 'Modern interpretation of classic Indonesian dishes.',
        image: programCulinary,
        githubUrl: '#',
        profileImage: programCulinary,
    },

    // DKV Projects
    {
        id: 4,
        category: 'Design Communication Visual',
        student: 'Raka Pratama',
        class: 'XI DKV 1',
        title: 'Brand Identity',
        description: 'Complete brand identity design for local businesses.',
        image: programDkv,
        githubUrl: '#',
        profileImage: programDkv,
    },
    {
        id: 5,
        category: 'Design Communication Visual',
        student: 'Sinta Maharani',
        class: 'XI DKV 2',
        title: 'Motion Graphics',
        description: 'Dynamic motion graphics for digital marketing campaigns.',
        image: programDkv,
        githubUrl: '#',
        profileImage: programDkv,
    },
    {
        id: 6,
        category: 'Design Communication Visual',
        student: 'Dimas Putra',
        class: 'XI DKV 1',
        title: 'Illustration Art',
        description:
            'Digital illustration showcasing storytelling through art.',
        image: programDkv,
        githubUrl: '#',
        profileImage: programDkv,
    },

    // IT Projects
    {
        id: 7,
        category: 'Information Technology',
        student: 'Veria Raja Tunggal',
        class: 'XI IT 1',
        title: 'From School to Career',
        description:
            'Web application connecting students with career opportunities.',
        image: programIt,
        githubUrl: 'https://github.com/tsukuriaI/lomba-web-ms',
        profileImage: programIt,
    },
    {
        id: 8,
        category: 'Information Technology',
        student: 'Ana Malia',
        class: 'XI IT 1',
        title: 'About Us',
        description: 'Company profile website with modern UI/UX design.',
        image: programIt,
        githubUrl: 'https://github.com/tsukuriaI/lomba-web-ms',
        profileImage: programIt,
    },
    {
        id: 9,
        category: 'Information Technology',
        student: 'Cutan Bawiq',
        class: 'XI IT 1',
        title: 'Creative Project',
        description: 'Interactive web application with innovative features.',
        image: programIt,
        githubUrl: 'https://github.com/tsukuriaI/lomba-web-ms',
        profileImage: programIt,
    },
    {
        id: 10,
        category: 'Information Technology',
        student: 'Atan Ilaq',
        class: 'XI IT 1',
        title: 'Innovation Hub',
        description: 'Platform for sharing innovative tech solutions.',
        image: programIt,
        githubUrl: 'https://github.com/tsukuriaI/lomba-web-ms',
        profileImage: programIt,
    },
    {
        id: 11,
        category: 'Information Technology',
        student: 'FunDih',
        class: 'XI IT 1',
        title: 'Tech Solutions',
        description:
            'Mobile-responsive web application for business solutions.',
        image: programIt,
        githubUrl: 'https://github.com/tsukuriaI/lomba-web-ms',
        profileImage: programIt,
    },
    {
        id: 12,
        category: 'Information Technology',
        student: 'Hengki',
        class: 'XI IT 1',
        title: 'Digital Experience',
        description: 'Enhanced digital experience platform.',
        image: programIt,
        githubUrl: 'https://github.com/tsukuriaI/lomba-web-ms',
        profileImage: programIt,
    },

    // Hospitality Projects
    {
        id: 13,
        category: 'Hospitality',
        student: 'Rina Permata',
        class: 'XI APH 1',
        title: 'Hotel Service Excellence',
        description:
            'Documentation of front office service training and guest handling.',
        image: programHospitality,
        githubUrl: '#',
        profileImage: programHospitality,
    },
    {
        id: 14,
        category: 'Hospitality',
        student: 'Ahmad Fauzi',
        class: 'XI APH 2',
        title: 'Event Management',
        description: 'Complete event planning and execution for school events.',
        image: programHospitality,
        githubUrl: '#',
        profileImage: programHospitality,
    },
    {
        id: 15,
        category: 'Hospitality',
        student: 'Putri Ayu',
        class: 'XI APH 1',
        title: 'F&B Service',
        description:
            'Restaurant service excellence and table setting artistry.',
        image: programHospitality,
        githubUrl: '#',
        profileImage: programHospitality,
    },

    // Accounting Projects
    {
        id: 16,
        category: 'Accounting',
        student: 'Kevin Wijaya',
        class: 'XI AK 1',
        title: 'Financial Analysis',
        description:
            'Comprehensive financial analysis report for small businesses.',
        image: programAccounting,
        githubUrl: '#',
        profileImage: programAccounting,
    },
    {
        id: 17,
        category: 'Accounting',
        student: 'Lisa Hartono',
        class: 'XI AK 2',
        title: 'Tax Calculation System',
        description: 'Excel-based tax calculation and reporting system.',
        image: programAccounting,
        githubUrl: '#',
        profileImage: programAccounting,
    },
    {
        id: 18,
        category: 'Accounting',
        student: 'Roberto Carlos',
        class: 'XI AK 1',
        title: 'Budget Planning',
        description: 'Corporate budget planning and forecasting project.',
        image: programAccounting,
        githubUrl: '#',
        profileImage: programAccounting,
    },
];

// Descriptions for each category
const categoryDescriptions: Record<
    string,
    { intro: string; detail: string; closing: string }
> = {
    Culinary: {
        intro: "We're proud to present a collection of work created by our Culinary Arts students at Metland School.",
        detail: 'These projects are the result of hands-on culinary training, creativity, and passion for food. From traditional Indonesian cuisine to modern fusion dishes, pastry arts to food styling, every work shows how our students learn to create culinary experiences that delight both the eyes and palate.',
        closing:
            'Through professional kitchen practice and industry exposure, students develop not just cooking skills, but also creativity, precision, and the artistry that defines a true culinary professional. Explore their work and discover how Metland School prepares future chefs to excel in the culinary world.',
    },
    'Design Communication Visual': {
        intro: "We're proud to present a collection of work created by our Design Communication Visual students at Metland School.",
        detail: 'These projects are the result of creative exploration, artistic expression, and design thinking. From brand identity, illustration, motion graphics to UI/UX design, every work shows how our students learn to communicate ideas visually with impact and purpose.',
        closing:
            'Through hands-on design projects and industry mentorship, students are encouraged to push creative boundaries, master design tools, and develop their unique artistic voice. Explore their work and discover how Metland School nurtures future designers and visual storytellers.',
    },
    'Information Technology': {
        intro: "We're proud to present a collection of work created by our Information Technology students at Metland School.",
        detail: 'These projects are the result of hands-on learning, real practice, and strong problem-solving skills. From website development, mobile applications, to UI/UX design and digital systems, every work shows how our students learn to build technology that is not only functional, but also user-friendly and well-designed.',
        closing:
            'Through industry-based learning and creative exploration, students are encouraged to think critically, work collaboratively, and turn their ideas into real digital solutions. Explore their work and discover how Metland School prepares future IT talents to be ready for the world of technology and innovation.',
    },
    Hospitality: {
        intro: "We're proud to present a collection of work created by our Hospitality students at Metland School.",
        detail: 'These projects showcase excellence in guest services, front office operations, food & beverage service, and event management. Every work demonstrates how our students master the art of hospitality—creating memorable experiences through attention to detail, professionalism, and genuine care for guests.',
        closing:
            'Through practical training in real hospitality environments and industry partnerships, students develop the skills, confidence, and service mindset required for success in hotels, restaurants, and tourism. Explore their work and discover how Metland School prepares future hospitality professionals.',
    },
    Accounting: {
        intro: "We're proud to present a collection of work created by our Accounting students at Metland School.",
        detail: 'These projects demonstrate proficiency in financial analysis, bookkeeping, tax calculation, budgeting, and business reporting. Every work shows how our students apply accounting principles to real-world scenarios with accuracy, integrity, and analytical thinking.',
        closing:
            'Through practical exercises using industry-standard software and case studies, students develop the technical expertise and ethical foundation required for careers in finance and accounting. Explore their work and discover how Metland School prepares future accounting professionals.',
    },
};

const StudentWorks = () => {
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
=======
const StudentWorks = () => {
  const { t } = useLanguage();

  const categories = [
    { id: 1, name: 'Culinary', icon: <Utensils/>, color: '#0F5F58', image: programCulinary, shortName: t('category.culinary') },
    { id: 2, name: 'Design Communication Visual', icon: <Palette/>, color: '#0F5F58', image: programDkv, shortName: 'DKV' },
    { id: 3, name: 'Information Technology', icon: <Code/>, color: '#0F5F58', image: programIt, shortName: 'IT' },
    { id: 4, name: 'Hospitality', icon: <Hotel/>, color: '#0F5F58', image: programHospitality, shortName: t('category.hospitality') },
    { id: 5, name: 'Accounting', icon: <Calculator/>, color: '#0F5F58', image: programAccounting, shortName: t('category.accounting') },
  ];

  const galleryProjects = [
    // Culinary Projects
    {
      id: 1,
      category: 'Culinary',
      student: 'Chef Anisa',
      class: 'XI Culinary 1',
      title: t('sw.project.1.title'),
      description: t('sw.project.1.desc'),
      image: programCulinary,
      githubUrl: '#',
      profileImage: programCulinary
    },
    {
      id: 2,
      category: 'Culinary',
      student: 'Budi Santoso',
      class: 'XI Culinary 2',
      title: t('sw.project.2.title'),
      description: t('sw.project.2.desc'),
      image: programCulinary,
      githubUrl: '#',
      profileImage: programCulinary
    },
    {
      id: 3,
      category: 'Culinary',
      student: 'Maria Dewi',
      class: 'XI Culinary 1',
      title: t('sw.project.3.title'),
      description: t('sw.project.3.desc'),
      image: programCulinary,
      githubUrl: '#',
      profileImage: programCulinary
    },

    // DKV Projects
    {
      id: 4,
      category: 'Design Communication Visual',
      student: 'Raka Pratama',
      class: 'XI DKV 1',
      title: t('sw.project.4.title'),
      description: t('sw.project.4.desc'),
      image: programDkv,
      githubUrl: '#',
      profileImage: programDkv
    },
    {
      id: 5,
      category: 'Design Communication Visual',
      student: 'Sinta Maharani',
      class: 'XI DKV 2',
      title: t('sw.project.5.title'),
      description: t('sw.project.5.desc'),
      image: programDkv,
      githubUrl: '#',
      profileImage: programDkv
    },
    {
      id: 6,
      category: 'Design Communication Visual',
      student: 'Dimas Putra',
      class: 'XI DKV 1',
      title: t('sw.project.6.title'),
      description: t('sw.project.6.desc'),
      image: programDkv,
      githubUrl: '#',
      profileImage: programDkv
    },

    // IT Projects
    {
      id: 7,
      category: 'Information Technology',
      student: 'Veria Raja Tunggal',
      class: 'XI IT 1',
      title: t('sw.project.7.title'),
      description: t('sw.project.7.desc'),
      image: programIt,
      githubUrl: 'https://github.com/tsukuriaI/lomba-web-ms',
      profileImage: programIt
    },
    {
      id: 8,
      category: 'Information Technology',
      student: 'Ana Malia',
      class: 'XI IT 1',
      title: t('sw.project.8.title'),
      description: t('sw.project.8.desc'),
      image: programIt,
      githubUrl: 'https://github.com/tsukuriaI/lomba-web-ms',
      profileImage: programIt
    },
    {
      id: 9,
      category: 'Information Technology',
      student: 'Cutan Bawiq',
      class: 'XI IT 1',
      title: t('sw.project.9.title'),
      description: t('sw.project.9.desc'),
      image: programIt,
      githubUrl: 'https://github.com/tsukuriaI/lomba-web-ms',
      profileImage: programIt
    },
    {
      id: 10,
      category: 'Information Technology',
      student: 'Atan Ilaq',
      class: 'XI IT 1',
      title: t('sw.project.10.title'),
      description: t('sw.project.10.desc'),
      image: programIt,
      githubUrl: 'https://github.com/tsukuriaI/lomba-web-ms',
      profileImage: programIt
    },
    {
      id: 11,
      category: 'Information Technology',
      student: 'FunDih',
      class: 'XI IT 1',
      title: t('sw.project.11.title'),
      description: t('sw.project.11.desc'),
      image: programIt,
      githubUrl: 'https://github.com/tsukuriaI/lomba-web-ms',
      profileImage: programIt
    },
    {
      id: 12,
      category: 'Information Technology',
      student: 'Hengki',
      class: 'XI IT 1',
      title: t('sw.project.12.title'),
      description: t('sw.project.12.desc'),
      image: programIt,
      githubUrl: 'https://github.com/tsukuriaI/lomba-web-ms',
      profileImage: programIt
    },

    // Hospitality Projects
    {
      id: 13,
      category: 'Hospitality',
      student: 'Rina Permata',
      class: 'XI APH 1',
      title: t('sw.project.13.title'),
      description: t('sw.project.13.desc'),
      image: programHospitality,
      githubUrl: '#',
      profileImage: programHospitality
    },
    {
      id: 14,
      category: 'Hospitality',
      student: 'Ahmad Fauzi',
      class: 'XI APH 2',
      title: t('sw.project.14.title'),
      description: t('sw.project.14.desc'),
      image: programHospitality,
      githubUrl: '#',
      profileImage: programHospitality
    },
    {
      id: 15,
      category: 'Hospitality',
      student: 'Putri Ayu',
      class: 'XI APH 1',
      title: t('sw.project.15.title'),
      description: t('sw.project.15.desc'),
      image: programHospitality,
      githubUrl: '#',
      profileImage: programHospitality
    },

    // Accounting Projects
    {
      id: 16,
      category: 'Accounting',
      student: 'Kevin Wijaya',
      class: 'XI AK 1',
      title: t('sw.project.16.title'),
      description: t('sw.project.16.desc'),
      image: programAccounting,
      githubUrl: '#',
      profileImage: programAccounting
    },
    {
      id: 17,
      category: 'Accounting',
      student: 'Lisa Hartono',
      class: 'XI AK 2',
      title: t('sw.project.17.title'),
      description: t('sw.project.17.desc'),
      image: programAccounting,
      githubUrl: '#',
      profileImage: programAccounting
    },
    {
      id: 18,
      category: 'Accounting',
      student: 'Roberto Carlos',
      class: 'XI AK 1',
      title: t('sw.project.18.title'),
      description: t('sw.project.18.desc'),
      image: programAccounting,
      githubUrl: '#',
      profileImage: programAccounting
    },
  ];

  // Descriptions for each category
  const getCategoryKey = (categoryName: string) => {
    switch (categoryName) {
      case 'Culinary': return 'culinary';
      case 'Design Communication Visual': return 'dkv';
      case 'Information Technology': return 'it';
      case 'Hospitality': return 'hospitality';
      case 'Accounting': return 'accounting';
      default: return 'culinary';
    }
  };

  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
>>>>>>> cf76c0e34cf58e8b624f83ee30d14cf21d09ce28

    // Reset index when category changes
    useEffect(() => {
        setCurrentProjectIndex(0);
    }, [selectedCategory]);

    // Filter projects based on selected category
    const filteredProjects = galleryProjects.filter(
        (project) => project.category === selectedCategory.name,
    );

    const currentProject = filteredProjects[currentProjectIndex];

    const handleNext = () => {
        if (filteredProjects.length > 1) {
            setCurrentProjectIndex(
                (prev) => (prev + 1) % filteredProjects.length,
            );
        }
    };

    const handlePrev = () => {
        if (filteredProjects.length > 1) {
            setCurrentProjectIndex(
                (prev) =>
                    (prev - 1 + filteredProjects.length) %
                    filteredProjects.length,
            );
        }
    };

<<<<<<< HEAD
    return (
        <MainLayout>
            <HeroCarousel
                title="Student Works"
                subtitle="SMK Metland School"
                description="Stay updated with the latest works of creativity and innovation from our school community."
                height="h-[60vh] md:h-[70vh]"
            />

            <section className="section-padding bg-background py-12 md:py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 md:px-8">
                    <ScrollReveal>
                        <div className="mb-2 ml-0 flex items-center gap-3 md:ml-8 md:gap-4 lg:ml-14">
                            <div className="h-8 w-[2px] bg-[#12606A] sm:h-10 sm:w-[3px]" />
                            <h2 className="text-2xl font-bold tracking-tight text-[#12606A] sm:text-3xl md:text-4xl lg:text-5xl">
                                Student Works
                            </h2>
                        </div>
                        <p className="mb-8 ml-3 max-w-2xl text-sm font-medium text-[#12606A]/80 sm:ml-4 sm:text-base md:mb-12 md:ml-12 md:text-lg lg:ml-20">
                            Stay updated with the latest works of creativity and
                            innovation from our school community.
=======
  return (
    <MainLayout>
      <HeroCarousel
        title={t('studentworks.title')}
        subtitle={t('studentworks.subtitle')}
        description={t('studentworks.description')}
        height="h-[60vh] md:h-[70vh]"
      />

      <section className="section-padding bg-background py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-3 md:gap-4 mb-2 ml-0 md:ml-8 lg:ml-14">
              <div className="w-[2px] sm:w-[3px] h-8 sm:h-10 bg-[#12606A]" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#12606A] tracking-tight">
                {t('studentworks.title')}
              </h2>
            </div>
            <p className="text-[#12606A]/80 ml-3 sm:ml-4 md:ml-12 lg:ml-20 text-sm sm:text-base md:text-lg font-medium mb-8 md:mb-12 max-w-2xl">
              {t('studentworks.description')}
            </p>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            {currentProject ? (
              <div key={currentProject.id} className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start ml-0 md:ml-12 lg:ml-20">
                <ScrollReveal delay={0.2} className="w-full">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="overflow-hidden shadow-lg md:shadow-2xl rounded-lg md:rounded-none"
                  >
                    <img
                      src={currentProject.image}
                      alt={currentProject.title}
                      className="w-full h-48 sm:h-64 md:h-80 lg:h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                  
                  <div className="flex gap-4 sm:gap-6 md:gap-8 mt-6 md:mt-8">
                    <div className="w-1/2 overflow-hidden shadow-md rounded-lg md:rounded-none">
                      <img src={currentProject.image} alt="Thumbnail 1" className="w-full h-28 sm:h-32 md:h-40 object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="w-1/2 overflow-hidden shadow-md rounded-lg md:rounded-none">
                      <img src={currentProject.profileImage} alt="Thumbnail 2" className="w-full h-28 sm:h-32 md:h-40 object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.3} className="flex flex-col h-full space-y-3 md:space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-[#12606A] mb-1 md:mb-2">
                      {currentProject.student}
                    </h3>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#12606A] mb-4 md:mb-6 tracking-tight">
                      {currentProject.title}
                    </h2>
                    
                    <p className="text-[#12606A] font-medium leading-relaxed text-justify mb-6 md:mb-8 text-sm sm:text-base md:text-lg pr-0 md:pr-12">
                      {currentProject.description}
                    </p>

                    <div className="relative flex items-center justify-start h-16 w-24 sm:h-20 sm:w-32 mt-8 md:mt-12 mb-8 md:mb-12">
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-20 sm:h-24 w-[2px] bg-[#12606A]/30 rotate-[45deg] z-10" />

                      <button
                        onClick={handlePrev}
                        disabled={filteredProjects.length <= 1}
                        className="absolute left-1 sm:left-2 -top-1 w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#12606A]/40 flex items-center justify-center rotate-45 hover:bg-[#12606A] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                      >
                        <ChevronLeft className="-rotate-45 w-5 h-5 sm:w-6 sm:h-6 group-active:-translate-x-1 transition-transform" />
                      </button>

                      <button
                        onClick={handleNext}
                        disabled={filteredProjects.length <= 1}
                        className="absolute right-1 sm:right-2 -bottom-1 w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#12606A]/40 flex items-center justify-center rotate-45 hover:bg-[#12606A] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                      >
                        <ChevronRight className="-rotate-45 w-5 h-5 sm:w-6 sm:h-6 group-active:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                </ScrollReveal>
              </div>
            ) : (
              <div className="text-center py-12 md:py-20 text-[#12606A]/60 text-base md:text-xl">
               {t('studentworks.no_projects')}
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-10 md:mb-12 lg:mb-16">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Search className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" />
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F5F58] mb-2 md:mb-3">
                {t('studentworks.explore_title')}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-[#0F5F58]/70 max-w-2xl mx-auto px-4">
               {t('studentworks.explore_desc')}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
  <div className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-6 overflow-x-auto pb-4 hide-scrollbar justify-start sm:justify-center px-2 sm:px-0">
    {categories.map((cat) => (
      <motion.button
        key={cat.id}
        onClick={() => setSelectedCategory(cat as any)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={`flex-shrink-0 w-28 sm:w-36 md:w-40 lg:w-48 p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl md:rounded-2xl border-2 transition-all duration-300 ${
          selectedCategory.id === cat.id
            ? 'bg-[#0F5F58] border-[#0F5F58] shadow-lg shadow-teal-200'
            : 'bg-white border-gray-200 hover:border-[#0F5F58]/30 hover:shadow-md'
        }`}
      >
        <div className="flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3 text-center">
          <div className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-mono font-bold ${
            selectedCategory.id === cat.id ? 'text-white' : 'text-[#0F5F58]'
          }`}>
            {cat.icon}
          </div>
          <div>
            <h3 className={`text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-semibold mb-0.5 md:mb-1 leading-tight ${
              selectedCategory.id === cat.id ? 'text-white' : 'text-[#0F5F58]'
            }`}>
              {t(`category.${getCategoryKey(cat.name)}`)}
            </h3>
            <p className={`text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs ${
              selectedCategory.id === cat.id ? 'text-white/80' : 'text-[#0F5F58]/60'
            }`}>
              {t('studentworks.total_works')}: {galleryProjects.filter(p => p.category === cat.name).length}
            </p>
          </div>
        </div>
      </motion.button>
    ))}
  </div>
  <div className="text-center mt-4">
            <p className="flex sm:hidden justify-center items-center text-[#0F5F58] italic border-b border-[#0F5F58] inline-block pb-1">{t('studentworks.swipe_info')}</p>
          </div>
</ScrollReveal>
        </div>
      </section>

      <section className="py-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative h-48 sm:h-56 md:h-64 lg:h-80 xl:h-96 overflow-hidden"
          >
            <img 
              src={selectedCategory.image} 
              alt={selectedCategory.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                <ScrollReveal>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-wide text-center">
                    {t(`category.${getCategoryKey(selectedCategory.name)}`).toUpperCase()}
                  </h2>
                </ScrollReveal>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <ScrollReveal>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="mb-10 md:mb-12 ml-0 md:ml-12 lg:ml-16 xl:ml-20"
              >
                  <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                  <div className="w-1 h-10 md:h-12 bg-[#0F5F58]" />
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F5F58]">
                    {t('studentworks.gallery_of')} {selectedCategory.shortName}
                  </h2>
                </div>
                
                <div className="space-y-3 md:space-y-4 text-[#0F5F58]/80 leading-relaxed max-w-5xl">
                  <p className="text-xs sm:text-sm md:text-base">
                    {t(`cat.${getCategoryKey(selectedCategory.name)}.intro`)}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base">
                    {t(`cat.${getCategoryKey(selectedCategory.name)}.detail`)}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base">
                    {t(`cat.${getCategoryKey(selectedCategory.name)}.closing`)}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
            >
              {filteredProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
                >
                  <div className="relative h-40 sm:h-44 md:h-48 lg:h-56 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>

                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                      <img 
                        src={project.profileImage} 
                        alt={project.student} 
                        className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-gray-200"
                      />
                      <div>
                        <h4 className="text-xs sm:text-sm md:text-base font-bold text-[#0F5F58]">
                          {project.student}
                        </h4>
                        <p className="text-[10px] sm:text-xs md:text-sm text-[#0F5F58]/60">
                          {project.class}
>>>>>>> cf76c0e34cf58e8b624f83ee30d14cf21d09ce28
                        </p>
                    </ScrollReveal>

                    <AnimatePresence mode="wait">
                        {currentProject ? (
                            <div
                                key={currentProject.id}
                                className="ml-0 grid items-start gap-8 md:ml-12 md:gap-12 lg:ml-20 lg:grid-cols-2 lg:gap-20"
                            >
                                <ScrollReveal delay={0.2} className="w-full">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="overflow-hidden rounded-lg shadow-lg md:rounded-none md:shadow-2xl"
                                    >
                                        <img
                                            src={currentProject.image}
                                            alt={currentProject.title}
                                            className="h-48 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-64 md:h-80 lg:h-[400px]"
                                        />
                                    </motion.div>

                                    <div className="mt-6 flex gap-4 sm:gap-6 md:mt-8 md:gap-8">
                                        <div className="w-1/2 overflow-hidden rounded-lg shadow-md md:rounded-none">
                                            <img
                                                src={currentProject.image}
                                                alt="Thumbnail 1"
                                                className="h-28 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-32 md:h-40"
                                            />
                                        </div>
                                        <div className="w-1/2 overflow-hidden rounded-lg shadow-md md:rounded-none">
                                            <img
                                                src={
                                                    currentProject.profileImage
                                                }
                                                alt="Thumbnail 2"
                                                className="h-28 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-32 md:h-40"
                                            />
                                        </div>
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal
                                    delay={0.3}
                                    className="flex h-full flex-col space-y-3 md:space-y-4"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <h3 className="mb-1 text-lg font-medium text-[#12606A] sm:text-xl md:mb-2 md:text-2xl">
                                            {currentProject.student}
                                        </h3>
                                        <h2 className="mb-4 text-2xl font-bold tracking-tight text-[#12606A] sm:text-3xl md:mb-6 md:text-4xl lg:text-5xl">
                                            {currentProject.title}
                                        </h2>

                                        <p className="mb-6 pr-0 text-justify text-sm font-medium leading-relaxed text-[#12606A] sm:text-base md:mb-8 md:pr-12 md:text-lg">
                                            {currentProject.description}
                                        </p>

                                        <div className="relative mb-8 mt-8 flex h-16 w-24 items-center justify-start sm:h-20 sm:w-32 md:mb-12 md:mt-12">
                                            <div className="absolute left-1/2 top-1/2 z-10 h-20 w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-[45deg] bg-[#12606A]/30 sm:h-24" />

                                            <button
                                                onClick={handlePrev}
                                                disabled={
                                                    filteredProjects.length <= 1
                                                }
                                                className="group absolute -top-1 left-1 flex h-10 w-10 rotate-45 items-center justify-center border-2 border-[#12606A]/40 transition-all hover:bg-[#12606A] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:left-2 sm:h-12 sm:w-12"
                                            >
                                                <ChevronLeft className="h-5 w-5 -rotate-45 transition-transform group-active:-translate-x-1 sm:h-6 sm:w-6" />
                                            </button>

                                            <button
                                                onClick={handleNext}
                                                disabled={
                                                    filteredProjects.length <= 1
                                                }
                                                className="group absolute -bottom-1 right-1 flex h-10 w-10 rotate-45 items-center justify-center border-2 border-[#12606A]/40 transition-all hover:bg-[#12606A] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:right-2 sm:h-12 sm:w-12"
                                            >
                                                <ChevronRight className="h-5 w-5 -rotate-45 transition-transform group-active:translate-x-1 sm:h-6 sm:w-6" />
                                            </button>
                                        </div>
                                    </motion.div>
                                </ScrollReveal>
                            </div>
                        ) : (
                            <div className="py-12 text-center text-base text-[#12606A]/60 md:py-20 md:text-xl">
                                No projects found for this category yet.
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            <section className="bg-white py-12 md:py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                    <ScrollReveal>
                        <div className="mb-10 text-center md:mb-12 lg:mb-16">
                            <div className="mb-4 flex justify-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 sm:h-14 sm:w-14 md:h-16 md:w-16">
                                    <Search className="h-6 w-6 text-blue-600 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                                </div>
                            </div>
                            <h2 className="mb-2 text-xl font-bold text-[#0F5F58] sm:text-2xl md:mb-3 md:text-3xl lg:text-4xl">
                                Explore by Category
                            </h2>
                            <p className="mx-auto max-w-2xl px-4 text-xs text-[#0F5F58]/70 sm:text-sm md:text-base">
                                Discover inspiring student works across
                                different fields and explore their creativity.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <div className="hide-scrollbar flex justify-start gap-2 overflow-x-auto px-2 pb-4 sm:justify-center sm:gap-3 sm:px-0 md:gap-4 lg:gap-6">
                            {categories.map((cat) => (
                                <motion.button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat)}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-28 flex-shrink-0 rounded-lg border-2 p-3 transition-all duration-300 sm:w-36 sm:rounded-xl sm:p-4 md:w-40 md:rounded-2xl md:p-5 lg:w-48 lg:p-6 ${
                                        selectedCategory.id === cat.id
                                            ? 'border-[#0F5F58] bg-[#0F5F58] shadow-lg shadow-teal-200'
                                            : 'border-gray-200 bg-white hover:border-[#0F5F58]/30 hover:shadow-md'
                                    }`}
                                >
                                    <div className="flex flex-col items-center gap-1.5 text-center sm:gap-2 md:gap-3">
                                        <div
                                            className={`font-mono text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl ${
                                                selectedCategory.id === cat.id
                                                    ? 'text-white'
                                                    : 'text-[#0F5F58]'
                                            }`}
                                        >
                                            {cat.icon}
                                        </div>
                                        <div>
                                            <h3
                                                className={`mb-0.5 text-[9px] font-semibold leading-tight sm:text-[10px] md:mb-1 md:text-xs lg:text-sm ${
                                                    selectedCategory.id ===
                                                    cat.id
                                                        ? 'text-white'
                                                        : 'text-[#0F5F58]'
                                                }`}
                                            >
                                                {cat.name}
                                            </h3>
                                            <p
                                                className={`text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs ${
                                                    selectedCategory.id ===
                                                    cat.id
                                                        ? 'text-white/80'
                                                        : 'text-[#0F5F58]/60'
                                                }`}
                                            >
                                                Total Works:{' '}
                                                {
                                                    galleryProjects.filter(
                                                        (p) =>
                                                            p.category ===
                                                            cat.name,
                                                    ).length
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                        <div className="mt-4 text-center">
                            <p className="inline-block flex items-center justify-center border-b border-[#0F5F58] pb-1 italic text-[#0F5F58] sm:hidden">
                                Swipe for more information
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <section className="py-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="relative h-48 overflow-hidden sm:h-56 md:h-64 lg:h-80 xl:h-96"
                    >
                        <img
                            src={selectedCategory.image}
                            alt={selectedCategory.name}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                                <ScrollReveal>
                                    <h2 className="text-center text-2xl font-light tracking-wide text-white sm:text-3xl md:text-4xl lg:text-5xl">
                                        {selectedCategory.name.toUpperCase()}
                                    </h2>
                                </ScrollReveal>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </section>

            <section className="bg-white py-12 md:py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                    <ScrollReveal>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedCategory.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="mb-10 ml-0 md:mb-12 md:ml-12 lg:ml-16 xl:ml-20"
                            >
                                <div className="mb-4 flex items-center gap-2 md:mb-6 md:gap-3">
                                    <div className="h-10 w-1 bg-[#0F5F58] md:h-12" />
                                    <h2 className="text-xl font-bold text-[#0F5F58] sm:text-2xl md:text-3xl lg:text-4xl">
                                        Gallery of {selectedCategory.shortName}
                                    </h2>
                                </div>

                                <div className="max-w-5xl space-y-3 leading-relaxed text-[#0F5F58]/80 md:space-y-4">
                                    <p className="text-xs sm:text-sm md:text-base">
                                        {
                                            categoryDescriptions[
                                                selectedCategory.name
                                            ]?.intro
                                        }
                                    </p>
                                    <p className="text-xs sm:text-sm md:text-base">
                                        {
                                            categoryDescriptions[
                                                selectedCategory.name
                                            ]?.detail
                                        }
                                    </p>
                                    <p className="text-xs sm:text-sm md:text-base">
                                        {
                                            categoryDescriptions[
                                                selectedCategory.name
                                            ]?.closing
                                        }
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </ScrollReveal>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedCategory.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-3"
                        >
                            {filteredProjects.map((project, index) => (
                                <ScrollReveal
                                    key={project.id}
                                    delay={index * 0.1}
                                >
                                    <motion.div
                                        whileHover={{ y: -8 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition-shadow duration-300 hover:shadow-2xl md:rounded-2xl"
                                    >
                                        <div className="relative h-40 overflow-hidden sm:h-44 md:h-48 lg:h-56">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                                            />
                                        </div>

                                        <div className="p-4 sm:p-5 md:p-6">
                                            <div className="mb-3 flex items-center gap-2 md:mb-4 md:gap-3">
                                                <img
                                                    src={project.profileImage}
                                                    alt={project.student}
                                                    className="h-9 w-9 rounded-full border-2 border-gray-200 object-cover sm:h-10 sm:w-10 md:h-12 md:w-12"
                                                />
                                                <div>
                                                    <h4 className="text-xs font-bold text-[#0F5F58] sm:text-sm md:text-base">
                                                        {project.student}
                                                    </h4>
                                                    <p className="text-[10px] text-[#0F5F58]/60 sm:text-xs md:text-sm">
                                                        {project.class}
                                                    </p>
                                                </div>
                                            </div>

                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block break-all text-[10px] text-blue-600 hover:text-blue-800 hover:underline sm:text-xs md:text-sm"
                                            >
                                                {project.githubUrl}
                                            </a>
                                        </div>
                                    </motion.div>
                                </ScrollReveal>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </MainLayout>
    );
};

export default StudentWorks;
