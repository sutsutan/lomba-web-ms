import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Users, BookOpen, Award, GraduationCap, Briefcase } from 'lucide-react';
import HeroCarousel from '@/components/HeroCarousel';
import MainLayout from '@/layouts/MainLayout';
import President from '@/assets/darmawan.jpg';

// Data Guru & Staf Berdasarkan Departemen
const teacherData = {
  leadership: [
    {
      name: "Tatang Sunarja",
      role: "Principal",
      image: President,
      bio: "Committed to driving vocational excellence through industry-standard education."
    },
    {
      name: "Veria Raja Tunggal",
      role: "Vice Principal",
      image: "",
      bio: "Expert in school management and student character development systems."
    }
  ],
  departments: {
    "PPLG": [
      { name: "I Gusti Agung Kuswibawa", subject: "Lead IT Instructor", competency: ["Web Dev", "UI/UX"], image: "" },
      { name: "Irgiawan Fhutuh", subject: "Software Engineer", competency: ["Fullstack", "JavaScript"], image: "" },
      { name: "Muhammad Iqbal", subject: "Software Engineer", competency: ["Backend", "Python"], image: "" },
      { name: "Azzam", subject: "Software Engineer", competency: ["Hengker", "Python"], image: "" },
      { name: "Veria Raja Tunggal", subject: "Software Engineer", competency: ["King Laravel", "Website Developer"], image: "" },
    ],
    "Culinary": [
      { name: "Lely", subject: "Pastry Chef", competency: ["Baking", "Plating"], image: "" },
      { name: "Chef Junaedi", subject: "Main Course Specialist", competency: ["Western", "Asian"], image: "" },
    ],
    "Hospitality": [
      { name: "Indra", subject: "Front Office Manager", competency: ["Service", "Ethics"], image: "" },
      { name: "Joyce Lantu", subject: "Front Office Manager", competency: ["Service", "Ethics"], image: "" },
    ],
    "DKV": [
      { name: "Ade Nurholik", subject: "Typography Designer", competency: ["AI", "Photoshop"], image: "" },
      { name: "Ikhsan Kurnia", subject: "Visual Designer", competency: ["AI", "Clip Studio Paint"], image: "" },
    ],
    "Accounting": [
      { name: "Dewi Lestari", subject: "Finance Teacher", competency: ["Audit", "Taxation"], image: "" },
    ],
    "General Subjects": [
      { name: "Meisty", subject: "Mathematics", competency: ["Calculus", "Logic"], image: "" },
      { name: "Asri Maharani", subject: "English Literature", competency: ["Public Speaking"], image: "" },
      { name: "Agustono", subject: "English Literature", competency: ["Public Speaking"], image: "" },
      { name: "Asri Maharani", subject: "English Literature", competency: ["Public Speaking"], image: "" },
      { name: "Asri Maharani", subject: "English Literature", competency: ["Public Speaking"], image: "" },
    ],
    "Staff": [
      { name: "Fajar", subject: "Administration", competency: ["Support", "Archive"], image: "" },
    ]
  }
};

const Teachers = () => {
  const [activeDept, setActiveDept] = useState<keyof typeof teacherData.departments>("PPLG");

  return (
    <MainLayout>
      <HeroCarousel
        title="Teacher & Staff"
        subtitle="SMK Metland School"
        description="Our dedicated educators are industry professionals committed to nurturing the next generation of skilled graduates."
        height="h-[60vh] md:h-[70vh]" 
      />

      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          
          {/* Header Section */}
          <ScrollReveal>
            <div className="flex flex-col items-center text-center mb-16">
              <div className="bg-[#0F5F58]/10 p-3 rounded-2xl mb-4">
                <Users className="w-8 h-8 text-[#0F5F58]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F5F58]">Leadership Excellence</h2>
              <p className="text-[#0F5F58]/70 mt-4 max-w-2xl">
                Guiding our institution towards global standards and vocational mastery.
              </p>
            </div>
          </ScrollReveal>

          {/* Exclusive Leadership Section */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-32">
            {teacherData.leadership.map((leader, index) => (
              <ScrollReveal key={index} delay={index * 0.2}>
                <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-100 items-center group hover:border-[#0F5F58]/20 transition-all">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden flex-shrink-0 border-8 border-[#B8C5D0]/30 shadow-inner">
                    <img 
                      src={leader.image} 
                      alt={leader.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                    />
                  </div>
                  <div className="text-center md:text-left space-y-3">
                    <div className="bg-[#0F5F58] text-white text-[10px] font-bold uppercase tracking-[0.2em] py-1.5 px-4 rounded-full inline-block">
                      {leader.role}
                    </div>
                    <h3 className="text-2xl font-bold text-[#0F5F58]">{leader.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed italic">
                      "{leader.bio}"
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <hr className="mb-20 border-gray-100" />

          {/* Department Selection Tabs */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col items-center mb-12">
              
              {/* Heading Title - Sekarang berada di atas Tab */}
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-[#0F5F58]" />
                <h3 className="text-2xl md:text-3xl font-bold text-[#0F5F58]">Academic Faculty</h3>
              </div>

              {/* Tab Navigation Line */}
              <div className="w-full flex justify-center border-b border-gray-200">
                <div className="flex gap-6 sm:gap-8 md:gap-12 overflow-x-auto hide-scrollbar pb-0 px-2">
                  {Object.keys(teacherData.departments).map((dept) => (
                    <button
                      key={dept}
                      onClick={() => setActiveDept(dept as keyof typeof teacherData.departments)}
                      className={`pb-3 text-sm sm:text-base md:text-lg font-bold transition-all duration-300 relative whitespace-nowrap ${
                        activeDept === dept
                          ? 'text-[#0F5F58]'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {dept}
                      {activeDept === dept && (
                        <motion.div
                          layoutId="activeTabUnderline"
                          className="absolute bottom-0 left-0 right-0 h-1 bg-[#0F5F58] rounded-full"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </ScrollReveal>

          {/* Teachers Grid with Animation */}
          <div className="min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDept}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {teacherData.departments[activeDept].map((teacher, index) => (
                  <div 
                    key={index} 
                    className="group bg-white rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-50"
                  >
                    <div className="relative h-72 overflow-hidden">
                      <img 
                        src={teacher.image} 
                        alt={teacher.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F5F58] via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex items-end p-6">
                        <div className="space-y-2">
                          <p className="text-white/70 text-xs font-medium uppercase tracking-wider">Competencies</p>
                          <div className="flex flex-wrap gap-2">
                            {teacher.competency.map((skill, sIdx) => (
                              <span key={sIdx} className="bg-white/20 backdrop-blur-md text-white text-[10px] py-1 px-3 rounded-lg border border-white/20">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 text-center">
                      <h4 className="font-bold text-[#0F5F58] text-lg mb-1 group-hover:text-[#0F5F58] transition-colors">
                        {teacher.name}
                      </h4>
                      <div className="flex items-center justify-center gap-2 text-[#0F5F58]/60 text-xs font-medium">
                        <Award className="w-3.5 h-3.5" />
                        {teacher.subject}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Call to Action (Optional) */}
          <ScrollReveal delay={0.4}>
            <div className="mt-24 bg-[#0F5F58] rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
               <GraduationCap className="w-12 h-12 mx-auto mb-6 opacity-20" />
               <h3 className="text-2xl md:text-3xl font-bold mb-4">Inspired by Excellence</h3>
               <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                 Our teachers don't just teach; they mentor. Each one brings years of industry experience to provide a bridge between education and professional success.
               </p>
            </div>
          </ScrollReveal>

        
        
        </div>
      </section>
    </MainLayout>
  );
};

export default Teachers;