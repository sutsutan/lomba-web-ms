import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const steps = [
  {
    type: 'text',
    title: 'Online Registration',
    description: 'Prospective students complete the online registration form by providing personal information and selecting their preferred study program.',
  },
  {
    type: 'image',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop',
    title: 'Visit Our School',
    description: "We'd love to show you around our campus. You'll see how we adapt learning to different strengths and needs, meet our friendly team, and explore our specialist facilities.",
  },
  {
    type: 'text',
    title: 'Interview & Assessment',
    description: 'Participate in a personal interview and complete a basic aptitude assessment to help us understand your potential better.',
  },
  {
    type: 'image',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop',
    title: 'Final Enrollment',
    description: 'Once accepted, complete the administrative requirements and prepare for your exciting journey at Metland School.',
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
          <div className="flex gap-4 self-start md:self-center flex-shrink-0">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 border-2 border-[#0F5F58] rounded-lg flex items-center justify-center hover:bg-[#0F5F58] hover:text-white transition-all duration-300 rotate-45 transform active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 -rotate-45" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 border-2 border-[#0F5F58] rounded-lg flex items-center justify-center hover:bg-[#0F5F58] hover:text-white transition-all duration-300 rotate-45 transform active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 -rotate-45" />
            </button>
          </div>
        </div>

        {/* Timeline Slider */}
        <div className="relative">
           {/* Main Horizontal Timeline Line */}
           <div className="absolute bottom-6 left-0 right-0 h-0.5 bg-[#0F5F58]/30 w-[200vw] -ml-[50vw]" />

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
               <div key={index} className="flex-shrink-0 w-[300px] md:w-[350px] group flex flex-col">
                 {/* Card */}
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: index * 0.1 }}
                   className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 mb-8 flex-1 flex flex-col"
                 >
                   {step.type === 'image' && step.image && (
                     <div className="h-48 overflow-hidden rounded-t-lg">
                       <img src={step.image} alt={step.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                     </div>
                   )}
                   
                   <div className="p-6 flex-1 flex flex-col">
                     <h3 className={`font-bold text-lg mb-4 text-[#0F5F58] ${step.type === 'text' ? 'pb-4 border-b border-gray-100' : ''}`}>
                       {step.title}
                     </h3>
                     <p className="text-sm text-gray-600 leading-relaxed">
                       {step.description}
                     </p>
                   </div>
                 </motion.div>

                 {/* Connector to Timeline */}
                 <div className="relative h-16 flex justify-center items-end flex-shrink-0">
                    {/* Vertical Dashed Line */}
                    <div className="absolute top-[-2rem] bottom-0 w-px border-l-2 border-dashed border-[#0F5F58]/40 h-[calc(100%+2rem)]" />
                    
                    {/* Circle Node on Timeline */}
                    <div className="absolute bottom-0 w-4 h-4 rounded-full border-2 border-[#0F5F58] bg-[#D5EAE9] z-10 box-content p-1">
                      <div className="w-full h-full bg-[#0F5F58] rounded-full" />
                    </div>
                    {/* Outer Ring for Node */}
                    <div className="absolute bottom-[-6px] w-8 h-8 rounded-full border border-[#0F5F58]/30 scale-0 group-hover:scale-100 transition-transform duration-300" />
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
