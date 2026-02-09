import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const steps = [
  {
    image: 'https://i.pinimg.com/1200x/6a/80/35/6a8035f9bcb61800e1884a70948855a5.jpg',
    title: 'Online Registration',
    description: 'Begin your journey by completing our online registration form. Provide your personal information, select your preferred study program, and submit the required documents.',
  },
  {
    image: 'https://smkmetland.pages.dev/_astro/hero-image.GuN_GPl8_199FtU.webp',
    title: 'Visit Our School',
    description: "Schedule a campus tour to explore our facilities and meet our team. You'll see how we adapt learning to different strengths and needs, and discover our vibrant community.",
  },
  {
    image: 'https://i.pinimg.com/1200x/93/81/50/938150a75a021683da5f1f96033426e4.jpg',
    title: 'Interview & Assessment',
    description: 'Participate in a personal interview with our admission team and complete a basic aptitude assessment. This helps us understand your potential and learning goals.',
  },
  {
    image: 'https://i.pinimg.com/1200x/90/67/eb/9067ebc61b7b972efc65225fd6094892.jpg',
    title: 'Final Enrollment',
    description: 'Once accepted, complete the administrative requirements and submit all final documents. Our team will guide you through the enrollment process step by step.',
  },
];

const AdmissionSteps = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding bg-[#D5EAE9] text-[#0F5F58] overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <div className="max-w-3xl">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Student Admission<br />Process
              </h2>
              <p className="text-[#0F5F58]/80 text-base md:text-lg leading-relaxed">
                Joining Metland School is simple and transparent. Our admission process is designed to help prospective students and parents easily understand each step, from registration to enrollment. We ensure a smooth and supportive experience, guiding every applicant toward becoming part of a school that values character, competence, and future readiness.
              </p>
            </ScrollReveal>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2 mt-8 md:mt-0">
              <div className="relative flex items-center justify-center h-20 w-32">
                {/* Garis miring */}
                <div className="absolute h-16 w-[2px] bg-primary/30 rotate-[45deg] z-10" />

                {/* Button Prev */}
                <button
                  onClick={scrollLeft}
                  className="absolute left-2 -top-1 w-12 h-12 border-2 border-primary/40 flex items-center justify-center rotate-45 hover:bg-primary hover:text-white transition-all group"
                >
                  <ChevronLeft className="-rotate-45 w-6 h-6 group-active:-translate-x-1 transition-transform" />
                </button>

                {/* Button Next */}
                <button
                  onClick={scrollRight}
                  className="absolute right-2 -bottom-1 w-12 h-12 border-2 border-primary/40 flex items-center justify-center rotate-45 hover:bg-primary hover:text-white transition-all group"
                >
                  <ChevronRight className="-rotate-45 w-6 h-6 group-active:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
        </div>

        {/* Timeline Slider */}
        <div className="relative">
           {/* Main Horizontal Timeline Line */}
           <div className="absolute bottom-16 left-0 right-0 h-0.5 bg-[#0F5F58]/30 w-[200vw] -ml-[50vw]" />

           <div 
             ref={scrollContainerRef}
             className="flex gap-8 overflow-x-auto overflow-y-hidden py-12 px-4 -mx-4 no-scrollbar"
             style={{
               scrollbarWidth: 'none',
               msOverflowStyle: 'none', 
             }}
           >
             <style>{`
               .no-scrollbar::-webkit-scrollbar {
                 display: none !important;
                 width: 0 !important;
                 height: 0 !important;
                 background: transparent;
               }
               .no-scrollbar {
                 -ms-overflow-style: none;
                 scrollbar-width: none;
               }
             `}</style>
             {steps.map((step, index) => (
               <div key={index} className="flex-shrink-0 w-[300px] md:w-[350px] group flex flex-col justify-end">
                 {/* Card */}
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: index * 0.1 }}
                   className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 mb-8 flex flex-col w-full"
                 >
                   <div className="h-40 overflow-hidden rounded-t-lg">
                     <img src={step.image} alt={step.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                   </div>
                   
                   <div className="p-6 flex flex-col">
                     <h3 className="font-bold text-lg mb-4 text-[#0F5F58]">
                       {step.title}
                     </h3>
                     <p className="text-sm text-gray-600 leading-relaxed">
                       {step.description}
                     </p>
                   </div>
                 </motion.div>

                 {/* Connector to Timeline */}
                 <div className="relative h-16 flex justify-center items-end flex-shrink-0 w-full">
                    {/* Vertical Dashed Line */}
                    <div className="absolute top-[-2rem] bottom-0 w-px border-l-2 border-dashed border-[#0F5F58]/40 h-[calc(100%+2rem)]" />
                    
                    {/* Circle Node on Timeline */}
                    <div className="absolute bottom-0 w-4 h-4 rounded-full border-2 border-[#0F5F58] bg-[#D5EAE9] z-10 box-content p-1">
                      <div className="w-full h-full bg-[#0F5F58] rounded-full" />
                    </div>
                 </div>
               </div>
             ))}
           </div>
        </div>

      </div>
    </section>
  );
};

export default AdmissionSteps;