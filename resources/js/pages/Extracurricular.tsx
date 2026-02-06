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
        height="h-[60vh] md:h-[70vh]"
      />

      {/* Extracurricular Activities */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <ScrollReveal>
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 ml-0 md:ml-8 lg:ml-14">
              <div className="w-[2px] sm:w-[3px] h-6 sm:h-8 md:h-10 bg-[#12606A] flex-shrink-0" />
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold text-[#12606A] tracking-tight">
                Extracurricular Activities
              </h2>
            </div>
            <p className="text-[#12606A]/80 ml-3 sm:ml-4 md:ml-12 lg:ml-20 text-xs sm:text-sm md:text-base lg:text-lg font-medium">
              Exploring talents beyond the classroom
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 mt-8 sm:mt-10 md:mt-16 lg:mt-20 items-center">
            {/* Content */}
            <ScrollReveal delay={0.1}>
<<<<<<< HEAD
              <div className="space-y-4 sm:space-y-6 md:space-y-8 ml-0 md:ml-6 lg:ml-12 xl:ml-16 px-2 sm:px-0">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#12606A]">
=======
              <div className="space-y-8 pr-0 md:pr-8 ml-0 md:ml-24">
                <h3 className="text-3xl font-bold text-[#12606A]">
>>>>>>> 003a679b778dbfa72c67e746cc8234ff7e4553aa
                  Co-Curricular Programs
                </h3>
                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  <p className="text-[#12606A] font-medium leading-relaxed text-justify text-xs sm:text-sm md:text-base">
                    Extracurricular activities at Metland School are designed to 
                    support students' personal growth, creativity, and teamwork 
                    outside academic learning. Through a wide range of clubs and 
                    activities, students are encouraged to explore their interests, 
                    develop new skills, and build confidence in a supportive environment.
                  </p>
                  <p className="text-[#12606A] font-medium leading-relaxed text-justify text-xs sm:text-sm md:text-base">
                    These activities help students balance academic excellence with 
                    character development, leadership, and social engagement.
                  </p>
                </div>
                <button className="px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full bg-slate-300 text-[#12606A] font-bold text-[10px] sm:text-xs md:text-sm hover:bg-slate-400 transition-colors shadow-sm">
                  Learn More
                </button>
              </div>
            </ScrollReveal>

            {/* Carousel */}
            <ScrollReveal delay={0.2}>
              <div className="w-full -mx-4 sm:mx-0">
                <StackedCarousel />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
<<<<<<< HEAD
=======

<<<<<<< HEAD
=======
      {/* Carousel */}
      <ScrollReveal delay={0.2}>
         <div className="w-full">
           <StackedCarousel />
         </div>
      </ScrollReveal>
    </div>
  </div>
</section>
>>>>>>> 423af49174c2a075a06d09d5a33c41d366193333

>>>>>>> 003a679b778dbfa72c67e746cc8234ff7e4553aa
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
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-[#12606A]">
                  Stories and moments from our extracurricular life
                </h3>
                <p className="text-[#12606A] font-medium leading-relaxed text-xs sm:text-sm md:text-base">
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
              <div className="space-y-3 sm:space-y-4 md:space-y-6 px-2 sm:px-0">
                <p className="text-[#12606A] font-medium leading-relaxed text-xs sm:text-sm md:text-base text-left lg:text-right">
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
                <p className="text-[#12606A] font-medium leading-relaxed text-xs sm:text-sm md:text-base">
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