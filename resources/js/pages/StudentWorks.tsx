import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import HeroCarousel from '@/components/HeroCarousel';
import ScrollReveal from '@/components/ScrollReveal';

// Import images (using existing assets as placeholders)
import programIt from '@/assets/program-it.webp';
import programCulinary from '@/assets/program-culinary.webp';
import programDkv from '@/assets/program-dkv.jpg';
import extracurricular from '@/assets/extracurricular.jpg';
import programAccounting from '@/assets/akuntansi.webp';
import programHospitality from '@/assets/aph.webp';

// Mock data based on the user's image and requirements
const projects = [
  {
    id: 1,
    category: 'IT',
    student: 'Ttang - XI PPLG 1',
    title: 'Mobil RC',
    description: 'Empowering Vocational Excellence SMK Metland School is a vocational secondary school that focuses on preparing students for their future careers. Learning activities are designed to help students not only understand academic concepts.',
    mainImage: programIt,
    thumbnails: [programIt, programIt]
  },
];

const StudentWorks = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

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
        subtitle="Stay updated with the latest works of creativity and innovation from our school community."
        description=""
        height="height=h-[60vh]"
      />

      <section className="section-padding bg-background py-20">
        <div className="container mx-auto px-4">
          
          {/* Header Section from Design */}
          <ScrollReveal>
             <div className="flex items-center gap-4 mb-2 ml-0 md:ml-14">
              <div className="w-[3px] h-10 bg-[#12606A]" />
              <h2 className="text-3xl md:text-5xl font-bold text-[#12606A] tracking-tight">
                Student Works
              </h2>
            </div>
            <p className="text-[#12606A]/80 ml-4 md:ml-20 text-lg font-medium mb-12 max-w-2xl">
              Stay updated with the latest works of creativity and innovation from our school community.
            </p>
          </ScrollReveal>

          {/* Project Display */}
          <AnimatePresence mode="wait">
            {currentProject ? (
              <div key={currentProject.id} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start ml-0 md:ml-20">
                
                {/* Left Column: Main Image */}
                <ScrollReveal delay={0.2} className="w-full">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="overflow-hidden shadow-2xl"
                  >
                    <img
                      src={currentProject.mainImage}
                      alt={currentProject.title}
                      className="w-full h-[300px] md:h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                  
                  {/* Thumbnails (visible on mobile/tablet) */}
                  <div className="flex gap-8 mt-8">
                    {currentProject.thumbnails.map((thumb, idx) => (
                        <div key={idx} className="w-1/2 overflow-hidden shadow-md">
                             <img src={thumb} alt="Thumbnail" className="w-full h-40 object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                    ))}
                  </div>

                </ScrollReveal>

                {/* Right Column: Project Details */}
                <ScrollReveal delay={0.3} className="flex flex-col h-full space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-medium text-[#12606A] mb-2">
                      {currentProject.student}
                    </h3>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#12606A] mb-6 tracking-tight">
                      {currentProject.title}
                    </h2>
                    
                    <p className="text-[#12606A] font-medium leading-relaxed text-justify mb-8 text-lg pr-0 md:pr-12">
                      {currentProject.description}
                    </p>

                    {/* Navigation Arrows */}
                    <div className="relative flex items-center justify-start h-20 w-32 mt-12 mb-12">
                      
                      {/* Garis miring */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-[2px] bg-[#12606A]/30 rotate-[45deg] z-10" />

                      {/* Button Prev */}
                      <button
                        onClick={handlePrev}
                        disabled={projects.length <= 1}
                        className="absolute left-2 -top-1 w-12 h-12 border-2 border-[#12606A]/40 flex items-center justify-center rotate-45 hover:bg-[#12606A] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                      >
                        <ChevronLeft className="-rotate-45 w-6 h-6 group-active:-translate-x-1 transition-transform" />
                      </button>

                      {/* Button Next */}
                      <button
                        onClick={handleNext}
                        disabled={projects.length <= 1}
                        className="absolute right-2 -bottom-1 w-12 h-12 border-2 border-[#12606A]/40 flex items-center justify-center rotate-45 hover:bg-[#12606A] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                      >
                        <ChevronRight className="-rotate-45 w-6 h-6 group-active:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                </ScrollReveal>
                
              </div>
            ) : (
                <div className="text-center py-20 text-[#12606A]/60 text-xl">
                    No projects found for this category yet.
                </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </MainLayout>
  );
};

export default StudentWorks;
