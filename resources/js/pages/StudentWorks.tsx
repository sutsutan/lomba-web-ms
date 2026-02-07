import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import HeroCarousel from '@/components/HeroCarousel';
import ScrollReveal from '@/components/ScrollReveal';

import programIt from '@/assets/program-it.webp';
import programCulinary from '@/assets/program-culinary.webp';
import programDkv from '@/assets/program-dkv.jpg';
import extracurricular from '@/assets/extracurricular.jpg';
import programAccounting from '@/assets/akuntansi.webp';
import programHospitality from '@/assets/aph.webp';

const categories = [
  { id: 1, name: 'Culinary', icon: '</>', totalWorks: 112, color: '#0F5F58' },
  { id: 2, name: 'Design Communication Visual', icon: '</>', totalWorks: 112, color: '#0F5F58' },
  { id: 3, name: 'Information Technology', icon: '</>', totalWorks: 112, color: '#0F5F58' },
  { id: 4, name: 'Hospitality', icon: '</>', totalWorks: 112, color: '#0F5F58' },
  { id: 5, name: 'Accounting', icon: '</>', totalWorks: 112, color: '#0F5F58' },
];

const galleryProjects = [
  {
    id: 1,
    category: 'IT',
    student: 'Veria Raja Tunggal',
    class: 'XI IT 1',
    title: 'From School to Career',
    description: 'We\'re proud to present a collection of work created by our Information Technology students at Metland School.',
    image: programIt,
    githubUrl: 'https://github.com/tsukuriaI/lomba-web-ms',
    profileImage: extracurricular
  },
  {
    id: 2,
    category: 'IT',
    student: 'Ana Malia',
    class: 'XI IT 1',
    title: 'About Us',
    description: 'We\'re proud to present a collection of work created by our Information Technology students at Metland School.',
    image: programCulinary,
    githubUrl: 'https://github.com/tsukuriaI/lomba-web-ms',
    profileImage: extracurricular
  },
  {
    id: 3,
    category: 'IT',
    student: 'Cutan bawiq',
    class: 'XI IT 1',
    title: 'Creative Project',
    description: 'We\'re proud to present a collection of work created by our Information Technology students at Metland School.',
    image: programDkv,
    githubUrl: 'https://github.com/tsukuriaI/lomba-web-ms',
    profileImage: extracurricular
  },
  {
    id: 4,
    category: 'IT',
    student: 'Atan ilaq',
    class: 'XI IT 1',
    title: 'Innovation Hub',
    description: 'We\'re proud to present a collection of work created by our Information Technology students at Metland School.',
    image: programAccounting,
    githubUrl: 'https://github.com/tsukuriaI/lomba-web-ms',
    profileImage: extracurricular
  },
  {
    id: 5,
    category: 'IT',
    student: 'FunDih',
    class: 'XI IT 1',
    title: 'Tech Solutions',
    description: 'We\'re proud to present a collection of work created by our Information Technology students at Metland School.',
    image: programHospitality,
    githubUrl: 'https://github.com/tsukuriaI/lomba-web-ms',
    profileImage: extracurricular
  },
  {
    id: 6,
    category: 'IT',
    student: 'Hengki',
    class: 'XI IT 1',
    title: 'Digital Experience',
    description: 'We\'re proud to present a collection of work created by our Information Technology students at Metland School.',
    image: programIt,
    githubUrl: 'https://github.com/tsukuriaI/lomba-web-ms',
    profileImage: extracurricular
  },
];

const projects = [
  {
    id: 1,
    category: 'IT',
    student: 'Ttang - XI PPLG 1',
    title: 'Mobil RC',
    description: "Empowering Vocational Excellence — SMK Metland School is a vocational secondary school dedicated to preparing students for real career pathways and future opportunities. Our learning approach is designed to help students not only understand academic concepts, but also develop practical skills, confidence, and a professional mindset needed in today’s industry. With a strong focus on hands-on experience, students are trained through project-based learning, industry-standard practices, and real-world simulations that reflect actual working environments. Beyond technical competence, we also prioritize character development, communication, teamwork, and digital literacy—so every student is ready to compete locally and globally.",
    mainImage: programIt,
    thumbnails: [programIt, programIt]
  },
];


const StudentWorks = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const currentProject = projects[currentProjectIndex];

  const handleNext = () => {
    if (projects.length > 1) {
      setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
    }
  };

  const handlePrev = () => {
    if (projects.length > 1) {
      setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }
  };

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
            <div className="flex items-center gap-3 md:gap-4 mb-2 ml-0 md:ml-8 lg:ml-14">
              <div className="w-[2px] sm:w-[3px] h-8 sm:h-10 bg-[#12606A]" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#12606A] tracking-tight">
                Student Works
              </h2>
            </div>
            <p className="text-[#12606A]/80 ml-3 sm:ml-4 md:ml-12 lg:ml-20 text-sm sm:text-base md:text-lg font-medium mb-8 md:mb-12 max-w-2xl">
              Stay updated with the latest works of creativity and innovation from our school community.
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
                      src={currentProject.mainImage}
                      alt={currentProject.title}
                      className="w-full h-48 sm:h-64 md:h-80 lg:h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                  
                  <div className="flex gap-4 sm:gap-6 md:gap-8 mt-6 md:mt-8">
                    {currentProject.thumbnails.map((thumb, idx) => (
                      <div key={idx} className="w-1/2 overflow-hidden shadow-md rounded-lg md:rounded-none">
                        <img src={thumb} alt="Thumbnail" className="w-full h-28 sm:h-32 md:h-40 object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                    ))}
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
                        disabled={projects.length <= 1}
                        className="absolute left-1 sm:left-2 -top-1 w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#12606A]/40 flex items-center justify-center rotate-45 hover:bg-[#12606A] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                      >
                        <ChevronLeft className="-rotate-45 w-5 h-5 sm:w-6 sm:h-6 group-active:-translate-x-1 transition-transform" />
                      </button>

                      <button
                        onClick={handleNext}
                        disabled={projects.length <= 1}
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
                No projects found for this category yet.
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
                Explore by Category
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-[#0F5F58]/70 max-w-2xl mx-auto px-4">
                Discover inspiring student works across different fields and explore their creativity.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
  <div className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-6 overflow-x-auto pb-4 hide-scrollbar justify-start sm:justify-center px-2 sm:px-0">
    {categories.map((cat) => (
      <motion.button
        key={cat.id}
        onClick={() => setSelectedCategory(cat)}
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
              {cat.name}
            </h3>
            <p className={`text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs ${
              selectedCategory.id === cat.id ? 'text-white/80' : 'text-[#0F5F58]/60'
            }`}>
              Total Works: {cat.totalWorks}
            </p>
          </div>
        </div>
      </motion.button>
    ))}
  </div>
  <div className="text-center mt-4">
            <p className="flex sm:hidden justify-center items-center text-[#0F5F58] italic border-b border-[#0F5F58] inline-block pb-1">Swipe for more information</p>
          </div>
</ScrollReveal>
        </div>
      </section>

      <section className="py-0">
        <div className="relative h-48 sm:h-56 md:h-64 lg:h-80 xl:h-96 overflow-hidden">
          <img 
            src={programIt} 
            alt="Information Technology" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <ScrollReveal>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-wide text-center">
                  INFORMATION TECHNOLOGY
                </h2>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <ScrollReveal>
            <div className="mb-10 md:mb-12 ml-0 md:ml-12 lg:ml-16 xl:ml-20">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="w-1 h-10 md:h-12 bg-[#1E88E5]" />
                 <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F5F58]">
                  Gallery of IT
                </h2>
              </div>
              
              <div className="space-y-3 md:space-y-4 text-[#0F5F58]/80 leading-relaxed max-w-5xl">
                <p className="text-xs sm:text-sm md:text-base">
                  We're proud to present a collection of work created by our Information Technology students at Metland School.
                </p>
                <p className="text-xs sm:text-sm md:text-base">
                  These projects are the result of hands-on learning, real practice, and strong problem-solving skills. From website development, mobile applications, to UI/UX design and digital systems, every work shows how our students learn to build technology that is not only functional, but also user-friendly and well-designed.
                </p>
                <p className="text-xs sm:text-sm md:text-base">
                  Through industry-based learning and creative exploration, students are encouraged to think critically, work collaboratively, and turn their ideas into real digital solutions. Explore their work and discover how Metland School prepares future IT talents to be ready for the world of technology and innovation.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {galleryProjects.map((project, index) => (
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
                        </p>
                      </div>
                    </div>

                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] sm:text-xs md:text-sm text-blue-600 hover:text-blue-800 hover:underline break-all block"
                    >
                      {project.githubUrl}
                    </a>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
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