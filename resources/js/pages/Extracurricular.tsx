import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import ScrollReveal from '@/components/ScrollReveal';
import HeroCarousel from '@/components/HeroCarousel';
import extracurricular from '@/assets/extracurricular.jpg';
import programIt from '@/assets/program-it.jpg';
import programCulinary from '@/assets/program-culinary.jpg';

const carouselImages = [extracurricular, programIt, programCulinary];

const Extracurricular = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

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
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-8 bg-primary rounded-full" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Extracurricular Activities
              </h2>
            </div>
            <p className="text-muted-foreground ml-4">
              Exploring talents beyond the classroom
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12 mt-12">
            {/* Content */}
            <ScrollReveal delay={0.1}>
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-foreground">
                  Co-Curricular Programs
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Extracurricular activities at Metland School are designed to 
                  support students' personal growth, creativity, and teamwork 
                  outside academic learning. Through a wide range of clubs and 
                  activities, students are encouraged to explore their interests, 
                  develop new skills, and build confidence in a supportive environment.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  These activities help students balance academic excellence with 
                  character development, leadership, and social engagement.
                </p>
                <button className="btn-outline">Learn More</button>
              </div>
            </ScrollReveal>

            {/* Carousel */}
            <ScrollReveal delay={0.2}>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <motion.img
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    src={carouselImages[currentSlide]}
                    alt="Extracurricular activities"
                    className="w-full h-80 object-cover"
                  />
                </div>
                
                {/* Navigation */}
                <div className="flex justify-center gap-4 mt-4">
                  <button 
                    onClick={prevSlide}
                    className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Diamond decorations */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-2 border-primary/30 rotate-45" />
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-2 border-primary/30 rotate-45" />
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
