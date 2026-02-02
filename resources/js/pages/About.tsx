import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import { ArrowRight, ChevronRight, ChevronLeft, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import aboutImage from '@/assets/about-preview.jpg';
import programIt from '@/assets/program-it.jpg';
import programCulinary from '@/assets/program-culinary.jpg';
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
    heads: [ 'Darmawan Sunarja : 1945 - 2026', 'Veria Raja Tunggal : 1945 - 202' ],
    beginning: "Metland School was established with a strong commitment to providing quality vocational education that balances academic learning, practical skills, and character development. From the very beginning, the school was designed to prepare students for real-world challenges and professional environments.",
    growing: "As the demand for skilled and industry-ready graduates increased, Metland School continued to develop its academic programs, facilities, and learning approach. With a focus on tourism, hospitality, and vocational excellence, the school strengthened its curriculum to align with industry standards."
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
  const valuesScrollRef = useRef<HTMLDivElement>(null);
  const studyScrollRef = useRef<HTMLDivElement>(null);

  // Helper to hide scrollbar
  const hideScrollStyle = {
    scrollbarWidth: 'none' as const,
    msOverflowStyle: 'none' as const,
  };

  return (
    <MainLayout>
       <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
      
      {/* Hero */}
      <HeroCarousel
        title="About MS"
        subtitle="SMK Metland School"
        description="Discover our story, our mission, and our commitment to excellence in vocational education."
        height="min-h-screen"
      />

      {/* Get to Know Us */}
      <section className="section-padding bg-background overflow-hidden pb-12">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="space-y-6 max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F5F58]">Get to Know Us</h2>
                <div className="space-y-4">
                  <p className="text-[#0F5F58] text-lg leading-relaxed">
                    Metland School is a vocational secondary school (SMK) that prepares students with strong character, practical skills, and real-world experience.
                  </p>
                  <p className="text-[#0F5F58] text-lg leading-relaxed">
                    We support students to grow academically, socially, and professionally, preparing them for future careers.
                  </p>
                </div>
                <div className="flex gap-4 pt-4">
                  <Link to="/contact" className="px-8 py-3 bg-[#B8C5D0] text-[#0F5F58] font-semibold rounded-full hover:bg-[#A0B0BD] transition-colors shadow-sm">Contact Us</Link>
                  <Link to="/about" className="px-8 py-3 bg-[#B8C5D0] text-[#0F5F58] font-semibold rounded-full hover:bg-[#A0B0BD] transition-colors shadow-sm">Learn More</Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="flex gap-4 h-[400px]">
                <div className="w-2/3 h-full overflow-hidden">
                  <img src={aboutImage} alt="Students" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="w-1/3 h-full overflow-hidden">
                  <img src={programIt} alt="School" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Section (Horizontal Scroll) */}
      <section className="pb-20 pt-8 bg-background">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
          <div 
             className="flex gap-6 overflow-x-auto hide-scrollbar pb-8"
             style={hideScrollStyle}
          >
            {valuesData.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-[300px] md:w-[400px] h-[300px] rounded-xl overflow-hidden relative group">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                   <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                   <p className="text-white/80 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="text-[#0F5F58] italic border-b border-[#0F5F58] inline-block pb-1">Swipe for more information</p>
          </div>
        </div>
      </section>

      {/* Timeline Redesign */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F5F58] mb-8">Our Timeline</h2>
            
            {/* Year Tabs */}
            <div className="flex gap-8 border-b-2 border-[#2D8FDB] mb-12 overflow-x-auto hide-scrollbar">
              {timelineYears.map((year) => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`pb-4 text-xl font-medium transition-colors whitespace-nowrap ${
                    activeYear === year 
                      ? 'text-white bg-[#0F5F58] px-6 rounded-t-lg -mb-[2px]' 
                      : 'text-[#0F5F58]/60 hover:text-[#0F5F58]'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
               {/* Content */}
               <div className="space-y-8">
                 <div>
                   <h3 className="text-xl font-bold text-[#0F5F58] mb-2">Heads of School</h3>
                   {timelineContent[activeYear as keyof typeof timelineContent].heads.map((head, i) => (
                     <p key={i} className="text-[#0F5F58]/80">{head}</p>
                   ))}
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-[#0F5F58] mb-2">The Beginning</h3>
                   <p className="text-[#0F5F58]/80 leading-relaxed text-justify">
                     {timelineContent[activeYear as keyof typeof timelineContent].beginning}
                   </p>
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-[#0F5F58] mb-2">Growing with Purpose</h3>
                   <p className="text-[#0F5F58]/80 leading-relaxed text-justify">
                     {timelineContent[activeYear as keyof typeof timelineContent].growing}
                   </p>
                 </div>
               </div>

               {/* Right Image */}
               <div className="relative h-full min-h-[600px] rounded-t-full overflow-hidden bg-gray-100 border-[10px] border-white shadow-2xl">
                  <img 
                    src={timelineImage} 
                    alt="Timeline Celebration" 
                    className="w-full h-full object-cover"
                  />
               </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Study Program (Dark Pattern Background) */}
      <section className="py-20 bg-[#0F5F58] text-white relative overflow-hidden">
        {/* Decorative Pattern Overlay (CSS approximation) */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
        />
        
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Study Program</h2>
          </div>

          <div 
             className="flex gap-6 overflow-x-auto hide-scrollbar pb-8"
             style={hideScrollStyle}
          >
             {studyPrograms.map((program, idx) => (
               <div key={idx} className="flex-shrink-0 w-[300px] bg-white rounded-lg overflow-hidden text-[#0F5F58]">
                  <div className="h-48 overflow-hidden">
                    <img src={program.image} alt={program.title} className="w-full h-full object-cover transition-transform hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{program.title}</h3>
                    <p className="text-sm opacity-80 mb-4">{program.desc}</p>
                    <Link to="/academics" className="flex items-center text-sm font-semibold hover:gap-2 transition-all">
                      Explore bout ts gng <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Our Educational Purpose */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F5F58] mb-2">Our Educational Purpose</h2>
            <p className="text-[#0F5F58] mb-12">The vision and mission that guide our learning journey and shape our future.</p>
            
            <div className="space-y-12">
              {/* Item 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rotate-45 border-2 border-[#0F5F58] flex items-center justify-center">
                    <span className="-rotate-45 font-bold text-[#0F5F58]">1.</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0F5F58] mb-4">What Drives Us</h3>
                  <p className="text-[#0F5F58]/80 leading-relaxed text-justify max-w-4xl">
                    To become a leading vocational school that nurtures graduates with strong character, excellent performance, and internationally recognized competencies, through high-quality education aligned with global standards and industry needs. We aim to empower our students to grow as confident, skilled, and responsible individuals who are ready to compete, adapt, and succeed in an ever-evolving global workforce.
                  </p>
                </div>
              </div>

               {/* Item 2 */}
               <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rotate-45 border-2 border-[#0F5F58] flex items-center justify-center">
                    <span className="-rotate-45 font-bold text-[#0F5F58]">2.</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0F5F58] mb-4">Our Beliefs</h3>
                  <ul className="list-disc pl-5 space-y-3 text-[#0F5F58]/80 max-w-4xl">
                    <li>To deliver education that focuses on the development of knowledge, skills, and attitude, aligned with Industry 4.0 and strengthened by the values of Generasi Cinta Prestasi, in accordance with industry demands.</li>
                    <li>To enhance teacher professionalism based on Metland School Teacher’s Values, while continuously adapting to the needs of Industry 4.0.</li>
                    <li>To build strong partnerships with industries (DUDI) and vocational higher education institutions, both nationally and internationally, to support academic program development.</li>
                    <li>To expand collaboration with industries at national and global levels in order to achieve zero unemployment among graduates.</li>
                  </ul>
                </div>
              </div>
            </div>

          </ScrollReveal>
        </div>
      </section>

      {/* Student Life Section */}
      <section className="section-padding bg-background pb-32">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
          <ScrollReveal>
             <div className="flex items-center gap-3 mb-16">
                <GraduationCap className="w-10 h-10 text-[#0F5F58]" />
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F5F58]">Student Life</h2>
             </div>

             <div className="space-y-24">
                {/* Item 1: Debate / Council */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                   <div className="w-full h-[300px] lg:h-[400px] rounded-lg overflow-hidden shadow-lg">
                      <img 
                        src={osis} 
                        alt="Student Council Debate" 
                        className="w-full h-full object-cover"
                      />
                   </div>
                   <div className="flex h-full">
                      {/* Vertical Separator */}
                      <div className="hidden lg:block w-[2px] flex-shrink-0 bg-[#0F5F58] mr-8 h-full self-stretch" />
                      
                      <p className="text-[#0F5F58] leading-relaxed text-justify self-center">
                        The student council president election debate is an important part of the democratic learning process at SMK Metland. Through this activity, students are trained to present ideas, opinions, and visions in a structured and confident manner. The debate encourages critical thinking and teaches students to respect different perspectives while maintaining sportsmanship. This activity also helps develop leadership qualities, self-confidence, and effective communication skills that are essential for both school life and the wider community.
                      </p>
                   </div>
                </div>

                {/* Item 2: Gala Dinner */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                   {/* Col 1: Text */}
                   <div className="flex h-full order-2 lg:order-1 items-center">
                      <p className="text-[#0F5F58] leading-relaxed text-justify lg:[text-align-last:right] self-center">
                        SMK Metland actively provides students with opportunities to gain real professional experience through collaboration with industry partners. One of these opportunities is student participation in the Bank Indonesia <em>Gala Dinner event</em>. During this activity, students are directly involved in event services and operations, allowing them to apply skills learned in school. Through this experience, students enhance their technical abilities, communication skills, and understanding of professional ethics and workplace standards.
                      </p>
                   </div>
                   
                   {/* Col 2: Image + Line */}
                   <div className="flex h-full order-1 lg:order-2">
                       {/* Vertical Separator */}
                       <div className="hidden lg:block w-[2px] flex-shrink-0 bg-[#0F5F58] mr-8 h-full self-stretch" />
                       
                       <div className="w-full h-[300px] lg:h-[400px] rounded-lg overflow-hidden shadow-lg flex-grow">
                          <img 
                            src={galadinner} 
                            alt="Gala Dinner Event" 
                            className="w-full h-full object-cover"
                          />
                       </div>
                   </div>
                </div>

                {/* Item 3: Leadership Training */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                   <div className="w-full h-[300px] lg:h-[400px] rounded-lg overflow-hidden shadow-lg">
                      <img 
                        src={leadership} 
                        alt="Leadership Training" 
                        className="w-full h-full object-cover"
                      />
                   </div>
                   <div className="flex h-full">
                      {/* Vertical Separator */}
                      <div className="hidden lg:block w-[2px] flex-shrink-0 bg-[#0F5F58] mr-8 h-full self-stretch" />
                      
                      <p className="text-[#0F5F58] leading-relaxed text-justify self-center">
                        Discipline and leadership training activities are an integral part of student character development at SMK Metland. Through marching drills and field training, students are trained to improve teamwork, discipline, and leadership abilities. These activities also aim to build mental resilience and a strong sense of responsibility. As a result, students are better prepared to become confident, independent individuals who are ready to face future challenges.
                      </p>
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
