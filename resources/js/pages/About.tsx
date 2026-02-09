import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

import aboutImage from '@/assets/about-preview.jpg';
import programIt from '@/assets/program-it.webp';
import programCulinary from '@/assets/program-culinary.webp';
import timelineImage from '@/assets/our-timeline.jpg';
import galadinner from '@/assets/gala-dinner.jpg';
import leadership from '@/assets/leadership-training.jpg';
import osis from '@/assets/osis.jpg';

// Data for Sections
const valuesData = [
  {
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop',
    title: 'Industry Ready Skills',
    description: 'Skills aligned with real industries'
  },
  {
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop',
    title: 'Strong Character',
    description: 'Discipline, teamwork, responsibility'
  },
  {
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
    title: 'Hands-on Learning',
    description: 'Learning through practice'
  }
];

const timelineYears = ['1945', '1980', '2000', '2020', '2026'];
const timelineContent = {
  '1945': {
    heads: [ 'Tatang sunarja : 1945 - 2026', 'Veria Raja Tunggal : 1945 - 202' ],
    beginning: "Metland School was established with a strong commitment to providing quality vocational education that balances academic learning, practical skills, and character development. From the very beginning, the school was designed to prepare students for real-world challenges and professional environments.",
    growing: "As the demand for skilled and industry-ready graduates continued to increase, Metland School consistently developed and refined its academic programs, facilities, and learning approach. With a strong focus on tourism, hospitality, and vocational excellence, the school enhanced its curriculum to align with current industry standards, technological advancements, and real-world professional needs. This commitment ensures that students are not only academically prepared, but also equipped with practical skills, strong character, and adaptability to succeed in a rapidly evolving global workforce."
  },
  // Placeholder content for other years as specific text wasn't provided for them
  '1980': { heads: ['Next Generation : 1980 - 2000'], beginning: 'Expansion era...', growing: 'New facilities added...' },
  '2000': { heads: ['Modern Era : 2000 - 2020'], beginning: 'Technological integration...', growing: 'Digital transformation...' },
  '2020': { heads: ['Current Leaders : 2020 - Present'], beginning: 'Resilience and innovation...', growing: 'Global standards...' },
  '2026': { heads: ['Future Vision : 2026+'], beginning: 'Future forward...', growing: 'Sustainable growth...' },
};

const studyPrograms = [
  { title: 'PPLG', desc: 'Mastering code and development', image: programIt },
  { title: 'Culinary', desc: 'Professional culinary skills', image: programCulinary },
  { title: 'Hospitality', desc: 'service excellence and management', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop' },
  { title: 'Accounting', desc: 'Financial management experts', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2072&auto=format&fit=crop' },
  { title: 'DKV', desc: 'Design, creativity, and visual communication', image: 'https://smkmetland.net/ppdb/wp-content/uploads/2024/01/MSF04850-1024x576.jpg' },
];

const About = () => {
  const [activeYear, setActiveYear] = useState('1945');

  return (
    <MainLayout>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* Hero */}
      <HeroCarousel
        title="About MS"
        subtitle="SMK Metland School"
        description="Discover our story, our mission, and our commitment to excellence in vocational education."
        height="h-[60vh] md:h-[70vh]" 
      />

      {/* Get to Know Us */}
      <section className="py-12 md:py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F5F58]">Get to Know Us</h2>
                <div className="space-y-4 text-[#0F5F58] text-base md:text-lg leading-relaxed">
                  <p>Metland School is a vocational secondary school (SMK) that prepares students with strong character, practical skills, and real-world experience.</p>
                  <p>We support students to grow academically, socially, and professionally, preparing them for future careers.</p>
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link to="/contact" className="px-6 md:px-8 py-3 bg-[#B8C5D0] text-[#0F5F58] font-semibold rounded-full hover:bg-[#A0B0BD] transition-all shadow-sm text-sm md:text-base">Contact Us</Link>
                  <Link to="/mission-vision" className="px-6 md:px-8 py-3 border-2 border-[#B8C5D0] text-[#0F5F58] font-semibold rounded-full hover:bg-white transition-all text-sm md:text-base">Our Vision & Mission</Link>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="flex gap-4 h-[300px] md:h-[400px]">
                <div className="w-2/3 h-full rounded-2xl overflow-hidden shadow-lg">
                  <img src={aboutImage} alt="Students" className="w-full h-full object-cover" />
                </div>
                <div className="w-1/3 h-full rounded-2xl overflow-hidden shadow-lg">
                  <img src={programIt} alt="School" className="w-full h-full object-cover" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar pb-8">
            {valuesData.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-[280px] md:w-[350px] lg:w-[400px] h-[300px] rounded-2xl overflow-hidden relative group shadow-md">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                   <h3 className="text-xl md:text-2xl font-bold mb-1">{item.title}</h3>
                   <p className="text-white/80 text-xs md:text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-2">
            <p className="text-[#0F5F58] text-sm italic border-b border-[#0F5F58] inline-block pb-1">Swipe for more information</p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F5F58] mb-8 text-center md:text-left">Our Timeline</h2>
            
            <div className="flex gap-4 border-b-2 border-[#2D8FDB] mb-12 overflow-x-auto hide-scrollbar scroll-smooth">
              {timelineYears.map((year) => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`pb-4 text-lg md:text-xl font-medium transition-all whitespace-nowrap min-w-[80px] ${
                    activeYear === year 
                      ? 'text-white bg-[#0F5F58] px-6 rounded-t-lg -mb-[2px]' 
                      : 'text-[#0F5F58]/60 hover:text-[#0F5F58] px-4'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
               <div className="space-y-8 order-2 lg:order-1">
                 <AnimatePresence mode="wait">
                   <motion.div
                    key={activeYear}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                   >
                    <div>
                      <h3 className="text-lg font-bold text-[#0F5F58] mb-2 uppercase tracking-wide">Heads of School</h3>
                      {timelineContent[activeYear as keyof typeof timelineContent].heads.map((head, i) => (
                        <p key={i} className="text-[#0F5F58]/80 font-medium">{head}</p>
                      ))}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0F5F58] mb-2 border-l-4 border-[#0F5F58] pl-3">The Beginning</h3>
                      <p className="text-[#0F5F58]/80 leading-relaxed text-justify text-sm md:text-base">
                        {timelineContent[activeYear as keyof typeof timelineContent].beginning}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0F5F58] mb-2 border-l-4 border-[#0F5F58] pl-3">Growing with Purpose</h3>
                      <p className="text-[#0F5F58]/80 leading-relaxed text-justify text-sm md:text-base">
                        {timelineContent[activeYear as keyof typeof timelineContent].growing}
                      </p>
                    </div>
                   </motion.div>
                 </AnimatePresence>
               </div>

               <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                  <div className="relative w-full max-w-[500px] aspect-[4/5] md:aspect-[3/4] rounded-t-full overflow-hidden bg-gray-100 shadow-2xl">
                    <img 
                      src={'https://smkmetland.net/ppdb/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-05-at-3.31.26-PM.jpeg'} 
                      alt="Timeline" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-6 right-6 bg-[#0F5F58] text-white py-2 px-6 rounded-full font-bold text-xl shadow-lg">
                      {activeYear}
                    </div>
                  </div>
               </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Study Program */}
      <section className="py-20 bg-[#0F5F58] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Study Program</h2>
          <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-8">
             {studyPrograms.map((program, idx) => (
               <div key={idx} className="flex-shrink-0 w-[280px] md:w-[320px] bg-white rounded-2xl overflow-hidden text-[#0F5F58] shadow-xl">
                  <div className="h-48 overflow-hidden">
                    <img src={program.image} alt={program.title} className="w-full h-full object-cover transition-transform hover:scale-110 duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{program.title}</h3>
                    <p className="text-sm opacity-80 mb-6 h-12 line-clamp-2">{program.desc}</p>
                    <Link to="/academics" className="flex items-center text-sm font-bold uppercase tracking-wider hover:gap-3 transition-all">
                      Explore Program <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

     {/* Student Life Section */}
<section className="py-20 bg-background">
  <div className="container mx-auto px-6 md:px-12 lg:px-24">
    <ScrollReveal>
      <div className="flex items-center gap-4 mb-12">
        <GraduationCap className="w-10 h-10 text-[#0F5F58]" />
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F5F58]">Student Life</h2>
      </div>

      <div className="space-y-12 md:space-y-16">
        {/* Item 1 - Image Left, Text Right */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
          <div className="w-full h-[280px] md:h-[350px] rounded-2xl overflow-hidden shadow-lg">
            <img src={osis} className="w-full h-full object-cover" alt="Student Council Debate" />
          </div>
          <div className="flex gap-4">
            <div className="w-1 bg-[#0F5F58] rounded-full flex-shrink-0" />
            <div className="flex flex-col">
              <h3 className="text-xl md:text-2xl font-bold text-[#0F5F58] mb-4">
                Student Council Presidential Debate 2025/2026
              </h3>
              <p className="text-[#0F5F58]/80 leading-relaxed text-justify text-sm md:text-base">
                The student council president election debate is an important part of the democratic learning process at SMK Metland. During these debates, candidates are trained to present ideas, opinions, and visions in a structured and confident manner. The debate encourages critical thinking and teaches students to respect different perspectives while maintaining sportsmanship. This activity also helps develop leadership qualities, self-confidence, and effective communication skills that are essential for both school life and the wider community.
              </p>
            </div>
          </div>
        </div>

        {/* Item 2 - Text Left, Image Right */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
          <div className="flex gap-4 order-2 md:order-1">
            <div className="w-1 bg-[#0F5F58] rounded-full flex-shrink-0" />
            <div className="flex flex-col">
              <h3 className="text-xl md:text-2xl font-bold text-[#0F5F58] mb-4">
                Bank Indonesia Gala Dinner Service Excellence
              </h3>
              <p className="text-[#0F5F58]/80 leading-relaxed text-justify text-sm md:text-base">
                SMK Metland actively provides students with opportunities to gain real professional experience through collaboration with industry partners. One of these opportunities is student participation in the Bank Indonesia Gala Dinner event. During this activity, students are directly involved in various services and operations, allowing them to apply skills learned in school. Through this experience, students enhance their technical abilities, communication skills, and understanding of professional ethics and workplace standards.
              </p>
            </div>
          </div>
          <div className="w-full h-[280px] md:h-[350px] rounded-2xl overflow-hidden shadow-lg order-1 md:order-2">
            <img src={galadinner} className="w-full h-full object-cover" alt="Bank Indonesia Gala Dinner" />
          </div>
        </div>

        {/* Item 3 - Image Left, Text Right */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
          <div className="w-full h-[280px] md:h-[350px] rounded-2xl overflow-hidden shadow-lg">
            <img src={leadership} className="w-full h-full object-cover" alt="Leadership Training" />
          </div>
          <div className="flex gap-4">
            <div className="w-1 bg-[#0F5F58] rounded-full flex-shrink-0" />
            <div className="flex flex-col">
              <h3 className="text-xl md:text-2xl font-bold text-[#0F5F58] mb-4">
                Basic Leadership Training - Metland School
              </h3>
              <p className="text-[#0F5F58]/80 leading-relaxed text-justify text-sm md:text-base">
                Discipline and leadership training activities are an integral part of student character development at SMK Metland. Through marching drills and field training, students are trained to improve teamwork, discipline, and physical endurance. These activities also aim to build mental resilience and a strong sense of responsibility. As a result, students are better prepared to become confident, independent individuals who are ready to face future challenges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  </div>
</section>
    </MainLayout>
  );
};

export default About;
