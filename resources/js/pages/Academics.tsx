import { motion } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import { ArrowRight } from 'lucide-react';
import programIt from '@/assets/program-it.webp';
import programCulinary from '@/assets/program-culinary.webp';
import achievement from '@/assets/achievement-1.jpg';
import programDkv from '@/assets/program-dkv.jpg';

const majors = [
  {
    name: 'PPLG',
    description: 'The IT program covers software development and digital problem-solving skills, equipping students with practical abilities to design, build, and maintain modern digital solutions.',
  },
  {
    name: 'Akuntansi Bisnis',
    description: 'The Accounting program covers financial management and business reporting skills, equipping students with practical abilities to manage records, analyze data, and support business decisions.',
  },
  {
    name: 'Kuliner',
    description: 'The Culinary program covers professional cooking and kitchen management skills, equipping students with practical abilities to prepare quality dishes and maintain food safety standards.',
  },
  {
    name: 'Perhotelan',
    description: 'The Hospitality program covers service excellence and hospitality management skills, equipping students with practical abilities to deliver professional guest experiences in service industries.',
  },
  {
    name: 'Desain Komunikasi Visual (DKV)',
    description: 'The Visual Communication Design program covers creative design and visual communication skills, equipping students with practical abilities to create impactful visual content for digital and print media.',
  },
];

const timelineItems = [
  { 
    image: programIt,
    title: 'Industry Partnership',
    subtitle: 'Connecting Students with Real World',
    description: 'We collaborate with top companies to provide internships and real-world project experiences for our students.'
  },
  { 
    image: programCulinary, 
    title: 'Modern Facilities',
    subtitle: 'State-of-the-Art Learning Environment',
    description: 'Our labs and workshops are equipped with the latest technology to ensure students learn with industry-standard tools.'
  },
  { 
    image: achievement, 
    title: 'Achievements',
    subtitle: 'Celebrating Excellence',
    description: 'Our students frequently win national and regional competitions, showcasing their skills and dedication.'
  },
  { 
    image: programIt, 
    title: 'Global Certifications',
    subtitle: 'Recognized Qualifications',
    description: 'Students graduate with certifications that are recognized globally, giving them a competitive edge in the job market.'
  }, 
];

const studentWorks = [
  { title: 'Mobile App UI Design', student: 'SMK METLAND', image: programIt },
  { title: 'Culinary Presentation', student: 'SMK METLAND', image: programCulinary },
  { title: 'Brand Identity Project', student: 'SMK METLAND', image: achievement },
  { title: 'Web Development', student: 'SMK METLAND', image: programIt },
  { title: 'Photography Portfolio', student: 'SMK METLAND', image: programCulinary },
];

const Academics = () => {
  return (
    <MainLayout>
      {/* Hero Carousel */}
      <HeroCarousel
        title="Academics"
        subtitle="Empowering Vocational Excellence"
        description="SMK Metland School is a vocational secondary school that focuses on preparing students for their future careers. Learning activities are designed to help students gain practical skills for real-life situations."
        height="min-h-[60vh]"
      />

      {/* Main Content: Two Columns */}
      <section className="section-padding bg-background overflow-hidden px-6 md:px-12">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 relative">
            
            {/* Left Column: Text & Majors */}
            <div className="lg:col-span-5 space-y-12 lg:ml-20">
              <ScrollReveal>
                <div className="space-y-6">
                  <h2 className="section-title text-3xl md:text-4xl text-primary font-bold">Academics</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed text-pretty">
                    <p className='text-[#12606A] font-medium text-justify'>
                      Empowering Vocational Excellence
                      SMK Metland School is a vocational secondary school that focuses on preparing 
                      students for their future careers. Learning activities are designed to 
                      help students not only understand academic concepts, but also 
                      gain practical skills that can be applied in real-life situations.
                    </p>
                    <p className='text-[#12606A] font-medium text-justify'>
                      Our programs combine industry-relevant skills, character 
                      development, and hands-on practice. Through this approach, 
                      students learn discipline, responsibility, teamwork, and 
                      self-confidence—qualities that are important both in the 
                      workplace and in daily life.
                    </p>
                    <p className='text-[#12606A] font-medium text-justify'>
                      By balancing academic learning with practical experience, 
                      SMK Metland School supports students in continuing to higher 
                      education or entering the workforce with strong skills and 
                      positive character.
                    </p>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="relative inline-block text-2xl font-bold text-primary mb-6">
                    Majors
                    <div className="absolute -bottom-2 left-0 h-1 w-24 rounded-full bg-primary" />
                  </h3>
                  <ul className="space-y-4">
                    {majors.map((major, index) => (
                      <li key={index} className="flex gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                        <p className="text-primary font-medium">
                          <strong className="text-primary">{major.name}</strong> – {major.description}
                        </p>  
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Timeline & Cards */}
            <div className="lg:col-span-7 relative lg:ml-[160px]">
               {/* Vertical Line */}
               <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-[#12606A] hidden md:block"></div>
               
               <div className="space-y-12">
                 {timelineItems.map((item, index) => (
                   <ScrollReveal key={index} delay={index * 0.2}>
                     <div className="relative flex items-center md:items-start gap-8">
                       
                       {/* Timeline Marker (Diamond) */}
                       <div className="hidden md:flex flex-shrink-0 z-10 mt-[76px] relative">
                          <div className="w-10 h-10 bg-background flex items-center justify-center">
                             {/* Diamond Shape */}
                             <div className="w-4 h-4 border-2 border-primary rotate-45 bg-background"></div>
                             {/* Crosshair effect for diamond - optional based on "decoration" */}
                             <div className="absolute w-8 h-px bg-primary/30"></div>
                             <div className="absolute h-8 w-px bg-primary/30"></div>
                          </div>
                          {/* Inner dot */}
                          <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          </div>
                       </div>

                       {/* Card */}
                       <div className="bg-primary rounded-xl overflow-hidden shadow-xl w-full max-w-lg card-hover border-none">
                          <div className="h-48 overflow-hidden relative">
                            <img 
                              src={item.image} 
                              alt="Vocational Excellence" 
                              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 border-none outline-none" 
                            />
                            {/* Overlay removed as per request 'border di fotonya hilangkan' if it referred to overlay borders */}
                          </div>
                          <div className="p-6 text-primary-foreground">
                            <div className="flex items-center gap-4 mb-2">
                               <h4 className="text-xl font-bold">{item.title}</h4>
                            </div>
                            <p className="text-xs text-primary-foreground/80 mb-1 font-medium">
                              {item.subtitle}
                            </p>
                            <p className="text-xs text-primary-foreground/70 leading-relaxed font-medium">
                              {item.description}
                            </p>
                          </div>
                       </div>
                     </div>
                   </ScrollReveal>
                 ))}
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Student Works */}
      <section className="section-padding bg-background pb-32" id="works">
        <div className="container mx-auto px-6 md:px-12">
          <ScrollReveal>
             {/* Header */}
             <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                   <div className="w-1 h-12 bg-[#12606A] rounded-full" />
                   <h2 className="text-3xl md:text-4xl font-bold text-[#12606A]">Student Works</h2>
                </div>
                <button className="px-6 py-2 rounded-full bg-gray-200 text-[#12606A] font-medium hover:bg-gray-300 transition-colors text-sm">
                   View All Projects
                </button>
             </div>

             {/* Bento Grid Layout */}
             <div className="grid lg:grid-cols-2 gap-6 h-auto lg:h-[600px]">
                
                {/* Left Large Card */}
                <div className="relative rounded-lg overflow-hidden group h-[350px] lg:h-full shadow-lg">
                   <img src={programDkv} alt="Student Work 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                   <div className="absolute bottom-8 left-8 right-8 text-white">
                      <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium mb-3 inline-block">Web Developer</span>
                      <h3 className="font-bold text-xl mb-1">SMK METLAND</h3>
                      <p className="text-white/80 text-sm opacity-90">Empowering Vocational Excellence SMK Metland School</p>
                   </div>
                </div>

                {/* Right Column Grid */}
                {/* Right Column Grid */}
                <div className="grid grid-rows-2 h-full">
                   
                   {/* Top Row: 2 Cards */}
                   <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                      {/* Top Left */}
                      <div className="relative rounded-lg overflow-hidden group h-[280px] shadow-lg">
                         <img src={programIt} alt="Student Work 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                         <div className="absolute bottom-6 left-6 right-6 text-white">
                            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-medium mb-2 inline-block">App Design</span>
                            <h3 className="font-bold text-lg mb-1">SMK METLAND</h3>
                            <p className="text-white/80 text-xs opacity-90">Mobile UI/UX Project Showcase</p>
                         </div>
                      </div>
                      
                      {/* Top Right */}
                      <div className="relative rounded-lg overflow-hidden group h-[280px] shadow-lg">
                         <img src={programCulinary} alt="Student Work 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                         <div className="absolute bottom-6 left-6 right-6 text-white">
                            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-medium mb-2 inline-block">Culinary</span>
                            <h3 className="font-bold text-lg mb-1">SMK METLAND</h3>
                            <p className="text-white/80 text-xs opacity-90">Fine Dining Presentation</p>
                         </div>
                      </div>
                   </div>

                   {/* Bottom Row: Wide Card */}
                   <div className="relative rounded-lg overflow-hidden group h-[300px] shadow-lg">
                      <img src={programDkv} alt="Student Work 4" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-8 left-8 right-8 text-white">
                         <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium mb-3 inline-block">Achievement</span>
                         <h3 className="font-bold text-xl mb-1">SMK METLAND</h3>
                         <p className="text-white/80 text-sm opacity-90">National Competitions Winner</p>
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

export default Academics;
