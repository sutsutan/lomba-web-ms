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
<section className="section-padding bg-background overflow-hidden">
  <div className="container mx-auto px-4 md:px-8">
    <ScrollReveal>
      <div className="flex items-center gap-3 md:gap-4 mb-2">
        <div className="w-[3px] h-8 md:h-10 bg-[#12606A] flex-shrink-0" />
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-[#12606A] tracking-tight">
          Extracurricular Activities
        </h2>
      </div>
      <p className="text-[#12606A]/80 ml-0 pl-4 md:ml-20 md:pl-0 text-sm sm:text-base md:text-lg font-medium">
        Exploring talents beyond the classroom
      </p>
    </ScrollReveal>

    <div className="grid lg:grid-cols-2 gap-8 md:gap-16 mt-12 md:mt-20 items-center">
      {/* Content */}
      <ScrollReveal delay={0.1}>
        <div className="space-y-6 md:space-y-8">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#12606A]">
            Co-Curricular Programs
          </h3>
          <div className="space-y-4 md:space-y-6">
            <p className="text-[#12606A] font-medium leading-relaxed text-justify text-sm md:text-base">
              Extracurricular activities at Metland School are designed to 
              support students' personal growth, creativity, and teamwork 
              outside academic learning. Through a wide range of clubs and 
              activities, students are encouraged to explore their interests, 
              develop new skills, and build confidence in a supportive environment.
            </p>
            <p className="text-[#12606A] font-medium leading-relaxed text-justify text-sm md:text-base">
              These activities help students balance academic excellence with 
              character development, leadership, and social engagement.
            </p>
          </div>
          <button className="px-6 md:px-8 py-2.5 md:py-3 rounded-full bg-slate-300 text-[#12606A] font-bold text-xs md:text-sm hover:bg-slate-400 transition-colors shadow-sm">
            Learn More
          </button>
        </div>
      </ScrollReveal>

      {/* Carousel */}
      <ScrollReveal delay={0.2}>
         <div className="w-full">
           <StackedCarousel />
         </div>
      </ScrollReveal>
    </div>
  </div>
</section>

      {/* Stories Section */}
      <section className="section-padding bg-section">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <img
                src={programIt}
                alt="Extracurricular life"
                className="rounded-2xl shadow-xl"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-foreground">
                  Stories and moments from our extracurricular life
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our extracurricular activities give students the opportunity 
                  to explore their interests, discover their talents, and enjoy 
                  learning in a more relaxed and fun environment.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  From sports and arts to creative and interest-based clubs, 
                  students are encouraged to try new experiences, build friendships, 
                  and develop confidence. These activities help students grow not 
                  only academically, but also socially and personally, supporting 
                  a balanced and meaningful school life.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Additional Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <ScrollReveal>
              <div className="text-center md:text-left">
                <p className="text-muted-foreground leading-relaxed">
                  Our extracurricular activities give students the opportunity 
                  to explore their interests, discover their talents, and enjoy 
                  learning in a more relaxed and fun environment. From sports 
                  and arts to creative and interest-based clubs, students are 
                  encouraged to try new experiences, build friendships, and 
                  develop confidence.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <img
                src={programCulinary}
                alt="Student activities"
                className="rounded-2xl shadow-lg"
              />
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <ScrollReveal>
              <img
                src={extracurricular}
                alt="Sports activities"
                className="rounded-2xl shadow-lg"
              />
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="flex items-center">
                <p className="text-muted-foreground leading-relaxed">
                  These activities help students grow not only academically, 
                  but also socially and personally, supporting a balanced and 
                  meaningful school life.
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
