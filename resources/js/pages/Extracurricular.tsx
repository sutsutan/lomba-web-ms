import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import extracurricular from '@/assets/extracurricular.jpg';
import programIt from '@/assets/program-it.webp';
import programCulinary from '@/assets/program-culinary.webp';
import StackedCarousel from '@/components/StackedCarousel';

const Extracurricular = () => {
  return (
    <MainLayout>
      {/* Hero Carousel */}
      <HeroCarousel
        title="Learning Beyond Class"
        subtitle="Extracurricular Activities"
        description="Exploring talents beyond the classroom through diverse activities and programs."
        height="h-[50vh] sm:h-[60vh] md:h-[70vh]"
      />

      {/* Extracurricular Activities */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <ScrollReveal>
            <div className="flex items-center gap-3 md:gap-4 mb-3 ml-0 md:ml-6 lg:ml-10">
              <div className="w-[3px] h-8 sm:h-10 md:h-12 bg-[#12606A] flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#12606A] tracking-tight">
                Extracurricular Activities
              </h2>
            </div>
            <p className="text-[#12606A]/80 ml-4 sm:ml-5 md:ml-10 lg:ml-14 text-sm sm:text-base md:text-lg font-medium">
              Exploring talents beyond the classroom
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 xl:gap-32 mt-12 md:mt-16 lg:mt-24 items-center">
            {/* Content */}
            <ScrollReveal delay={0.1}>
              <div className="space-y-6 md:space-y-8 ml-0 md:ml-6 lg:ml-12 xl:ml-20 px-0">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#12606A]">
                  Co-Curricular Programs
                </h3>
                <div className="space-y-4 md:space-y-6">
                  <p className="text-[#12606A] font-medium leading-relaxed text-left text-sm sm:text-base lg:text-lg">
                    Extracurricular activities at Metland School are designed to 
                    support students' personal growth, creativity, and teamwork 
                    outside academic learning. Through a wide range of clubs and 
                    activities, students are encouraged to explore their interests, 
                    develop new skills, and build confidence in a supportive environment.
                  </p>
                  <p className="text-[#12606A] font-medium leading-relaxed text-left text-sm sm:text-base lg:text-lg">
                    These activities help students balance academic excellence with 
                    character development, leadership, and social engagement.
                  </p>
                </div>
                <button className="px-8 py-3 rounded-full bg-slate-300 text-[#12606A] font-bold text-sm hover:bg-slate-400 transition-all active:scale-95 shadow-sm">
                  Learn More
                </button>
              </div>
            </ScrollReveal>

            {/* Carousel */}
            <ScrollReveal delay={0.2}>
               <div className="w-full mt-10 lg:mt-0 lg:pl-12 xl:pl-20">
                 <StackedCarousel />
               </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      {/* Stories Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
          
          {/* Story 1 */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
            <ScrollReveal>
              <img
                src={programIt}
                alt="Extracurricular life"
                className="rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg md:shadow-xl w-full h-48 sm:h-56 md:h-72 lg:h-96 object-cover"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-3 sm:space-y-4 md:space-y-6 px-2 sm:px-0">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#12606A]">
                  Stories and moments from our extracurricular life
                </h3>
                <p className="text-[#12606A] font-medium leading-relaxed text-sm sm:text-base lg:text-lg">
                  Our extracurricular activities give students the opportunity 
                  to explore their interests, discover their talents, and enjoy 
                  learning in a more relaxed and fun environment. From sports 
                  and arts to creative and interest-based clubs, students are 
                  encouraged to try new experiences, build friendships, and 
                  develop confidence. These activities help students grow not 
                  only academically, but also socially and personally, supporting 
                  a balanced and meaningful school life.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Story 2 */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
            <ScrollReveal delay={0.2} className="order-2 lg:order-1">
              <div className="space-y-3 sm:space-y-4 md:space-y-6 px-0 md:px-0">
                <p className="text-[#12606A] font-medium leading-relaxed text-sm sm:text-base lg:text-lg text-left lg:text-right">
                  Our extracurricular activities give students the opportunity 
                  to explore their interests, discover their talents, and enjoy 
                  learning in a more relaxed and fun environment. From sports 
                  and arts to creative and interest-based clubs, students are 
                  encouraged to try new experiences, build friendships, and 
                  develop confidence. These activities help students grow not 
                  only academically, but also socially and personally, supporting 
                  a balanced and meaningful school life.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal className="order-1 lg:order-2">
              <img
                src={extracurricular}
                alt="Extracurricular activities"
                className="rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg md:shadow-xl w-full h-48 sm:h-56 md:h-72 lg:h-96 object-cover"
              />
            </ScrollReveal>
          </div>

          {/* Story 3 */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
            <ScrollReveal>
              <img
                src={programCulinary}
                alt="Creative activities"
                className="rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg md:shadow-xl w-full h-48 sm:h-56 md:h-72 lg:h-96 object-cover"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-3 sm:space-y-4 md:space-y-6 px-2 sm:px-0">
                <p className="text-[#12606A] font-medium leading-relaxed text-sm sm:text-base lg:text-lg text-left">
                  Our extracurricular activities give students the opportunity 
                  to explore their interests, discover their talents, and enjoy 
                  learning in a more relaxed and fun environment. From sports 
                  and arts to creative and interest-based clubs, students are 
                  encouraged to try new experiences, build friendships, and 
                  develop confidence. These activities help students grow not 
                  only academically, but also socially and personally, supporting 
                  a balanced and meaningful school life.
                </p>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>
    </MainLayout>
  );
};

export default Extracurricular;