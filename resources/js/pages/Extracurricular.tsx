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
        height="height=h-[70vh]"
      />

      {/* Extracurricular Activities */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-2 ml-0 md:ml-14">
              <div className="w-[3px] h-10 bg-[#12606A]" />
              <h2 className="text-3xl md:text-5xl font-bold text-[#12606A] tracking-tight">
                Extracurricular Activities
              </h2>
            </div>
            <p className="text-[#12606A]/80 ml-4 md:ml-20 text-lg font-medium">
              Exploring talents beyond the classroom
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-16 mt-20 items-center">
            {/* Content */}
            <ScrollReveal delay={0.1}>
              <div className="space-y-8 pr-0 md:pr-8 ml-0 md:ml-14">
                <h3 className="text-3xl font-bold text-[#12606A]">
                  Co-Curricular Programs
                </h3>
                <div className="space-y-6">
                  <p className="text-[#12606A] font-medium leading-relaxed text-justify text-base pr-0 md:pr-20">
                    Extracurricular activities at Metland School are designed to 
                    support students' personal growth, creativity, and teamwork 
                    outside academic learning. Through a wide range of clubs and 
                    activities, students are encouraged to explore their interests, 
                    develop new skills, and build confidence in a supportive environment.
                  </p>
                  <p className="text-[#12606A] font-medium leading-relaxed text-justify text-base pr-0 md:pr-20">
                    These activities help students balance academic excellence with 
                    character development, leadership, and social engagement.
                  </p>
                </div>
                <button className="px-8 py-3 rounded-full bg-slate-300 text-[#12606A] font-bold text-sm hover:bg-slate-400 transition-colors shadow-sm">
                  Learn More
                </button>
              </div>
            </ScrollReveal>

            {/* Carousel */}
            <ScrollReveal delay={0.2}>
               <div className="pl-4">
                 <StackedCarousel />
               </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stories Section */}
      {/* Stories Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 space-y-24">
          
          {/* Story 1 */}
          <div className="grid lg:grid-cols-2 ml-20 items-center">
            <ScrollReveal>
              <img
                src={programIt}
                alt="Extracurricular life"
                className="rounded-none shadow-xl w-[550px] h-full object-cover"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-[#12606A] pr-40">
                  Stories and moments from our extracurricular life
                </h3>
                <p className="text-[#12606A] font-medium leading-relaxed text-base pr-40">
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal delay={0.2} className="order-2 lg:order-1">
              <div className="space-y-6 text-right">
                 <p className="text-[#12606A] font-medium leading-relaxed text-base text-left lg:text-right pl-32 mr-24">
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
                className="rounded-none shadow-xl w-[550px] h-full object-cover ml-3"
              />
            </ScrollReveal>
          </div>

          {/* Story 3 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center ml-20">
            <ScrollReveal>
              <img
                src={programCulinary}
                alt="Creative activities"
                className="rounded-none shadow-xl w-[550px] h-full object-cover"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                <p className="text-[#12606A] font-medium leading-relaxed text-base pr-40 mr-16">
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
